import { Activity, BarChart3, Clock3, MapPin, RadioTower, UsersRound } from "lucide-react";
import { useMemo, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../animations/gsapSetup";
import Card from "../components/common/Card";
import Badge from "../components/common/Badge";
import CampusThreeMap from "../components/datav/CampusThreeMap";

const zoneMap = {
  南苑: "宿舍区",
  北苑: "宿舍区",
  图书馆: "图书馆",
  学生中心: "服务站",
  教学楼: "教学楼",
  体育馆: "运动场"
};

const zoneProfiles = {
  全部校区: [
    { name: "宿舍区", score: 74, status: "借物和生活求助较多" },
    { name: "教学楼", score: 68, status: "打印和咨询较集中" },
    { name: "图书馆", score: 82, status: "资料共享最活跃" },
    { name: "服务站", score: 90, status: "响应和报名集中" },
    { name: "运动场", score: 42, status: "活动报名平稳" }
  ],
  宿舍区: [
    { name: "宿舍区", score: 95, status: "当前选中区域" },
    { name: "教学楼", score: 38, status: "关联求助较少" },
    { name: "图书馆", score: 34, status: "资料申请较少" },
    { name: "服务站", score: 52, status: "可协调响应" },
    { name: "运动场", score: 24, status: "活动记录较少" }
  ],
  教学楼: [
    { name: "宿舍区", score: 35, status: "借物需求较少" },
    { name: "教学楼", score: 92, status: "当前选中区域" },
    { name: "图书馆", score: 58, status: "资料申请联动" },
    { name: "服务站", score: 45, status: "等待服务响应" },
    { name: "运动场", score: 22, status: "活动记录较少" }
  ],
  图书馆: [
    { name: "宿舍区", score: 30, status: "生活求助较少" },
    { name: "教学楼", score: 54, status: "课程资料联动" },
    { name: "图书馆", score: 96, status: "当前选中区域" },
    { name: "服务站", score: 48, status: "可协助借还" },
    { name: "运动场", score: 18, status: "活动记录较少" }
  ],
  服务站: [
    { name: "宿舍区", score: 50, status: "待协调借物" },
    { name: "教学楼", score: 42, status: "咨询转接中" },
    { name: "图书馆", score: 46, status: "资料服务联动" },
    { name: "服务站", score: 98, status: "当前选中区域" },
    { name: "运动场", score: 36, status: "活动报名对接" }
  ],
  运动场: [
    { name: "宿舍区", score: 28, status: "借物需求较少" },
    { name: "教学楼", score: 26, status: "求助较少" },
    { name: "图书馆", score: 20, status: "资料记录较少" },
    { name: "服务站", score: 44, status: "志愿协调中" },
    { name: "运动场", score: 90, status: "当前选中区域" }
  ]
};

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
  const selectedZone = zoneMap[region] || region || "全部校区";
  const metrics = useMemo(() => {
    const itemCount = state.items.length;
    const materialCount = state.materials.length;
    const helpCount = state.help.length + state.emergency.length;
    const volunteerHours = state.volunteer.reduce((sum, item) => sum + item.current * item.hours, 0);
    const responseCount = state.help.filter((item) => item.status !== "待响应").length + state.emergency.filter((item) => item.status !== "待响应").length;
    return { itemCount, materialCount, helpCount, volunteerHours, responseCount };
  }, [state]);

  const zoneStats = useMemo(() => {
    const base = zoneProfiles[selectedZone] || zoneProfiles["全部校区"];
    const activityBoost = Math.min(18, metrics.itemCount * 2 + metrics.materialCount + metrics.helpCount * 3);
    return base.map((item) => ({
      ...item,
      score: Math.min(100, item.score + (item.name === selectedZone ? activityBoost : Math.round(activityBoost / 5)))
    }));
  }, [selectedZone, metrics.itemCount, metrics.materialCount, metrics.helpCount]);

  const activity = [
    { text: `${region} 有新的互助记录`, time: "刚刚" },
    { text: `${selectedZone} 服务点活跃度已更新`, time: "8 分钟前" },
    { text: "资料收藏和求助响应已同步", time: "21 分钟前" },
    { text: "志愿报名数据已写入看板", time: "35 分钟前" }
  ];

  useGSAP(
    () => {
      gsap.fromTo(".gsap-reveal", { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, stagger: 0.06, duration: 0.5, ease: "power2.out" });
      gsap.fromTo(".signal-line", { scaleX: 0, transformOrigin: "left center" }, { scaleX: 1, stagger: 0.08, duration: 0.55, ease: "power2.out" });
    },
    { scope, dependencies: [region, metrics.itemCount, metrics.materialCount, metrics.helpCount, metrics.volunteerHours], revertOnUpdate: true }
  );

  return (
    <div ref={scope} className="page-shell space-y-5">
      <section className="gsap-reveal overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-r from-campus-green to-emerald-500 p-6 text-white shadow-soft">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Badge className="bg-white/20 text-white">数据大屏</Badge>
            <h2 className="mt-4 text-3xl font-black tracking-normal md:text-4xl">校园互助数据看板</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/85">
              把物品共享、资料申请、生活求助和志愿服务汇总到一张图里，快速看出哪里更活跃、哪里需要响应。
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
          <CampusThreeMap intensity={Math.max(1, metrics.helpCount / 4)} zoneStats={zoneStats} selectedZone={selectedZone} />
        </Card>

        <div className="space-y-5">
          <Card className="gsap-reveal">
            <div className="flex items-center justify-between">
              <div>
              <p className="text-lg font-black text-campus-ink">区域活跃度</p>
                <p className="mt-1 text-sm text-campus-muted">对应左侧分布图里的校园区域</p>
              </div>
              <MapPin className="text-campus-green" size={22} />
            </div>
            <div className="mt-5 space-y-4">
              {zoneStats.map((point) => (
                <div key={point.name}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-black text-campus-ink">{point.name}</span>
                    <span className="font-bold text-campus-muted">{point.status}</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div className="signal-line h-full rounded-full bg-campus-green" style={{ width: `${point.score}%` }} />
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
