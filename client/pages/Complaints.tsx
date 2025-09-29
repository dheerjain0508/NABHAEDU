import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useI18n } from "@/hooks/useI18n";
import { useAuth } from "@/hooks/useAuth";
import { Storage, Complaint } from "@/lib/storage";

export default function Complaints() {
  const { t } = useI18n();
  const { user } = useAuth();
  const [category, setCategory] = useState("student");
  const [message, setMessage] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    const comp: Complaint = { id: crypto.randomUUID(), authorId: user?.id, category, message, timestamp: Date.now() };
    Storage.addComplaint(comp);
    setMessage("");
    setDone(true);
    setTimeout(() => setDone(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container flex-1 py-10 max-w-2xl">
        <Card>
          <CardHeader><CardTitle>{t("complaintTitle")}</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={submit} className="space-y-4">
              <div>
                <Label>{t("category")}</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">{t("student")}</SelectItem>
                    <SelectItem value="teacher">{t("teacher")}</SelectItem>
                    <SelectItem value="other">{t("other")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>{t("message")}</Label>
                <Textarea className="mt-1" rows={6} value={message} onChange={(e) => setMessage(e.target.value)} />
              </div>
              <Button type="submit">{t("submit")}</Button>
              {done && <p className="text-sm text-green-600">{t("success")}</p>}
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
