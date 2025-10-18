import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ArrowLeft, Wand2, Split, Vote, Skull } from "lucide-react";

interface StoryWritingProps {
  onNavigate: (screen: string) => void;
}

export function StoryWriting({ onNavigate }: StoryWritingProps) {
  const [storyText, setStoryText] = useState(
      "Once upon a time in a magical forest, three friends discovered a mysterious glowing portal...\n\n[AI SUGGESTION] The portal shimmered with rainbow colors and seemed to whisper ancient secrets.\n\nAlex stepped forward bravely and said, 'We should go through it!'"
  );

  const moods = [
    { emoji: "😄", label: "Happy", color: "bg-yellow-400" },
    { emoji: "😱", label: "Suspense", color: "bg-purple-500" },
    { emoji: "😢", label: "Sad", color: "bg-blue-400" },
    { emoji: "😡", label: "Conflict", color: "bg-red-500" },
    { emoji: "🤔", label: "Mysterious", color: "bg-indigo-500" },
  ];

  const friends = [
    { name: "Alex", emoji: "🦊", isAI: false },
    { name: "Sam", emoji: "🐼", isAI: false },
    { name: "AI", emoji: "🤖", isAI: true },
  ];

  const [selectedMood, setSelectedMood] = useState("Mysterious");

  return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 p-6">
        <div className="max-w-7xl mx-auto space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                  onClick={() => onNavigate("lobby")}
                  variant="outline"
                  className="bg-white/90 hover:bg-white font-semibold"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <h2 className="text-3xl font-bold text-white">Story Writing Room ✨</h2>
            </div>
            <Button
                onClick={() => onNavigate("progress")}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 font-semibold"
            >
              View Progress →
            </Button>
          </div>

          <div className="grid lg:grid-cols-4 gap-4">
            {/* Friends Panel */}
            <Card className="lg:col-span-1 p-4 bg-white/95 backdrop-blur">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                Collaborators
                <span className="text-xl">👥</span>
              </h3>
              <div className="space-y-3">
                {friends.map((friend, index) => (
                    <div
                        key={index}
                        className={`p-3 rounded-lg border-2 ${
                            friend.isAI
                                ? "bg-gradient-to-r from-cyan-50 to-blue-50 border-cyan-300"
                                : "bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200"
                        }`}
                    >
                      <div className="flex items-center gap-2">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="text-lg">
                            {friend.emoji}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-gray-900">{friend.name}</div>
                          {friend.isAI && (
                              <div className="flex items-center gap-1 text-xs text-cyan-600 font-medium">
                                <Wand2 className="h-3 w-3" />
                                AI Assistant
                              </div>
                          )}
                        </div>
                      </div>
                    </div>
                ))}
              </div>

              {/* Mood Selector */}
              <div className="mt-6">
                <h3 className="font-bold text-gray-900 mb-3">Story Mood</h3>
                <div className="space-y-2">
                  {moods.map((mood) => (
                      <button
                          key={mood.label}
                          onClick={() => setSelectedMood(mood.label)}
                          className={`w-full p-2 rounded-lg flex items-center gap-2 transition-all ${
                              selectedMood === mood.label
                                  ? "bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-400 scale-105"
                                  : "bg-gray-50 border border-gray-200 hover:bg-gray-100"
                          }`}
                      >
                        <span className="text-xl">{mood.emoji}</span>
                        <span className="text-sm font-semibold text-gray-900">{mood.label}</span>
                      </button>
                  ))}
                </div>
              </div>
            </Card>

            {/* Main Story Area */}
            <Card className="lg:col-span-3 p-6 bg-white/95 backdrop-blur">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">The Epic Tale 📖</h3>
                  <Badge className="bg-purple-500 text-white font-semibold">
                    {selectedMood} {moods.find((m) => m.label === selectedMood)?.emoji}
                  </Badge>
                </div>

                {/* Story Text Area */}
                <div className="relative">
                  <Textarea
                      value={storyText}
                      onChange={(e) => setStoryText(e.target.value)}
                      className="min-h-[400px] bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-orange-200 p-4 text-base leading-relaxed font-medium"
                      placeholder="Start writing your story..."
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant="outline" className="bg-white/90 font-semibold">
                      AI text in blue
                    </Badge>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-3 gap-3">
                  <Button
                      className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold"
                      onClick={() => {
                        setStoryText(
                            storyText +
                            "\n\n[AI TWIST] Suddenly, the ground began to shake and a hidden treasure chest appeared!"
                        );
                      }}
                  >
                    <Split className="mr-2 h-4 w-4" />
                    Add Twist
                  </Button>

                  <Button
                      className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold"
                      onClick={() => alert("Vote on: Should they enter the portal?")}
                  >
                    <Vote className="mr-2 h-4 w-4" />
                    Vote on Choice
                  </Button>

                  <Button
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold"
                      onClick={() => {
                        setStoryText(
                            storyText +
                            "\n\n[AI VILLAIN] A dark shadow emerged - the Shadow Keeper, guardian of forgotten realms!"
                        );
                      }}
                  >
                    <Skull className="mr-2 h-4 w-4" />
                    AI Suggests Villain
                  </Button>
                </div>

                {/* Legend */}
                <div className="flex gap-4 text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-cyan-200 border border-cyan-400 rounded"></div>
                    <span className="text-gray-900">AI Generated</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-purple-200 border border-purple-400 rounded"></div>
                    <span className="text-gray-900">Friend's Text</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
  );
}