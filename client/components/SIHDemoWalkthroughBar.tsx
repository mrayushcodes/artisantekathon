import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Trophy,
  X,
  Play,
  RotateCcw,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const SIH_DEMO_STEPS = [
  { id: 1, label: 'Dashboard', path: '/dashboard', hint: 'Overview & Greeting for Gurpreet' },
  { id: 2, label: 'Studio Intro', path: '/studio', hint: 'Multi-step guided product creator' },
  { id: 3, label: 'Upload Photo', path: '/studio?step=0', hint: 'Raw sample photo uploaded' },
  { id: 4, label: 'AI Enhancement', path: '/studio?step=0&processed=true', hint: 'Before/After background & lighting' },
  { id: 5, label: 'Voice Cataloger', path: '/studio?step=1', hint: 'Tap mic "बस बोलिए, हम लिख देंगे"' },
  { id: 6, label: 'Hindi Audio', path: '/studio?step=1&speaking=true', hint: 'Simulated Hindi speech waveform' },
  { id: 7, label: 'AI Catalog', path: '/studio?step=1&catalog=true', hint: 'Bilingual copy & extracted specs' },
  { id: 8, label: 'Smart Pricing', path: '/studio?step=2', hint: 'Cost inputs & AI algorithm' },
  { id: 9, label: '₹1,499 Price', path: '/studio?step=2&calculated=true', hint: 'Confidence 87% & breakdown' },
  { id: 10, label: 'Publish Listing', path: '/studio?step=3', hint: 'E-commerce preview & celebrate' },
  { id: 11, label: 'My Products', path: '/products', hint: 'Product catalog updated live' },
  { id: 12, label: 'Find Buyers', path: '/buyers', hint: 'Matching B2B bulk orders' },
  { id: 13, label: 'Analytics', path: '/analytics', hint: 'Sales & view trends' },
  { id: 14, label: 'AI Advisor', path: '/analytics?assistant=true', hint: 'Strategic business growth tips' },
];

export const SIHDemoWalkthroughBar: React.FC = () => {
  const navigate = useNavigate();
  const { demoGuideStep, setDemoGuideStep, setIsAiDrawerOpen } = useApp();
  const [collapsed, setCollapsed] = useState(false);

  const currentStep = SIH_DEMO_STEPS[demoGuideStep] || SIH_DEMO_STEPS[0];

  const handleStepJump = (index: number) => {
    setDemoGuideStep(index);
    const step = SIH_DEMO_STEPS[index];
    navigate(step.path);
    if (step.id === 14) {
      setIsAiDrawerOpen(true);
    }
  };

  const handleNext = () => {
    if (demoGuideStep < SIH_DEMO_STEPS.length - 1) {
      handleStepJump(demoGuideStep + 1);
    }
  };

  const handlePrev = () => {
    if (demoGuideStep > 0) {
      handleStepJump(demoGuideStep - 1);
    }
  };

  if (collapsed) {
    return (
      <button
        onClick={() => setCollapsed(false)}
        className="fixed bottom-5 left-5 z-40 flex items-center gap-2 rounded-full border border-amber-400 bg-stone-900 px-4 py-2 text-xs font-bold text-amber-300 shadow-xl hover:bg-stone-800 transition"
      >
        <Trophy size={14} className="text-amber-400" />
        <span>SIH 2-Min Demo Guide</span>
        <span className="rounded-full bg-amber-500/20 px-1.5 py-0.5 text-[10px] text-amber-300">
          Step {demoGuideStep + 1}/14
        </span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-5 left-4 right-4 z-40 mx-auto max-w-4xl rounded-2xl border border-amber-300/60 bg-stone-900/95 p-3 text-white shadow-2xl backdrop-blur-md">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="grid h-8 w-8 place-items-center rounded-xl bg-amber-500 text-stone-950 font-black text-xs shadow-md">
            <Trophy size={16} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                SIH Judge Demo Walkthrough
              </span>
              <span className="rounded-md bg-stone-800 px-1.5 py-0.5 text-[10px] font-mono text-stone-300">
                Step {demoGuideStep + 1} of {SIH_DEMO_STEPS.length}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white">
                {currentStep.label}:
              </span>
              <span className="text-xs text-stone-300 truncate max-w-[260px] sm:max-w-md">
                {currentStep.hint}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-2 pt-2 sm:pt-0 border-t border-stone-800 sm:border-0">
          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrev}
              disabled={demoGuideStep === 0}
              className="rounded-lg border border-stone-700 bg-stone-800 p-1.5 text-stone-300 hover:bg-stone-700 disabled:opacity-30"
              title="Previous Step"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={handleNext}
              disabled={demoGuideStep === SIH_DEMO_STEPS.length - 1}
              className="flex items-center gap-1 rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-bold text-stone-950 hover:bg-amber-400 disabled:opacity-40"
            >
              <span>Next Step</span>
              <ChevronRight size={14} />
            </button>
            <button
              onClick={() => handleStepJump(0)}
              className="rounded-lg border border-stone-700 bg-stone-800 p-1.5 text-stone-300 hover:bg-stone-700"
              title="Restart Demo"
            >
              <RotateCcw size={14} />
            </button>
          </div>

          <button
            onClick={() => setCollapsed(true)}
            className="rounded-lg p-1 text-stone-400 hover:bg-stone-800 hover:text-white"
            title="Minimize Bar"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
