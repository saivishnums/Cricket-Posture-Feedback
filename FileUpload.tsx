import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileVideo, X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface FileUploadProps {
  onUploadComplete: (file: File) => void;
}

export function FileUpload({ onUploadComplete }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles?.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.mov', '.avi']
    },
    maxFiles: 1
  });

  const handleUpload = () => {
    if (!file) return;
    
    setUploading(true);
    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onUploadComplete(file), 500); // Wait a bit before completing
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  const removeFile = () => {
    setFile(null);
    setProgress(0);
    setUploading(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {!file ? (
          <div
            {...getRootProps()}
            className={cn(
              "border-2 border-dashed rounded-xl p-12 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 bg-card/30 hover:bg-card/50",
              isDragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
            )}
          >
            <input {...getInputProps()} />
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary shadow-[0_0_15px_rgba(0,255,128,0.2)]">
              <Upload className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">
              {isDragActive ? "Drop video here" : "Upload your batting video"}
            </h3>
            <p className="text-muted-foreground text-center max-w-sm">
              Drag & drop or click to browse. Supports MP4, MOV (Max 50MB)
            </p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border rounded-xl p-6 shadow-xl"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
                  <FileVideo className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground truncate max-w-[200px]">{file.name}</h4>
                  <p className="text-sm text-muted-foreground">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
              </div>
              {!uploading && (
                <Button variant="ghost" size="icon" onClick={removeFile} className="hover:bg-destructive/10 hover:text-destructive">
                  <X className="w-5 h-5" />
                </Button>
              )}
            </div>

            {uploading ? (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-primary font-medium flex items-center gap-2">
                    <Loader2 className="w-3 h-3 animate-spin" /> Processing Neural Network...
                  </span>
                  <span className="text-muted-foreground">{progress}%</span>
                </div>
                <div className="h-2 bg-secondary/20 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-primary to-secondary"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: "linear" }}
                  />
                </div>
              </div>
            ) : (
              <Button onClick={handleUpload} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-[0_0_15px_rgba(0,255,128,0.2)]">
                Start Analysis
              </Button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
