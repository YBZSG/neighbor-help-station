import { Activity, BarChart3, Clock3, MapPin, RadioTower, UsersRound } from "lucide-react";
import { useMemo, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../animations/gsapSetup";
import Card from "../components/common/Card";
import Badge from "../components/common/Badge";
import CampusThreeMap from "../components/datav/CampusThreeMap";

function StatTile({ icon: Icon, label, value, note, tone = "green" }) {
  const colors = {
    green: "bg-campus-greenSoft text-campus-green",
    blue: "bg-campus-blueSoft text-campus-blue",
    orange: "bg-campus-orangeSoft text-amber-700",
    red: "bg-red-50 text-red-600"
  };

  return (
    <Card className="gsap-reveal p-4">
      <div className="flex items-center gap-3">
        <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${colors[tone]}`}>
          <Icon size={21} />
        </div>
        <div>
          <p className="text-xs font-bold text-campus-muted">{label}</p>
          <p className="mt-1 text-2xl font-black text-campus-ink">{value}</p>
        </div>
      </div>
      <p className="mt-3 text-xs font-semibold text-campus-muted">{note}</p>
    </Card>
  );
}

export default function DataScreenPage({ state, region }) {
  const scope = useRef(null);
  const metrics = useMemo(() => {
    const itemCount = state.items.length;
    const materialCount = state.materials.length;
    const helpCount = state.help.length + state.emergency.length;
    const volunteerHours = state.volunteer.reduce((sum, item) => sum + item.current * item.hours, 0);
    const responseCount = state.help.filter((item) => item.status !== "待响应").length + state.emergency.filter((item) => item.status !== "待响应").length;
    return { itemCount, materialCount, helpCount, volunteerHours, responseCount };
  }, [state]);

  const servicePoints = [
    { name: "宿舍区服务点", value: metrics.itemCount + 8, status: "物品流转活跃" },
    { name: "图书馆共享角", value: metrics.materialCount + 12, status: "资料申请集中" },
    { name: "综合楼互助台", value: metrics.helpCount + 6, status: "求助响应在线" }
  ];

  const activity = [
    { text: "雨伞借用已匹配", time: "刚刚" },
    { text: "图书馆整理活动新增报名", time: "8 分钟前" },
    { text: "程序设计资料被收藏", time: "21 分钟前" },
    { text: "宿舍区充电器求助已响应", time: "35 分钟前" }
  ];

  useGSAP(
    () => {
      gsap.fromTo(".gsap-reveal", { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, stagger: 0.06, duration: 0.5, ease: "power2.out" });
      gsap.fromTo(".signal-line", { scaleX: 0, transformOrigin: "left center" }, { scaleX: 1, stagger: 0.08, duration: 0.55, ease: "power2.out" });
    },
    { scope, dependencies: [metrics.itemCount, metrics.materialCount, metrics.helpCount, metrics.volunteerHours], revertOnUpdate: true }
  );

  return (
    <div ref={scope} className="page-shell space-y-5">
      <section className="gsap-reveal overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-r from-campus-green to-emerald-500 p-6 text-white shadow-soft">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Badge className="bg-white/20 text-white">数据大屏</Badge>
            <h2 className="mt-4 text-3xl font-black tracking-normal md:text-4xl">校园互助服务态势</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/85">
              把物品共享、资料申请、生活求助和志愿服务汇总成一张实时看板，方便快速了解当前社区运行情况。
            </p>
          </div>
          <div className="rounded-2xl bg-white/15 px-5 py-4 backdrop-blur">
            <p className="text-xs font-bold text-white/75">当前区域</p>
            <p className="mt-1 text-xl font-black">{region}</p>
          </div>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile icon={BarChart3} label="物品共享" value={metrics.itemCount} note="正在流转的闲置物品" />
        <StatTile icon={Activity} label="资料共享" value={metrics.materialCount} note="可申请的学习资料" tone="blue" />
        <StatTile icon={RadioTower} label="求助信号" value={metrics.helpCount} note={`${metrics.responseCount} 条已有响应`} tone="orange" />
        <StatTile icon={Clock3} label="志愿时长" value={metrics.volunteerHours} note="累计服务小时" tone="red" />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <Card className="gsap-reveal p-4">
          <CampusThreeMap intensity={Math.max(1, metrics.helpCount / 4)} />
        </Card>

        <div className="space-y-5">
          <Card className="gsap-reveal">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-black text-campus-ink">服务点热度</p>
                <p className="mt-1 text-sm text-campus-muted">按近期共享和求助记录估算</p>
              </div>
              <MapPin className="text-campus-green" size={22} />
            </div>
            <div className="mt-5 space-y-4">
              {servicePoints.map((point, index) => (
                <div key={point.name}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-black text-campus-ink">{point.name}</span>
                    <span className="font-bold text-campus-muted">{point.status}</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div className="signal-line h-full rounded-full bg-campus-green" style={{ width: `${Math.min(96, 42 + point.value * 3 + index * 5)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="gsap-reveal">
            <div className="flex items-center justify-between">
              <p className="text-lg font-black text-campus-ink">实时动态</p>
              <UsersRound className="text-campus-blue" size={22} />
            </div>
            <div className="mt-4 divide-y divide-slate-100">
              {activity.map((item) => (
                <div key={item.text} className="flex items-center justify-between gap-4 py-3 text-sm">
                  <span className="font-bold text-campus-ink">{item.text}</span>
                  <span className="shrink-0 text-xs font-semibold text-campus-muted">{item.time}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
