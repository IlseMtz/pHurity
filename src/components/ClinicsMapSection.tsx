import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { AGUASCALIENTES_CLINICS } from '../data/clinicsAgsData';
import { ClinicLocation } from '../types';
import {
  MapPin,
  Phone,
  Clock,
  Navigation,
  ShieldCheck,
  AlertCircle,
  Star,
  Search,
  ExternalLink,
  Building2,
  Stethoscope,
  HeartPulse,
} from 'lucide-react';

export const ClinicsMapSection: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});

  const [selectedClinic, setSelectedClinic] = useState<ClinicLocation>(AGUASCALIENTES_CLINICS[0]);
  const [filterType, setFilterType] = useState<string>('todas');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredClinics = AGUASCALIENTES_CLINICS.filter((clinic) => {
    const matchesType =
      filterType === 'todas'
        ? true
        : filterType === 'urgencias'
        ? clinic.emergency24h
        : clinic.type === filterType;

    const matchesSearch =
      clinic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      clinic.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      clinic.neighborhood.toLowerCase().includes(searchQuery.toLowerCase()) ||
      clinic.services.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesType && matchesSearch;
  });

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Center of Aguascalientes, Ags
    const agsCoords: [number, number] = [21.8823, -102.296];

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: agsCoords,
        zoom: 12.5,
        zoomControl: true,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Clear existing markers
    Object.values(markersRef.current).forEach((marker) => marker.remove());
    markersRef.current = {};

    // Add markers for filtered clinics
    filteredClinics.forEach((clinic) => {
      const isSelected = selectedClinic.id === clinic.id;
      const markerColor = clinic.emergency24h ? '#e11d48' : '#4f46e5';

      // Custom divIcon to ensure no broken image icons
      const customIcon = L.divIcon({
        className: 'custom-phurity-pin',
        html: `
          <div style="
            background: ${markerColor};
            width: ${isSelected ? '36px' : '30px'};
            height: ${isSelected ? '36px' : '30px'};
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid white;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
            transition: all 0.2s ease;
          ">
            <div style="
              transform: rotate(45deg);
              color: white;
              font-size: ${isSelected ? '14px' : '11px'};
              font-weight: bold;
            ">
              ${clinic.emergency24h ? '24h' : '🏥'}
            </div>
          </div>
        `,
        iconSize: isSelected ? [36, 36] : [30, 30],
        iconAnchor: isSelected ? [18, 36] : [15, 30],
        popupAnchor: [0, -32],
      });

      const marker = L.marker([clinic.lat, clinic.lng], { icon: customIcon })
        .addTo(map)
        .on('click', () => {
          setSelectedClinic(clinic);
        });

      markersRef.current[clinic.id] = marker;
    });

    // Cleanup on unmount
    return () => {
      // Keep map alive or clean on final destruction
    };
  }, [filteredClinics, selectedClinic]);

  // When selected clinic changes, pan map to it
  const handleSelectClinic = (clinic: ClinicLocation) => {
    setSelectedClinic(clinic);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([clinic.lat, clinic.lng], 14, {
        animate: true,
      });
    }
  };

  return (
    <div className="space-y-8 animate-fade-in" id="clinics-map-main-view">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-semibold uppercase tracking-wider mb-2 border border-rose-200">
              <MapPin className="w-3.5 h-3.5" />
              Directorio Médico • Aguascalientes
            </div>
            <h2 className="text-2xl font-bold text-slate-900">
              Clínicas de la Mujer & Hospitales Cercanos
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Encuentra centros de salud ginecológica certificados en Aguascalientes para chequeos de pH, exudados y atención preventiva.
            </p>
          </div>

          {/* Emergency Hotline Aguascalientes Card */}
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-rose-50 border border-rose-200">
            <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <HeartPulse className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-rose-600 block tracking-wide">
                Línea de Salud de la Mujer Ags
              </span>
              <a
                href="tel:8006243746"
                className="text-xs sm:text-sm font-black text-rose-950 hover:underline"
              >
                800 624 3746 / 911
              </a>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Buscar por clínica, colonia (ej. Las Américas, Bosques) o servicio..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-rose-400"
              id="input-search-clinics"
            />
          </div>

          <div className="sm:col-span-6 flex flex-wrap gap-1.5 items-center justify-start sm:justify-end">
            {[
              { id: 'todas', label: 'Todas' },
              { id: 'urgencias', label: '🚨 Urgencias 24h' },
              { id: 'especialidad', label: 'Salud de la Mujer' },
              { id: 'publico', label: 'Públicas (ISSEA)' },
              { id: 'privado', label: 'Privadas' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilterType(f.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                  filterType === f.id
                    ? 'bg-rose-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* MAP AND CLINIC DETAILS SPLIT VIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left / Top: Interactive Leaflet Map Container */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-3 border border-rose-100 shadow-sm overflow-hidden">
          <div
            ref={mapContainerRef}
            className="w-full h-[460px] rounded-2xl z-10"
            id="leaflet-clinics-map"
          />
          <div className="p-3 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600 inline-block" /> Urgencias 24 horas
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 inline-block" /> Consulta Ginecológica
            </span>
            <span>Aguascalientes, México</span>
          </div>
        </div>

        {/* Right: Selected Clinic Spotlight & Directory List */}
        <div className="lg:col-span-5 space-y-4">
          {/* Spotlight Card */}
          {selectedClinic && (
            <div className="bg-white rounded-3xl p-6 border-2 border-rose-200 shadow-sm relative">
              <div className="flex items-start justify-between gap-3 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                  {selectedClinic.type === 'urgencias'
                    ? 'Hospital de Urgencias'
                    : selectedClinic.type === 'especialidad'
                    ? 'Clínica Especializada'
                    : selectedClinic.type === 'publico'
                    ? 'Sector Público ISSEA'
                    : 'Centro Ginecológico Privado'}
                </span>

                {selectedClinic.emergency24h && (
                  <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-800 text-[10px] font-extrabold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
                    24 Horas
                  </span>
                )}
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-1">{selectedClinic.name}</h3>
              <p className="text-xs text-slate-500 flex items-center gap-1 mb-4">
                <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                {selectedClinic.address}, {selectedClinic.neighborhood}, {selectedClinic.city}, Ags.
              </p>

              <div className="space-y-2 text-xs text-slate-600 mb-4 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{selectedClinic.schedule}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                  <a
                    href={`tel:${selectedClinic.phone}`}
                    className="text-rose-600 font-semibold hover:underline"
                  >
                    {selectedClinic.phone}
                  </a>
                </div>
              </div>

              {/* Services badges */}
              <div className="mb-5">
                <span className="text-[11px] font-bold text-slate-700 block mb-1.5">
                  Servicios y Estudios Disponibles:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedClinic.services.map((srv, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700"
                    >
                      {srv}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                <a
                  href={`tel:${selectedClinic.phone}`}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Llamar a Clínica</span>
                </a>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    selectedClinic.name + ' ' + selectedClinic.address + ' Aguascalientes'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-xs transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Cómo Llegar</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          )}

          {/* Quick List for rapid browsing */}
          <div className="bg-white rounded-3xl p-4 border border-rose-100 shadow-sm max-h-72 overflow-y-auto divide-y divide-slate-100">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block p-2">
              Todas las Clínicas en Aguascalientes ({filteredClinics.length})
            </span>
            {filteredClinics.map((clinic) => {
              const isSelected = selectedClinic?.id === clinic.id;
              return (
                <button
                  key={clinic.id}
                  onClick={() => handleSelectClinic(clinic)}
                  className={`w-full text-left p-3 rounded-xl transition-colors flex items-center justify-between gap-3 ${
                    isSelected ? 'bg-rose-50/70 border border-rose-200' : 'hover:bg-slate-50'
                  }`}
                >
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{clinic.name}</h4>
                    <p className="text-[11px] text-slate-500 truncate max-w-[220px]">
                      {clinic.neighborhood}, {clinic.city}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[10px] font-semibold text-rose-600">
                      {clinic.emergency24h ? '24h Urgencias' : 'Ver detalles'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
