import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ArrowLeft, CheckCircle2, Lock, Sparkles } from "lucide-react";

interface StoryProgressProps {
  onNavigate: (screen: string) => void;
}

export function StoryProgress({ onNavigate }: StoryProgressProps) {
  const storyBranches = [
    {
      id: 1,
      text: "Entered the portal",
      author: "Alex",
      emoji: "🦊",
      mood: "😱",
      children: [2, 3],
      completed: true,
    },
    {
      id: 2,
      text: "Found magical forest",
      author: "Sam",
      emoji: "🐼",
      mood: "😄",
      children: [4],
      completed: true,
    },
    {
      id: 3,
      text: "Met the Shadow Keeper",
      author: "AI",
      emoji: "🤖",
      mood: "🤔",
      children: [5],
      completed: true,
      isAI: true,
    },
    {
      id: 4,
      text: "Discovered enchanted flowers",
      author: "Taylor",
      emoji: "🦄",
      mood: "😄",
      children: [],
      completed: false,
    },
    {
      id: 5,
      text: "Battle begins!",
      author: "Alex",
      emoji: "🦊",
      mood: "😡",
      children: [],
      completed: false,
    },
  ];

  const tasks = [
    { text: "Add secret object", status: "active", reward: "🔑" },
    { text: "Unlock new branch", status: "locked", reward: "🌟" },
    { text: "Create plot twist", status: "completed", reward: "✨" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-blue-400 to-purple-400 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => onNavigate("writing")}
              variant="outline"
              className="bg-white/90 hover:bg-white"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Writing
            </Button>
            <h2 className="text-4xl text-white">Story Progress Tree 🌳</h2>
          </div>
          <Button
            onClick={() => onNavigate("outcome")}
            className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600"
          >
            Finish Story →
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Story Tree Visualization */}
          <Card className="lg:col-span-2 p-8 bg-white/95 backdrop-blur">
            <h3 className="text-xl mb-6">Branching Story Paths</h3>
            
            {/* Tree Structure */}
            <div className="relative">
              {/* Root Node */}
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl p-4 shadow-lg max-w-xs">
                    <div className="flex items-center gap-3 mb-2">
                      <Avatar className="w-8 h-8 border-2 border-white">
                        <AvatarFallback className="text-sm">
                          {storyBranches[0].emoji}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-white">{storyBranches[0].author}</span>
                      <span className="text-2xl">{storyBranches[0].mood}</span>
                    </div>
                    <p className="text-white text-sm">{storyBranches[0].text}</p>
                  </div>
                  <CheckCircle2 className="absolute -top-2 -right-2 h-6 w-6 text-green-500 bg-white rounded-full" />
                </div>
              </div>

              {/* Branching Arrows */}
              <div className="flex justify-center mb-4">
                <svg width="200" height="40" className="overflow-visible">
                  <path
                    d="M 100 0 Q 60 20 20 40"
                    stroke="#a855f7"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray="5,5"
                  />
                  <path
                    d="M 100 0 Q 140 20 180 40"
                    stroke="#a855f7"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray="5,5"
                  />
                </svg>
              </div>

              {/* Second Level Branches */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                {/* Left Branch */}
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="bg-gradient-to-r from-green-400 to-emerald-400 rounded-2xl p-4 shadow-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <Avatar className="w-8 h-8 border-2 border-white">
                          <AvatarFallback className="text-sm">
                            {storyBranches[1].emoji}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-white">{storyBranches[1].author}</span>
                        <span className="text-2xl">{storyBranches[1].mood}</span>
                      </div>
                      <p className="text-white text-sm">{storyBranches[1].text}</p>
                    </div>
                    <CheckCircle2 className="absolute -top-2 -right-2 h-6 w-6 text-green-500 bg-white rounded-full" />
                  </div>
                </div>

                {/* Right Branch */}
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="bg-gradient-to-r from-cyan-400 to-blue-400 rounded-2xl p-4 shadow-lg border-2 border-cyan-300">
                      <div className="flex items-center gap-3 mb-2">
                        <Avatar className="w-8 h-8 border-2 border-white">
                          <AvatarFallback className="text-sm">
                            {storyBranches[2].emoji}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-white">{storyBranches[2].author}</span>
                        <span className="text-2xl">{storyBranches[2].mood}</span>
                      </div>
                      <p className="text-white text-sm">{storyBranches[2].text}</p>
                      <Badge className="mt-2 bg-white text-cyan-600">AI Generated</Badge>
                    </div>
                    <CheckCircle2 className="absolute -top-2 -right-2 h-6 w-6 text-green-500 bg-white rounded-full" />
                  </div>
                </div>
              </div>

              {/* Third Level - Future Branches */}
              <div className="grid grid-cols-2 gap-6">
                <div className="flex justify-center">
                  <div className="relative opacity-60">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl p-4 shadow-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <Avatar className="w-8 h-8 border-2 border-white">
                          <AvatarFallback className="text-sm">
                            {storyBranches[3].emoji}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-white">{storyBranches[3].author}</span>
                        <span className="text-2xl">{storyBranches[3].mood}</span>
                      </div>
                      <p className="text-white text-sm">{storyBranches[3].text}</p>
                    </div>
                    <Lock className="absolute -top-2 -right-2 h-6 w-6 text-gray-400 bg-white rounded-full p-1" />
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="relative opacity-60">
                    <div className="bg-gradient-to-r from-red-400 to-pink-400 rounded-2xl p-4 shadow-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <Avatar className="w-8 h-8 border-2 border-white">
                          <AvatarFallback className="text-sm">
                            {storyBranches[4].emoji}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-white">{storyBranches[4].author}</span>
                        <span className="text-2xl">{storyBranches[4].mood}</span>
                      </div>
                      <p className="text-white text-sm">{storyBranches[4].text}</p>
                    </div>
                    <Lock className="absolute -top-2 -right-2 h-6 w-6 text-gray-400 bg-white rounded-full p-1" />
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Tasks Panel */}
          <Card className="p-6 bg-white/95 backdrop-blur">
            <h3 className="text-xl mb-4 flex items-center gap-2">
              Story Tasks
              <span className="text-2xl">🎯</span>
            </h3>

            <div className="space-y-4">
              {tasks.map((task, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    task.status === "completed"
                      ? "bg-green-50 border-green-300"
                      : task.status === "active"
                      ? "bg-yellow-50 border-yellow-300 animate-pulse"
                      : "bg-gray-50 border-gray-300 opacity-60"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-3xl">{task.reward}</span>
                    {task.status === "completed" && (
                      <CheckCircle2 className="h-6 w-6 text-green-500" />
                    )}
                    {task.status === "locked" && (
                      <Lock className="h-6 w-6 text-gray-400" />
                    )}
                    {task.status === "active" && (
                      <Sparkles className="h-6 w-6 text-yellow-500" />
                    )}
                  </div>
                  <p>{task.text}</p>
                  {task.status === "active" && (
                    <Button size="sm" className="w-full mt-2 bg-gradient-to-r from-purple-500 to-pink-500">
                      Complete Task
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
              <h4 className="mb-3">Story Stats 📊</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Total Branches:</span>
                  <span>5</span>
                </div>
                <div className="flex justify-between">
                  <span>Completed:</span>
                  <span>3 ✅</span>
                </div>
                <div className="flex justify-between">
                  <span>AI Contributions:</span>
                  <span>40% 🤖</span>
                </div>
                <div className="flex justify-between">
                  <span>Story Mood:</span>
                  <span>Mysterious 🤔</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
