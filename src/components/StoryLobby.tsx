import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Card } from "./ui/card";
import { ArrowLeft, Sparkles, Wand2 } from "lucide-react";

interface StoryLobbyProps {
  onNavigate: (screen: string) => void;
}

export function StoryLobby({ onNavigate }: StoryLobbyProps) {
  const [roomName, setRoomName] = useState("");
  const [numFriends, setNumFriends] = useState("3");
  const [selectedGenre, setSelectedGenre] = useState("");

  const genres = [
    { name: "Adventure", emoji: "🗺️", color: "from-orange-400 to-red-500" },
    { name: "Fantasy", emoji: "🧙‍♂️", color: "from-purple-400 to-pink-500" },
    { name: "Comedy", emoji: "😂", color: "from-yellow-400 to-orange-400" },
    { name: "Sci-Fi", emoji: "🚀", color: "from-blue-400 to-cyan-500" },
  ];

  const joiningFriends = [
    { name: "Alex", emoji: "🦊", status: "ready" },
    { name: "Sam", emoji: "🐼", status: "joining..." },
    { name: "Taylor", emoji: "🦄", status: "ready" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            onClick={() => onNavigate("home")}
            variant="outline"
            className="bg-white/90 hover:bg-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h2 className="text-4xl text-white">Create Your Story Room 🎪</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Room Setup Card */}
          <Card className="p-6 bg-white/95 backdrop-blur shadow-2xl">
            <div className="space-y-6">
              <div>
                <Label htmlFor="room-name">Room Name</Label>
                <Input
                  id="room-name"
                  placeholder="Epic Adventure Awaits..."
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  className="mt-2 bg-white"
                />
              </div>

              <div>
                <Label htmlFor="num-friends">Number of Friends (1-6)</Label>
                <Input
                  id="num-friends"
                  type="number"
                  min="1"
                  max="6"
                  value={numFriends}
                  onChange={(e) => setNumFriends(e.target.value)}
                  className="mt-2 bg-white"
                />
              </div>

              <div>
                <Label>Choose Genre</Label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {genres.map((genre) => (
                    <button
                      key={genre.name}
                      onClick={() => setSelectedGenre(genre.name)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedGenre === genre.name
                          ? "border-purple-600 bg-purple-50 scale-105"
                          : "border-gray-200 bg-white hover:border-purple-400"
                      }`}
                    >
                      <div className="text-3xl mb-1">{genre.emoji}</div>
                      <div className="text-sm">{genre.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              <Button
                onClick={() => onNavigate("writing")}
                className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Start Writing!
              </Button>
            </div>
          </Card>

          {/* Friends Joining Card */}
          <Card className="p-6 bg-white/95 backdrop-blur shadow-2xl">
            <h3 className="text-xl mb-4 flex items-center gap-2">
              Friends Joining
              <span className="text-2xl">👥</span>
            </h3>

            <div className="space-y-4">
              {joiningFriends.map((friend, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-purple-200"
                >
                  <Avatar className="w-12 h-12 border-2 border-purple-300">
                    <AvatarFallback className="text-xl bg-white">
                      {friend.emoji}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div>{friend.name}</div>
                    <div className="text-sm text-gray-600">{friend.status}</div>
                  </div>
                  {friend.status === "ready" && (
                    <Wand2 className="h-6 w-6 text-purple-500 animate-pulse" />
                  )}
                </div>
              ))}
            </div>

            {/* AI Indicator */}
            <div className="mt-6 p-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg border-2 border-cyan-300">
              <div className="flex items-center gap-3">
                <div className="text-3xl">🤖</div>
                <div>
                  <div>AI Story Assistant</div>
                  <div className="text-sm text-gray-600">Ready to help!</div>
                </div>
                <Wand2 className="ml-auto h-8 w-8 text-cyan-500 animate-spin" style={{ animationDuration: '3s' }} />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
