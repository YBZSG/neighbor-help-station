import {
  BookOpen,
  HandHeart,
  HeartHandshake,
  Home,
  PackageOpen,
  ShieldCheck,
  Siren,
  UserRound
} from "lucide-react";

export const routes = [
  { key: "dashboard", label: "首页", icon: Home },
  { key: "items", label: "物品共享", icon: PackageOpen },
  { key: "materials", label: "资料共享", icon: BookOpen },
  { key: "help", label: "生活互助", icon: HeartHandshake },
  { key: "emergency", label: "临时求助", icon: Siren },
  { key: "volunteer", label: "公益招募", icon: HandHeart },
  { key: "profile", label: "我的", icon: UserRound },
  { key: "rules", label: "安全规则", icon: ShieldCheck }
];

export const quickActions = [
  { key: "items", label: "发布闲置" },
  { key: "help", label: "发布求助" },
  { key: "volunteer", label: "报名公益" },
  { key: "rules", label: "查看规则" }
];
