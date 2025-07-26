import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Play, 
  CheckCircle2, 
  Clock, 
  Users, 
  Star, 
  Trophy,
  Target,
  BookOpen
} from "lucide-react";

interface Module {
  id: string;
  title: string;
  description: string;
  duration: string;
  completed: boolean;
  locked: boolean;
  xp: number;
}

interface BootcampViewProps {
  bootcampId: string;
  onBack: () => void;
}

export function BootcampView({ bootcampId, onBack }: BootcampViewProps) {
  const [completedModules, setCompletedModules] = useState<string[]>([]);

  // Mock data - in a real app, this would come from an API
  const bootcampData = {
    frontend: {
      title: "Desenvolvimento Front-end",
      description: "Aprenda React, TypeScript e design responsivo com projetos práticos adaptados ao seu ritmo.",
      totalDuration: "12 semanas",
      participants: 156,
      rating: 4.8,
      xpEarned: 240,
      totalXp: 1200,
      modules: [
        {
          id: "html-css",
          title: "Fundamentos HTML & CSS",
          description: "Base sólida em estruturação e estilização web",
          duration: "2 semanas",
          completed: true,
          locked: false,
          xp: 100,
        },
        {
          id: "javascript",
          title: "JavaScript Essencial",
          description: "Lógica de programação e DOM manipulation",
          duration: "3 semanas",
          completed: true,
          locked: false,
          xp: 140,
        },
        {
          id: "react-basics",
          title: "React Fundamentos",
          description: "Componentes, props, state e hooks",
          duration: "3 semanas",
          completed: false,
          locked: false,
          xp: 160,
        },
        {
          id: "typescript",
          title: "TypeScript para React",
          description: "Tipagem estática e desenvolvimento escalável",
          duration: "2 semanas",
          completed: false,
          locked: true,
          xp: 120,
        },
        {
          id: "advanced-react",
          title: "React Avançado",
          description: "Context, custom hooks e otimização",
          duration: "2 semanas",
          completed: false,
          locked: true,
          xp: 180,
        },
      ] as Module[],
    },
    // Add other bootcamps here...
  };

  const bootcamp = bootcampData[bootcampId as keyof typeof bootcampData];
  if (!bootcamp) return null;

  const progressPercentage = (bootcamp.xpEarned / bootcamp.totalXp) * 100;
  const completedCount = bootcamp.modules.filter(m => m.completed).length;

  const handleModuleStart = (moduleId: string) => {
    // In a real app, this would navigate to the module content
    console.log(`Starting module: ${moduleId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-calm">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-primary-foreground hover:bg-primary-foreground/20 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao dashboard
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {bootcamp.title}
              </h1>
              <p className="text-xl opacity-90 mb-6">
                {bootcamp.description}
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 mb-6">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>{bootcamp.totalDuration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>{bootcamp.participants} participantes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 fill-current text-yellow-300" />
                  <span>{bootcamp.rating}</span>
                </div>
              </div>
            </div>

            {/* Progress Card */}
            <Card className="bg-primary-foreground/10 border-primary-foreground/20">
              <CardHeader>
                <CardTitle className="text-primary-foreground flex items-center">
                  <Trophy className="w-5 h-5 mr-2" />
                  Seu Progresso
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Conclusão</span>
                    <span className="font-bold">{progressPercentage.toFixed(0)}%</span>
                  </div>
                  <Progress value={progressPercentage} className="h-3" />
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{bootcamp.xpEarned}</div>
                    <div className="opacity-80">XP Earned</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{completedCount}/{bootcamp.modules.length}</div>
                    <div className="opacity-80">Módulos</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Tabs defaultValue="modules" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="modules">Módulos</TabsTrigger>
            <TabsTrigger value="progress">Progresso</TabsTrigger>
            <TabsTrigger value="community">Comunidade</TabsTrigger>
          </TabsList>

          <TabsContent value="modules" className="space-y-4">
            {bootcamp.modules.map((module, index) => (
              <Card 
                key={module.id} 
                className={`animate-fade-in transition-smooth ${
                  module.locked ? 'opacity-60' : 'hover:shadow-glow'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          module.completed ? 'bg-success text-success-foreground' :
                          module.locked ? 'bg-muted text-muted-foreground' :
                          'bg-primary text-primary-foreground'
                        }`}>
                          {module.completed ? (
                            <CheckCircle2 className="w-4 h-4" />
                          ) : module.locked ? (
                            <Target className="w-4 h-4" />
                          ) : (
                            <BookOpen className="w-4 h-4" />
                          )}
                        </div>
                        <CardTitle className="text-lg">
                          {module.title}
                        </CardTitle>
                        <Badge variant={
                          module.completed ? 'success' :
                          module.locked ? 'secondary' : 'default'
                        }>
                          {module.completed ? 'Concluído' :
                           module.locked ? 'Bloqueado' : 'Disponível'}
                        </Badge>
                      </div>
                      <CardDescription className="text-base">
                        {module.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{module.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Trophy className="w-4 h-4" />
                        <span>{module.xp} XP</span>
                      </div>
                    </div>

                    <Button
                      variant={module.completed ? "outline" : "default"}
                      disabled={module.locked}
                      onClick={() => handleModuleStart(module.id)}
                      className="min-w-[120px]"
                    >
                      {module.completed ? (
                        "Revisar"
                      ) : module.locked ? (
                        "Bloqueado"
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Começar
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="progress">
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle>Estatísticas de Progresso</CardTitle>
                <CardDescription>
                  Acompanhe seu desenvolvimento ao longo do bootcamp
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 rounded-lg bg-muted/50">
                    <Trophy className="w-8 h-8 mx-auto mb-3 text-primary" />
                    <div className="text-2xl font-bold">{bootcamp.xpEarned}</div>
                    <div className="text-sm text-muted-foreground">XP Total</div>
                  </div>
                  <div className="text-center p-6 rounded-lg bg-muted/50">
                    <Target className="w-8 h-8 mx-auto mb-3 text-success" />
                    <div className="text-2xl font-bold">{completedCount}</div>
                    <div className="text-sm text-muted-foreground">Módulos Concluídos</div>
                  </div>
                  <div className="text-center p-6 rounded-lg bg-muted/50">
                    <Clock className="w-8 h-8 mx-auto mb-3 text-accent-foreground" />
                    <div className="text-2xl font-bold">{progressPercentage.toFixed(0)}%</div>
                    <div className="text-sm text-muted-foreground">Progresso</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="community">
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle>Comunidade do Bootcamp</CardTitle>
                <CardDescription>
                  Conecte-se com outros participantes e mentores
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">
                    Comunidade em Desenvolvimento
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Em breve você poderá interagir com outros participantes e mentores
                  </p>
                  <Button variant="outline">
                    Receber Notificações
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}