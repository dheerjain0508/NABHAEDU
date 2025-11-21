import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useI18n } from "@/hooks/useI18n";
import { useAuth } from "@/hooks/useAuth";
import { Menu, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const { t } = useI18n();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  
  const nav = [
    { to: "/", label: t("explore") },
    { to: "/attendance", label: t("attendance") },
    { to: "/downloads", label: t("downloads") },
    { to: "/events", label: t("events") },
    { to: "/complaints", label: t("complaints") },
  ];

  if (user?.role === "mentor") nav.push({ to: "/mentor", label: t("mentor") });
  if (user?.role === "management") nav.push({ to: "/management", label: t("management") });

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="inline-flex items-center gap-1">
            <img src="/public/Gemini_Generated_Image_crukscrukscruksc.png" className="h-12 w-15"></img>
            <span className="font-extrabold tracking-tight text-lg">NABHA EDU</span>
          </Link>

          <nav className="ml-6 hidden md:flex items-center gap-4 text-sm">
            {nav.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                className={({ isActive }) => `transition-colors hover:text-primary ${isActive ? "text-primary" : "text-muted-foreground"}`}
              >
                {n.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-1">
          <Link to="/events" aria-label={t("events")} className="inline-flex">
            <Button variant="ghost" size="icon" aria-label={t("calendar")}>
              <Calendar className="h-5 w-5" />
            </Button>
          </Link>

          <ThemeToggle />
          <LanguageSwitcher />

          {user ? (
            <div className="flex items-center gap-2">
              <span className="hidden sm:block text-sm text-muted-foreground">{user.name}</span>
              <Button variant="secondary" size="sm" onClick={() => logout()}>
                {t("logout")}
              </Button>
            </div>
          ) : (
            <div className="hidden sm:flex gap-2">
              <Link to="/login">
                <Button variant="ghost" size="sm">{t("login")}</Button>
              </Link>
              <Link to="/signup">
                <Button size="sm">{t("signup")}</Button>
              </Link>
            </div>
          )}

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Menu">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t"
          >
            <div className="container py-2 flex flex-col">
              {nav.map((n) => (
                <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="py-2 text-sm">
                  {n.label}
                </Link>
              ))}

              <div className="mt-2 flex gap-2">
                {user ? (
                  <Button size="sm" variant="secondary" onClick={() => { logout(); setOpen(false); }}>{t("logout")}</Button>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setOpen(false)}><Button size="sm" variant="ghost">{t("login")}</Button></Link>
                    <Link to="/signup" onClick={() => setOpen(false)}><Button size="sm">{t("signup")}</Button></Link>
                  </>
                )}
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
