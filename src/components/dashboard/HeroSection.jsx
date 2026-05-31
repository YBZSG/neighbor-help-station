import { useRef } from "react";
import { PlusCircle, ShieldCheck } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../../animations/gsapSetup";
import Button from "../common/Button";

export default function HeroSection({ onNavigate }) {
  const scope = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { duration: 0.55, ease: "power2.out" } });
      tl.from(".hero-title", { autoAlpha: 0, y: 22 })
        .from(".hero-copy", { autoAlpha: 0, y: 14 }, "<0.08")
        .from(".hero-action", { autoAlpha: 0, y: 12, stagger: 0.06 }, "<0.1");
      gsap.to(".floating-soft", { y: -8, rotation: 1.5, repeat: -1, yoyo: true, duration: 2.6, ease: "sine.inOut" });
    },
    { scope }
  );

  return (
    <section ref={scope} className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-soft md:p-8">
      <div className="absolute right-4 top-4 hidden h-24 w-24 rounded-full bg-campus-greenSoft md:block" />
      <div className="grid items-center gap-6 md:grid-cols-[1.4fr_.8fr]">
        <div>
          <h2 className="hero-title text-3xl font-black leading-tight text-campus-ink md:text-5xl">让闲置流动起来，让校园更有温度。</h2>
          <p className="hero-copy mt-4 max-w-2xl text-base leading-8 text-campus-muted">
            聚合同学之间的物品共享、学习资料、生活互助、临时求助和公益招募，用实名诚信和隐私脱敏守护每一次善意连接。
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button className="hero-action" icon={PlusCircle} onClick={() => onNavigate("help")}>发布需求</Button>
            <Button className="hero-action" variant="secondary" icon={ShieldCheck} onClick={() => onNavigate("items")}>登记物品</Button>
          </div>
        </div>
        <div className="floating-soft relative mx-auto w-full max-w-md">
          <img src="/mock-images/hero-community-simple.svg" alt="校园互助服务插画" className="aspect-[16/10] w-full rounded-2xl object-cover shadow-lift" />
        </div>
      </div>
    </section>
  );
}
