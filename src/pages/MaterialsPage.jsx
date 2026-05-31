import { useState } from "react";
import { Plus } from "lucide-react";
import { useFilteredList } from "../hooks/useFilteredList";
import { useGsapReveal } from "../hooks/useGsapReveal";
import Button from "../components/common/Button";
import EmptyState from "../components/common/EmptyState";
import Modal from "../components/common/Modal";
import MaterialCard from "../components/materials/MaterialCard";
import MaterialFilters from "../components/materials/MaterialFilters";
import MaterialForm from "../components/materials/MaterialForm";

export default function MaterialsPage({ materials, favorites, onFavorite, onApply, onAddMaterial }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("全部");
  const filtered = useFilteredList(materials, { query, category, keys: ["title", "description", "uploader", "category"] });
  const scope = useGsapReveal([filtered.length, query, category, favorites.length]);

  return (
    <div ref={scope} className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <MaterialFilters query={query} setQuery={setQuery} category={category} setCategory={setCategory} />
        <Button icon={Plus} onClick={() => setOpen(true)}>发布学习资料</Button>
      </div>
      {filtered.length ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{filtered.map((material) => <MaterialCard key={material.id} material={material} favorite={favorites.includes(material.id)} onFavorite={onFavorite} onApply={onApply} />)}</div>
      ) : <EmptyState title="没有找到匹配资料" />}
      <Modal open={open} title="发布学习资料" onClose={() => setOpen(false)}>
        <MaterialForm onSubmit={(data, error) => { if (onAddMaterial(data, error)) setOpen(false); }} />
      </Modal>
    </div>
  );
}
