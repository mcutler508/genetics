"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Upload,
  Activity,
  FlaskConical,
  Pill,
  Salad,
  MessageCircleQuestion,
  FileText,
  ShieldCheck,
  Microscope,
  CalendarCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/portal/theme-toggle";

const nav = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/tracker", label: "12-Week Tracker", icon: CalendarCheck },
  { href: "/systems", label: "Systems", icon: Activity },
  { href: "/biomarkers", label: "Biomarkers", icon: FlaskConical },
  { href: "/genetics", label: "Genetics", icon: Microscope },
  { href: "/supplements", label: "Supplements", icon: Pill },
  { href: "/nutrition", label: "Nutrition", icon: Salad },
  {
    href: "/provider-questions",
    label: "Provider Questions",
    icon: MessageCircleQuestion,
  },
  { href: "/reports", label: "Reports", icon: FileText },
  { href: "/privacy", label: "Privacy & Consent", icon: ShieldCheck },
  { href: "/upload", label: "Upload Report", icon: Upload },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar">
      <div className="flex items-center justify-between gap-2 px-6 pt-7 pb-6">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <span className="editorial-title text-base leading-none">B</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="editorial-title text-base text-sidebar-foreground">
              Blueprint
            </span>
            <span className="editorial-eyebrow text-muted-foreground">
              Portal
            </span>
          </div>
        </Link>
        <ThemeToggle />
      </div>

      <nav className="flex-1 px-3 pb-6">
        <ul className="space-y-0.5">
          {nav.map((item) => {
            const Icon = item.icon;
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-150",
                    active
                      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                      : "text-sidebar-foreground/75 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4 shrink-0 transition-colors",
                      active
                        ? "text-sidebar-accent-foreground"
                        : "text-sidebar-foreground/55 group-hover:text-sidebar-accent-foreground"
                    )}
                  />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-sidebar-border px-6 py-5">
        <p className="editorial-eyebrow text-muted-foreground">Disclaimer</p>
        <p className="mt-1 text-xs leading-relaxed text-sidebar-foreground/70">
          Educational portal only. Not a substitute for medical care.
        </p>
      </div>
    </aside>
  );
}
