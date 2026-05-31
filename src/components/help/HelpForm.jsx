import { useState } from "react";
import { helpCategories } from "../../constants/categories";
import Button from "../common/Button";
import Input from "../common/Input";
import Select from "../common/Select";

const initial = { title: "", material: "借充电器", place: "", expectedTime: "", publisher: "", contact: "" };

export default function HelpForm({ onSubmit }) {
  const [form, setForm] = useState(initial);
  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  function submit(event) {
    event.preventDefault();
    if (!form.title || !form.place || !form.contact) return onSubmit(null, "请填写标题、地点和联系方式");
    onSubmit(form);
    setForm(initial);
  }

  return (
    <form onSubmit={submit} className="grid gap-4">
      <Input label="求助标题" value={form.title} onChange={(e) => update("title", e.target.value)} />
      <div className="grid gap-4 md:grid-cols-2">
        <Select label="所需物资" value={form.material} onChange={(e) => update("material", e.target.value)} options={helpCategories.filter((i) => i !== "全部")} />
        <Input label="地点" value={form.place} onChange={(e) => update("place", e.target.value)} />
        <Input label="期望时间" value={form.expectedTime} onChange={(e) => update("expectedTime", e.target.value)} />
        <Input label="发布者" value={form.publisher} onChange={(e) => update("publisher", e.target.value)} />
        <Input label="联系方式" value={form.contact} onChange={(e) => update("contact", e.target.value)} />
      </div>
      <Button className="w-full" type="submit">发布生活互助</Button>
    </form>
  );
}
