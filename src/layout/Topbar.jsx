import { useState } from "react";
import { Bell, ChevronDown, Clock3, MapPin, Search, ShieldCheck } from "lucide-react";
import { mockUser } from "../data/mockUser";
import { regions } from "../utils/region";

export default function Topbar({
  title,
  onNavigate,
  onSearch,
  region,
  onRegionChange,
  notifications,
  onReadAllNotifications,
  onOpenNotification
}) {
  const [keyword, setKeyword] = useState("");
  const [noticeOpen, setNoticeOpen] = useState(false);
  const [regionOpen, setRegionOpen] = useState(false);
  const unreadCount = notifications.filter((item) => !item.read).length;

  function submitSearch(event) {
    event.preventDefault();
    onSearch(keyword);
  }

  function chooseRegion(nextRegion) {
    onRegionChange(nextRegion);
    setRegionOpen(false);
  }

  return (
    <header className="sticky top-0 z-20 mb-5 border-b border-white/80 bg-campus-bg/90 px-5 py-3 backdrop-blur sm:px-6 md:px-8 xl:ml-64">
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
          <div className="relative hidden lg:block">
            <button
              type="button"
              onClick={() => setRegionOpen((open) => !open)}
              className="flex items-center gap-2 rounded-2xl border border-slate-100 bg-white px-3 py-2 text-xs font-bold text-campus-ink shadow-soft transition hover:border-campus-green hover:text-campus-green"
            >
              <MapPin size={16} className="text-campus-green" />
              {region}
              <ChevronDown size={14} className={`transition ${regionOpen ? "rotate-180" : ""}`} />
            </button>
            {regionOpen ? (
              <div className="absolute right-0 top-12 z-50 w-52 rounded-2xl border border-slate-100 bg-white p-2 shadow-2xl">
                {regions.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => chooseRegion(item)}
                    className={`block w-full rounded-xl px-3 py-2 text-left text-sm font-bold transition ${
                      item === region ? "bg-campus-greenSoft text-campus-green" : "text-campus-muted hover:bg-slate-50 hover:text-campus-ink"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <button
            type="button"
            onClick={() => onNavigate("rules")}
            className="hidden items-center gap-2 rounded-2xl bg-campus-greenSoft px-3 py-2 text-xs font-bold text-campus-green transition hover:bg-emerald-100 md:flex"
          >
            <ShieldCheck size={16} />
            实名可信
          </button>

          <div className="relative">
            <button
              onClick={() => setNoticeOpen((open) => !open)}
              className="relative rounded-2xl bg-white p-3 text-campus-muted shadow-soft transition hover:text-campus-green"
              aria-label="通知"
            >
              <Bell size={18} />
              {unreadCount ? (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-black text-white">{unreadCount}</span>
              ) : null}
            </button>
            {noticeOpen ? (
              <div className="absolute right-0 top-14 z-50 w-86 max-w-[calc(100vw-2rem)] rounded-2xl border border-slate-100 bg-white p-3 shadow-2xl">
                <div className="mb-2 flex items-center justify-between px-2 py-1">
                  <div>
                    <p className="text-sm font-black text-campus-ink">通知中心</p>
                    <p className="text-xs text-campus-muted">{unreadCount ? `${unreadCount} 条未读消息` : "暂无未读消息"}</p>
                  </div>
                  <button
                    type="button"
                    onClick={onReadAllNotifications}
                    className="rounded-xl bg-campus-greenSoft px-3 py-1.5 text-xs font-bold text-campus-green transition hover:bg-emerald-100"
                  >
                    全部已读
                  </button>
                </div>
                <div className="max-h-96 space-y-2 overflow-auto">
                  {notifications.map((notice) => (
                    <button
                      key={notice.id}
                      type="button"
                      onClick={() => {
                        setNoticeOpen(false);
                        onOpenNotification(notice);
                      }}
                      className="block w-full rounded-2xl bg-slate-50 p-3 text-left transition hover:bg-campus-greenSoft"
                    >
                      <div className="flex items-start gap-3">
                        <span className={`mt-1 h-2 w-2 rounded-full ${notice.read ? "bg-slate-300" : "bg-red-500"}`} />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-black text-campus-ink">{notice.title}</p>
                          <p className="mt-1 line-clamp-2 text-xs leading-5 text-campus-muted">{notice.desc}</p>
                          <p className="mt-2 flex items-center gap-1 text-xs font-semibold text-campus-muted">
                            <Clock3 size={13} />
                            {notice.time}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

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
