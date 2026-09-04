import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/Sidebar';
import { Navbar } from '@/components/Navbar';
import { AIAssistantDrawer } from '@/components/AIAssistantDrawer';
import { LanguageSelectorModal } from '@/components/LanguageSelectorModal';
import { SIHDemoWalkthroughBar } from '@/components/SIHDemoWalkthroughBar';
import { Bot } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const AppLayout: React.FC = () => {
  const { setIsAiDrawerOpen } = useApp();

  return (
    <div className="min-h-screen bg-[#FBF9F4] text-stone-900 flex">
      {/* Persistent Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-20">
        <Navbar />

        <main className="flex-1 px-4 py-6 sm:px-8 sm:py-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      {/* Floating AI Business Assistant Button (Fixed Bottom-Right) */}
      <button
        onClick={() => setIsAiDrawerOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 rounded-full bg-stone-900 py-3 px-5 text-sm font-extrabold text-white shadow-2xl shadow-stone-950/40 hover:bg-stone-800 hover:scale-105 active:scale-95 transition-all border border-stone-700"
        title="Open AI Digital Business Assistant"
      >
        <span className="grid h-7 w-7 place-items-center rounded-full bg-amber-500 text-stone-950 shadow-xs">
          <Bot size={16} />
        </span>
        <span>✨ AI Assistant</span>
        <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
      </button>

      {/* Slide-over AI Assistant */}
      <AIAssistantDrawer />

      {/* Language Selector Modal */}
      <LanguageSelectorModal />

      {/* SIH Judge Demo Walkthrough Bar */}
      <SIHDemoWalkthroughBar />
    </div>
  );
};
