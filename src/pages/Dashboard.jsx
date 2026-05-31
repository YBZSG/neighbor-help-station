import {
  BellRing,
  BookOpen,
  ClipboardList,
  Heart,
  HeartPulse,
  LockKeyhole,
  MapPin,
  Megaphone,
  PackageOpen,
  PhoneCall,
  RefreshCw,
  ShieldCheck,
  Siren,
  Trophy,
  Users
} from "lucide-react";
import { useState } from "react";
import { useGsapReveal } from "../hooks/useGsapReveal";
import { mockRankList } from "../data/mockUser";
import HeroSection from "../components/dashboard/HeroSection";
import StatCard from "../components/dashboard/StatCard";
import Card from "../components/common/Card";
import Badge from "../components/common/Badge";
import Button from "../components/common/Button";
import Modal from "../components/common/Modal";

const activityTone = {
  求助互助: "blue",
  物品共享: "green",
  志愿服务: "orange",
  资料共享: "blue",
  互助完成: "green"
};

function SectionHeader({ title, action, onAction }) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <h2 className="text-lg font-black text-campus-ink">{title}</h2>
      {action ? (
        <button type="button" onClick={onAction} className="text-xs font-bold text-campus-muted transition hover:text-campus-green">
          {action}
        </button>
      ) : null}
    </div>
  );
}

function LatestActivity({ onNavigate }) {
  const activities = [
    { id: 1, name: "李同学", title: "发布了求助：需要一把雨伞", tag: "求助互助", time: "10 分钟前" },
    { id: 2, name: "王小明", title: "分享了物品：九成新书桌", tag: "物品共享", time: "35 分钟前" },
    { id: 3, name: "阳光志愿队", title: "发布了活动：周末社区清洁日", tag: "志愿服务", time: "1 小时前" },
    { id: 4, name: "社区图书馆", title: "上传了资料：垃圾分类指南", tag: "资料共享", time: "2 小时前" },
    { id: 5, name: "赵奶奶", title: "完成了求助：陪同就医", tag: "互助完成", time: "3 小时前" }
  ];

  return (
    <Card className="gsap-reveal">
      <SectionHeader title="最新动态" action="查看全部" onAction={() => onNavigate("help")} />
      <div className="space-y-1">
        {activities.map((item) => (
          <div key={item.id} className="flex items-center gap-3 rounded-2xl px-3 py-2.5 transition hover:bg-slate-50">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-campus-greenSoft text-xs font-black text-campus-green">
              {item.name.slice(0, 1)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-campus-ink">{item.name} {item.title}</p>
              <Badge tone={activityTone[item.tag]} className="mt-1">{item.tag}</Badge>
            </div>
            <span className="text-xs font-semibold text-campus-muted">{item.time}</span>
          </div>
        ))}
      </div>
      <button type="button" className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-100 bg-white py-2.5 text-sm font-bold text-campus-muted transition hover:border-campus-green hover:text-campus-green">
        <RefreshCw size={16} />
        刷新动态
      </button>
    </Card>
  );
}

function HotItems({ items, onNavigate }) {
  return (
    <Card className="gsap-reveal">
      <SectionHeader title="热门物品" action="查看全部" onAction={() => onNavigate("items")} />
      <div className="space-y-3">
        {items.slice(0, 4).map((item, index) => (
          <div key={item.id} className="grid grid-cols-[88px_1fr_auto] items-center gap-3 rounded-2xl p-2 transition hover:bg-slate-50">
            <img src={item.image} alt={item.name} className="h-16 w-22 rounded-xl object-cover" />
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="truncate text-sm font-black text-campus-ink">{item.name}</p>
                <Badge tone={index === 0 ? "green" : "orange"}>{item.condition}</Badge>
              </div>
              <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-campus-muted">
                <MapPin size={13} />
                {item.area} · {item.owner}
              </p>
              <p className="mt-1 text-xs text-campus-muted">{index + 2} 小时前</p>
            </div>
            <div className="text-right">
              <p className="mb-2 flex items-center justify-end gap-1 text-xs font-semibold text-campus-muted">
                <Heart size={14} />
                {24 - index * 5}
              </p>
              <button type="button" onClick={() => onNavigate("items")} className="rounded-xl bg-campus-greenSoft px-3 py-1.5 text-sm font-black text-campus-green">
                申请
              </button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function VolunteerRank({ onNavigate }) {
  const tags = ["志愿达人", "热心伙伴", "乐于助人", "公益之星"];
  return (
    <Card className="gsap-reveal">
      <SectionHeader title="本月志愿者榜" action="查看全部" onAction={() => onNavigate("volunteer")} />
      <div className="space-y-3">
        {mockRankList.map((user, index) => (
          <div key={user.name} className="flex items-center gap-3 rounded-2xl px-2 py-2 transition hover:bg-slate-50">
            <div className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-black ${index === 0 ? "bg-campus-orangeSoft text-amber-700" : "bg-slate-100 text-campus-muted"}`}>
              {index < 3 ? <Trophy size={17} /> : index + 1}
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-campus-blueSoft text-sm font-black text-campus-blue">{user.name.slice(0, 1)}</div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-campus-ink">{user.name}</p>
              <p className="text-xs text-campus-muted">服务时长 {48 - index * 8} 小时</p>
            </div>
            <div className="text-right">
              <Badge tone={index === 0 ? "red" : index === 1 ? "orange" : "blue"}>{tags[index]}</Badge>
              <p className="mt-1 text-sm font-black text-campus-ink">{user.points} 积分</p>
            </div>
          </div>
        ))}
      </div>
      <Button variant="ghost" className="mt-4 w-full" icon={HeartPulse} onClick={() => onNavigate("volunteer")}>
        成为志愿者
      </Button>
    </Card>
  );
}

function EmergencyActionModal({ action, onClose }) {
  const configs = {
    alarm: {
      title: "一键报警",
      status: "已报警",
      tone: "text-red-600",
      icon: Siren,
      desc: "系统已记录当前位置并生成应急编号，社区值守人员会尽快跟进。",
      detail: "应急编号：NH-110-2026 · 响应队列：紧急"
    },
    medical: {
      title: "医疗急救",
      status: "已呼叫急救",
      tone: "text-red-600",
      icon: HeartPulse,
      desc: "已同步校医务室值班端，请保持电话畅通，并在安全位置等待帮助。",
      detail: "校医务室：025-8899 1200 · 建议同时联系辅导员"
    },
    grid: {
      title: "联系网格员",
      status: "已通知网格员",
      tone: "text-campus-green",
      icon: Users,
      desc: "网格员会根据你所在区域进行电话确认或到场协助。",
      detail: "值班网格员：陈老师 · 联系方式：138****8901"
    }
  };

  if (!action) return null;
  const config = configs[action];
  const Icon = config.icon;

  return (
    <Modal open={Boolean(action)} title={config.title} onClose={onClose}>
      <div className="text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-red-50 text-red-500">
          <Icon size={38} />
        </div>
        <h3 className={`mt-5 text-3xl font-black ${config.tone}`}>{config.status}</h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-campus-muted">{config.desc}</p>
        <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm font-bold text-campus-ink">{config.detail}</div>
        <div className="mt-6 flex justify-center gap-3">
          <Button onClick={onClose}>我知道了</Button>
          <Button variant="ghost" onClick={onClose}>稍后查看记录</Button>
        </div>
      </div>
    </Modal>
  );
}

function EmergencyStrip({ onEmergencyAction }) {
  const actions = [
    { label: "一键报警", icon: Siren, action: "alarm" },
    { label: "医疗急救", icon: HeartPulse, action: "medical" },
    { label: "联系网格员", icon: Users, action: "grid" }
  ];

  return (
    <Card className="gsap-reveal border-red-100 bg-red-50/70">
      <div className="grid items-center gap-4 lg:grid-cols-[1fr_auto]">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-red-500">
            <Siren size={28} />
          </div>
          <div>
            <h2 className="text-xl font-black text-red-600">紧急情况 · 立即求助</h2>
            <p className="mt-1 text-sm text-red-500/80">如遇紧急情况，请立即求助，我们会尽快响应。</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                type="button"
                onClick={() => onEmergencyAction(action.action)}
                className="flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-black text-campus-ink shadow-sm transition hover:-translate-y-0.5 hover:text-red-500"
              >
                <Icon size={18} className="text-red-500" />
                {action.label}
              </button>
            );
          })}
        </div>
      </div>
    </Card>
  );
}

function ConvenienceServices({ onNavigate }) {
  const services = [
    { label: "社区公告", icon: Megaphone, route: "rules", tone: "text-campus-green" },
    { label: "便民电话", icon: PhoneCall, route: "help", tone: "text-campus-blue" },
    { label: "失物招领", icon: LockKeyhole, route: "emergency", tone: "text-campus-orange" },
    { label: "意见建议", icon: ClipboardList, route: "profile", tone: "text-campus-green" }
  ];

  return (
    <Card className="gsap-reveal">
      <SectionHeader title="便民服务" />
      <div className="grid grid-cols-4 gap-2">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <button key={service.label} type="button" onClick={() => onNavigate(service.route)} className="rounded-2xl p-3 text-center transition hover:bg-slate-50">
              <Icon className={`mx-auto ${service.tone}`} size={25} />
              <p className="mt-2 text-xs font-bold text-campus-muted">{service.label}</p>
            </button>
          );
        })}
      </div>
    </Card>
  );
}

export default function Dashboard({ state, onNavigate }) {
  const [emergencyAction, setEmergencyAction] = useState(null);
  const scope = useGsapReveal([state.items.length, state.materials.length, state.help.length, state.volunteer.length]);
  const helpCount = state.help.filter((item) => item.status !== "已完成").length;
  const volunteerHours = state.volunteer.reduce((sum, item) => sum + Math.round(item.current * item.hours), 0);

  return (
    <div ref={scope} className="page-shell space-y-5">
      <HeroSection onNavigate={onNavigate} />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="社区成员" value={2845} icon={Users} onClick={() => onNavigate("profile")} />
        <StatCard label="物品共享" value={state.items.length * 60 + 2} icon={PackageOpen} tone="blue" onClick={() => onNavigate("items")} />
        <StatCard label="互助求助" value={helpCount * 42 + 8} icon={HeartPulse} tone="orange" onClick={() => onNavigate("help")} />
        <StatCard label="志愿服务时长" value={volunteerHours || 1256} icon={Heart} tone="orange" onClick={() => onNavigate("volunteer")} />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.1fr_1fr_.9fr]">
        <LatestActivity onNavigate={onNavigate} />
        <HotItems items={state.items} onNavigate={onNavigate} />
        <div className="space-y-5">
          <VolunteerRank onNavigate={onNavigate} />
          <ConvenienceServices onNavigate={onNavigate} />
        </div>
      </div>

      <EmergencyStrip onEmergencyAction={setEmergencyAction} />

      <Card className="gsap-reveal">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <Badge tone="green">安全可信提示</Badge>
            <h2 className="mt-3 text-xl font-black text-campus-ink">实名诚信、联系方式脱敏、互助记录留痕</h2>
            <p className="mt-2 text-sm leading-6 text-campus-muted">平台默认隐藏联系方式，申请后才显示脱敏信息；所有互助记录进入个人中心，便于双方追踪进度与确认结果。</p>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="rounded-2xl bg-campus-greenSoft p-3 text-campus-green">
              <ShieldCheck className="mx-auto mb-1" size={22} />
              <p className="text-xs font-bold">实名认证</p>
            </div>
            <div className="rounded-2xl bg-campus-blueSoft p-3 text-campus-blue">
              <BookOpen className="mx-auto mb-1" size={22} />
              <p className="text-xs font-bold">记录可查</p>
            </div>
            <div className="rounded-2xl bg-campus-orangeSoft p-3 text-amber-700">
              <BellRing className="mx-auto mb-1" size={22} />
              <p className="text-xs font-bold">及时提醒</p>
            </div>
          </div>
        </div>
      </Card>
      <EmergencyActionModal action={emergencyAction} onClose={() => setEmergencyAction(null)} />
    </div>
  );
}
