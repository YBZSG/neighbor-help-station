import { useState } from "react";
import { Bell, Search, ShieldCheck } from "lucide-react";
import { mockUser } from "../data/mockUser";

export default function Topbar({ title, onNavigate, onSearch, onNotice }) {
  const [keyword, setKeyword] = useState("");

  function submitSearch(event) {
    event.preventDefault();
    onSearch(keyword);
  }

  return (
    <header className="sticky top-0 z-20 -mx-4 mb-5 border-b border-white/80 bg-campus-bg/85 px-4 py-3 backdrop-blur md:-mx-8 md:px-8 xl:ml-64">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold text-campus-green">明德校园 · 互助服务站</p>
          <h1 className="text-xl font-black text-campus-ink md:text-2xl">{title}</h1>
        </div>
        <form onSubmit={submitSearch} className="hidden min-w-80 items-center gap-2 rounded-2xl border border-white bg-white px-4 py-2 shadow-soft transition focus-within:border-campus-green md:flex">
          <Search size={18} className="text-slate-400" />
          <input
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="搜索物品、资料、求助信息"
            className="h-8 flex-1 bg-transparent text-sm text-campus-ink outline-none placeholder:text-campus-muted"
          />
          <button type="submit" className="rounded-xl bg-campus-greenSoft px-3 py-1.5 text-xs font-bold text-campus-green transition hover:bg-emerald-100">
            搜索
          </button>
        </form>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate("rules")}
            className="hidden items-center gap-2 rounded-2xl bg-campus-greenSoft px-3 py-2 text-xs font-bold text-campus-green transition hover:bg-emerald-100 md:flex"
          >
            <ShieldCheck size={16} />
            实名可信
          </button>
          <button onClick={onNotice} className="rounded-2xl bg-white p-3 text-campus-muted shadow-soft transition hover:text-campus-green" aria-label="通知">
            <Bell size={18} />
          </button>
          <button
            type="button"
            onClick={() => onNavigate("profile")}
            className="flex h-10 w-10 items-center justify-center rounded-2xl bg-campus-blue text-sm font-black text-white transition hover:scale-105"
            aria-label="进入用户中心"
          >
            {mockUser.name.slice(0, 1)}
          </button>
        </div>
      </div>
    </header>
  );
}
