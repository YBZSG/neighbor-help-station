import Card from "../common/Card";

export default function RankList({ list }) {
  return (
    <Card>
      <h2 className="mb-4 text-lg font-black text-campus-ink">互助积分排行榜</h2>
      <div className="space-y-3">
        {list.map((user, index) => (
          <div key={user.name} className="gsap-reveal flex items-center gap-3">
            <div className={`flex h-9 w-9 items-center justify-center rounded-2xl text-sm font-black ${index === 0 ? "bg-campus-orange text-white" : "bg-campus-greenSoft text-campus-green"}`}>
              {index + 1}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-campus-ink">{user.name}</p>
              <p className="truncate text-xs text-campus-muted">{user.college}</p>
            </div>
            <p className="text-sm font-black text-campus-green">{user.points}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
