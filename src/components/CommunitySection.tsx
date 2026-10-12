import React, { useState } from 'react';
import { CommunityPost, CommunityComment } from '../types';
import {
  Users,
  Heart,
  MessageCircle,
  ShieldCheck,
  Send,
  User,
  PlusCircle,
  Filter,
  CheckCircle2,
  Sparkles,
  Lock,
} from 'lucide-react';

interface CommunitySectionProps {
  posts: CommunityPost[];
  onAddPost: (post: CommunityPost) => void;
  onLikePost: (postId: string) => void;
  onAddComment: (postId: string, comment: CommunityComment) => void;
}

export const CommunitySection: React.FC<CommunitySectionProps> = ({
  posts,
  onAddPost,
  onLikePost,
  onAddComment,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todas');
  const [isCreatingPost, setIsCreatingPost] = useState<boolean>(false);
  const [expandedCommentsPostId, setExpandedCommentsPostId] = useState<string | null>(null);

  // New post form state
  const [newTitle, setNewTitle] = useState<string>('');
  const [newContent, setNewContent] = useState<string>('');
  const [newAuthor, setNewAuthor] = useState<string>('');
  const [newCategory, setNewCategory] = useState<CommunityPost['category']>('experiencia_panty');
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);

  // New comment text state
  const [commentInputs, setCommentInputs] = useState<{ [postId: string]: string }>({});
  const [commentIsAnonymous, setCommentIsAnonymous] = useState<boolean>(false);

  const filteredPosts =
    selectedCategory === 'todas'
      ? posts
      : posts.filter((p) => p.category === selectedCategory);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const authorDisplayName = isAnonymous ? 'Usuaria Anónima' : newAuthor.trim() || 'Usuaria PHurity';

    const newPost: CommunityPost = {
      id: 'post-' + Date.now(),
      title: newTitle.trim(),
      content: newContent.trim(),
      author: authorDisplayName,
      isAnonymous,
      avatar: isAnonymous
        ? ''
        : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      timestamp: 'Justo ahora',
      category: newCategory,
      likes: 0,
      userLiked: false,
      comments: [],
    };

    onAddPost(newPost);
    setNewTitle('');
    setNewContent('');
    setNewAuthor('');
    setIsCreatingPost(false);
  };

  const handleCommentSubmit = (postId: string) => {
    const text = commentInputs[postId]?.trim();
    if (!text) return;

    const newComment: CommunityComment = {
      id: 'c-' + Date.now(),
      author: commentIsAnonymous ? 'Compañera Anónima' : 'Usuaria PHurity',
      isAnonymous: commentIsAnonymous,
      avatar: '',
      content: text,
      timestamp: 'Justo ahora',
    };

    onAddComment(postId, newComment);
    setCommentInputs({ ...commentInputs, [postId]: '' });
  };

  return (
    <div className="space-y-8 animate-fade-in" id="community-main-view">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-semibold uppercase tracking-wider mb-2 border border-rose-200">
              <Users className="w-3.5 h-3.5" />
              Espacio Seguro & Solidario
            </div>
            <h2 className="text-2xl font-bold text-slate-900">
              Comunidad de Mujeres PHurity
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Comparte testimonios sobre tu panty inteligente, resuelve inquietudes sobre pH y apoya a otras mujeres.
            </p>
          </div>

          <button
            onClick={() => setIsCreatingPost(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl text-xs font-bold shadow-sm transition-all"
            id="btn-open-create-post"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Compartir Experiencia</span>
          </button>
        </div>

        {/* Safety & Privacy Notice */}
        <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
          <div className="p-2 bg-rose-100 text-rose-700 rounded-xl shrink-0 mt-0.5">
            <Lock className="w-4 h-4" />
          </div>
          <div className="text-xs text-slate-600 leading-relaxed">
            <strong className="text-slate-800 font-semibold">Privacidad Garantizada:</strong>{' '}
            Sabemos que la salud íntima puede ser un tema sensible. Puedes publicar y comentar de forma
            100% anónima en cualquier momento. Fomentamos un ambiente de respeto, ciencia y empatía libre de prejuicios.
          </div>
        </div>

        {/* Category Filters */}
        <div className="mt-6 flex flex-wrap gap-2" id="community-categories-bar">
          {[
            { id: 'todas', label: 'Todas las Charlas' },
            { id: 'experiencia_panty', label: '🌸 Panty PHurity' },
            { id: 'salud_ph', label: '🧪 Salud & pH' },
            { id: 'ciclo', label: '🩸 Ciclo Menstrual' },
            { id: 'biotecnologia', label: '🔬 Biotecnología Ags' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* CREATE POST MODAL / DRAWER */}
      {isCreatingPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-rose-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900">Crear Nueva Publicación</h3>
              <button
                onClick={() => setIsCreatingPost(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-semibold"
              >
                Cancelar
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Categoría del tema
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-rose-400"
                >
                  <option value="experiencia_panty">Experiencia con la Panty PHurity</option>
                  <option value="salud_ph">Dudas sobre pH y Colores</option>
                  <option value="ciclo">Ciclo Menstrual y Cambios</option>
                  <option value="biotecnologia">Pregunta sobre Biotecnología</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Título de tu experiencia o pregunta
                </label>
                <input
                  type="text"
                  placeholder="Ej. Mi panty cambió a verde lima el día 14..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-rose-400"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Cuéntanos tu experiencia con detalle
                </label>
                <textarea
                  rows={4}
                  placeholder="Escribe lo que observaste en tu panty, síntomas, recomendaciones o tus dudas..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-rose-400 resize-none"
                  required
                />
              </div>

              {/* Anonymous Toggle */}
              <div className="p-3 rounded-xl bg-rose-50/60 border border-rose-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-rose-600" />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">Publicar en modo anónimo</span>
                    <span className="text-[10px] text-slate-500">Tu nombre no será visible para nadie</span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="w-4 h-4 accent-rose-600 cursor-pointer"
                />
              </div>

              {!isAnonymous && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Tu nombre o apodo (opcional)
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Sofía A. (Ags)"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-rose-400"
                  />
                </div>
              )}

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreatingPost(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
                >
                  Publicar en la Comunidad
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* POSTS FEED */}
      <div className="space-y-4" id="community-posts-list">
        {filteredPosts.map((post) => {
          const isExpanded = expandedCommentsPostId === post.id;
          return (
            <div
              key={post.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-rose-100 shadow-2xs hover:shadow-xs transition-all"
            >
              {/* Post author header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  {post.isAnonymous ? (
                    <div className="w-9 h-9 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs">
                      <Lock className="w-4 h-4" />
                    </div>
                  ) : post.avatar ? (
                    <img
                      src={post.avatar}
                      alt={post.author}
                      className="w-9 h-9 rounded-full object-cover border border-rose-200"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xs">
                      <User className="w-4 h-4" />
                    </div>
                  )}

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{post.author}</span>
                      {post.isAnonymous && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                          Anónima
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400">{post.timestamp}</span>
                  </div>
                </div>

                <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 uppercase tracking-wide">
                  {post.category === 'experiencia_panty'
                    ? 'Panty PHurity'
                    : post.category === 'salud_ph'
                    ? 'Salud pH'
                    : post.category === 'ciclo'
                    ? 'Ciclo'
                    : 'Biotecnología'}
                </span>
              </div>

              {/* Title & Content */}
              <h3 className="text-base font-bold text-slate-900 mb-2">{post.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line mb-4">
                {post.content}
              </p>

              {/* Verified review note */}
              {post.verifiedBiotechReview && (
                <div className="mb-4 p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-center gap-2 text-[11px] text-emerald-800 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{post.verifiedBiotechReview}</span>
                </div>
              )}

              {/* Action bar: Likes & Comments */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => onLikePost(post.id)}
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl transition-colors ${
                      post.userLiked
                        ? 'bg-rose-50 text-rose-600 border border-rose-200'
                        : 'text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${post.userLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                    <span>{post.likes}</span>
                  </button>

                  <button
                    onClick={() => setExpandedCommentsPostId(isExpanded ? null : post.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 px-3 py-1.5 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.comments.length} comentarios</span>
                  </button>
                </div>
              </div>

              {/* EXPANDED COMMENTS SECTION */}
              {isExpanded && (
                <div className="mt-4 pt-4 border-t border-slate-100 space-y-3 animate-fade-in">
                  <div className="space-y-2">
                    {post.comments.length === 0 ? (
                      <p className="text-xs text-slate-400 italic py-1">
                        Sé la primera en comentar o brindar apoyo a esta publicación.
                      </p>
                    ) : (
                      post.comments.map((comm) => (
                        <div
                          key={comm.id}
                          className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-1"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-800 flex items-center gap-1">
                              {comm.isAnonymous && <Lock className="w-3 h-3 text-slate-400" />}
                              {comm.author}
                            </span>
                            <span className="text-[10px] text-slate-400">{comm.timestamp}</span>
                          </div>
                          <p className="text-slate-600">{comm.content}</p>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Add comment input */}
                  <div className="flex flex-col sm:flex-row items-center gap-2 pt-2">
                    <input
                      type="text"
                      placeholder="Escribe una respuesta empática o consejo..."
                      value={commentInputs[post.id] || ''}
                      onChange={(e) =>
                        setCommentInputs({ ...commentInputs, [post.id]: e.target.value })
                      }
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleCommentSubmit(post.id);
                        }
                      }}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-rose-400"
                    />

                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                      <label className="flex items-center gap-1 text-[11px] text-slate-500 cursor-pointer whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={commentIsAnonymous}
                          onChange={(e) => setCommentIsAnonymous(e.target.checked)}
                          className="accent-rose-600 rounded"
                        />
                        <span>Anónima</span>
                      </label>

                      <button
                        onClick={() => handleCommentSubmit(post.id)}
                        className="px-3 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-2xs transition-colors shrink-0 flex items-center gap-1"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Comentar</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
