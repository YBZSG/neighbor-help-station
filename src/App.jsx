import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { animatePageEnter } from "./animations/pageTransitions";
import { createId, storageKeys } from "./utils/storage";
import { nowText } from "./utils/time";
import { routes } from "./constants/routes";
import { mockItems } from "./data/mockItems";
import { mockMaterials } from "./data/mockMaterials";
import { mockHelpRequests } from "./data/mockHelpRequests";
import { mockEmergency } from "./data/mockEmergency";
import { mockVolunteer } from "./data/mockVolunteer";
import { useLocalStorage } from "./hooks/useLocalStorage";
import MainLayout from "./layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import ItemsPage from "./pages/ItemsPage";
import MaterialsPage from "./pages/MaterialsPage";
import HelpPage from "./pages/HelpPage";
import EmergencyPage from "./pages/EmergencyPage";
import VolunteerPage from "./pages/VolunteerPage";
import ProfilePage from "./pages/ProfilePage";
import RulesPage from "./pages/RulesPage";
import SearchResultsPage from "./pages/SearchResultsPage";

export default function App() {
  const [current, setCurrent] = useState("dashboard");
  const [toast, setToast] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [items, setItems] = useLocalStorage(storageKeys.items, mockItems);
  const [materials, setMaterials] = useLocalStorage(storageKeys.materials, mockMaterials);
  const [help, setHelp] = useLocalStorage(storageKeys.help, mockHelpRequests);
  const [emergency, setEmergency] = useLocalStorage(storageKeys.emergency, mockEmergency);
  const [volunteer, setVolunteer] = useLocalStorage(storageKeys.volunteer, mockVolunteer);
  const [favorites, setFavorites] = useLocalStorage(storageKeys.favorites, []);
  const [applications, setApplications] = useLocalStorage(storageKeys.applications, []);
  const [revealedContacts, setRevealedContacts] = useState([]);
  const pageRef = useRef(null);

  const title = current === "search" ? "搜索结果" : routes.find((route) => route.key === current)?.label || "首页";

  useGSAP(
    () => {
      if (pageRef.current) animatePageEnter(pageRef.current);
    },
    { scope: pageRef, dependencies: [current], revertOnUpdate: true }
  );

  function notify(message) {
    setToast(message);
  }

  function handleGlobalSearch(keyword) {
    const text = keyword.trim();
    if (!text) {
      notify("请输入要搜索的关键词");
      return;
    }
    setSearchKeyword(text);
    setCurrent("search");
    notify("已生成搜索结果");
  }

  function addApplication(type, title) {
    setApplications((prev) => [...prev, { id: createId("app"), type, title, time: nowText() }]);
  }

  function handleAddItem(data, error) {
    if (!data) {
      notify(error);
      return false;
    }
    setItems((prev) => [{ ...data, id: createId("item"), status: "可申请", image: "/mock-images/lamp.svg" }, ...prev]);
    notify("闲置物品发布成功");
    return true;
  }

  function handleReveal(id) {
    setRevealedContacts((prev) => (prev.includes(id) ? prev : [...prev, id]));
    const item = items.find((entry) => entry.id === id);
    if (item) addApplication("申请联系", item.name);
    notify("已显示脱敏联系方式");
  }

  function handleAddMaterial(data, error) {
    if (!data) {
      notify(error);
      return false;
    }
    setMaterials((prev) => [{ ...data, id: createId("mat"), count: 0 }, ...prev]);
    notify("学习资料发布成功");
    return true;
  }

  function handleFavorite(id) {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
    notify(favorites.includes(id) ? "已取消收藏" : "收藏成功");
  }

  function handleMaterialApply(material) {
    setMaterials((prev) => prev.map((item) => (item.id === material.id ? { ...item, count: item.count + 1 } : item)));
    addApplication("资料申请", material.title);
    notify("资料申请已记录");
  }

  function handleAddHelp(data, error) {
    if (!data) {
      notify(error);
      return false;
    }
    setHelp((prev) => [{ ...data, id: createId("help"), status: "待响应" }, ...prev]);
    notify("生活物资求助发布成功");
    return true;
  }

  function updateHelpStatus(id, status, message) {
    setHelp((prev) => prev.map((item) => (item.id === id ? { ...item, status } : item)));
    const target = help.find((item) => item.id === id);
    if (target) addApplication(status === "已响应" ? "我来帮忙" : "完成互助", target.title);
    notify(message);
  }

  function handleAddEmergency(data, error) {
    if (!data) {
      notify(error);
      return false;
    }
    setEmergency((prev) => [{ ...data, id: createId("em"), createdAt: nowText(), status: "待响应" }, ...prev]);
    notify("临时求助发布成功");
    return true;
  }

  function handleJoinVolunteer(id) {
    const target = volunteer.find((item) => item.id === id);
    if (!applications.some((item) => item.type === "公益报名" && item.title === target?.name)) {
      setVolunteer((prev) => prev.map((item) => (item.id === id ? { ...item, current: Math.min(item.current + 1, item.target) } : item)));
      addApplication("公益报名", target?.name || id);
    }
    notify("报名成功，已加入我的申请");
  }

  function handleAddVolunteer(data, error) {
    if (!data) {
      notify(error);
      return false;
    }
    setVolunteer((prev) => [{ ...data, id: createId("vol"), current: 0 }, ...prev]);
    notify("公益活动发布成功");
    return true;
  }

  const state = { items, materials, help, emergency, volunteer };

  const pages = {
    dashboard: <Dashboard state={state} onNavigate={setCurrent} />,
    items: <ItemsPage items={items} revealedContacts={revealedContacts} onReveal={handleReveal} onAddItem={handleAddItem} />,
    materials: <MaterialsPage materials={materials} favorites={favorites} onFavorite={handleFavorite} onApply={handleMaterialApply} onAddMaterial={handleAddMaterial} />,
    help: <HelpPage help={help} onAddHelp={handleAddHelp} onRespondHelp={(id) => updateHelpStatus(id, "已响应", "已响应该求助")} onCompleteHelp={(id) => updateHelpStatus(id, "已完成", "互助已完成")} />,
    emergency: <EmergencyPage emergency={emergency} onAddEmergency={handleAddEmergency} />,
    volunteer: <VolunteerPage volunteer={volunteer} joined={applications.filter((item) => item.type === "公益报名").map((item) => volunteer.find((v) => v.name === item.title)?.id || item.title)} onJoin={handleJoinVolunteer} onAddVolunteer={handleAddVolunteer} />,
    profile: <ProfilePage items={items} help={help} favorites={favorites} applications={applications} />,
    rules: <RulesPage />,
    search: <SearchResultsPage keyword={searchKeyword} state={state} onNavigate={setCurrent} />
  };

  return (
    <MainLayout
      current={current}
      title={title}
      onNavigate={setCurrent}
      onSearch={handleGlobalSearch}
      onNotice={() => notify("暂无新通知，最近动态可在首页查看")}
      toast={toast}
      clearToast={() => setToast("")}
    >
      <div ref={pageRef} className="page-motion">
        {pages[current]}
      </div>
    </MainLayout>
  );
}
