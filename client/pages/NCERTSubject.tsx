import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams } from "react-router-dom";
import { useI18n } from "@/hooks/useI18n";
import { Storage, NoteItem } from "@/lib/storage";
import { useAuth } from "@/hooks/useAuth";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

export default function NCERTSubject() {
  const { classId, subject } = useParams<{ classId: string; subject: string }>();
  const { t } = useI18n();
  const { user } = useAuth();
  const canPost = useMemo(() => user?.role === "mentor" || user?.role === "management", [user]);
  const [notes, setNotes] = useState<NoteItem[]>(() => Storage.getNotes().filter(n => n.classId === classId && n.subject === subject));
  const [showUrl, setShowUrl] = useState<string | null>(null);

  const addNote = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const title = String(fd.get("title") || "").trim();
    const url = String(fd.get("url") || "").trim();
    if (!title || !url) return;
    const note: NoteItem = { id: crypto.randomUUID(), title, url, uploaderId: user?.id, timestamp: Date.now(), classId, subject };
    Storage.addNote(note);
    setNotes((prev) => [note, ...prev]);
    e.currentTarget.reset();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container flex-1 py-10">
        <h1 className="text-2xl font-bold">{t("ncert")} - {t("class")} {classId} • {subject}</h1>
        <p className="text-muted-foreground mt-2">Download PDFs or read online.</p>

        <div className="mt-6 grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            {notes.length === 0 ? (
              <Card>
                <CardHeader><CardTitle>No materials yet</CardTitle></CardHeader>
                <CardContent className="text-sm text-muted-foreground">No notes uploaded for this subject. Mentors can add notes using the form.</CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {notes.map((n) => (
                  <Card key={n.id}>
                    <CardHeader>
                      <CardTitle>{n.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between gap-4">
                        <div className="text-sm text-muted-foreground">Uploaded {new Date(n.timestamp).toLocaleString()}</div>
                        <div className="flex gap-2">
                          <a className="text-sm text-primary underline" href={n.url} target="_blank" rel="noreferrer" download>Download</a>
                          <Button variant="ghost" onClick={() => setShowUrl(n.url)}>Read</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          <aside>
            {canPost && (
              <Card>
                <CardHeader><CardTitle>Add note</CardTitle></CardHeader>
                <CardContent>
                  <form onSubmit={addNote} className="space-y-3">
                    <input name="title" placeholder="Title" className="w-full rounded border px-3 py-2" />
                    <input name="url" placeholder="PDF URL (or Google Drive link)" className="w-full rounded border px-3 py-2" />
                    <Button type="submit" className="w-full">Add</Button>
                  </form>
                  <p className="text-xs text-muted-foreground mt-2">After uploading a PDF to Google Drive or any file host, paste the share URL here. Students can read inline if the host allows embedding.</p>
                </CardContent>
              </Card>
            )}

            <Card className="mt-4">
              <CardHeader><CardTitle>Tips</CardTitle></CardHeader>
              <CardContent className="text-sm text-muted-foreground">Use descriptive titles and ensure your PDF links are publicly accessible for students to view and download.</CardContent>
            </Card>
          </aside>
        </div>

        {showUrl && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="relative w-[90%] h-[80%] bg-white dark:bg-gray-900 rounded shadow-lg overflow-hidden">
              <div className="p-2 border-b flex items-center justify-between">
                <div className="font-medium">PDF Viewer</div>
                <Button variant="ghost" onClick={() => setShowUrl(null)}>Close</Button>
              </div>
              <iframe src={showUrl} className="w-full h-full" title="PDF Viewer" />
            </div>
          </div>
        )}

      </main>
      <Footer />
    </div>
  );
}
