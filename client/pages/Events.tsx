import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Calendar from "@/components/Calendar";
import { useI18n } from "@/hooks/useI18n";

export default function Events() {
  const { t } = useI18n();
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container flex-1 py-10">
        <h1 className="text-2xl font-bold">{t("events")}</h1>
        <p className="text-muted-foreground mt-2">{t("calendar")}</p>
        <div className="mt-6">
          <Calendar />
        </div>
      </main>
      <Footer />
    </div>
  );
}
