import React from 'react';
import { Sparkles, Calendar, MessageSquareText, Users, MapPin, Dna, Droplet } from 'lucide-react';

export type NavTab = 'ph_strip' | 'cycle' | 'community' | 'chat' | 'clinics';

interface HeaderProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  onOpenBiotech: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenBiotech }) => {
  const tabs = [
    {
      id: 'ph_strip' as NavTab,
      label: 'Tira de pH',
      subtitle: 'Panty Sensor',
      icon: Droplet,
    },
    {
      id: 'cycle' as NavTab,
      label: 'Mi Ciclo',
      subtitle: 'Calendario',
      icon: Calendar,
    },
    {
      id: 'chat' as NavTab,
      label: 'PurIA Chatbot',
      subtitle: 'Asesoría AI',
      icon: MessageSquareText,
    },
    {
      id: 'community' as NavTab,
      label: 'Comunidad',
      subtitle: 'Experiencias',
      icon: Users,
    },
    {
      id: 'clinics' as NavTab,
      label: 'Clínicas',
      subtitle: 'Ags, México',
      icon: MapPin,
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-rose-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-tr from-rose-500 via-pink-500 to-amber-400 p-0.5 shadow-md shadow-rose-200">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-500 text-xl tracking-tight">
                  pH
                </span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black tracking-tight text-slate-900 flex items-center gap-1">
                  PHurity
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 tracking-normal border border-rose-200">
                    Biotecnología
                  </span>
                </h1>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Panty íntima inteligente con sensor de pH • Aguascalientes, Ags
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/60" id="main-desktop-nav">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  id={`nav-tab-${tab.id}`}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-white text-rose-600 shadow-sm border border-rose-100'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-rose-500' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Biotech info button */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenBiotech}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200 text-rose-700 hover:bg-rose-100 text-xs font-medium transition-colors shadow-2xs"
              id="btn-header-biotech-info"
              title="Conocer la ciencia de PHurity"
            >
              <Dna className="w-3.5 h-3.5 text-rose-600" />
              <span className="hidden sm:inline">Ciencia & Patente</span>
              <Sparkles className="w-3 h-3 text-amber-500" />
            </button>
          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="flex md:hidden overflow-x-auto py-2.5 gap-1.5 no-scrollbar border-t border-rose-50" id="main-mobile-nav">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                id={`mobile-tab-${tab.id}`}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
