import React from 'react';
import { Sparkles, ShieldCheck, Cpu, Dna, MapPin, X } from 'lucide-react';

interface BiotechInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BiotechInfoModal: React.FC<BiotechInfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-rose-100 p-6 md:p-8"
        id="biotech-modal-container"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Cerrar modal"
          id="btn-close-biotech-modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl text-white shadow-md shadow-rose-200">
            <Dna className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                Innovación Hidrocálida
              </span>
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-rose-500" /> Aguascalientes, México
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              La Biotecnología detrás de PHurity
            </h2>
          </div>
        </div>

        <div className="space-y-5 text-sm leading-relaxed text-slate-600">
          <p>
            <strong className="text-slate-900 font-semibold">PHurity</strong> nace de la colaboración
            entre ingenieros en sistemas computacionales y biotecnólogos en Aguascalientes, con la visión
            de transformar una prenda de uso cotidiano en una herramienta biomédica de diagnóstico no invasivo.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <div className="p-4 rounded-xl bg-rose-50/60 border border-rose-100">
              <div className="flex items-center gap-2 text-rose-700 font-semibold mb-1">
                <ShieldCheck className="w-5 h-5 text-rose-600" />
                <span>Indicadores No Tóxicos</span>
              </div>
              <p className="text-xs text-slate-600">
                Moléculas colorimétricas biocompatibles grado médico que reaccionan con los iones de hidrógeno [H+]
                sin lixiviar químicos a la piel ni afectar la mucosa vulvar.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-100">
              <div className="flex items-center gap-2 text-indigo-700 font-semibold mb-1">
                <Cpu className="w-5 h-5 text-indigo-600" />
                <span>Microfibra Inteligente</span>
              </div>
              <p className="text-xs text-slate-600">
                Estructura textil con capacidad de transpiración, hipoalergénica, que retiene el indicador en una
                matriz polimérica lavable y reutilizable.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80">
            <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              ¿Por qué es crucial medir el pH vaginal?
            </h3>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <span className="font-bold text-emerald-600">• pH 3.8 - 4.5:</span>
                Ambiente ácido donde los lactobacilos impiden la colonización de hongos y bacterias oportunistas.
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-orange-600">• pH &gt; 4.8:</span>
                Señal temprana de alerta para Vaginosis Bacteriana (Gardnerella) o Tricomoniasis, a menudo antes de que haya mal olor o dolor.
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-indigo-600">• Prevención Preventiva:</span>
                Permite a las mujeres consultar a tiempo a su ginecóloga en Aguascalientes y evitar automedicaciones perjudiciales.
              </li>
            </ul>
          </div>

          <p className="text-xs text-slate-500 italic">
            * Nota médica: PHurity es una prenda de soporte preventivo y monitoreo de bienestar femenino.
            No sustituye un frotis en fresco, cultivo o diagnóstico de un profesional médico certificado.
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-medium rounded-xl text-sm shadow-sm transition-colors"
            id="btn-understand-biotech"
          >
            Entendido, gracias
          </button>
        </div>
      </div>
    </div>
  );
};
