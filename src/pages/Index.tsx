import { useState } from "react";
import { OnboardingForm } from "@/components/onboarding/OnboardingForm";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { BootcampView } from "@/components/bootcamp/BootcampView";

interface UserProfile {
  neurodivergence: string;
  preferences: string[];
  learningStyle: string;
}

type AppState = "onboarding" | "dashboard" | "bootcamp";

const Index = () => {
  const [appState, setAppState] = useState<AppState>("onboarding");
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [selectedBootcamp, setSelectedBootcamp] = useState<string | null>(null);

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
      />
    );
  }

  return null;
};

export default Index;
