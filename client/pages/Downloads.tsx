import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/hooks/useI18n";
import { useAuth } from "@/hooks/useAuth";
import { Storage, NoteItem, VideoItem } from "@/lib/storage";
import { useMemo, useState } from "react";

export default function Downloads() {
  const { t } = useI18n();
  const { user } = useAuth();
  const [notes, setNotes] = useState<NoteItem[]>(Storage.getNotes());
  const [videos, setVideos] = useState<VideoItem[]>(Storage.getVideos());

  const canPost = useMemo(() => user?.role === "mentor" || user?.role === "management", [user]);

  const addNote = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const title = String(fd.get("title") || "").trim();
    const url = String(fd.get("url") || "").trim();
    if (!title || !url) return;
    const note: NoteItem = { id: crypto.randomUUID(), title, url, uploaderId: user?.id, timestamp: Date.now() };
    Storage.addNote(note);
    setNotes([note, ...notes]);
    form.reset();
  };

  const addVideo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const title = String(fd.get("title") || "").trim();
    const youtubeUrl = String(fd.get("youtube") || "").trim();
    if (!title || !youtubeUrl) return;
    const video: VideoItem = { id: crypto.randomUUID(), title, youtubeUrl, uploaderId: user?.id, timestamp: Date.now() };
    Storage.addVideo(video);
    setVideos([video, ...videos]);
    form.reset();
  };

  const youtubeId = (url: string) => {
    const m = url.match(/(?:v=|youtu\.be\/|embed\/)([\w-]{11})/);
    return m ? m[1] : null;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container flex-1 py-10">
        <Tabs defaultValue="notes">
          <TabsList>
            <TabsTrigger value="notes">{t("notes")}</TabsTrigger>
            <TabsTrigger value="videos">{t("videos")}</TabsTrigger>
          </TabsList>
          <TabsContent value="notes" className="mt-6 grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader><CardTitle>{t("notes")}</CardTitle></CardHeader>
              <CardContent>
                {canPost && (
                  <form onSubmit={addNote} className="mb-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <Input name="title" placeholder={t("title")} />
                    <Input name="url" placeholder={t("url")} />
                    <Button type="submit">{t("add")}</Button>
                  </form>
                )}
                <div className="space-y-3">
                  {notes.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No notes yet.</p>
                  ) : (
                    notes.map((n) => (
                      <a key={n.id} href={n.url} target="_blank" rel="noreferrer" className="block rounded-lg border p-3 transition-colors hover:border-primary">
                        <div className="font-medium">{n.title}</div>
                        <div className="text-xs text-muted-foreground">{new Date(n.timestamp).toLocaleString()}</div>
                      </a>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>{t("ncert")}</CardTitle></CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {["I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII"].map((c) => (
                    <a key={c} href="https://ncert.nic.in/textbook.php" target="_blank" rel="noreferrer" className="rounded-lg border p-4 text-center text-sm transition-colors hover:border-primary">
                      <span className="font-medium">{t("class")} {c}</span>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="videos" className="mt-6 grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader><CardTitle>{t("videos")}</CardTitle></CardHeader>
              <CardContent>
                {canPost && (
                  <form onSubmit={addVideo} className="mb-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <Input name="title" placeholder={t("title")} />
                    <Input name="youtube" placeholder={t("youtubeLink")} />
                    <Button type="submit">{t("addVideo")}</Button>
                  </form>
                )}
                <div className="grid gap-4">
                  {videos.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No videos yet.</p>
                  ) : (
                    videos.map((v) => {
                      const id = youtubeId(v.youtubeUrl);
                      return (
                        <div key={v.id} className="rounded-lg border p-3">
                          <div className="font-medium mb-2">{v.title}</div>
                          {id ? (
                            <div className="aspect-video w-full overflow-hidden rounded-lg">
                              <iframe className="h-full w-full" src={`https://www.youtube.com/embed/${id}`} title={v.title} frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                            </div>
                          ) : (
                            <a className="text-sm text-primary underline" href={v.youtubeUrl} target="_blank" rel="noreferrer">Open video</a>
                          )}
                          <div className="mt-2 text-xs text-muted-foreground">{new Date(v.timestamp).toLocaleString()}</div>
                        </div>
                      );
                    })
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Playlists</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>Browse curated YouTube playlists recommended by mentors.</p>
                  <a className="text-primary underline" href="https://www.youtube.com/@ncertofficial/videos" target="_blank" rel="noreferrer">NCERT Official</a>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}
