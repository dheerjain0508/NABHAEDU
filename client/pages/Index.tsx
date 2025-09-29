import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useI18n } from "@/hooks/useI18n";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Camera, CloudDownload, ShieldAlert } from "lucide-react";

export default function Index() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-background">
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10 opacity-30 blur-3xl" aria-hidden>
            <div className="mx-auto mt-[-4rem] h-64 w-[28rem] rotate-12 rounded-full bg-gradient-to-br from-primary/60 to-rose-500/60" />
          </div>
          <div className="container py-16 md:py-24 grid gap-10 md:grid-cols-2 items-center">
            <div>
              <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }} className="text-4xl md:text-5xl font-extrabold tracking-tight">
                {t("welcomeTitle")}
              </motion.h1>
              <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1, duration: 0.6 }} className="mt-4 text-lg text-muted-foreground">
                {t("welcomeSub")}
              </motion.p>
              <div className="mt-8 flex gap-3">
                <Link to="/attendance"><Button size="lg">{t("markAttendance")}</Button></Link>
                <Link to="/downloads"><Button size="lg" variant="secondary">{t("downloads")}</Button></Link>
              </div>
            </div>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6 }} className="rounded-2xl border bg-card p-6 shadow-sm">
              <div className="grid grid-cols-2 gap-4">
                <Link to="/attendance" className="group">
                  <Card className="bg-gradient-to-br from-primary/10 to-transparent">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base"><Camera className="h-4 w-4" /> {t("attendance")}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">{t("attendanceDesc")}</CardContent>
                  </Card>
                </Link>
                <Link to="/downloads" className="group">
                  <Card className="bg-gradient-to-br from-rose-500/10 to-transparent">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base"><CloudDownload className="h-4 w-4" /> {t("downloads")}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">{t("downloadsDesc")}</CardContent>
                  </Card>
                </Link>
                <Link to="/ncert/1" className="group">
                  <Card className="bg-gradient-to-br from-primary/10 to-transparent">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base"><BookOpen className="h-4 w-4" /> {t("ncert")}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">{t("ncertDesc")}</CardContent>
                  </Card>
                </Link>
                <Link to="/complaints" className="group">
                  <Card className="bg-gradient-to-br from-rose-500/10 to-transparent">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base"><ShieldAlert className="h-4 w-4" /> {t("complaints")}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">{t("complaintsDesc")}</CardContent>
                  </Card>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="container py-16">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{t("ncert")}</h2>
          <p className="text-muted-foreground mt-2">{t("classes")}</p>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {[
              { id: "1", label: `${t("class")} I` },
              { id: "2", label: `${t("class")} II` },
              { id: "3", label: `${t("class")} III` },
              { id: "4", label: `${t("class")} IV` },
              { id: "5", label: `${t("class")} V` },
              { id: "6", label: `${t("class")} VI` },
              { id: "7", label: `${t("class")} VII` },
              { id: "8", label: `${t("class")} VIII` },
              { id: "9", label: `${t("class")} IX` },
              { id: "10", label: `${t("class")} X` },
              { id: "11", label: `${t("class")} XI` },
              { id: "12", label: `${t("class")} XII` },
            ].map((c) => (
              <Link key={c.id} to={`/ncert/${c.id}`} className="group rounded-lg border p-4 text-center text-sm transition-colors hover:border-primary">
                <span className="font-medium group-hover:text-primary">{c.label}</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
