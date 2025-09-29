import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Storage } from "@/lib/storage";

export default function Management() {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => { if (!user || user.role !== "management") navigate("/login"); }, [user, navigate]);
  const complaints = Storage.getComplaints();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container flex-1 py-10">
        <Card>
          <CardHeader><CardTitle>Confidential Complaints</CardTitle></CardHeader>
          <CardContent>
            {complaints.length === 0 ? (
              <p className="text-sm text-muted-foreground">No complaints submitted.</p>
            ) : (
              <div className="space-y-3">
                {complaints.map((c) => (
                  <div key={c.id} className="rounded-lg border p-3">
                    <div className="text-sm text-muted-foreground">{new Date(c.timestamp).toLocaleString()} • {c.category}</div>
                    <div className="mt-1 whitespace-pre-wrap">{c.message}</div>
                    <div className="mt-1 text-xs text-muted-foreground">Author: {c.authorId ? c.authorId : "Anonymous"}</div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
