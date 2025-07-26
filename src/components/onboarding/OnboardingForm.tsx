import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

interface OnboardingData {
  neurodivergence: string;
  preferences: string[];
  learningStyle: string;
}

interface OnboardingFormProps {
  onComplete: (data: OnboardingData) => void;
}

export function OnboardingForm({ onComplete }: OnboardingFormProps) {
  const [step, setStep] = useState(1);
  const [neurodivergence, setNeurodivergence] = useState("");
  const [preferences, setPreferences] = useState<string[]>([]);
  const [learningStyle, setLearningStyle] = useState("");
  const { toast } = useToast();

  const handlePreferenceChange = (preference: string, checked: boolean) => {
    if (checked) {
      setPreferences([...preferences, preference]);
    } else {
      setPreferences(preferences.filter(p => p !== preference));
    }
  };

  const handleSubmit = () => {
    if (!neurodivergence || !learningStyle) {
      toast({
        title: "Informações incompletas",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    onComplete({
      neurodivergence,
      preferences,
      learningStyle,
    });

    toast({
      title: "Perfil criado com sucesso! 🎉",
      description: "Vamos encontrar os melhores bootcamps para você.",
    });
  };

  const neurodivergenceOptions = [
    { value: "tdah", label: "TDAH (Transtorno de Déficit de Atenção/Hiperatividade)" },
    { value: "autismo", label: "Transtorno do Espectro Autista (TEA)" },
    { value: "dislexia", label: "Dislexia" },
    { value: "sindrome-asperger", label: "Síndrome de Asperger" },
    { value: "outro", label: "Outro" },
    { value: "prefiro-nao-informar", label: "Prefiro não informar" },
  ];

  const preferenceOptions = [
    "Conteúdo em áudio",
    "Texto simplificado",
    "Cores suaves",
    "Foco reduzido (menos distrações)",
    "Pausas frequentes",
    "Exemplos práticos",
    "Conteúdo visual",
    "Ritmo personalizado",
  ];

  const learningStyles = [
    { value: "visual", label: "Visual", description: "Prefiro diagramas, imagens e conteúdo visual" },
    { value: "auditivo", label: "Auditivo", description: "Aprendo melhor ouvindo explicações e podcasts" },
    { value: "pratico", label: "Prático", description: "Gosto de exercícios hands-on e projetos reais" },
    { value: "misto", label: "Misto", description: "Combino diferentes estilos de aprendizagem" },
  ];

  return (
    <div className="min-h-screen bg-gradient-calm flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* Progress indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`w-3 h-3 rounded-full transition-smooth ${
                  s <= step ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>

        <Card className="animate-fade-in">
          {step === 1 && (
            <>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-foreground">
                  Bem-vindo(a) à sua jornada em tech! 🚀
                </CardTitle>
                <CardDescription className="text-lg">
                  Vamos conhecer você melhor para personalizar sua experiência
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label className="text-base font-medium">
                    Como você se identifica? (Opcional)
                  </Label>
                  <RadioGroup value={neurodivergence} onValueChange={setNeurodivergence}>
                    {neurodivergenceOptions.map((option) => (
                      <div key={option.value} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-smooth">
                        <RadioGroupItem value={option.value} id={option.value} />
                        <Label htmlFor={option.value} className="cursor-pointer flex-1">
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                <Button 
                  onClick={() => setStep(2)} 
                  className="w-full" 
                  variant="calm"
                  size="lg"
                  disabled={!neurodivergence}
                >
                  Continuar
                </Button>
              </CardContent>
            </>
          )}

          {step === 2 && (
            <>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-foreground">
                  Suas preferências de aprendizagem 🎯
                </CardTitle>
                <CardDescription className="text-lg">
                  Selecione o que torna o aprendizado mais confortável para você
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label className="text-base font-medium">
                    Quais recursos você gostaria de ter disponíveis?
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {preferenceOptions.map((preference) => (
                      <div key={preference} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-smooth">
                        <Checkbox
                          id={preference}
                          checked={preferences.includes(preference)}
                          onCheckedChange={(checked) => 
                            handlePreferenceChange(preference, checked as boolean)
                          }
                        />
                        <Label htmlFor={preference} className="cursor-pointer flex-1">
                          {preference}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex space-x-4">
                  <Button 
                    onClick={() => setStep(1)} 
                    variant="outline"
                    className="flex-1"
                  >
                    Voltar
                  </Button>
                  <Button 
                    onClick={() => setStep(3)} 
                    variant="calm"
                    className="flex-1"
                  >
                    Continuar
                  </Button>
                </div>
              </CardContent>
            </>
          )}

          {step === 3 && (
            <>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-foreground">
                  Como você aprende melhor? 📚
                </CardTitle>
                <CardDescription className="text-lg">
                  Isso nos ajuda a personalizar o conteúdo para você
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <RadioGroup value={learningStyle} onValueChange={setLearningStyle}>
                    {learningStyles.map((style) => (
                      <div key={style.value} className="flex items-start space-x-3 p-4 rounded-lg hover:bg-muted/50 transition-smooth border border-transparent hover:border-border">
                        <RadioGroupItem value={style.value} id={style.value} className="mt-1" />
                        <div className="flex-1 cursor-pointer" onClick={() => setLearningStyle(style.value)}>
                          <Label htmlFor={style.value} className="cursor-pointer font-medium">
                            {style.label}
                          </Label>
                          <p className="text-sm text-muted-foreground mt-1">
                            {style.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                <div className="flex space-x-4">
                  <Button 
                    onClick={() => setStep(2)} 
                    variant="outline"
                    className="flex-1"
                  >
                    Voltar
                  </Button>
                  <Button 
                    onClick={handleSubmit} 
                    variant="calm"
                    className="flex-1"
                    disabled={!learningStyle}
                  >
                    Começar minha jornada! 🎉
                  </Button>
                </div>
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}