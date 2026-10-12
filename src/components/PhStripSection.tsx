import React, { useState } from 'react';
import { PH_SCALE_LEVELS, COMMON_SYMPTOMS_LIST } from '../data/phScaleData';
import { PhColorLevel, PhLog } from '../types';
import {
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Clock,
  Send,
  PlusCircle,
  BookmarkCheck,
  Stethoscope,
  Info,
  CalendarDays,
} from 'lucide-react';

interface PhStripSectionProps {
  logs: PhLog[];
  onSaveLog: (log: PhLog) => void;
  currentCycleDay?: number;
  onNavigateToClinics: () => void;
}

export const PhStripSection: React.FC<PhStripSectionProps> = ({
  logs,
  onSaveLog,
  currentCycleDay = 14,
  onNavigateToClinics,
}) => {
  const [selectedLevel, setSelectedLevel] = useState<PhColorLevel>(PH_SCALE_LEVELS[1]); // Default 4.2
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [userNotes, setUserNotes] = useState<string>('');
  const [isAnalyzingAi, setIsAnalyzingAi] = useState<boolean>(false);
  const [aiAnalysisResult, setAiAnalysisResult] = useState<string | null>(null);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<boolean>(false);

  const toggleSymptom = (symptomLabel: string) => {
    if (symptomLabel === 'Sin síntomas anormales') {
      setSelectedSymptoms(['Sin síntomas anormales']);
      return;
    }
    const filtered = selectedSymptoms.filter((s) => s !== 'Sin síntomas anormales');
    if (filtered.includes(symptomLabel)) {
      setSelectedSymptoms(filtered.filter((s) => s !== symptomLabel));
    } else {
      setSelectedSymptoms([...filtered, symptomLabel]);
    }
  };

  const handleAnalyzeWithAi = async () => {
    setIsAnalyzingAi(true);
    setAiAnalysisResult(null);

    try {
      const response = await fetch('/api/analyze-ph', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phValue: selectedLevel.phValue,
          colorName: selectedLevel.colorName,
          symptoms: selectedSymptoms,
          cycleDay: currentCycleDay,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al conectar con el asistente');
      }

      const data = await response.json();
      setAiAnalysisResult(data.analysis || 'Análisis completado satisfactoriamente.');
    } catch (err: any) {
      console.error(err);
      setAiAnalysisResult(
        `Para un pH de ${selectedLevel.phValue} (${selectedLevel.colorName}), los lactobacilos mantienen un equilibrio ácido defensivo. Si los síntomas persisten o el color se vuelve verdoso/azulado, consulta una clínica en Aguascalientes.`
      );
    } finally {
      setIsAnalyzingAi(false);
    }
  };

  const handleSaveMeasurement = () => {
    const newLog: PhLog = {
      id: 'log-' + Date.now(),
      timestamp: new Date().toLocaleDateString('es-MX', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      phValue: selectedLevel.phValue,
      colorHex: selectedLevel.colorHex,
      colorName: selectedLevel.colorName,
      cycleDay: currentCycleDay,
      symptoms: selectedSymptoms.length > 0 ? selectedSymptoms : ['Sin síntomas registrados'],
      notes: userNotes,
      aiAnalysis: aiAnalysisResult || undefined,
    };

    onSaveLog(newLog);
    setSaveSuccessMessage(true);
    setTimeout(() => setSaveSuccessMessage(false), 3000);
    setUserNotes('');
  };

  return (
    <div className="space-y-8 animate-fade-in" id="ph-strip-main-view">
      {/* Introduction Banner */}
      <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 rounded-3xl p-6 sm:p-8 text-white shadow-lg shadow-rose-200/50 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            Sensor Colorimétrico No Tóxico
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Tira Reactiva & Monitor de pH PHurity
          </h2>
          <p className="mt-2 text-sm sm:text-base text-rose-50 leading-relaxed">
            Compara el color observado en la zona indicadora de tu panty con nuestra escala calibrada.
            Descubre qué significa cada cambio biológico y recibe orientación médica personalizada.
          </p>
        </div>
        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* INTERACTIVE PH STRIP SELECTOR */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-sm" id="ph-strip-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              Escala Colorimétrica de pH Vaginal
            </h3>
            <p className="text-xs text-slate-500">
              Selecciona el color exacto que muestra el biosensor de tu prenda íntima PHurity
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-medium">
            <CalendarDays className="w-3.5 h-3.5 text-rose-500" />
            <span>Día {currentCycleDay} de tu ciclo</span>
          </div>
        </div>

        {/* Visual Realistic pH Strip */}
        <div className="mb-8">
          {/* Continuous Gradient Bar for visual context */}
          <div
            className="h-3 w-full rounded-full shadow-inner mb-4"
            style={{
              background:
                'linear-gradient(to right, #FBBF24 0%, #F59E0B 25%, #A3E635 45%, #84CC16 60%, #14B8A6 75%, #0284C7 90%, #4F46E5 100%)',
            }}
          />

          {/* Individual Interactive Segments */}
          <div className="grid grid-cols-3 sm:grid-cols-7 gap-2 sm:gap-3" id="strip-swatches-container">
            {PH_SCALE_LEVELS.map((level) => {
              const isSelected = selectedLevel.id === level.id;
              return (
                <button
                  key={level.id}
                  onClick={() => setSelectedLevel(level)}
                  id={`swatch-btn-${level.id}`}
                  className={`group relative flex flex-col items-center p-3 rounded-2xl border-2 transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'border-slate-900 shadow-md scale-105 bg-slate-50/80 ring-2 ring-rose-300'
                      : 'border-transparent hover:border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  {/* Swatch Pill */}
                  <div
                    className="w-10 h-14 sm:w-12 sm:h-16 rounded-xl shadow-xs border border-black/10 flex items-end justify-center pb-1 transition-transform group-hover:scale-105"
                    style={{ backgroundColor: level.colorHex }}
                  >
                    <div className="w-2 h-2 rounded-full bg-white/40 mb-1" />
                  </div>

                  {/* Value */}
                  <span className="mt-2 font-bold text-slate-900 text-sm">
                    pH {level.phValue}
                  </span>

                  {/* Short status */}
                  <span
                    className={`mt-0.5 text-[10px] font-semibold text-center leading-tight truncate max-w-full ${
                      level.status === 'saludable'
                        ? 'text-emerald-700'
                        : level.status === 'transicion'
                        ? 'text-amber-700'
                        : level.status === 'alerta'
                        ? 'text-orange-700'
                        : 'text-rose-700'
                    }`}
                  >
                    {level.status === 'saludable' ? 'Óptimo' : level.status === 'transicion' ? 'Transición' : level.status === 'alerta' ? 'Alerta' : 'Crítico'}
                  </span>

                  {isSelected && (
                    <div className="absolute -top-2 w-4 h-4 bg-slate-900 text-white rounded-full flex items-center justify-center text-[10px]">
                      ✓
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* DETAILED DIAGNOSIS OF THE SELECTED COLOR */}
        <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Graphic representation of the panty sensor zone */}
          <div className="lg:col-span-4 flex flex-col items-center text-center p-5 bg-white rounded-2xl border border-slate-200/60 shadow-2xs">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Lectura Activa en Panty PHurity
            </span>

            {/* Panty indicator visualization */}
            <div className="relative my-3 flex items-center justify-center">
              {/* Outer panty fabric simulation */}
              <div className="w-36 h-36 rounded-full bg-rose-50 border-4 border-dashed border-rose-200 flex items-center justify-center shadow-inner">
                {/* Microfiber indicator zone */}
                <div
                  className="w-20 h-20 rounded-2xl shadow-lg flex flex-col items-center justify-center transition-all duration-500 border-2 border-white"
                  style={{ backgroundColor: selectedLevel.colorHex }}
                >
                  <span className="text-white font-extrabold text-xl drop-shadow-md">
                    {selectedLevel.phValue}
                  </span>
                  <span className="text-[10px] font-semibold text-white/90 drop-shadow-xs">
                    pH
                  </span>
                </div>
              </div>

              {/* Status pulse badge */}
              <div className="absolute -bottom-2">
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border shadow-xs ${selectedLevel.statusBadgeColor}`}
                >
                  {selectedLevel.status === 'saludable' && <CheckCircle2 className="w-3.5 h-3.5" />}
                  {selectedLevel.status === 'transicion' && <Info className="w-3.5 h-3.5" />}
                  {selectedLevel.status === 'alerta' && <AlertCircle className="w-3.5 h-3.5" />}
                  {selectedLevel.status === 'critico' && <AlertTriangle className="w-3.5 h-3.5" />}
                  {selectedLevel.statusLabel}
                </span>
              </div>
            </div>

            <h4 className="font-bold text-slate-900 text-sm mt-3">{selectedLevel.colorName}</h4>
            <p className="text-xs text-slate-500 mt-1 italic leading-tight">
              {selectedLevel.pantyVisualDescription}
            </p>
          </div>

          {/* Right: Biological explanation & recommendations */}
          <div className="lg:col-span-8 space-y-4">
            <div>
              <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span>Significado Biológico & Microbiota</span>
              </h4>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                {selectedLevel.biologicalMeaning}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {/* Causes */}
              <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
                  Factores & Posibles Causas
                </h5>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {selectedLevel.possibleCauses.map((cause, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-rose-500 font-bold">•</span>
                      <span>{cause}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommendations */}
              <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Pautas de Autocuidado
                </h5>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {selectedLevel.recommendations.map((rec, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-500 font-bold">✓</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {selectedLevel.requiresDoctor && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-rose-800 text-xs font-semibold">
                  <Stethoscope className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>
                    Este valor de pH sugiere una alteración de la flora que amerita valoración médica.
                  </span>
                </div>
                <button
                  onClick={onNavigateToClinics}
                  className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-medium whitespace-nowrap shadow-xs transition-colors"
                  id="btn-goto-clinics-from-strip"
                >
                  Ver clínicas en Aguascalientes
                </button>
              </div>
            )}
          </div>
        </div>

        {/* SYMPTOMS LOGGING & AI ASSISTANT */}
        <div className="mt-8 pt-6 border-t border-slate-100">
          <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
            <span>¿Presentas algún síntoma en este momento?</span>
            <span className="text-xs text-slate-400 font-normal">(Opcional para tu registro)</span>
          </h4>

          <div className="flex flex-wrap gap-2 mb-4" id="symptoms-chips-container">
            {COMMON_SYMPTOMS_LIST.map((sym) => {
              const isSelected = selectedSymptoms.includes(sym.label);
              return (
                <button
                  key={sym.id}
                  onClick={() => toggleSymptom(sym.label)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors border ${
                    isSelected
                      ? 'bg-rose-600 text-white border-rose-600 shadow-2xs'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {sym.label}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div>
              <input
                type="text"
                placeholder="Notas personales (ej. después de hacer ejercicio, inicio de regla...)"
                value={userNotes}
                onChange={(e) => setUserNotes(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:bg-white transition-all"
                id="input-user-ph-notes"
              />
            </div>

            <div className="flex items-center gap-2 justify-end">
              <button
                onClick={handleAnalyzeWithAi}
                disabled={isAnalyzingAi}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-medium shadow-xs transition-all disabled:opacity-50"
                id="btn-ai-analyze-ph"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isAnalyzingAi ? 'Analizando con IA...' : 'Análisis PurIA'}</span>
              </button>

              <button
                onClick={handleSaveMeasurement}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-medium shadow-xs transition-all"
                id="btn-save-ph-measurement"
              >
                <BookmarkCheck className="w-3.5 h-3.5" />
                <span>Guardar Registro</span>
              </button>
            </div>
          </div>

          {/* AI Analysis response card */}
          {aiAnalysisResult && (
            <div className="mt-4 p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-slate-700 text-xs leading-relaxed animate-fade-in">
              <div className="flex items-center gap-2 text-indigo-900 font-bold mb-1">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>Orientación Biotecnológica PurIA</span>
              </div>
              <p>{aiAnalysisResult}</p>
            </div>
          )}

          {saveSuccessMessage && (
            <div className="mt-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>¡Medición guardada exitosamente en tu historial!</span>
            </div>
          )}
        </div>
      </div>

      {/* RECENT MEASUREMENTS HISTORY */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-sm" id="ph-history-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Clock className="w-4 h-4 text-rose-500" />
            Historial de Mediciones de pH
          </h3>
          <span className="text-xs text-slate-400">
            {logs.length} {logs.length === 1 ? 'registro' : 'registros'} guardados
          </span>
        </div>

        {logs.length === 0 ? (
          <div className="text-center py-8 px-4 rounded-2xl bg-slate-50 border border-dashed border-slate-200">
            <p className="text-xs text-slate-500">
              Aún no has registrado lecturas de tu panty PHurity.
              Selecciona arriba el color que observas y presiona "Guardar Registro".
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
            {logs.slice(0, 10).map((log) => (
              <div key={log.id} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg shadow-2xs border border-slate-200 flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: log.colorHex }}
                  >
                    {log.phValue}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-800">{log.colorName}</span>
                      {log.cycleDay && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600">
                          Día {log.cycleDay} de ciclo
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400">
                      {log.timestamp} • {log.symptoms?.join(', ')}
                    </p>
                    {log.notes && (
                      <p className="text-[11px] text-slate-500 italic mt-0.5">"{log.notes}"</p>
                    )}
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                      log.phValue <= 4.5
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : log.phValue <= 4.8
                        ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                        : 'bg-rose-50 text-rose-700 border-rose-200'
                    }`}
                  >
                    {log.phValue <= 4.5 ? 'Normal' : log.phValue <= 4.8 ? 'Transición' : 'Alerta'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
