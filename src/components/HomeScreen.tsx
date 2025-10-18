import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Sparkles, Users, BookOpen } from "lucide-react";

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
}

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  const mockAvatars = [
    { name: "Alex", emoji: "🦊" },
    { name: "Sam", emoji: "🐼" },
    { name: "Taylor", emoji: "🦄" },
    { name: "Jordan", emoji: "🐸" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-yellow-300 p-8 flex items-center justify-center">
      <div className="max-w-2xl w-full space-y-8 text-center">
        {/* Title Section */}
        <div className="space-y-4">
          <h1 className="text-6xl text-white drop-shadow-lg">
            StorySync ✍️
          </h1>
          <p className="text-2xl text-white/90">
            Create, Play, Laugh Together
          </p>
        </div>

        {/* Floating Avatars */}
        <div className="flex justify-center gap-3 my-8">
          {mockAvatars.map((avatar, index) => (
            <div
              key={index}
              className="relative animate-bounce"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <Avatar className="w-16 h-16 border-4 border-white shadow-lg">
                <AvatarFallback className="text-2xl bg-white">
                  {avatar.emoji}
                </AvatarFallback>
              </Avatar>
            </div>
          ))}
        </div>

        {/* Main Action Buttons */}
        <div className="space-y-4">
          <Button
            onClick={() => onNavigate("lobby")}
            className="w-full h-16 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-xl transform hover:scale-105 transition-all"
          >
            <Sparkles className="mr-2 h-6 w-6" />
            Start New Story
          </Button>

          <Button
            onClick={() => onNavigate("lobby")}
            className="w-full h-16 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-xl transform hover:scale-105 transition-all"
          >
            <Users className="mr-2 h-6 w-6" />
            Join a Friend's Story
          </Button>

          <Button
            onClick={() => onNavigate("outcome")}
            className="w-full h-16 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white shadow-xl transform hover:scale-105 transition-all"
          >
            <BookOpen className="mr-2 h-6 w-6" />
            View Story Gallery
          </Button>
        </div>

        {/* Decorative Emojis */}
        <div className="text-4xl space-x-4">
          <span className="inline-block animate-bounce">✨</span>
          <span className="inline-block animate-bounce" style={{ animationDelay: "0.1s" }}>
            📚
          </span>
          <span className="inline-block animate-bounce" style={{ animationDelay: "0.2s" }}>
            🎨
          </span>
          <span className="inline-block animate-bounce" style={{ animationDelay: "0.3s" }}>
            🚀
          </span>
          <span className="inline-block animate-bounce" style={{ animationDelay: "0.4s" }}>
            🎭
          </span>
        </div>
      </div>
    </div>
  );
}
