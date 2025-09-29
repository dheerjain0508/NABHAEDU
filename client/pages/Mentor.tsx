import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Mentor() {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => { if (!user || (user.role !== "mentor" && user.role !== "management")) navigate("/login"); }, [user, navigate]);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);
  const [chunks, setChunks] = useState<BlobPart[]>([]);
  const [recording, setRecording] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const start = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    const mr = new MediaRecorder(stream, { mimeType: 'video/webm' });
    mr.ondataavailable = (e) => setChunks((prev) => [...prev, e.data]);
    mr.onstop = () => {
      const blob = new Blob(chunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setChunks([]);
      stream.getTracks().forEach((t) => t.stop());
    };
    if (videoRef.current) videoRef.current.srcObject = stream;
    mr.start();
    setRecorder(mr);
    setRecording(true);
  };

  const stop = () => {
    recorder?.stop();
    setRecording(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container flex-1 py-10 grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader><CardTitle>Record a lecture</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="aspect-video overflow-hidden rounded-lg border bg-black">
              <video ref={videoRef} className="h-full w-full" autoPlay muted playsInline />
            </div>
            <div className="flex gap-3">
              {!recording ? (
                <Button onClick={start}>Start Recording</Button>
              ) : (
                <Button variant="destructive" onClick={stop}>Stop</Button>
              )}
              {downloadUrl && (
                <a href={downloadUrl} download={`nabha-edu-lecture-${Date.now()}.webm`} className="inline-flex">
                  <Button variant="secondary">Download</Button>
                </a>
              )}
            </div>
            <p className="text-sm text-muted-foreground">Upload the downloaded video to YouTube and share the link in Downloads → Videos.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Share materials</CardTitle></CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>Use the Downloads section to add note links (PDF/Docs) and YouTube video links for your class.</p>
            <p>Your students will see them instantly. Only mentors and management can post.</p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
