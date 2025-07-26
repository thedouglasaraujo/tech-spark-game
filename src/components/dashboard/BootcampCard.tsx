import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clock, Users, Star, ArrowRight } from "lucide-react";

interface BootcampCardProps {
  title: string;
  description: string;
  duration: string;
  participants: number;
  rating: number;
  progress?: number;
  difficulty: "Iniciante" | "Intermediário" | "Avançado";
  tags: string[];
  isRecommended?: boolean;
  onSelect: () => void;
}

export function BootcampCard({
  title,
  description,
  duration,
  participants,
  rating,
  progress,
  difficulty,
  tags,
  isRecommended = false,
  onSelect,
}: BootcampCardProps) {
  const getDifficultyColor = (level: string) => {
    switch (level) {
      case "Iniciante":
        return "gentle";
      case "Intermediário":
        return "default";
      case "Avançado":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <Card className={`group hover:scale-[1.02] transition-smooth cursor-pointer ${
      isRecommended ? 'ring-2 ring-primary ring-offset-2' : ''
    }`}>
      {isRecommended && (
        <div className="bg-gradient-primary text-primary-foreground px-4 py-2 text-sm font-medium text-center rounded-t-xl">
          ⭐ Recomendado para você
        </div>
      )}
      
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-xl group-hover:text-primary transition-smooth">
              {title}
            </CardTitle>
            <CardDescription className="mt-2 text-base">
              {description}
            </CardDescription>
          </div>
          <Badge variant={getDifficultyColor(difficulty)} className="ml-4">
            {difficulty}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{participants} pessoas</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-current text-yellow-500" />
            <span>{rating}</span>
          </div>
        </div>

        {/* Progress (if enrolled) */}
        {progress !== undefined && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Seu progresso</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Action Button */}
        <Button
          onClick={onSelect}
          variant={isRecommended ? "calm" : "default"}
          className="w-full group"
          size="lg"
        >
          {progress !== undefined ? "Continuar" : "Explorar"} bootcamp
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardContent>
    </Card>
  );
}