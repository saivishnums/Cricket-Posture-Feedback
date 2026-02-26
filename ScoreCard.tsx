import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { CheckCircle2, AlertTriangle, AlertCircle } from "lucide-react";

interface ScoreCardProps {
  score: number;
  label: string;
  feedback: string;
  status: 'good' | 'average' | 'poor';
}

export function ScoreCard({ score, label, feedback, status }: ScoreCardProps) {
  const getColor = () => {
    if (status === 'good') return 'text-primary';
    if (status === 'average') return 'text-yellow-500';
    return 'text-destructive';
  };

  const getIcon = () => {
    if (status === 'good') return <CheckCircle2 className="w-5 h-5 text-primary" />;
    if (status === 'average') return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
    return <AlertCircle className="w-5 h-5 text-destructive" />;
  };

  return (
    <Card className="bg-card/50 border-primary/10 backdrop-blur-sm overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{label}</CardTitle>
          {getIcon()}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-end gap-2 mb-2">
            <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-4xl font-bold font-display ${getColor()}`}
            >
                {score}%
            </motion.span>
        </div>
        <Progress value={score} className="h-2 mb-3 bg-muted" />
        <p className="text-xs text-muted-foreground leading-relaxed">
          {feedback}
        </p>
      </CardContent>
    </Card>
  );
}
