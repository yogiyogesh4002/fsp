"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";
import { joinHref, primaryNav, type NavItem } from "@/data/site";
import { Logo } from "@/components/ui/Logo";
import { Arrow } from "@/components/ui/Arrow";
import { cn } from "@/lib/cn";
import { MobileMenu } from "./MobileMenu";

function isActive(pathname: string, href: string) {
  const path = href.split("#")[0];
  return path === "/" ? pathname === "/" : pathname.startsWith(path);
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // One passive, rAF-throttled listener: solid background + hide on scroll down.
  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      setHidden(y > 320 && y > last + 4);
      if (y < last - 4 || y <= 320) setHidden(false);
      last = y;
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on route change (state adjusted during render, no effect needed).
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpenMenu(null);
    setMobileOpen(false);
  }

  // Escape / outside click closes dropdowns.
  useEffect(() => {
    if (!openMenu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        const trigger = navRef.current?.querySelector<HTMLButtonElement>(`[data-menu-trigger="${openMenu}"]`);
        setOpenMenu(null);
        trigger?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpenMenu(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [openMenu]);

  const showSolid = scrolled || openMenu !== null;

  return (
    <LazyMotion features={domAnimation} strict>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color] duration-500 ease-[var(--ease-out)]",
          hidden && !openMenu && !mobileOpen ? "-translate-y-full" : "translate-y-0",
          showSolid ? "border-b border-line bg-paper/90 backdrop-blur-md" : "border-b border-transparent bg-transparent",
        )}
      >
        {/* gap tightens below 400px: logo + Join FSP + menu button overflowed a
            320px viewport at gap-6 and gave the page a horizontal scrollbar. */}
        <nav ref={navRef} aria-label="Primary" className="container-fsp flex h-[var(--nav-h)] items-center justify-between gap-3 xs:gap-6">
          <Link href="/" className="relative z-10 block w-[92px] shrink-0 md:w-[112px]" aria-label="FSP home">
            <Logo priority sizes="112px" />
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {primaryNav.map((item) => (
              <DesktopItem
                key={item.label}
                item={item}
                pathname={pathname}
                open={openMenu === item.label}
                onOpenChange={(o) => setOpenMenu((cur) => (o ? item.label : cur === item.label ? null : cur))}
              />
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Link
              href={joinHref}
              className="group/join inline-flex min-h-11 items-center gap-2 bg-navy px-4 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-ink md:min-h-12 md:px-6 md:text-xs"
            >
              Join FSP
              <Arrow className="transition-transform duration-300 group-hover/join:-translate-y-0.5 group-hover/join:translate-x-0.5" />
            </Link>
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center lg:hidden"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((o) => !o)}
            >
              <span aria-hidden="true" className="relative block h-3 w-6">
                <span className={cn("absolute left-0 top-0 h-0.5 w-full bg-ink transition-transform duration-300", mobileOpen && "translate-y-[5px] rotate-45")} />
                <span className={cn("absolute bottom-0 left-0 h-0.5 w-full bg-ink transition-transform duration-300", mobileOpen && "-translate-y-[5px] -rotate-45")} />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && <MobileMenu pathname={pathname} onClose={() => setMobileOpen(false)} />}
      </AnimatePresence>
    </LazyMotion>
  );
}

function DesktopItem({
  item,
  pathname,
  open,
  onOpenChange,
}: {
  item: NavItem;
  pathname: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const linkClass =
    "relative inline-flex min-h-11 items-center gap-1.5 px-3.5 text-[0.8125rem] font-medium tracking-wide transition-colors hover:text-navy";

  if ("href" in item) {
    const active = isActive(pathname, item.href);
    return (
      <li>
        <Link href={item.href} className={linkClass} aria-current={active ? "page" : undefined}>
          {item.label}
          {active && <span aria-hidden="true" className="absolute inset-x-3.5 bottom-2 h-px bg-orange" />}
        </Link>
      </li>
    );
  }

  return <DropdownItem item={item} pathname={pathname} open={open} onOpenChange={onOpenChange} linkClass={linkClass} />;
}

function DropdownItem({
  item,
  pathname,
  open,
  onOpenChange,
  linkClass,
}: {
  item: Extract<NavItem, { children: unknown }>;
  pathname: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  linkClass: string;
}) {
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const active =
    item.children.some((c) => isActive(pathname, c.href)) ||
    (item.footer ? isActive(pathname, item.footer.href) : false);
  const panelId = `menu-${item.label.toLowerCase()}`;
  const twoCol = item.columns === 2;

  return (
    <li
      className="relative"
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") {
          clearTimeout(closeTimer.current);
          onOpenChange(true);
        }
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") closeTimer.current = setTimeout(() => onOpenChange(false), 120);
      }}
    >
      <button
        type="button"
        data-menu-trigger={item.label}
        className={linkClass}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => onOpenChange(!open)}
      >
        {item.label}
        <svg viewBox="0 0 10 6" aria-hidden="true" className={cn("w-2.5 transition-transform duration-300", open && "rotate-180")}>
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.4" fill="none" />
        </svg>
        {active && <span aria-hidden="true" className="absolute inset-x-3.5 bottom-2 h-px bg-orange" />}
      </button>

      <AnimatePresence>
        {open && (
          <m.div
            id={panelId}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 top-full pt-2"
          >
            <div
              className={cn(
                "border border-line bg-white p-2 shadow-[0_24px_60px_-24px_rgb(16_19_28/0.25)]",
                twoCol ? "w-[40rem] max-w-[calc(100vw-2*var(--gutter))]" : "min-w-[20rem]",
              )}
            >
              <ul className={cn(twoCol && "grid grid-cols-2 gap-x-1")}>
                {item.children.map((child, i) => (
                  <li key={child.href}>
                    <Link
                      href={child.href}
                      className="group/item grid grid-cols-[2rem_1fr_auto] items-center gap-2 px-3 py-3 transition-colors hover:bg-paper"
                      aria-current={pathname === child.href ? "page" : undefined}
                    >
                      <span className="text-[0.6875rem] font-semibold tabular-nums text-muted">{String(i + 1).padStart(2, "0")}</span>
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold text-ink">{child.label}</span>
                        {child.description && <span className="block text-xs text-muted">{child.description}</span>}
                      </span>
                      <Arrow className="text-sm text-navy opacity-0 transition-all duration-300 group-hover/item:opacity-100 group-focus-visible/item:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>

              {item.footer && (
                <Link
                  href={item.footer.href}
                  className="group/all mt-1 flex items-center justify-between gap-2 border-t border-line px-3 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-navy transition-colors hover:bg-paper"
                  aria-current={pathname === item.footer.href ? "page" : undefined}
                >
                  {item.footer.label}
                  <Arrow className="text-sm transition-transform duration-300 group-hover/all:-translate-y-0.5 group-hover/all:translate-x-0.5" />
                </Link>
              )}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </li>
  );
}
