import { Download, Heart } from "lucide-react";
import Badge from "../common/Badge";
import Button from "../common/Button";
import Card from "../common/Card";

export default function MaterialCard({ material, favorite, onFavorite, onApply }) {
  return (
    <Card className="gsap-reveal flex h-full flex-col">
      <div className="flex items-start justify-between gap-3">
        <div>
          <Badge tone="blue">{material.category}</Badge>
          <h3 className="mt-3 text-lg font-black text-campus-ink">{material.title}</h3>
        </div>
        <button
          onClick={() => onFavorite(material.id)}
          className={`rounded-2xl p-2 transition ${favorite ? "bg-red-50 text-red-500" : "bg-slate-50 text-slate-400 hover:text-red-500"}`}
          aria-label="收藏"
        >
          <Heart size={19} fill={favorite ? "currentColor" : "none"} />
        </button>
      </div>
      <p className="mt-3 flex-1 text-sm leading-6 text-campus-muted">{material.description}</p>
      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 text-sm">
        <span className="font-semibold text-campus-muted">{material.uploader} · {material.type} · {material.count} 次</span>
        <Button variant="secondary" icon={Download} onClick={() => onApply(material)}>申请获取</Button>
      </div>
    </Card>
  );
}
