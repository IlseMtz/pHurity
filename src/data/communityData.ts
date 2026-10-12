import { CommunityPost } from '../types';

export const INITIAL_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    author: 'Dra. Elena Villalobos',
    isAnonymous: false,
    avatar: 'https://images.unsplash.com/photo-1594824813684-5f3333333333?w=150&auto=format&fit=crop&q=80',
    timestamp: 'Hace 2 horas',
    category: 'biotecnologia',
    title: 'Orgullo Hidrocálido: Cómo funciona el biosensor de PHurity',
    content:
      'Como investigadora y ginecóloga en Aguascalientes, me emociona ver este proyecto de biotecnología local. El tejido inteligente de la panty PHurity integra indicadores colorimétricos no tóxicos ni lixiviables que detectan la concentración de iones hidrógeno [H+] en el fluido vaginal en tiempo real. Esto permite alertar tempranamente sobre la pérdida de lactobacilos antes de que se presenten síntomas molestos.',
    likes: 42,
    userLiked: true,
    verifiedBiotechReview: 'Revisado por equipo de Biotecnología PHurity Ags',
    comments: [
      {
        id: 'c-1',
        author: 'Mariana G.',
        isAnonymous: false,
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
        content: '¡Increíble iniciativa de Aguascalientes! La he probado durante 3 semanas y me da muchísima tranquilidad ver el tono amarillo ámbar constante.',
        timestamp: 'Hace 1 hora',
      },
      {
        id: 'c-2',
        author: 'Usuaria Anónima',
        isAnonymous: true,
        avatar: '',
        content: '¿El indicador se desgasta con las lavadas normales?',
        timestamp: 'Hace 30 min',
      },
    ],
  },
  {
    id: 'post-2',
    author: 'Camila R. (Ags)',
    isAnonymous: false,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    timestamp: 'Ayer',
    category: 'experiencia_panty',
    title: 'Mi experiencia detectando Vaginosis a tiempo antes de empeorar',
    content:
      'Hola chicas, quería compartirles que el fin de semana pasado noté que el indicador de mi panty PHurity cambió de amarillo a un verde turquesa (pH ~5.2). No sentía dolor, pero gracias a la alerta de la app fui a la Clínica de la Mujer aquí en Las Américas. La gine me confirmó inicio leve de Vaginosis Bacteriana y con tratamiento oportuno ya estoy al 100%. ¡La prevención sí funciona!',
    likes: 29,
    userLiked: false,
    comments: [
      {
        id: 'c-3',
        author: 'Sofía Méndez',
        isAnonymous: false,
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
        content: '¡Qué bueno que lo atendiste a tiempo! Esa es justo la ventaja de tener la tira visual en la ropa interior.',
        timestamp: 'Ayer',
      },
    ],
  },
  {
    id: 'post-3',
    author: 'Anónima_Ags',
    isAnonymous: true,
    avatar: '',
    timestamp: 'Hace 2 días',
    category: 'ciclo',
    title: '¿A alguna le cambia el color a verde lima (4.5 - 4.8) cuando ovula?',
    content:
      'He estado registrando mi ciclo en la app y noté que los días 13 y 14 de mi ciclo la tira reactiva suele virar a un tono más verdoso que en el resto del mes. ¿Es normal por el moco cervical?',
    likes: 18,
    userLiked: false,
    comments: [
      {
        id: 'c-4',
        author: 'Dra. Andrea Morales',
        isAnonymous: false,
        avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80',
        content: '¡Hola! Es completamente normal y fisiológico. El moco cervical ovulatorio tiene un pH ligeramente más alcalino (cercano a 7.0 en el canal endocervical para facilitar el paso de espermatozoides), por lo que al mezclarse puede elevar transitoriamente el pH vulvovaginal a 4.5 - 4.8.',
        timestamp: 'Hace 1 día',
      },
    ],
  },
  {
    id: 'post-4',
    author: 'Ximena T.',
    isAnonymous: false,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    timestamp: 'Hace 3 días',
    category: 'salud_ph',
    title: 'Tips de cuidado para conservar el pH ácido saludable',
    content:
      'Les dejo lo que a mí me ha funcionado muchísimo: 1. Dejar los jabones comerciales con perfume y usar solo syndet o agua. 2. Cambiar pantiprotectores desechables sintéticos por prendas transpirables de algodón como PHurity. 3. Tomar kéfir y probióticos específicos de lactobacilos.',
    likes: 35,
    userLiked: true,
    comments: [],
  },
];
