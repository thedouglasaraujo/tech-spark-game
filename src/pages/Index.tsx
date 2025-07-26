import { useState } from "react";
import { OnboardingForm } from "@/components/onboarding/OnboardingForm";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { BootcampView } from "@/components/bootcamp/BootcampView";
import { ModuleExercise } from "@/components/exercise/ModuleExercise";

interface UserProfile {
  neurodivergence: string;
  preferences: string[];
  learningStyle: string;
  resume?: File;
  skills?: {
    hard: string[];
    soft: string[];
  };
}

type AppState = "onboarding" | "dashboard" | "bootcamp" | "exercise";

const Index = () => {
  const [appState, setAppState] = useState<AppState>("onboarding");
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [selectedBootcamp, setSelectedBootcamp] = useState<string | null>(null);
  const [selectedModule, setSelectedModule] = useState<{id: string, name: string} | null>(null);

  const handleOnboardingComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    setAppState("dashboard");
  };

  const handleBootcampSelect = (bootcampId: string) => {
    setSelectedBootcamp(bootcampId);
    setAppState("bootcamp");
  };

  const handleBackToDashboard = () => {
    setAppState("dashboard");
    setSelectedBootcamp(null);
    setSelectedModule(null);
  };

  const handleModuleSelect = (moduleId: string, moduleName: string) => {
    setSelectedModule({ id: moduleId, name: moduleName });
    setAppState("exercise");
  };

  const handleBackToBootcamp = () => {
    setAppState("bootcamp");
    setSelectedModule(null);
  };

  if (appState === "onboarding") {
    return <OnboardingForm onComplete={handleOnboardingComplete} />;
  }

  if (appState === "dashboard" && userProfile) {
    return (
      <Dashboard
        userProfile={userProfile}
        onBootcampSelect={handleBootcampSelect}
      />
    );
  }

  if (appState === "bootcamp" && selectedBootcamp) {
    return (
      <BootcampView
        bootcampId={selectedBootcamp}
        onBack={handleBackToDashboard}
        onModuleSelect={handleModuleSelect}
      />
    );
  }

  if (appState === "exercise" && selectedModule && userProfile) {
    return (
      <ModuleExercise
        moduleId={selectedModule.id}
        moduleName={selectedModule.name}
        onBack={handleBackToBootcamp}
        learningStyle={userProfile.learningStyle}
      />
    );
  }

  return null;
};

export default Index;
