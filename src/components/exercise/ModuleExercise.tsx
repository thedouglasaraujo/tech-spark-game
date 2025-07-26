import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ModuleExerciseProps {
  moduleId: string;
  moduleName: string;
  onBack: () => void;
  learningStyle: string;
}

export const ModuleExercise = ({ moduleId, moduleName, onBack, learningStyle }: ModuleExerciseProps) => {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);

  // Mock exercises data adaptado ao estilo de aprendizagem
  const getExercisesForLearningStyle = () => {
    const baseExercises = [
      {
        title: "Conceitos Fundamentais",
        description: "Aprenda os conceitos básicos do módulo",
        type: "teoria"
      },
      {
        title: "Exercício Prático",
        description: "Aplique o conhecimento em um projeto real",
        type: "pratico"
      },
      {
        title: "Quiz Interativo",
        description: "Teste seus conhecimentos",
        type: "avaliacao"
      }
    ];

    // Adapta exercícios baseado no estilo de aprendizagem
    switch (learningStyle) {
      case "visual":
        return baseExercises.map(ex => ({
          ...ex,
          adaptedContent: "📊 Conteúdo com diagramas e infográficos"
        }));
      case "auditivo":
        return baseExercises.map(ex => ({
          ...ex,
          adaptedContent: "🎧 Conteúdo em áudio e explicações narradas"
        }));
      case "pratico":
        return baseExercises.map(ex => ({
          ...ex,
          adaptedContent: "⚡ Exercícios hands-on e projetos práticos"
        }));
      default:
        return baseExercises.map(ex => ({
          ...ex,
          adaptedContent: "🎯 Conteúdo multimodal personalizado"
        }));
    }
  };

  const exercises = getExercisesForLearningStyle();

  const handleCompleteExercise = (index: number) => {
    if (!completedExercises.includes(index)) {
      setCompletedExercises([...completedExercises, index]);
    }
    
    if (index < exercises.length - 1) {
      setCurrentExercise(index + 1);
    }
  };

  const progressPercentage = (completedExercises.length / exercises.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-calm p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="icon"
            onClick={onBack}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{moduleName}</h1>
            <p className="text-muted-foreground">
              Exercícios adaptados para aprendizagem {learningStyle}
            </p>
          </div>
        </div>

        {/* Progress */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Progresso do Módulo</CardTitle>
              <Badge variant="secondary">
                {completedExercises.length}/{exercises.length} completos
              </Badge>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-smooth" 
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </CardHeader>
        </Card>

        {/* Current Exercise */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                {completedExercises.includes(currentExercise) ? (
                  <CheckCircle className="h-4 w-4 text-primary" />
                ) : (
                  <Play className="h-4 w-4 text-primary" />
                )}
              </div>
              <div>
                <CardTitle className="text-xl">
                  {exercises[currentExercise]?.title}
                </CardTitle>
                <CardDescription className="text-base">
                  {exercises[currentExercise]?.description}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Conteúdo adaptado */}
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">
                Adaptado para seu estilo de aprendizagem:
              </p>
              <p className="font-medium">
                {exercises[currentExercise]?.adaptedContent}
              </p>
            </div>

            {/* Exercício simulado */}
            <div className="space-y-4">
              <h3 className="font-semibold">Atividade:</h3>
              <div className="p-6 border border-dashed border-border rounded-lg text-center">
                <p className="text-muted-foreground mb-4">
                  {learningStyle === "visual" && "📊 Aqui apareceria um diagrama interativo"}
                  {learningStyle === "auditivo" && "🎧 Aqui apareceria um player de áudio"}
                  {learningStyle === "pratico" && "⚡ Aqui apareceria um ambiente de código"}
                  {learningStyle === "misto" && "🎯 Aqui apareceria conteúdo multimodal"}
                </p>
                <Button 
                  onClick={() => handleCompleteExercise(currentExercise)}
                  disabled={completedExercises.includes(currentExercise)}
                  variant="calm"
                >
                  {completedExercises.includes(currentExercise) 
                    ? "✅ Concluído" 
                    : "Marcar como Concluído"
                  }
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Exercise Navigation */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Exercícios do Módulo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {exercises.map((exercise, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border cursor-pointer transition-smooth ${
                    index === currentExercise
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setCurrentExercise(index)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-background flex items-center justify-center">
                      {completedExercises.includes(index) ? (
                        <CheckCircle className="h-4 w-4 text-primary" />
                      ) : (
                        <span className="text-xs font-medium">{index + 1}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{exercise.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {exercise.adaptedContent}
                      </p>
                    </div>
                    <Badge variant={exercise.type === "pratico" ? "default" : "secondary"}>
                      {exercise.type}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};