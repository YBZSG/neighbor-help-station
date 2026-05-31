import { useState } from "react";
import { Plus } from "lucide-react";
import { useFilteredList } from "../hooks/useFilteredList";
import { useGsapReveal } from "../hooks/useGsapReveal";
import { urgencyLevels } from "../constants/categories";
import Button from "../components/common/Button";
import EmptyState from "../components/common/EmptyState";
import Modal from "../components/common/Modal";
import SearchBar from "../components/common/SearchBar";
import Select from "../components/common/Select";
import EmergencyCard from "../components/emergency/EmergencyCard";
import EmergencyForm from "../components/emergency/EmergencyForm";

export default function EmergencyPage({ emergency, onAddEmergency }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [urgency, setUrgency] = useState("全部");
  const filtered = useFilteredList(emergency, { query, category: urgency, keys: ["title", "content", "type", "place", "urgency"] });
  const scope = useGsapReveal([filtered.length, query, urgency]);

  return (
    <div ref={scope} className="space-y-5">
      <div className="grid gap-3 md:grid-cols-[1fr_180px_auto]">
        <SearchBar value={query} onChange={setQuery} placeholder="搜索临时求助、地点、类型" />
        <Select value={urgency} onChange={(e) => setUrgency(e.target.value)} options={["全部", ...urgencyLevels]} />
        <Button icon={Plus} onClick={() => setOpen(true)}>发布临时求助</Button>
      </div>
      {filtered.length ? <div className="grid gap-5 lg:grid-cols-2">{filtered.map((item) => <EmergencyCard key={item.id} item={item} />)}</div> : <EmptyState title="暂无临时求助" />}
      <Modal open={open} title="发布临时求助" onClose={() => setOpen(false)}>
        <EmergencyForm onSubmit={(data, error) => { if (onAddEmergency(data, error)) setOpen(false); }} />
      </Modal>
    </div>
  );
}
