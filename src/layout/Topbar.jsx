import { useState } from "react";
import { Bell, ChevronDown, MapPin, Search, ShieldCheck } from "lucide-react";
import { mockUser } from "../data/mockUser";

export default function Topbar({ title, onNavigate, onSearch, onNotice }) {
  const [keyword, setKeyword] = useState("");

  function submitSearch(event) {
    event.preventDefault();
    onSearch(keyword);
  }

  return (
    <header className="sticky top-0 z-20 -mx-4 mb-5 border-b border-white/80 bg-campus-bg/90 px-4 py-3 backdrop-blur md:-mx-8 md:px-8 xl:ml-64">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold text-campus-green">明德校园 · 互助服务站</p>
          <h1 className="text-xl font-black text-campus-ink md:text-2xl">{title}</h1>
        </div>

        <form onSubmit={submitSearch} className="hidden min-w-[420px] items-center gap-2 rounded-2xl border border-slate-100 bg-white px-4 py-2 shadow-soft transition focus-within:border-campus-green md:flex">
          <Search size={18} className="text-slate-400" />
          <input
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="搜索物品、需求、活动、资料..."
            className="h-8 flex-1 bg-transparent text-sm text-campus-ink outline-none placeholder:text-campus-muted"
          />
          <button type="submit" className="rounded-xl bg-slate-50 px-2.5 py-1.5 text-xs font-bold text-campus-muted transition hover:bg-campus-greenSoft hover:text-campus-green">
            回车
          </button>
        </form>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="hidden items-center gap-2 rounded-2xl border border-slate-100 bg-white px-3 py-2 text-xs font-bold text-campus-ink shadow-soft transition hover:border-campus-green hover:text-campus-green lg:flex"
          >
            <MapPin size={16} className="text-campus-green" />
            阳光花园小区
            <ChevronDown size={14} />
          </button>
          <button
            type="button"
            onClick={() => onNavigate("rules")}
            className="hidden items-center gap-2 rounded-2xl bg-campus-greenSoft px-3 py-2 text-xs font-bold text-campus-green transition hover:bg-emerald-100 md:flex"
          >
            <ShieldCheck size={16} />
            实名可信
          </button>
          <button onClick={onNotice} className="relative rounded-2xl bg-white p-3 text-campus-muted shadow-soft transition hover:text-campus-green" aria-label="通知">
            <Bell size={18} />
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-black text-white">3</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate("profile")}
            className="flex items-center gap-2 rounded-2xl bg-white p-1.5 pr-3 shadow-soft transition hover:scale-[1.02]"
            aria-label="进入用户中心"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-campus-blue text-sm font-black text-white">{mockUser.name.slice(0, 1)}</span>
            <span className="hidden text-sm font-bold text-campus-ink md:inline">{mockUser.name}</span>
            <ChevronDown className="hidden text-campus-muted md:block" size={14} />
          </button>
        </div>
      </div>
    </header>
  );
}
