import { useRef, useState } from "react";
import { Building2, HeartHandshake } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../animations/gsapSetup";
import { routes } from "../constants/routes";
import Modal from "../components/common/Modal";
import Button from "../components/common/Button";

export default function Sidebar({ current, onNavigate }) {
  const scope = useRef(null);
  const [aboutOpen, setAboutOpen] = useState(false);

  useGSAP(
    () => {
      gsap.fromTo(".active-indicator", { scaleY: 0.5, autoAlpha: 0 }, { scaleY: 1, autoAlpha: 1, duration: 0.25, ease: "power2.out" });
    },
    { scope, dependencies: [current], revertOnUpdate: true }
  );

  return (
    <aside ref={scope} className="fixed left-0 top-0 z-30 hidden h-screen w-64 border-r border-white/80 bg-white/90 p-5 shadow-soft backdrop-blur xl:block">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-campus-green text-white">
          <HeartHandshake size={23} />
        </div>
        <div>
          <p className="text-lg font-black text-campus-ink">邻里互助站</p>
          <p className="text-xs font-semibold text-campus-muted">互帮互助 · 温暖邻里</p>
        </div>
      </div>

      <nav className="space-y-2">
        {routes.map((route) => {
          const Icon = route.icon;
          const active = current === route.key || (current === "search" && route.key === "dashboard");
          return (
            <button
              key={route.key}
              onClick={() => onNavigate(route.key)}
              className={`relative flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition ${
                active ? "bg-campus-greenSoft text-campus-green" : "text-campus-muted hover:bg-slate-50 hover:text-campus-ink"
              }`}
            >
              {active ? <span className="active-indicator absolute left-0 h-7 w-1 rounded-r-full bg-campus-green" /> : null}
              <Icon size={19} strokeWidth={2.25} />
              {route.label}
            </button>
          );
        })}
      </nav>

      <div className="absolute bottom-5 left-5 right-5 overflow-hidden rounded-2xl bg-gradient-to-br from-campus-greenSoft to-campus-blueSoft p-4">
        <Building2 className="mb-3 text-campus-green" size={26} />
        <p className="text-sm font-black text-campus-ink">共建友善校园</p>
        <p className="mt-1 text-xs leading-5 text-campus-muted">从一次借伞、一本书、一小时志愿开始。</p>
        <button type="button" onClick={() => setAboutOpen(true)} className="mt-3 rounded-xl bg-white px-3 py-1.5 text-xs font-bold text-campus-green shadow-sm">
          了解更多
        </button>
      </div>
      <Modal open={aboutOpen} title="共建友善校园" onClose={() => setAboutOpen(false)}>
        <div className="space-y-4">
          <p className="text-sm leading-7 text-campus-muted">
            邻里互助站把闲置物品、学习资料、临时求助和公益服务集中在一个入口里，让同学之间的帮助更容易被看见、被响应、被记录。
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {["共享闲置", "响应求助", "参与志愿"].map((item) => (
              <div key={item} className="rounded-2xl bg-campus-greenSoft p-4 text-center text-sm font-black text-campus-green">
                {item}
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <Button onClick={() => setAboutOpen(false)}>知道了</Button>
          </div>
        </div>
      </Modal>
    </aside>
  );
}
