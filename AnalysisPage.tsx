import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { FileUpload } from "@/components/analysis/FileUpload";
import { SkeletonOverlay } from "@/components/analysis/SkeletonOverlay";
import { ScoreCard } from "@/components/analysis/ScoreCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Share2, Download, AlertCircle, Activity, Play, Pause, RotateCcw } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

export default function AnalysisPage() {
  const [step, setStep] = useState<'upload' | 'results'>('upload');
  const [videoUrl, setVideoUrl] = useState<string | undefined>();
  const [isPlaying, setIsPlaying] = useState(true);

  const handleUploadComplete = (file: File) => {
    const url = URL.createObjectURL(file);
    setVideoUrl(url);
    setStep('results');
  };

  // Cleanup URL on unmount
  useEffect(() => {
    return () => {
      if (videoUrl) URL.revokeObjectURL(videoUrl);
    };
  }, [videoUrl]);

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <Navbar />

      <div className="container px-4 md:px-6 pt-24">
        {step === 'upload' ? (
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold font-display text-primary">Neural Batting Analysis</h1>
                <p className="text-muted-foreground">Upload your batting video. Our AI will map your body structure and analyze your technique.</p>
            </div>
            <FileUpload onUploadComplete={handleUploadComplete} />
            
            <div className="flex justify-center gap-12 mt-12">
                <div className="text-center space-y-2">
                    <div className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center mx-auto bg-primary/5">
                        <Activity className="w-5 h-5 text-primary" />
                    </div>
                    <span className="block text-xs font-bold uppercase tracking-widest text-muted-foreground">Batting Only</span>
                </div>
                <div className="text-center space-y-2">
                    <div className="w-12 h-12 rounded-full border border-secondary/30 flex items-center justify-center mx-auto bg-secondary/5">
                        <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                    </div>
                    <span className="block text-xs font-bold uppercase tracking-widest text-muted-foreground">Neural Mapping</span>
                </div>
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" onClick={() => { setStep('upload'); setVideoUrl(undefined); }} className="text-muted-foreground hover:text-foreground">
                        <ArrowLeft className="mr-2 h-4 w-4" /> New Session
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold font-display leading-tight">Batting Analysis Result</h1>
                        <p className="text-xs text-primary font-mono">ID: AI-BAT-X92-2026</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="h-9 px-4"><Share2 className="mr-2 h-4 w-4" /> Share</Button>
                    <Button variant="outline" size="sm" className="h-9 px-4 border-primary/20 text-primary hover:bg-primary/10"><Download className="mr-2 h-4 w-4" /> Export Data</Button>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Visualizer */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="relative group rounded-2xl border border-border bg-black shadow-2xl overflow-hidden ring-1 ring-white/5">
                        <SkeletonOverlay showOverlay={true} videoUrl={videoUrl} />
                        
                        {/* Overlay Controls */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/40 backdrop-blur-xl border border-white/10 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full text-white" onClick={() => setIsPlaying(!isPlaying)}>
                                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-current" />}
                            </Button>
                            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full text-white">
                                <RotateCcw className="h-4 w-4" />
                            </Button>
                            <div className="h-4 w-px bg-white/20 mx-1" />
                            <span className="text-[10px] font-mono text-white/70 px-2">FRAME: 124 / POS: BATTING_DRIVE</span>
                        </div>
                    </div>
                    
                    {/* Performance Timeline */}
                    <div className="bg-card/30 border border-border/50 rounded-xl p-4 backdrop-blur-sm">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Stroke Mechanics Timeline</h3>
                            <div className="flex gap-4 text-[10px] font-mono">
                                <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> STANCE</span>
                                <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-secondary" /> BACKLIFT</span>
                                <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-white" /> IMPACT</span>
                            </div>
                        </div>
                        <div className="h-12 w-full bg-black/40 rounded-lg relative overflow-hidden border border-white/5">
                            <div className="absolute inset-y-0 left-[20%] w-[1px] bg-primary/50" />
                            <div className="absolute inset-y-0 left-[45%] w-[1px] bg-secondary/50" />
                            <div className="absolute inset-y-0 left-[75%] w-[2px] bg-white shadow-[0_0_10px_white]" />
                            <div className="flex items-center h-full px-1 gap-px opacity-20">
                                {Array.from({ length: 80 }).map((_, i) => (
                                    <div key={i} className="flex-1 bg-primary" style={{ height: `${20 + Math.random() * 60}%` }} />
                                ))}
                            </div>
                            <motion.div 
                                className="absolute inset-y-0 w-1 bg-primary shadow-[0_0_15px_theme('colors.primary')]"
                                animate={{ left: ['0%', '100%'] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                            />
                        </div>
                    </div>
                </div>

                {/* Data Sidebar */}
                <div className="space-y-6">
                    <div className="bg-card border border-border p-6 rounded-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 blur-2xl group-hover:bg-primary/10 transition-colors" />
                        <h3 className="font-display text-lg font-bold mb-6 flex items-center">
                            <Activity className="mr-2 h-4 w-4 text-primary" />
                            Batting Efficiency
                        </h3>
                        <div className="flex items-center justify-center py-4 relative">
                            <svg className="w-40 h-40 transform -rotate-90">
                                <circle cx="80" cy="80" r="74" className="stroke-muted/20 fill-none" strokeWidth="12" />
                                <motion.circle 
                                    cx="80" 
                                    cy="80" 
                                    r="74" 
                                    className="stroke-primary fill-none" 
                                    strokeWidth="12" 
                                    strokeDasharray="465" 
                                    initial={{ strokeDashoffset: 465 }}
                                    animate={{ strokeDashoffset: 465 - (465 * 0.87) }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                    strokeLinecap="round" 
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-5xl font-bold font-display tracking-tighter">87%</span>
                                <span className="text-[10px] text-primary font-bold uppercase tracking-widest mt-1">Grade: A+</span>
                            </div>
                        </div>
                        <p className="text-center text-xs text-muted-foreground mt-4 leading-relaxed">
                            Your posture alignment is in the top 5% of all amateur analysis.
                        </p>
                    </div>

                    <Tabs defaultValue="rectify" className="w-full">
                        <TabsList className="w-full h-11 bg-muted/50 p-1 border border-border">
                            <TabsTrigger value="rectify" className="flex-1 text-xs font-bold uppercase tracking-wider data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Rectify</TabsTrigger>
                            <TabsTrigger value="metrics" className="flex-1 text-xs font-bold uppercase tracking-wider">Metrics</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="rectify" className="mt-4 animate-in fade-in zoom-in-95 duration-300">
                            <div className="bg-primary/5 border border-primary/20 p-5 rounded-2xl space-y-5">
                                <div className="flex items-center justify-between">
                                    <h4 className="font-bold text-sm text-primary flex items-center">
                                        <AlertCircle className="w-4 h-4 mr-2" /> Posture Adjustments
                                    </h4>
                                    <span className="text-[10px] font-mono bg-primary/20 text-primary px-2 py-0.5 rounded">High Priority</span>
                                </div>
                                <div className="space-y-4">
                                    <div className="p-3 bg-background/50 rounded-xl border border-border/50">
                                        <p className="text-xs font-bold text-foreground mb-1">Top Hand Grip</p>
                                        <p className="text-[11px] text-muted-foreground">The neural engine detected excessive tension in your right wrist. Loosen by 15% for better swing arc.</p>
                                    </div>
                                    <div className="p-3 bg-background/50 rounded-xl border border-border/50">
                                        <p className="text-xs font-bold text-foreground mb-1">Elbow Extension</p>
                                        <p className="text-[11px] text-muted-foreground">Raise your lead elbow during the backlift to create a straighter bat path on impact.</p>
                                    </div>
                                </div>
                                <Button className="w-full text-[10px] font-bold uppercase tracking-widest h-10" variant="secondary">View Correction Drills</Button>
                            </div>
                        </TabsContent>

                        <TabsContent value="metrics" className="space-y-3 mt-4 animate-in fade-in slide-in-from-right-4 duration-300">
                            <ScoreCard label="Shoulder Line" score={94} status="good" feedback="Excellent level shoulders through impact." />
                            <ScoreCard label="Hip Rotation" score={72} status="average" feedback="Rotation is slightly early. Focus on delayed release." />
                            <ScoreCard label="Knee Flexion" score={88} status="good" feedback="Solid base with good weight distribution." />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
