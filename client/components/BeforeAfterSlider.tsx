import React, { useState } from 'react';
import { Sparkles, SlidersHorizontal, Image as ImageIcon } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
  aspectRatio?: string;
  beforeFilter?: string;
  afterFilter?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = 'Before AI (Raw Workshop Photo)',
  afterLabel = 'After AI (E-commerce Ready)',
  className = '',
  aspectRatio = 'aspect-[4/3]',
  beforeFilter = 'brightness(0.82) contrast(0.88) saturate(0.78) sepia(0.08)',
  afterFilter = 'brightness(1.06) contrast(1.12) saturate(1.2)',
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [activeTab, setActiveTab] = useState<'compare' | 'before' | 'after'>('compare');

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  return (
    <div className={`overflow-hidden rounded-3xl border border-stone-200 bg-stone-900 shadow-xl ${className}`}>
      {/* Top Controller Bar */}
      <div className="flex items-center justify-between border-b border-stone-800 bg-stone-950/80 px-4 py-2.5 text-xs text-white">
        <div className="flex items-center gap-2">
          <span className="grid h-5 w-5 place-items-center rounded bg-amber-500 text-stone-950 font-bold text-[10px]">
            AI
          </span>
          <span className="font-bold text-stone-200">Visual Quality Transformation</span>
        </div>
        <div className="flex rounded-lg bg-stone-900 p-0.5 border border-stone-800">
          <button
            onClick={() => setActiveTab('before')}
            className={`rounded-md px-2.5 py-1 font-semibold transition ${
              activeTab === 'before' ? 'bg-stone-700 text-white' : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Raw
          </button>
          <button
            onClick={() => setActiveTab('compare')}
            className={`rounded-md px-2.5 py-1 font-semibold transition ${
              activeTab === 'compare' ? 'bg-amber-500 text-stone-950' : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Compare (Slider)
          </button>
          <button
            onClick={() => setActiveTab('after')}
            className={`rounded-md px-2.5 py-1 font-semibold transition ${
              activeTab === 'after' ? 'bg-stone-700 text-white' : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Enhanced
          </button>
        </div>
      </div>

      {/* Image Area */}
      <div className={`relative w-full overflow-hidden select-none bg-stone-950 ${aspectRatio}`}>
        {activeTab === 'before' ? (
          <img
            src={beforeImage}
            alt="Raw photo"
            className="h-full w-full object-cover object-center"
            style={{ filter: beforeFilter }}
          />
        ) : activeTab === 'after' ? (
          <img
            src={afterImage}
            alt="Enhanced photo"
            className="h-full w-full object-cover object-center"
            style={{ filter: afterFilter }}
          />
        ) : (
          <>
            {/* After Image (Full background) */}
            <img
              src={afterImage}
              alt="Enhanced"
              className="absolute inset-0 h-full w-full object-cover object-center pointer-events-none"
              style={{ filter: afterFilter }}
            />

            {/* Before Image (Clipped overlay) */}
            <div
              className="absolute inset-0 overflow-hidden pointer-events-none"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={beforeImage}
                alt="Raw"
                className="absolute inset-0 h-full w-full object-cover object-center max-w-none"
                style={{ width: '100%', filter: beforeFilter }}
              />
            </div>

            {/* Divider Line */}
            <div
              className="absolute top-0 bottom-0 z-20 w-0.5 bg-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.9)] pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-amber-500 text-stone-950 shadow-lg">
                <SlidersHorizontal size={14} strokeWidth={2.5} />
              </div>
            </div>

            {/* Interactive Slider Input */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={handleSliderChange}
              className="absolute inset-0 z-30 h-full w-full cursor-ew-resize opacity-0"
              aria-label="Drag to compare before and after photos"
            />
          </>
        )}

        {/* Floating Labels */}
        <div className="absolute bottom-3 left-3 z-10 rounded-lg bg-stone-900/80 px-2.5 py-1 text-[11px] font-bold text-stone-300 backdrop-blur-md border border-stone-700">
          {beforeLabel}
        </div>
        <div className="absolute bottom-3 right-3 z-10 rounded-lg bg-amber-500/90 px-2.5 py-1 text-[11px] font-bold text-stone-950 backdrop-blur-md shadow">
          {afterLabel}
        </div>
      </div>
    </div>
  );
};
