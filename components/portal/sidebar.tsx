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
  SlidersHorizontal,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/portal/theme-toggle";

type NavItem = { href: string; label: string; icon: LucideIcon };

const NAV_GROUPS: { label: string; items: NavItem[] }[] = [
  {
    label: "Blueprint",
    items: [
      { href: "/", label: "Dashboard", icon: LayoutDashboard },
      { href: "/tracker", label: "12-Week Tracker", icon: CalendarCheck },
      { href: "/systems", label: "Systems", icon: Activity },
      { href: "/biomarkers", label: "Biomarkers", icon: FlaskConical },
      { href: "/genetics", label: "Genetics", icon: Microscope },
    ],
  },
  {
    label: "Execution",
    items: [
      { href: "/supplements", label: "Supplements", icon: Pill },
      { href: "/nutrition", label: "Nutrition", icon: Salad },
      {
        href: "/provider-questions",
        label: "Provider Questions",
        icon: MessageCircleQuestion,
      },
    ],
  },
  {
    label: "Archive",
    items: [
      { href: "/reports", label: "Reports", icon: FileText },
      { href: "/privacy", label: "Privacy & Consent", icon: ShieldCheck },
      { href: "/upload", label: "Upload Report", icon: Upload },
    ],
  },
  {
    label: "Internal",
    items: [
      { href: "/style-guide", label: "Style Guide", icon: SlidersHorizontal },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-rule bg-[color:var(--ds-vellum-shaded)]">
      {/* Brand */}
      <div className="flex items-center justify-between gap-2 px-6 pt-7 pb-7">
        <Link href="/" className="flex flex-col leading-none">
          <span className="ds-title-2 text-ink lowercase tracking-tight">
            blueprint.
          </span>
          <span className="kicker mt-2 text-ink-faint">
            Impact Health Systems
          </span>
        </Link>
        <ThemeToggle />
      </div>

      {/* Nav groups */}
      <nav className="flex-1 px-3 pb-6">
        <div className="space-y-7">
          {NAV_GROUPS.map((group) => (
            <div key={group.label}>
              <div className="mb-2 flex items-center gap-2 px-3 border-b border-rule pb-2">
                <span className="kicker text-ink-faint">{group.label}</span>
              </div>
              <ul className="space-y-0.5">
                {group.items.map((item) => {
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
                          "group relative flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors",
                          active
                            ? "bg-[color:color-mix(in_oklch,var(--ds-accent)_8%,transparent)] text-ink font-medium"
                            : "text-ink-muted hover:text-ink hover:bg-vellum"
                        )}
                      >
                        {active && (
                          <span
                            className="absolute left-0 top-1.5 bottom-1.5 w-[2px] rounded-full"
                            style={{
                              backgroundColor: "var(--ds-accent)",
                            }}
                            aria-hidden
                          />
                        )}
                        <Icon
                          className={cn(
                            "h-4 w-4 shrink-0 transition-colors",
                            active
                              ? "text-mark-ink"
                              : "text-ink-faint group-hover:text-ink"
                          )}
                        />
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </nav>

      {/* Colophon */}
      <div className="border-t border-rule px-6 py-5">
        <p className="kicker text-ink-faint">Disclaimer</p>
        <p className="mt-1.5 text-xs leading-relaxed text-ink-muted">
          Educational portal only. Not a substitute for medical care.
        </p>
      </div>
    </aside>
  );
}
