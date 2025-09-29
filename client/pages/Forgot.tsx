import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/hooks/useI18n";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

export default function Forgot() {
  const { t } = useI18n();
  const { resetPassword } = useAuth();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = resetPassword(identifier, password);
    if (!ok) return setError("Account not found");
    setDone(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container flex-1 py-10 max-w-md">
        <Card>
          <CardHeader><CardTitle>{t("forgot")}</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <Label>{t("emailOrPhone")}</Label>
                <Input value={identifier} onChange={(e) => setIdentifier(e.target.value)} />
              </div>
              <div>
                <Label>{t("password")}</Label>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <Button type="submit" className="w-full">{t("continue")}</Button>
              {done && <p className="text-sm text-green-600 mt-2">{t("success")}</p>}
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
