import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useI18n } from "@/hooks/useI18n";
import { useAuth, Role } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Signup() {
  const { t } = useI18n();
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("student");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = signup({ name, email, phone, role, password });
    if (!ok) return setError("User already exists");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container flex-1 py-10 max-w-md">
        <Card>
          <CardHeader><CardTitle>{t("signup")}</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <Label>{t("name")}</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <Label>Email</Label>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div>
                <Label>Phone</Label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
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
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
