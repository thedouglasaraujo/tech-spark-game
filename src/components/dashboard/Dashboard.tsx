import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BootcampCard } from "./BootcampCard";
import { Search, Filter, Trophy, BookOpen, Target } from "lucide-react";
import heroImage from "@/assets/hero-neurodivergent.jpg";

interface DashboardProps {
  userProfile: {
    neurodivergence: string;
    preferences: string[];
    learningStyle: string;
    resume?: File;
    skills?: {
      hard: string[];
      soft: string[];
    };
  };
  onBootcampSelect: (bootcampId: string) => void;
}

export function Dashboard({ userProfile, onBootcampSelect }: DashboardProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const bootcamps = [
    {
      id: "frontend",
      title: "Desenvolvimento Front-end",
      description: "Aprenda React, TypeScript e design responsivo com projetos práticos adaptados ao seu ritmo.",
      duration: "12 semanas",
      participants: 156,
      rating: 4.8,
      difficulty: "Iniciante" as const,
      tags: ["React", "TypeScript", "CSS", "Acessibilidade"],
      isRecommended: userProfile.learningStyle === "visual" || userProfile.learningStyle === "pratico",
    },
    {
      id: "qa",
      title: "Quality Assurance (QA)",
      description: "Domine testes manuais e automatizados com metodologias ágeis e ferramentas modernas.",
      duration: "10 semanas",
      participants: 89,
      rating: 4.7,
      difficulty: "Intermediário" as const,
      tags: ["Testes", "Automação", "Selenium", "Metodologias Ágeis"],
      isRecommended: userProfile.neurodivergence === "autismo" || userProfile.learningStyle === "pratico",
    },
    {
      id: "dados",
      title: "Análise de Dados",
      description: "Explore Python, SQL e visualização de dados com projetos reais e feedback contínuo.",
      duration: "14 semanas",
      participants: 134,
      rating: 4.9,
      difficulty: "Iniciante" as const,
      tags: ["Python", "SQL", "Power BI", "Estatística"],
      isRecommended: userProfile.learningStyle === "visual" || userProfile.neurodivergence === "tdah",
      progress: 25,
    },
    {
      id: "devops",
      title: "DevOps e Cloud",
      description: "Infraestrutura como código, CI/CD e computação em nuvem de forma prática e gradual.",
      duration: "16 semanas",
      participants: 67,
      rating: 4.6,
      difficulty: "Avançado" as const,
      tags: ["AWS", "Docker", "Kubernetes", "CI/CD"],
      isRecommended: false,
    },
  ];

  const filteredBootcamps = bootcamps.filter(bootcamp => {
    const matchesSearch = bootcamp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bootcamp.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = !selectedFilter || bootcamp.difficulty === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const recommendedCount = bootcamps.filter(b => b.isRecommended).length;
  const inProgressCount = bootcamps.filter(b => b.progress !== undefined).length;

  return (
    <div className="min-h-screen bg-gradient-calm">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-primary">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Pessoas neurodivergentes trabalhando com tecnologia"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 py-16">
          <div className="text-center text-primary-foreground">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
              Sua jornada em tech começa aqui! 🚀
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Bootcamps personalizados para pessoas neurodivergentes
            </p>
            
            {/* Quick Stats */}
            <div className="flex justify-center space-x-8 mb-8">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-primary-foreground/20 rounded-full mb-2 mx-auto">
                  <Target className="w-6 h-6" />
                </div>
                <div className="text-2xl font-bold">{recommendedCount}</div>
                <div className="text-sm opacity-80">Recomendados</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-primary-foreground/20 rounded-full mb-2 mx-auto">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div className="text-2xl font-bold">{inProgressCount}</div>
                <div className="text-sm opacity-80">Em andamento</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-primary-foreground/20 rounded-full mb-2 mx-auto">
                  <Trophy className="w-6 h-6" />
                </div>
                <div className="text-2xl font-bold">4.8</div>
                <div className="text-sm opacity-80">Avaliação média</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Profile Summary */}
        <Card className="mb-8 animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center">
              <div className="w-2 h-2 bg-success rounded-full mr-3 animate-gentle-bounce"></div>
              Seu perfil personalizado
            </CardTitle>
            <CardDescription>
              Bootcamps selecionados com base nas suas preferências de aprendizagem
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="gentle">
                  Estilo: {userProfile.learningStyle}
                </Badge>
                {userProfile.preferences.slice(0, 3).map((pref) => (
                  <Badge key={pref} variant="outline">
                    {pref}
                  </Badge>
                ))}
                {userProfile.preferences.length > 3 && (
                  <Badge variant="outline">
                    +{userProfile.preferences.length - 3} mais
                  </Badge>
                )}
              </div>

              {userProfile.skills && (
                <div className="space-y-3 border-t border-border pt-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground mb-2 block">
                      Hard Skills (extraídas do seu currículo)
                    </Label>
                    <div className="flex flex-wrap gap-1">
                      {userProfile.skills.hard.map((skill) => (
                        <Badge key={skill} variant="default" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground mb-2 block">
                      Soft Skills (extraídas do seu currículo)
                    </Label>
                    <div className="flex flex-wrap gap-1">
                      {userProfile.skills.soft.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Buscar bootcamps..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={selectedFilter === null ? "default" : "outline"}
              onClick={() => setSelectedFilter(null)}
              size="sm"
            >
              <Filter className="w-4 h-4 mr-2" />
              Todos
            </Button>
            {["Iniciante", "Intermediário", "Avançado"].map((level) => (
              <Button
                key={level}
                variant={selectedFilter === level ? "default" : "outline"}
                onClick={() => setSelectedFilter(selectedFilter === level ? null : level)}
                size="sm"
              >
                {level}
              </Button>
            ))}
          </div>
        </div>

        {/* Bootcamps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredBootcamps.map((bootcamp, index) => (
            <div
              key={bootcamp.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <BootcampCard
                {...bootcamp}
                onSelect={() => onBootcampSelect(bootcamp.id)}
              />
            </div>
          ))}
        </div>

        {filteredBootcamps.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground text-lg mb-4">
              Nenhum bootcamp encontrado
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setSelectedFilter(null);
              }}
            >
              Limpar filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}