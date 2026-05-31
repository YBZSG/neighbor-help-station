import { useState } from "react";
import { Plus } from "lucide-react";
import { useFilteredList } from "../hooks/useFilteredList";
import { useGsapReveal } from "../hooks/useGsapReveal";
import Button from "../components/common/Button";
import EmptyState from "../components/common/EmptyState";
import Modal from "../components/common/Modal";
import HelpCard from "../components/help/HelpCard";
import HelpFilters from "../components/help/HelpFilters";
import HelpForm from "../components/help/HelpForm";

export default function HelpPage({ help, onAddHelp, onRespondHelp, onCompleteHelp, onOpenDetail }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("全部");
  const [status, setStatus] = useState("全部");
  const filtered = useFilteredList(help, { query, category, type: status, keys: ["title", "material", "place", "publisher"] });
  const scope = useGsapReveal([filtered.length, query, category, status]);

  return (
    <div ref={scope} className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <HelpFilters query={query} setQuery={setQuery} category={category} setCategory={setCategory} status={status} setStatus={setStatus} />
        <Button icon={Plus} onClick={() => setOpen(true)}>发布生活互助</Button>
      </div>
      {filtered.length ? <div className="grid gap-5 lg:grid-cols-2">{filtered.map((item) => <HelpCard key={item.id} help={item} onRespond={onRespondHelp} onComplete={onCompleteHelp} onOpenDetail={onOpenDetail} />)}</div> : <EmptyState title="暂无互助需求" />}
      <Modal open={open} title="发布生活物资求助" onClose={() => setOpen(false)}>
        <HelpForm onSubmit={(data, error) => { if (onAddHelp(data, error)) setOpen(false); }} />
      </Modal>
    </div>
  );
}
