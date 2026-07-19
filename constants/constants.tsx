import {
  Wrench,
  LayoutDashboard,
  type LucideIcon,
} from "lucide-react";
import type { UserRole } from "@/types/user";


export const inputClass =
  "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition " +
  "focus-visible:border-[#1E2B6D] focus-visible:ring-2 focus-visible:ring-[#1E2B6D]/20";
  

export type DashboardMenuItem = {
  label: string;
  href: string;
  roles: UserRole[];
  icon: LucideIcon;
};

export const dashboardMenuItems: DashboardMenuItem[] = [
  {
    label: "Панель",
    href: "/admin/dashboard",
    roles: ["ADMIN"],
    icon: LayoutDashboard,
  },
  {
    label: "Запчасти",
    href: "/admin/products",
    roles: ["ADMIN"],
    icon: Wrench,
  },
];
