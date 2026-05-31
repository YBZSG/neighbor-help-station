import { BookOpen, ClipboardList, HandHeart, PackageOpen, Siren } from "lucide-react";
import { useGsapReveal } from "../hooks/useGsapReveal";
import { mockRankList } from "../data/mockUser";
import ActivityFeed from "../components/dashboard/ActivityFeed";
import HeroSection from "../components/dashboard/HeroSection";
import RankList from "../components/dashboard/RankList";
import StatCard from "../components/dashboard/StatCard";
import Card from "../components/common/Card";
import Badge from "../components/common/Badge";

export default function Dashboard({ state, onNavigate }) {
  const scope = useGsapReveal([state.items.length, state.materials.length, state.help.length]);
  const activities = [
    { id: 1, title: "林同学发布了闲置雨伞，可在图书馆领取", time: "5 分钟前" },
    { id: 2, title: "学习帮扶小组新增 2 位志愿者", time: "18 分钟前" },
    { id: 3, title: "高数期末重点整理被收藏", time: "35 分钟前" },
    { id: 4, title: "一条借充电器求助已完成互助", time: "1 小时前" }
  ];

  return (
    <div ref={scope} className="page-shell space-y-6">
      <HeroSection onNavigate={onNavigate} />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard label="今日新增互助" value={8} icon={ClipboardList} onClick={() => onNavigate("help")} />
        <StatCard label="闲置物品" value={state.items.length} icon={PackageOpen} tone="blue" onClick={() => onNavigate("items")} />
        <StatCard label="学习资料" value={state.materials.length} icon={BookOpen} onClick={() => onNavigate("materials")} />
        <StatCard label="临时求助" value={state.emergency.length} icon={Siren} tone="orange" onClick={() => onNavigate("emergency")} />
        <StatCard label="公益活动" value={state.volunteer.length} icon={HandHeart} tone="blue" onClick={() => onNavigate("volunteer")} />
      </div>
      <div className="grid gap-5 lg:grid-cols-[1.3fr_.9fr]">
        <ActivityFeed activities={activities} />
        <RankList list={mockRankList} />
      </div>
      <Card className="gsap-reveal">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <Badge tone="green">安全可信提示</Badge>
            <h2 className="mt-3 text-xl font-black text-campus-ink">实名诚信、联系方式脱敏、互助留痕</h2>
            <p className="mt-2 text-sm leading-6 text-campus-muted">平台默认隐藏联系方式，申请后才显示脱敏信息；所有互助记录进入个人中心，便于双方追踪进度与确认结果。</p>
          </div>
          <img src="/mock-images/umbrella.svg" alt="安全提示" className="h-28 w-40 rounded-2xl object-cover" />
        </div>
      </Card>
    </div>
  );
}
