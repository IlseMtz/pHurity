import React, { useState } from 'react';
import { MenstrualCycleData } from '../types';
import {
  Calendar as CalendarIcon,
  Heart,
  Sparkles,
  Droplets,
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';

interface CycleTrackerSectionProps {
  cycleData: MenstrualCycleData;
  onUpdateCycle: (newData: MenstrualCycleData) => void;
  onNavigateToPhStrip: () => void;
}

export const CycleTrackerSection: React.FC<CycleTrackerSectionProps> = ({
  cycleData,
  onUpdateCycle,
  onNavigateToPhStrip,
}) => {
  const [lastPeriodStart, setLastPeriodStart] = useState<string>(cycleData.lastPeriodStart);
  const [cycleLength, setCycleLength] = useState<number>(cycleData.cycleLengthDays);
  const [periodDuration, setPeriodDuration] = useState<number>(cycleData.periodDurationDays);
  const [selectedFlow, setSelectedFlow] = useState<'ninguno' | 'ligero' | 'moderado' | 'abundante'>('ninguno');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  // Calculations
  const calculateCycleStatus = () => {
    const start = new Date(lastPeriodStart);
    const today = new Date();
    // Normalize to UTC midnight
    const diffTime = Math.abs(today.getTime() - start.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const currentDay = (diffDays % cycleLength) + 1;

    let phase = 'Folicular';
    let phaseColor = 'text-amber-600 bg-amber-50 border-amber-200';
    let expectedPh = '3.8 - 4.2 (Amarillo Ámbar)';
    let phaseDescription =
      'Fase folicular: La secreción de estrógenos estimula la producción de glucógeno en el epitelio vaginal, nutriendo a los lactobacilos que mantienen un pH fuertemente ácido y protector.';
    let expectedPantyColor = '#FBBF24';
    let isFertile = false;

    if (currentDay <= periodDuration) {
      phase = 'Menstrual';
      phaseColor = 'text-rose-600 bg-rose-50 border-rose-200';
      expectedPh = '6.5 - 7.4 (Azul / Violeta transitorio por sangre)';
      phaseDescription =
        'Fase menstrual: La sangre tiene un pH fisiológico cercano a 7.4. Durante estos días, es completamente normal que la panty PHurity marque tonos azules o violetas por el fluido hemático.';
      expectedPantyColor = '#4F46E5';
    } else if (currentDay >= cycleLength - 16 && currentDay <= cycleLength - 12) {
      phase = 'Ovulatoria / Fértil';
      phaseColor = 'text-emerald-600 bg-emerald-50 border-emerald-200';
      expectedPh = '4.4 - 4.8 (Verde Lima Suave)';
      phaseDescription =
        'Ventana ovulatoria: El moco cervical fértil tipo "clara de huevo" tiene un pH menos ácido (~7.0 en cérvix). Al mezclarse, la tira de PHurity suele mostrar tonos verdosos lima transitorios.';
      expectedPantyColor = '#A3E635';
      isFertile = true;
    } else if (currentDay > cycleLength - 12) {
      phase = 'Lútea';
      phaseColor = 'text-purple-600 bg-purple-50 border-purple-200';
      expectedPh = '3.8 - 4.2 (Amarillo Ámbar / Dorado)';
      phaseDescription =
        'Fase lútea: La progesterona espesa el moco y la microbiota restablece la máxima acidez defensiva. Tu panty PHurity debería mostrar tonos amarillos ámbar estables.';
      expectedPantyColor = '#F59E0B';
    }

    const daysUntilNext = cycleLength - currentDay + 1;
    return {
      currentDay,
      phase,
      phaseColor,
      expectedPh,
      phaseDescription,
      expectedPantyColor,
      isFertile,
      daysUntilNext,
    };
  };

  const status = calculateCycleStatus();

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateCycle({
      ...cycleData,
      lastPeriodStart,
      cycleLengthDays: cycleLength,
      periodDurationDays: periodDuration,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-8 animate-fade-in" id="cycle-tracker-main">
      {/* Header card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-semibold uppercase tracking-wider mb-2 border border-rose-200">
              <CalendarIcon className="w-3.5 h-3.5" />
              Biotecnología & Ciclo Hormonal
            </div>
            <h2 className="text-2xl font-bold text-slate-900">
              Seguimiento de tu Ciclo Menstrual
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Conoce en qué fase te encuentras y cómo influyen las hormonas en el color de tu panty PHurity.
            </p>
          </div>

          {/* Quick summary badge */}
          <div className="flex items-center gap-3 p-3 bg-rose-50/50 rounded-2xl border border-rose-100">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-rose-500 to-pink-500 text-white flex flex-col items-center justify-center font-bold shadow-xs">
              <span className="text-xs uppercase leading-none font-medium">Día</span>
              <span className="text-lg leading-tight">{status.currentDay}</span>
            </div>
            <div>
              <span className="text-xs text-slate-500 font-medium">Próximo periodo</span>
              <p className="text-sm font-bold text-slate-900">En {status.daysUntilNext} días</p>
            </div>
          </div>
        </div>

        {/* CURRENT PHASE SPOTLIGHT */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-rose-50/30 border border-slate-200/80 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-4 flex flex-col items-center text-center p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Fase Actual
            </span>
            <h3 className="text-xl font-black text-slate-900 mt-1">{status.phase}</h3>

            <div className="mt-3 flex items-center gap-2">
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${status.phaseColor}`}>
                {status.isFertile ? 'Ventana Fértil' : 'Fase Regular'}
              </span>
            </div>

            {/* Expected Panty indicator swatch preview */}
            <div className="mt-4 pt-4 border-t border-slate-100 w-full flex items-center justify-center gap-3">
              <div
                className="w-7 h-7 rounded-lg shadow-xs border border-black/10"
                style={{ backgroundColor: status.expectedPantyColor }}
              />
              <div className="text-left">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">
                  Color esperado en PHurity
                </span>
                <span className="text-xs font-bold text-slate-800">{status.expectedPh}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-3">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              ¿Cómo influye esta fase en el pH de tu panty?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {status.phaseDescription}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2">
              <button
                onClick={onNavigateToPhStrip}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-medium shadow-xs transition-colors"
                id="btn-goto-strip-from-cycle"
              >
                <span>Verificar color en la Tira de pH</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CYCLE SETTINGS & PARAMETERS */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-sm" id="cycle-settings-card">
        <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 text-rose-500" />
          Configuración de tu Ciclo
        </h3>
        <p className="text-xs text-slate-500 mb-6">
          Actualiza la fecha de inicio de tu último periodo y la duración promedio para cálculos precisos.
        </p>

        <form onSubmit={handleSaveSettings} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Last period start date */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Inicio del último periodo
              </label>
              <input
                type="date"
                value={lastPeriodStart}
                onChange={(e) => setLastPeriodStart(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-400 bg-slate-50/50"
                id="input-last-period-date"
                required
              />
            </div>

            {/* Cycle length */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-slate-700">Duración del ciclo</label>
                <span className="text-xs font-bold text-rose-600">{cycleLength} días</span>
              </div>
              <input
                type="range"
                min={21}
                max={38}
                value={cycleLength}
                onChange={(e) => setCycleLength(parseInt(e.target.value))}
                className="w-full accent-rose-600"
                id="slider-cycle-length"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>21 días</span>
                <span>Promedio (28)</span>
                <span>38 días</span>
              </div>
            </div>

            {/* Period duration */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-slate-700">Duración de sangrado</label>
                <span className="text-xs font-bold text-rose-600">{periodDuration} días</span>
              </div>
              <input
                type="range"
                min={2}
                max={8}
                value={periodDuration}
                onChange={(e) => setPeriodDuration(parseInt(e.target.value))}
                className="w-full accent-rose-600"
                id="slider-period-duration"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>2 días</span>
                <span>Promedio (5)</span>
                <span>8 días</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            {savedSuccess ? (
              <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Parámetros guardados
              </span>
            ) : (
              <span />
            )}

            <button
              type="submit"
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
              id="btn-save-cycle-settings"
            >
              Actualizar Ciclo
            </button>
          </div>
        </form>
      </div>

      {/* EDUCATIONAL CYCLE & PH CORRELATION GUIDE */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-rose-500" />
          Guía de Fases del Ciclo & Respuestas del Biosensor
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-rose-800">1. Menstruación</span>
              <span className="w-3 h-3 rounded-full bg-indigo-600" title="Color azul/violeta" />
            </div>
            <p className="text-xs text-slate-600">
              Días 1 a {periodDuration}. pH ~7.0 - 7.4 debido al fluido sanguíneo. Color azul/violeta transitorio.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-amber-800">2. Fase Folicular</span>
              <span className="w-3 h-3 rounded-full bg-amber-400" title="Color amarillo ámbar" />
            </div>
            <p className="text-xs text-slate-600">
              Días {periodDuration + 1} al 11. pH ~3.8 - 4.2. Acidez ideal con lactobacilos altos. Color amarillo ámbar.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-lime-50/70 border border-lime-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-lime-800">3. Ovulación</span>
              <span className="w-3 h-3 rounded-full bg-lime-400" title="Color verde lima" />
            </div>
            <p className="text-xs text-slate-600">
              Días 12 al 16 aprox. pH ~4.4 - 4.8. Moco cervical fértil. Color verde lima fresco transitorio.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-purple-800">4. Fase Lútea</span>
              <span className="w-3 h-3 rounded-full bg-amber-500" title="Color amarillo dorado" />
            </div>
            <p className="text-xs text-slate-600">
              Días 17 al {cycleLength}. pH ~3.8 - 4.2. Ambiente protector bajo influjo de progesterona.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
