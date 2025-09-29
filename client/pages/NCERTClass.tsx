import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useParams } from "react-router-dom";
import { useI18n } from "@/hooks/useI18n";

export default function NCERTClass() {
  const { t } = useI18n();
  const { classId } = useParams<{ classId: string }>();

  const subjects = [
    { key: "math", label: "Mathematics" },
    { key: "science", label: "Science" },
    { key: "english", label: "English" },
    { key: "hindi", label: "Hindi" },
    { key: "social", label: "Social Science" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container flex-1 py-10">
        <h1 className="text-2xl font-bold">{t("ncert")} - {t("class")} {classId}</h1>
        <p className="text-muted-foreground mt-2">{t("selectSubject")}</p>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {subjects.map((s) => (
            <Card key={s.key}>
              <CardHeader>
                <CardTitle>{s.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{t("notesFor").replace("{subject}", s.label)}</p>
                <div className="mt-3">
                  <Link to={`/ncert/${classId}/${s.key}`} className="inline-flex rounded-md bg-primary px-3 py-2 text-white dark:bg-white dark:text-black">{t("open")}</Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
