import { BookMarked, HandHeart, Heart, Send, Trophy } from "lucide-react";
import { useGsapReveal } from "../hooks/useGsapReveal";
import { mockUser } from "../data/mockUser";
import Card from "../components/common/Card";
import CreditPanel from "../components/profile/CreditPanel";
import MyApplications from "../components/profile/MyApplications";
import MyPosts from "../components/profile/MyPosts";
import ProfileHeader from "../components/profile/ProfileHeader";

function MiniStat({ label, value, icon: Icon }) {
  return (
    <Card className="gsap-reveal">
      <Icon className="mb-3 text-campus-green" size={22} />
      <p className="text-2xl font-black text-campus-ink">{value}</p>
      <p className="text-sm font-semibold text-campus-muted">{label}</p>
    </Card>
  );
}

export default function ProfilePage({ items, help, favorites, applications }) {
  const user = { ...mockUser, favorites: favorites.length, posted: items.length + help.length };
  const scope = useGsapReveal([favorites.length, applications.length]);

  return (
    <div ref={scope} className="space-y-5">
      <ProfileHeader user={user} />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        <CreditPanel user={user} />
        <MiniStat label="互助积分" value={user.points} icon={Trophy} />
        <MiniStat label="已发布数量" value={user.posted} icon={Send} />
        <MiniStat label="已帮助次数" value={user.helped} icon={HandHeart} />
        <MiniStat label="收藏数量" value={user.favorites} icon={Heart} />
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <MyApplications applications={applications} />
        <MyPosts items={items} help={help} />
      </div>
      <Card className="gsap-reveal">
        <div className="flex items-center gap-3">
          <BookMarked className="text-campus-blue" />
          <p className="text-sm font-semibold text-campus-muted">联系方式默认隐藏，学号和手机号仅展示必要信息，减少不必要的隐私暴露。</p>
        </div>
      </Card>
    </div>
  );
}
