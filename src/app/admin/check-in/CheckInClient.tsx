"use client";

import { useEffect, useRef, useState } from "react";
import jsQR from "jsqr";
import { CheckCircle2, XCircle, ScanLine, Camera, CameraOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { verifyMemberCard, type CheckInResult } from "./actions";

interface LogEntry {
  id: string;
  time: string;
  valid: boolean;
  reason: string;
  name?: string;
}

interface Props {
  initialLog: LogEntry[];
}

export default function CheckInClient({ initialLog }: Props) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CheckInResult | null>(null);
  const [log, setLog] = useState<LogEntry[]>(initialLog);
  const [cameraOn, setCameraOn] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number | null>(null);
  const scanningRef = useRef(false);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const runCheck = async (value: string) => {
    const trimmed = value.trim();
    if (!trimmed || loading) return;
    setLoading(true);
    try {
      const res = await verifyMemberCard(trimmed);
      setResult(res);
      setLog((prev) => [
        {
          id: `${Date.now()}`,
          time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
          valid: res.valid,
          reason: res.reason,
          name: res.member?.name,
        },
        ...prev,
      ].slice(0, 20));
    } catch {
      setResult({ valid: false, reason: "Gagal memverifikasi. Coba lagi." });
    } finally {
      setLoading(false);
      setCode("");
      inputRef.current?.focus();
    }
  };

  const stopCamera = () => {
    scanningRef.current = false;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setCameraOn(false);
  };

  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setCameraOn(true);
      scanningRef.current = true;
      tick();
    } catch {
      setCameraError("Tidak bisa akses kamera. Cek izin browser, atau pakai input manual di bawah.");
    }
  };

  const tick = () => {
    if (!scanningRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas && video.readyState === video.HAVE_ENOUGH_DATA) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const decoded = jsQR(imageData.data, imageData.width, imageData.height);
        if (decoded?.data) {
          stopCamera();
          runCheck(decoded.data);
          return;
        }
      }
    }
    rafRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        {/* Scan input */}
        <div className="glass rounded-2xl border border-border/20 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold flex items-center gap-2">
              <ScanLine size={18} className="text-primary" /> Scan / Input Kode Member
            </h2>
            <Button
              variant={cameraOn ? "glass" : "neon"}
              size="sm"
              onClick={() => (cameraOn ? stopCamera() : startCamera())}
            >
              {cameraOn ? <><CameraOff size={14} /> Matikan Kamera</> : <><Camera size={14} /> Scan Kamera</>}
            </Button>
          </div>

          {cameraOn && (
            <div className="relative rounded-xl overflow-hidden mb-4 bg-black aspect-video">
              <video ref={videoRef} className="w-full h-full object-cover" muted playsInline />
              <div className="absolute inset-0 border-2 border-primary/60 m-8 rounded-xl pointer-events-none" />
            </div>
          )}
          <canvas ref={canvasRef} className="hidden" />

          {cameraError && (
            <p className="text-xs text-red-400 mb-4">{cameraError}</p>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              runCheck(code);
            }}
            className="flex gap-2"
          >
            <input
              ref={inputRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Scan pakai alat barcode/QR, atau ketik kode manual..."
              className="flex-1 px-4 py-3 rounded-xl bg-card border border-border/30 text-sm focus:outline-none focus:border-primary/60"
              autoComplete="off"
            />
            <Button type="submit" variant="hero" disabled={loading || !code.trim()}>
              {loading ? <Loader2 size={16} className="animate-spin" /> : "Cek"}
            </Button>
          </form>
        </div>

        {/* Result */}
        {result && (
          <div
            className={`rounded-2xl border p-6 flex items-start gap-4 ${
              result.valid ? "border-green-500/40 bg-green-500/5" : "border-red-500/40 bg-red-500/5"
            }`}
          >
            {result.valid ? (
              <CheckCircle2 size={40} className="text-green-400 shrink-0" />
            ) : (
              <XCircle size={40} className="text-red-400 shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <p className={`text-lg font-black mb-1 ${result.valid ? "text-green-400" : "text-red-400"}`}>
                {result.valid ? "AKSES DITERIMA" : "AKSES DITOLAK"}
              </p>
              <p className="text-sm text-muted-foreground mb-3">{result.reason}</p>
              {result.member && (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center text-xs font-bold shrink-0">
                    {result.member.initials}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm truncate">{result.member.name}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {result.member.planName} · berlaku sampai {result.member.endDate}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Recent log */}
      <div className="glass rounded-2xl border border-border/20 p-5 h-fit">
        <h3 className="font-bold text-sm mb-4">Riwayat Terbaru</h3>
        {log.length === 0 ? (
          <p className="text-xs text-muted-foreground">Belum ada aktivitas scan.</p>
        ) : (
          <div className="space-y-2.5">
            {log.map((entry) => (
              <div key={entry.id} className="flex items-center gap-2.5 text-xs">
                {entry.valid ? (
                  <CheckCircle2 size={14} className="text-green-400 shrink-0" />
                ) : (
                  <XCircle size={14} className="text-red-400 shrink-0" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{entry.name ?? entry.reason}</p>
                </div>
                <span className="text-muted-foreground shrink-0">{entry.time}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
