import { PhColorLevel } from '../types';

export const PH_SCALE_LEVELS: PhColorLevel[] = [
  {
    id: 'ph-3-8',
    phValue: 3.8,
    colorHex: '#FBBF24', // Amber/Yellow
    colorName: 'Amarillo Ámbar Radiante',
    status: 'saludable',
    statusLabel: 'Flora Óptima Saludable',
    statusBadgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    textColor: 'text-amber-700',
    biologicalMeaning:
      'Acidez perfecta y protectora. Los lactobacilos benéficos (Bacilos de Döderlein) producen ácido láctico suficiente para bloquear bacterias patógenas y levaduras.',
    pantyVisualDescription:
      'La zona indicadora de la panty PHurity muestra un tono amarillo ámbar homogéneo y nítido.',
    possibleCauses: [
      'Microbiota vaginal balanceada',
      'Buena hidratación y niveles óptimos de estrógenos',
      'Higiene íntima adecuada (sin duchas vaginales)',
    ],
    recommendations: [
      '¡Excelente! Mantén tus hábitos cotidianos de salud íntima.',
      'Usa ropa interior transpirable de algodón como tu panty PHurity.',
      'Lava tu zona íntima únicamente con agua tibia o syndet con pH balanceado.',
    ],
    requiresDoctor: false,
  },
  {
    id: 'ph-4-2',
    phValue: 4.2,
    colorHex: '#F59E0B', // Golden Yellow
    colorName: 'Amarillo Dorado Cálido',
    status: 'saludable',
    statusLabel: 'Equilibrio Fisiológico Normal',
    statusBadgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    textColor: 'text-amber-800',
    biologicalMeaning:
      'Rango óptimo estándar para mujeres en edad reproductiva. La barrera ácida contra microorganismos oportunistas está completamente activa.',
    pantyVisualDescription:
      'Tira reactiva con tono amarillo cálido y claro.',
    possibleCauses: [
      'Fase folicular o lútea normal del ciclo',
      'Respuesta natural ante el ejercicio o uso diario',
    ],
    recommendations: [
      'Continúa monitoreando a lo largo de las distintas fases de tu ciclo menstrual.',
      'Hidrátate con al menos 2 litros de agua al día.',
      'Evita jabones perfumados que alteren la biopelícula protectora.',
    ],
    requiresDoctor: false,
  },
  {
    id: 'ph-4-5',
    phValue: 4.5,
    colorHex: '#A3E635', // Lime Light Green
    colorName: 'Verde Lima Fresco',
    status: 'saludable',
    statusLabel: 'Límite Superior Saludable',
    statusBadgeColor: 'bg-lime-100 text-lime-800 border-lime-300',
    textColor: 'text-lime-800',
    biologicalMeaning:
      'Límite fisiológico normal. Común en días cercanos a la ovulación debido a cambios en el moco cervical fértil, o justo antes del periodo.',
    pantyVisualDescription:
      'Tira reactiva con transición visible de amarillo a verde lima suave.',
    possibleCauses: [
      'Pico estrogénico pre-ovulatorio o moco fértil',
      'Transpiración por actividad física intensa',
      'Uso de prendas muy ajustadas o sintéticas',
    ],
    recommendations: [
      'Verifica si coincide con tu ventana de ovulación en el calendario de la app.',
      'Mantén la zona seca y fresca.',
      'Si presentas comezón o flujo blanquecino tipo requesón, recuerda que la candidiasis puede coexistir con pH normal.',
    ],
    requiresDoctor: false,
  },
  {
    id: 'ph-4-8',
    phValue: 4.8,
    colorHex: '#84CC16', // Leaf Olive Green
    colorName: 'Verde Oliva Moderado',
    status: 'transicion',
    statusLabel: 'Zona de Transición / Alerta Leve',
    statusBadgeColor: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    textColor: 'text-yellow-800',
    biologicalMeaning:
      'Disminución leve en la concentración de ácido láctico. Puede representar una ligera disbiosis transitoria o la presencia de fluidos externos como semen o sangre residual.',
    pantyVisualDescription:
      'La tira toma un color verde definido, sin matices amarillos.',
    possibleCauses: [
      'Relaciones sexuales recientes en las últimas 24-48 horas (el semen tiene pH 7.2 - 8.0)',
      'Final o inicio de menstruación (sangre residual)',
      'Uso reciente de lubricantes no compatibles con el pH íntimo',
      'Inicio de desequilibrio bacteriano por estrés o antibióticos',
    ],
    recommendations: [
      'Espera 24 horas y vuelve a observar el color de tu panty PHurity.',
      'Evita automedicarte con óvulos comerciales sin confirmación médica.',
      'Monitorea si aparece olor diferente (olor a pescado) o aumento de secreción.',
    ],
    requiresDoctor: false,
  },
  {
    id: 'ph-5-2',
    phValue: 5.2,
    colorHex: '#14B8A6', // Teal / Turquoise Green
    colorName: 'Verde Turquesa / Aqua',
    status: 'alerta',
    statusLabel: 'Alcalinidad Anormal - Disbiosis',
    statusBadgeColor: 'bg-orange-100 text-orange-800 border-orange-300',
    textColor: 'text-teal-800',
    biologicalMeaning:
      'Pérdida significativa de lactobacilos protectores. Un pH > 4.5 es uno de los criterios clínicos de Amsel más contundentes para Vaginosis Bacteriana (proliferación de Gardnerella y anaerobios).',
    pantyVisualDescription:
      'El biosensor de PHurity vira a un color verde azulado o turquesa intenso.',
    possibleCauses: [
      'Vaginosis Bacteriana (VB) activa',
      'Tricomoniasis u otras infecciones mixtas',
      'Duchas vaginales que barrieron la flora benéfica',
      'Alteración hormonal o tratamiento prolongado con antibióticos',
    ],
    recommendations: [
      'Te recomendamos agendar una consulta de revisión ginecológica en Aguascalientes.',
      'Registra los síntomas asociados (olor, tipo de flujo, molestia al orinar) en la app para compartirlos con tu especialista.',
      'No utilices desodorantes íntimos ni remedios caseros.',
    ],
    requiresDoctor: true,
  },
  {
    id: 'ph-6-0',
    phValue: 6.0,
    colorHex: '#0284C7', // Sky Deep Blue
    colorName: 'Azul Océano / Azul Zafiro',
    status: 'critico',
    statusLabel: 'Alcalinidad Alta - Revisión Médica',
    statusBadgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    textColor: 'text-sky-800',
    biologicalMeaning:
      'Ambiente vaginal francamente alcalino. En ausencia de sangre menstrual, este valor suele asociarse a procesos infecciosos significativos, vaginitis descamativa inflamatoria o atrofia severa.',
    pantyVisualDescription:
      'El indicador de la panty PHurity se tiñe de un color azul profundo muy evidente.',
    possibleCauses: [
      'Vaginitis infecciosa bacteriana severa o Tricomoniasis',
      'Sangrado menstrual activo (la sangre tiene pH aproximado de 7.4)',
      'Fisura o filtración de líquido amniótico (en mujeres embarazadas)',
      'Hipoestrogenismo marcado (posmenopausia)',
    ],
    recommendations: [
      'Si no estás menstruando, es fundamental consultar con un profesional de la salud.',
      'Revisa nuestra sección de clínicas y ginecólogas en Aguascalientes para orientación inmediata.',
      'Si estás embarazada y notas este color azul con salida de líquido acuoso, acude a urgencias obstétricas inmediatamente.',
    ],
    requiresDoctor: true,
  },
  {
    id: 'ph-7-0',
    phValue: 7.0,
    colorHex: '#4F46E5', // Indigo Violet
    colorName: 'Azul Violeta / Índigo Profundo',
    status: 'critico',
    statusLabel: 'pH Neutro / Alcalino Marcado',
    statusBadgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    textColor: 'text-indigo-800',
    biologicalMeaning:
      'Alcalinidad marcada. Típico durante los días de sangrado menstrual abundante o ante cuadros inflamatorios graves.',
    pantyVisualDescription:
      'La zona colorimétrica toma un tono violeta oscuro o azul violáceo.',
    possibleCauses: [
      'Sangrado menstrual activo (flujo de periodo)',
      'Infección bacteriana severa con destrucción de la barrera ácida',
      'Ruptura de membranas en embarazo',
    ],
    recommendations: [
      'Si estás en tus días de regla, este color es completamente normal debido al pH de la sangre.',
      'Si NO estás menstruando ni embarazada, programa una consulta médica para análisis de exudado vaginal.',
      'Evita relaciones sexuales con penetración mientras persista la alteración.',
    ],
    requiresDoctor: true,
  },
];

export const COMMON_SYMPTOMS_LIST = [
  { id: 'sin_sintomas', label: 'Sin síntomas anormales', icon: 'Sparkles' },
  { id: 'flujo_incoloro', label: 'Flujo transparente o blanco fluido', icon: 'Droplets' },
  { id: 'flujo_grumoso', label: 'Flujo espeso / requesón', icon: 'AlertCircle' },
  { id: 'flujo_grisaceo', label: 'Flujo grisáceo o acuoso', icon: 'AlertTriangle' },
  { id: 'olor_fuerte', label: 'Olor fuerte o a pescado', icon: 'Wind' },
  { id: 'comezon_ardor', label: 'Comezón o escozor íntimo', icon: 'Flame' },
  { id: 'molestia_orinar', label: 'Ardor leve al orinar', icon: 'Activity' },
  { id: 'sangrado_leve', label: 'Manchado ligero (spotting)', icon: 'HeartPulse' },
  { id: 'post_relaciones', label: 'Relaciones íntimas en últimas 24h', icon: 'Heart' },
];
