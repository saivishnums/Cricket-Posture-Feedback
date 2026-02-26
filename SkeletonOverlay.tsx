import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface SkeletonOverlayProps {
  showOverlay: boolean;
  videoUrl?: string;
}

export function SkeletonOverlay({ showOverlay, videoUrl }: SkeletonOverlayProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Mock keypoints that would normally come from a pose estimation library (MediaPipe/PoseNet)
  // In a real app, these would update per frame.
  const [keypoints, setKeypoints] = useState([
    { x: 50, y: 20, label: "Head" },
    { x: 50, y: 32, label: "Neck" },
    { x: 42, y: 35, label: "R-Shoulder" },
    { x: 58, y: 35, label: "L-Shoulder" },
    { x: 35, y: 50, label: "R-Elbow" },
    { x: 65, y: 48, label: "L-Elbow" },
    { x: 30, y: 65, label: "R-Hand" },
    { x: 50, y: 55, label: "Spine" },
    { x: 48, y: 70, label: "Hips" },
    { x: 42, y: 85, label: "R-Knee" },
    { x: 58, y: 82, label: "L-Knee" },
    { x: 40, y: 95, label: "R-Ankle" },
    { x: 62, y: 95, label: "L-Ankle" },
  ]);

  const connections = [
    [0, 1], [1, 2], [1, 3],
    [2, 4], [4, 6],
    [3, 5],
    [1, 7], [7, 8],
    [8, 9], [9, 11],
    [8, 10], [10, 12]
  ];

  // Effect to "animate" keypoints slightly to simulate real tracking
  useEffect(() => {
    if (!showOverlay) return;
    
    const interval = setInterval(() => {
      setKeypoints(prev => prev.map(p => ({
        ...p,
        x: p.x + (Math.random() - 0.5) * 0.5,
        y: p.y + (Math.random() - 0.5) * 0.5,
      })));
    }, 100);
    
    return () => clearInterval(interval);
  }, [showOverlay]);

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden border border-border bg-black aspect-video flex items-center justify-center">
      {videoUrl ? (
        <video 
          ref={videoRef}
          src={videoUrl} 
          className={cn("w-full h-full object-contain transition-all duration-500", showOverlay ? "opacity-70 contrast-125" : "opacity-100")}
          autoPlay
          loop
          muted
          playsInline
        />
      ) : (
        <div className="text-muted-foreground flex flex-col items-center gap-2">
           <div className="w-12 h-12 rounded-full border-2 border-dashed border-muted-foreground/30 animate-spin" />
           <span className="text-xs font-mono uppercase tracking-widest">Awaiting Feed...</span>
        </div>
      )}
      
      {showOverlay && videoUrl && (
        <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
            {/* Neural Network HUD */}
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-primary/30 p-2 rounded font-mono text-[10px] text-primary space-y-1">
                <div className="flex justify-between gap-4"><span>STATUS:</span> <span className="text-secondary animate-pulse">TRACKING</span></div>
                <div className="flex justify-between gap-4"><span>TARGET:</span> <span>CRICKET_BATTER</span></div>
                <div className="flex justify-between gap-4"><span>ENGINE:</span> <span>POSE_V3_ALPHA</span></div>
            </div>

            {/* Grid Overlay */}
            <div className="absolute inset-0 grid-bg opacity-20" />
            
            {/* Scan Line */}
            <div className="scan-line" />

            {/* Skeleton Connections */}
            <svg className="absolute inset-0 w-full h-full">
              {connections.map(([start, end], i) => (
                <motion.line
                  key={`conn-${i}`}
                  x1={`${keypoints[start].x}%`}
                  y1={`${keypoints[start].y}%`}
                  x2={`${keypoints[end].x}%`}
                  y2={`${keypoints[end].y}%`}
                  stroke="hsl(150, 100%, 45%)"
                  strokeWidth="1.5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                />
              ))}
            </svg>

            {/* Keypoints */}
            {keypoints.map((point, i) => (
              <motion.div
                key={`point-${i}`}
                className="absolute w-2 h-2 bg-primary rounded-full border border-background shadow-[0_0_8px_theme('colors.primary')]"
                style={{ left: `calc(${point.x}% - 4px)`, top: `calc(${point.y}% - 4px)` }}
              >
                <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-40" />
              </motion.div>
            ))}

            {/* Batting Specific Angle (Elbow) */}
            <div 
              className="absolute bg-background/90 border border-primary/50 text-primary px-1.5 py-0.5 rounded text-[9px] font-bold"
              style={{ left: `${keypoints[4].x}%`, top: `${keypoints[4].y}%` }}
            >
              ELBOW: 142°
            </div>

        </div>
      )}
    </div>
  );
}
