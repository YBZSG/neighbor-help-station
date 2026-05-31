import { useRef } from "react";
import { HeartHandshake } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../animations/gsapSetup";
import { routes } from "../constants/routes";

export default function Sidebar({ current, onNavigate }) {
  const scope = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(".active-indicator", { scaleY: 0.5, autoAlpha: 0 }, { scaleY: 1, autoAlpha: 1, duration: 0.25, ease: "power2.out" });
    },
    { scope, dependencies: [current], revertOnUpdate: true }
  );

  return (
    <aside ref={scope} className="fixed left-0 top-0 z-30 hidden h-screen w-64 border-r border-white/80 bg-white/85 p-5 shadow-soft backdrop-blur xl:block">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-campus-green text-white">
          <HeartHandshake size={23} />
        </div>
        <div>
          <p className="text-lg font-black text-campus-ink">邻里互助站</p>
          <p className="text-xs font-semibold text-campus-muted">校园公益服务台</p>
        </div>
      </div>
      <nav className="space-y-2">
        {routes.map((route) => {
          const Icon = route.icon;
          const active = current === route.key;
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
    </aside>
  );
}
