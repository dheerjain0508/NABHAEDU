import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/hooks/useI18n";
import { useAuth } from "@/hooks/useAuth";
import { Storage, AttendanceRecord } from "@/lib/storage";

export default function Attendance() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [opened, setOpened] = useState(false);
  const [name, setName] = useState("");
  const [className, setClassName] = useState("");
  const [records, setRecords] = useState<AttendanceRecord[]>(Storage.getAttendance());
  const { t } = useI18n();
  const { user } = useAuth();

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        streamRef.current = stream;
        setOpened(true);
      }
    } catch (e) {
      alert("Unable to access camera");
    }
  };

  const capture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
    const rec: AttendanceRecord = {
      id: crypto.randomUUID(),
      userId: user?.id,
      name: name || user?.name,
      className,
      timestamp: Date.now(),
      photoDataUrl: dataUrl,
    };
    Storage.addAttendance(rec);
    setRecords([rec, ...records]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container flex-1 py-10">
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>{t("attendance")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <Input placeholder="Class" value={className} onChange={(e) => setClassName(e.target.value)} />
              </div>
              <div className="aspect-video w-full overflow-hidden rounded-lg border bg-black">
                {!opened ? (
                  <div className="grid h-full place-items-center">
                    <Button onClick={openCamera}>{t("openCamera")}</Button>
                  </div>
                ) : (
                  <video ref={videoRef} className="h-full w-full object-contain" playsInline />
                )}
              </div>
              <canvas ref={canvasRef} className="hidden" />
              {opened && (
                <div className="flex gap-3">
                  <Button onClick={capture}>{t("capture")}</Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t("yourAttendance")}</CardTitle>
            </CardHeader>
            <CardContent>
              {records.length === 0 ? (
                <p className="text-sm text-muted-foreground">No records yet.</p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {records.map((r) => (
                    <div key={r.id} className="overflow-hidden rounded-lg border">
                      <img src={r.photoDataUrl} alt="attendance" className="h-32 w-full object-cover" />
                      <div className="p-2 text-xs text-muted-foreground">
                        <div>{r.name || ""} {r.className ? `• ${r.className}` : ""}</div>
                        <div>{new Date(r.timestamp).toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
