import { useState } from "react";
import { emergencyTypes, urgencyLevels } from "../../constants/categories";
import Button from "../common/Button";
import Input from "../common/Input";
import Select from "../common/Select";

const initial = { title: "", content: "", type: "搬东西求助", urgency: "普通", place: "" };

export default function EmergencyForm({ onSubmit }) {
  const [form, setForm] = useState(initial);
  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  function submit(event) {
    event.preventDefault();
    if (!form.title || !form.content || !form.place) return onSubmit(null, "请填写标题、内容和地点");
    onSubmit(form);
    setForm(initial);
  }

  return (
    <form onSubmit={submit} className="grid gap-4">
      <Input label="求助标题" value={form.title} onChange={(e) => update("title", e.target.value)} />
      <Input label="求助内容" value={form.content} onChange={(e) => update("content", e.target.value)} />
      <div className="grid gap-4 md:grid-cols-3">
        <Select label="类型" value={form.type} onChange={(e) => update("type", e.target.value)} options={emergencyTypes} />
        <Select label="紧急程度" value={form.urgency} onChange={(e) => update("urgency", e.target.value)} options={urgencyLevels} />
        <Input label="地点" value={form.place} onChange={(e) => update("place", e.target.value)} />
      </div>
      <Button className="w-full" type="submit">发布临时求助</Button>
    </form>
  );
}
