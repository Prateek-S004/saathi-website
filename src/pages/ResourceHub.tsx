import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
  BookOpen,
  Book,
  Play,
  Volume2,
  Heart,
  Pen,
  Trophy,
  Clock,
  Star
} from "lucide-react";

const ResourceHub = () => {
  const [streakDays, setStreakDays] = useState(0);
  const [todayMeditated, setTodayMeditated] = useState(false);
  const [journalEntry, setJournalEntry] = useState("");
  const [saveStatus, setSaveStatus] = useState("");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) return;
    fetch(`/api/streak/${userId}`)
      .then(res => res.json())
      .then(data => {
        setStreakDays(data.streakDays);
        const today = new Date(); today.setHours(0, 0, 0, 0);
        const last = data.lastMeditatedDate ? new Date(data.lastMeditatedDate) : null;
        setTodayMeditated(last && last >= today);
      });
  }, [userId]);

  const handleMarkToday = async () => {
    if (!userId || todayMeditated) return;
    const res = await fetch(`/api/streak/${userId}`, { method: "POST" });
    const data = await res.json();
    setStreakDays(data.streakDays);
    setTodayMeditated(true);
  };

  const handleSaveJournal = () => {
    if (!journalEntry.trim()) { setSaveStatus("Journal entry cannot be empty."); return; }
    setSaveStatus("Journal entry saved successfully!");
    setTimeout(() => setSaveStatus(""), 3000);
  };

  const getEmbedUrl = (url: string) => {
    const videoId = url.split("v=")[1]?.split("&")[0];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  const meditations = [
    { id: "m1", title: "5-Minute Morning Mindfulness", duration: 5, difficulty: "Beginner", link: "https://www.youtube.com/watch?v=YD5W5eZy90c" },
    { id: "m2", title: "Study Break Relaxation", duration: 10, difficulty: "Beginner", link: "https://www.youtube.com/watch?v=G3VhKlbIt6E" },
    { id: "m3", title: "Pre-Exam Calm", duration: 15, difficulty: "Intermediate", link: "https://www.youtube.com/watch?v=AtF0T2fPvbI" },
    { id: "m4", title: "Deep Sleep Meditation", duration: 30, difficulty: "All Levels", link: "https://www.youtube.com/watch?v=8mM5Oks8yZc" }
  ];

  const resources = {
    videos: [
      { id: "v1", title: "Understanding Anxiety", duration: "12:45", views: "1.2K", link: "https://www.youtube.com/watch?v=ah4Hnrz3CDg" },
      { id: "v2", title: "तनाव प्रबंधन तकनीकें", duration: "15:30", views: "856", link: "https://www.youtube.com/watch?v=nlD9HiRiLZ4" },
      { id: "v3", title: "Building Healthy Study Habits", duration: "18:20", views: "2.1K", link: "https://www.youtube.com/watch?v=1bszFX_XcbU" },
      { id: "v4", title: "ମାନସିକ ସ୍ୱାସ୍ଥ୍ୟ", duration: "10:15", views: "432", link: "https://www.youtube.com/watch?v=9wwQ_abYDiA" }
    ],
    audios: [
      { id: "a1", title: "Progressive Muscle Relaxation", duration: "20:00", downloads: "3.4K", link: "https://www.youtube.com/watch?v=86HUcX8ZtAk" },
      { id: "a2", title: "Deep Breathing Technique", duration: "8:30", downloads: "2.1K", link: "https://www.youtube.com/watch?v=qxLfqhHj-94" },
      { id: "a3", title: "Sleep Stories for Students", duration: "45:00", downloads: "1.8K", link: "https://www.youtube.com/watch?v=UYLm25FCmBg" }
    ],
    guides: [
      { id: "g1", title: "Managing Exam Anxiety", pages: 24, downloads: "5.2K", link: "https://www.monash.edu/change-of-preference/managing-exam-anxiety-a-step-by-step-guide" },
      { id: "g2", title: "Mental Balance in Student Life", pages: 18, downloads: "3.7K", link: "https://www.drishtiias.com/hindi/blog/at-present-the-need-for-mental-strength-for-the-youth" },
      { id: "g3", title: "Building Resilience", pages: 32, downloads: "4.1K", link: "https://theglobalcollege.com/blog/building-resilience-students/" }
    ]
  };

  return (
    <div className="min-h-screen gradient-hero">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <Tabs defaultValue="meditation" className="w-full">
            <TabsList className="grid w-full grid-cols-5 gradient-card">
              <TabsTrigger value="meditation"><Heart className="h-4 w-4" /> Meditation</TabsTrigger>
              <TabsTrigger value="videos"><Play className="h-4 w-4" /> Videos</TabsTrigger>
              <TabsTrigger value="audios"><Volume2 className="h-4 w-4" /> Audio</TabsTrigger>
              <TabsTrigger value="guides"><BookOpen className="h-4 w-4" /> Guides</TabsTrigger>
              <TabsTrigger value="journal"><Book className="h-4 w-4" /> Journal</TabsTrigger>
            </TabsList>

            <TabsContent value="meditation" className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {meditations.map(m => (
                <Card key={m.id} className="p-4">
                  <CardTitle>{m.title}</CardTitle>
                  <p>{m.duration} min • {m.difficulty}</p>
                  <div className="relative pt-[56.25%] mt-2">
                    <iframe src={getEmbedUrl(m.link)} title={m.title} allowFullScreen className="absolute top-0 left-0 w-full h-full rounded-md" />
                  </div>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="videos" className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {resources.videos.map(v => (
                <Card key={v.id} className="p-4">
                  <CardTitle>{v.title}</CardTitle>
                  <p>{v.duration} • {v.views} views</p>
                  <div className="relative pt-[56.25%] mt-2">
                    <iframe src={getEmbedUrl(v.link)} title={v.title} allowFullScreen className="absolute top-0 left-0 w-full h-full rounded-md" />
                  </div>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="audios" className="mt-6 space-y-4">
              {resources.audios.map(a => (
                <Card key={a.id} className="p-4">
                  <CardTitle>{a.title}</CardTitle>
                  <p>{a.duration} • {a.downloads} downloads</p>
                  <div className="relative pt-[20%] mt-2">
                    <iframe src={getEmbedUrl(a.link)} title={a.title} allowFullScreen className="absolute top-0 left-0 w-full h-full rounded-md" />
                  </div>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="guides" className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {resources.guides.map(g => (
                <Card key={g.id} className="p-4">
                  <CardTitle>{g.title}</CardTitle>
                  <p>{g.pages} pages • {g.downloads} downloads</p>
                  <Button asChild>
                    <a href={g.link} target="_blank">Open Guide</a>
                  </Button>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="journal" className="mt-6">
              <Card className="p-4">
                <CardTitle>Daily Journal</CardTitle>
                <Textarea placeholder="What's on your mind?" value={journalEntry} onChange={e => setJournalEntry(e.target.value)} className="mt-2 min-h-[150px]" />
                {saveStatus && <p className="text-green-500 mt-2">{saveStatus}</p>}
                <Button className="w-full mt-2" onClick={handleSaveJournal}>Save Entry</Button>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right: Streak */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <Card className="p-6 text-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-lg rounded-2xl">
            <CardTitle className="text-xl font-bold flex justify-center items-center gap-2">
              <Trophy className="h-6 w-6" /> Daily Meditation
            </CardTitle>
            <div className="text-5xl font-extrabold text-white my-4">{streakDays}</div>
            <div className="text-white/80 mb-4">Day Streak</div>
            <Button className="w-full" onClick={handleMarkToday} disabled={todayMeditated}>
              {todayMeditated ? "Completed Today" : "Mark Today's Streak"}
            </Button>
            <div className="space-y-2 mt-4">
              <div className="flex justify-between text-white/80 text-sm">
                <span>Today's Progress</span>
                <span>{todayMeditated ? "Complete!" : "Not started"}</span>
              </div>
              <Progress value={todayMeditated ? 100 : 0} className="h-3" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResourceHub;
