import { AlertTriangle, BadgeCheck, BellRing, EyeOff, FileClock, RotateCcw, ShieldCheck, UserCheck } from "lucide-react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../animations/gsapSetup";
import { setupScrollReveal } from "../animations/scrollAnimations";
import Card from "../components/common/Card";

const rules = [
  { icon: UserCheck, title: "实名认证", text: "学生身份审核后才能发布、申请和报名。" },
  { icon: BadgeCheck, title: "诚信积分", text: "按时归还、完成互助会提升积分，违约会扣分。" },
  { icon: AlertTriangle, title: "违规举报", text: "支持对失约、虚假信息、危险交易进行举报。" },
  { icon: ShieldCheck, title: "安全交易", text: "建议在公共区域交接，重要物品保留记录。" },
  { icon: BellRing, title: "物品归还提醒", text: "租借物品会生成归还提醒和留痕记录。" },
  { icon: EyeOff, title: "联系方式脱敏", text: "默认隐藏联系方式，申请后仅显示脱敏信息。" },
  { icon: RotateCcw, title: "学号隐私保护", text: "学号中间位自动打码，避免隐私泄露。" },
  { icon: FileClock, title: "求助记录留痕", text: "互助、报名、申请会进入个人中心便于追踪。" }
];

export default function RulesPage() {
  const scope = useRef(null);

  useGSAP(() => setupScrollReveal(".rule-card", scope.current), { scope });

  return (
    <div ref={scope} className="space-y-5">
      <Card>
        <h2 className="text-2xl font-black text-campus-ink">安全与诚信规则</h2>
        <p className="mt-2 text-sm leading-6 text-campus-muted">平台围绕实名、诚信、隐私和留痕设计，适合在答辩中说明系统的社会价值与风险控制。</p>
      </Card>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {rules.map((rule) => {
          const Icon = rule.icon;
          return (
            <Card key={rule.title} className="rule-card group">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-campus-greenSoft text-campus-green transition group-hover:scale-105">
                <Icon size={23} />
              </div>
              <h3 className="text-lg font-black text-campus-ink">{rule.title}</h3>
              <p className="mt-2 text-sm leading-6 text-campus-muted">{rule.text}</p>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
