import { ShieldCheck } from "lucide-react";
import { creditLevel } from "../../utils/score";
import Card from "../common/Card";
import ProgressBar from "../common/ProgressBar";

export default function CreditPanel({ user }) {
  return (
    <Card className="gsap-reveal">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-campus-greenSoft p-3 text-campus-green">
          <ShieldCheck size={24} />
        </div>
        <div>
          <p className="text-sm font-semibold text-campus-muted">诚信分</p>
          <p className="text-3xl font-black text-campus-ink">{user.credit}</p>
        </div>
      </div>
      <div className="mt-5">
        <ProgressBar value={user.credit} />
        <p className="mt-2 text-sm font-bold text-campus-green">信用等级：{creditLevel(user.credit)}</p>
      </div>
    </Card>
  );
}
