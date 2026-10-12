import React, { useState, useEffect } from 'react';
import { Header, NavTab } from './components/Header';
import { PhStripSection } from './components/PhStripSection';
import { CycleTrackerSection } from './components/CycleTrackerSection';
import { CommunitySection } from './components/CommunitySection';
import { ChatBotSection } from './components/ChatBotSection';
import { ClinicsMapSection } from './components/ClinicsMapSection';
import { BiotechInfoModal } from './components/BiotechInfoModal';
import { INITIAL_COMMUNITY_POSTS } from './data/communityData';
import { PhLog, MenstrualCycleData, CommunityPost, CommunityComment } from './types';
import { Dna, MapPin, Heart, ShieldCheck, Sparkles, Droplet } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('ph_strip');
  const [isBiotechModalOpen, setIsBiotechModalOpen] = useState<boolean>(false);

  // Persistent pH logs
  const [phLogs, setPhLogs] = useState<PhLog[]>(() => {
    try {
      const saved = localStorage.getItem('phurity_logs');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    // Default initial log
    return [
      {
        id: 'init-log-1',
        timestamp: 'Ayer, 09:30 AM',
        phValue: 4.2,
        colorHex: '#F59E0B',
        colorName: 'Amarillo Dorado Cálido',
        cycleDay: 13,
        symptoms: ['Sin síntomas anormales'],
        notes: 'Monitoreo matutino habitual con panty PHurity.',
      },
    ];
  });

  // Persistent Menstrual Cycle data
  const [cycleData, setCycleData] = useState<MenstrualCycleData>(() => {
    try {
      const saved = localStorage.getItem('phurity_cycle');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    // Default: 12 days ago
    const d = new Date();
    d.setDate(d.getDate() - 13);
    const dateStr = d.toISOString().split('T')[0];
    return {
      lastPeriodStart: dateStr,
      cycleLengthDays: 28,
      periodDurationDays: 5,
      logs: [],
    };
  });

  // Persistent Community posts
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>(() => {
    try {
      const saved = localStorage.getItem('phurity_community');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_COMMUNITY_POSTS;
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('phurity_logs', JSON.stringify(phLogs));
    } catch (e) {
      console.error(e);
    }
  }, [phLogs]);

  useEffect(() => {
    try {
      localStorage.setItem('phurity_cycle', JSON.stringify(cycleData));
    } catch (e) {
      console.error(e);
    }
  }, [cycleData]);

  useEffect(() => {
    try {
      localStorage.setItem('phurity_community', JSON.stringify(communityPosts));
    } catch (e) {
      console.error(e);
    }
  }, [communityPosts]);

  // Compute current cycle day
  const calculateCurrentCycleDay = (): number => {
    try {
      const start = new Date(cycleData.lastPeriodStart);
      const today = new Date();
      const diffTime = Math.abs(today.getTime() - start.getTime());
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      return (diffDays % cycleData.cycleLengthDays) + 1;
    } catch {
      return 14;
    }
  };

  const currentCycleDay = calculateCurrentCycleDay();
  const lastRecordedPh = phLogs[0]?.phValue || 4.2;

  const handleSaveLog = (newLog: PhLog) => {
    setPhLogs((prev) => [newLog, ...prev]);
  };

  const handleAddPost = (newPost: CommunityPost) => {
    setCommunityPosts((prev) => [newPost, ...prev]);
  };

  const handleLikePost = (postId: string) => {
    setCommunityPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const isLiked = p.userLiked;
          return {
            ...p,
            userLiked: !isLiked,
            likes: isLiked ? p.likes - 1 : p.likes + 1,
          };
        }
        return p;
      })
    );
  };

  const handleAddComment = (postId: string, comment: CommunityComment) => {
    setCommunityPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            comments: [...p.comments, comment],
          };
        }
        return p;
      })
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F5] text-slate-800 font-sans selection:bg-rose-200 selection:text-rose-900">
      {/* Top Main Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenBiotech={() => setIsBiotechModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'ph_strip' && (
          <PhStripSection
            logs={phLogs}
            onSaveLog={handleSaveLog}
            currentCycleDay={currentCycleDay}
            onNavigateToClinics={() => setActiveTab('clinics')}
          />
        )}

        {activeTab === 'cycle' && (
          <CycleTrackerSection
            cycleData={cycleData}
            onUpdateCycle={setCycleData}
            onNavigateToPhStrip={() => setActiveTab('ph_strip')}
          />
        )}

        {activeTab === 'chat' && (
          <ChatBotSection
            currentCycleDay={currentCycleDay}
            lastPh={lastRecordedPh}
            onNavigateToClinics={() => setActiveTab('clinics')}
          />
        )}

        {activeTab === 'community' && (
          <CommunitySection
            posts={communityPosts}
            onAddPost={handleAddPost}
            onLikePost={handleLikePost}
            onAddComment={handleAddComment}
          />
        )}

        {activeTab === 'clinics' && <ClinicsMapSection />}
      </main>

      {/* Biotech Information Modal */}
      <BiotechInfoModal
        isOpen={isBiotechModalOpen}
        onClose={() => setIsBiotechModalOpen(false)}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-rose-100 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-rose-600 text-white font-black text-xs">
                pH
              </div>
              <div>
                <span className="font-bold text-slate-900 text-sm">PHurity</span>
                <span className="text-xs text-slate-500 ml-2">
                  Biotecnología & Sistemas Inteligentes de Monitoreo
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              <span>Desarrollado con orgullo en Aguascalientes, México</span>
            </div>

            <p className="text-[11px] text-slate-400 text-center md:text-right">
              Herramienta biomédica preventiva • No sustituye valoración ginecológica clínica
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
