import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useI18n } from "@/hooks/useI18n";
import { useAuth, Role } from "@/hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const { t } = useI18n();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("student");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = login(identifier, password);
    if (!ok) return setError("Invalid credentials");
    if (role === "mentor") navigate("/mentor");
    else if (role === "management") navigate("/management");
    else navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container flex-1 py-10 max-w-md">
        <Card>
          <CardHeader><CardTitle>{t("login")}</CardTitle></CardHeader>
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
              <div>
                <Label>{t("role")}</Label>
                <Select value={role} onValueChange={(v) => setRole(v as Role)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">{t("studentRole")}</SelectItem>
                    <SelectItem value="mentor">{t("mentorRole")}</SelectItem>
                    <SelectItem value="management">{t("managementRole")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <Button type="submit" className="w-full">{t("continue")}</Button>
              <div className="flex items-center justify-between text-sm">
                <Link to="/signup" className="text-primary underline">{t("signup")}</Link>
                <Link to="/forgot" className="text-muted-foreground underline">{t("forgot")}</Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
