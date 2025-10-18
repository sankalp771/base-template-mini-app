"use client";

import React, { useState } from "react";
import { HomeScreen } from "../components/HomeScreen";
import { StoryLobby } from "../components/StoryLobby";
import { StoryWriting } from "../components/StoryWriting";
import { StoryProgress } from "../components/StoryProgress";
import { StoryOutcome } from "../components/StoryOutcome";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<string>("home");

  const renderScreen = () => {
    switch (currentScreen) {
      case "home":
        return <HomeScreen onNavigate={setCurrentScreen} />;
      case "lobby":
        return <StoryLobby onNavigate={setCurrentScreen} />;
      case "writing":
        return <StoryWriting onNavigate={setCurrentScreen} />;
      case "progress":
        return <StoryProgress onNavigate={setCurrentScreen} />;
      case "outcome":
        return <StoryOutcome onNavigate={setCurrentScreen} />;
      default:
        return <HomeScreen onNavigate={setCurrentScreen} />;
    }
  };

  return <div className="size-full">{renderScreen()}</div>;
}
