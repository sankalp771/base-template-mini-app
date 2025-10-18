import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ArrowLeft, Share2, Download, RotateCcw, Star, Sparkles } from "lucide-react";

interface StoryOutcomeProps {
  onNavigate: (screen: string) => void;
}

export function StoryOutcome({ onNavigate }: StoryOutcomeProps) {
  const storyLines = [
    {
      text: "Once upon a time in a magical forest, three friends discovered a mysterious glowing portal...",
      author: "Alex",
      emoji: "🦊",
      type: "user",
    },
    {
      text: "The portal shimmered with rainbow colors and seemed to whisper ancient secrets.",
      author: "AI",
      emoji: "🤖",
      type: "ai",
    },
    {
      text: "Alex stepped forward bravely and said, 'We should go through it!'",
      author: "Alex",
      emoji: "🦊",
      type: "user",
    },
    {
      text: "As they entered, they found themselves in an enchanted realm filled with talking animals and floating islands.",
      author: "Sam",
      emoji: "🐼",
      type: "user",
    },
    {
      text: "Suddenly, the Shadow Keeper emerged from the mist, challenging them to solve three riddles.",
      author: "AI",
      emoji: "🤖",
      type: "ai",
    },
    {
      text: "Working together, they solved each riddle, unlocking the path to the Crystal of Friendship.",
      author: "Taylor",
      emoji: "🦄",
      type: "user",
    },
    {
      text: "And so, their adventure became legend, reminding everyone that true friendship can overcome any challenge. The End.",
      author: "AI",
      emoji: "🤖",
      type: "ai",
    },
  ];

  return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-pink-300 to-purple-400 p-6 relative overflow-hidden">
        {/* Celebratory Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
              <div
                  key={i}
                  className="absolute animate-bounce text-4xl"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${2 + Math.random() * 2}s`,
                  }}
              >
                {["✨", "⭐", "🎉", "🎊", "💫", "🌟"][Math.floor(Math.random() * 6)]}
              </div>
          ))}
        </div>

        <div className="max-w-5xl mx-auto space-y-6 relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                  onClick={() => onNavigate("home")}
                  variant="outline"
                  className="bg-white/90 hover:bg-white font-semibold"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Home
              </Button>
              <h2 className="text-4xl font-bold text-white drop-shadow-lg">Story Complete! 🎉</h2>
            </div>
          </div>

          {/* Celebration Banner */}
          <Card className="p-6 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 text-white text-center">
            <div className="flex items-center justify-center gap-4 text-5xl mb-4">
              <Star className="animate-spin" style={{ animationDuration: "3s" }} />
              <Sparkles className="animate-pulse" />
              <span>🏆</span>
              <Sparkles className="animate-pulse" />
              <Star className="animate-spin" style={{ animationDuration: "3s" }} />
            </div>
            <h3 className="text-2xl font-bold mb-2">Congratulations!</h3>
            <p className="font-semibold">You and your friends created an amazing story together!</p>
          </Card>

          {/* Story Display */}
          <Card className="p-8 bg-white/95 backdrop-blur">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">The Epic Tale of Friendship 📖</h3>
              <Badge className="bg-purple-500 text-white px-4 py-1 font-semibold">
                Final Version
              </Badge>
            </div>

            <div className="space-y-4">
              {storyLines.map((line, index) => (
                  <div
                      key={index}
                      className={`p-4 rounded-xl border-2 ${
                          line.type === "ai"
                              ? "bg-gradient-to-r from-cyan-50 to-blue-50 border-cyan-300"
                              : "bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200"
                      }`}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="w-10 h-10 border-2 border-white shadow-md">
                        <AvatarFallback className="text-lg bg-white">
                          {line.emoji}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-semibold text-gray-900">{line.author}</span>
                          {line.type === "ai" && (
                              <Badge variant="outline" className="text-xs bg-white font-semibold">
                                AI
                              </Badge>
                          )}
                        </div>
                        <p className="leading-relaxed font-medium text-gray-900">{line.text}</p>
                      </div>
                    </div>
                  </div>
              ))}
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="grid md:grid-cols-3 gap-4">
            <Button
                className="h-16 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-xl font-semibold"
                onClick={() => alert("Sharing story...")}
            >
              <Share2 className="mr-2 h-5 w-5" />
              Share Story
            </Button>

            <Button
                className="h-16 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-xl font-semibold"
                onClick={() => alert("Saving comic version...")}
            >
              <Download className="mr-2 h-5 w-5" />
              Save Comic Version
            </Button>

            <Button
                className="h-16 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-xl font-semibold"
                onClick={() => onNavigate("progress")}
            >
              <RotateCcw className="mr-2 h-5 w-5" />
              Replay Story
            </Button>
          </div>

          {/* Stats Card */}
          <Card className="p-6 bg-white/95 backdrop-blur">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              Story Statistics
              <span className="text-2xl">📊</span>
            </h3>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
                <div className="text-3xl font-bold mb-2">7</div>
                <div className="text-sm font-semibold text-gray-700">Total Paragraphs</div>
              </div>
              <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg">
                <div className="text-3xl font-bold mb-2">3</div>
                <div className="text-sm font-semibold text-gray-700">Contributors</div>
              </div>
              <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
                <div className="text-3xl font-bold mb-2">43%</div>
                <div className="text-sm font-semibold text-gray-700">AI Generated</div>
              </div>
              <div className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg">
                <div className="text-3xl mb-2">🎭</div>
                <div className="text-sm font-semibold text-gray-700">Adventure Genre</div>
              </div>
            </div>
          </Card>

          {/* Contributors Section */}
          <Card className="p-6 bg-white/95 backdrop-blur">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Story Creators 👥</h3>
            <div className="flex justify-center gap-6">
              {[
                { name: "Alex", emoji: "🦊", contributions: 2 },
                { name: "Sam", emoji: "🐼", contributions: 1 },
                { name: "Taylor", emoji: "🦄", contributions: 1 },
                { name: "AI Assistant", emoji: "🤖", contributions: 3 },
              ].map((creator, index) => (
                  <div
                      key={index}
                      className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl"
                  >
                    <Avatar className="w-16 h-16 border-4 border-white shadow-lg">
                      <AvatarFallback className="text-2xl bg-white">
                        {creator.emoji}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                      <div className="font-semibold text-gray-900">{creator.name}</div>
                      <div className="text-sm font-medium text-gray-600">
                        {creator.contributions} {creator.contributions === 1 ? "part" : "parts"}
                      </div>
                    </div>
                  </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
  );
}