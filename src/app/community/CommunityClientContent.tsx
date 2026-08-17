'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { ThumbsUp, ThumbsDown, Image as ImageIcon, Send, MessageSquare, Megaphone, Loader2, UserCheck, Sparkles, TrendingUp, HelpCircle, Flame, Plus, X } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { ANNOUNCEMENTS } from '@/constants/announcements';

interface CommunityPost {
  id: string;
  author_id?: string;
  author_name: string;
  author_role?: string;
  title?: string;
  content: string;
  image_url?: string;
  upvotes: number;
  downvotes: number;
  created_at: string;
  userVoted?: 'up' | 'down' | null;
}

export default function CommunityClientContent() {
  const searchParams = useSearchParams();
  const activeTabParam = searchParams.get('tab') || 'discussions';
  const [activeTab, setActiveTab] = useState<'discussions' | 'announcements'>(
    activeTabParam === 'announcements' ? 'announcements' : 'discussions'
  );

  useEffect(() => {
    if (activeTabParam === 'announcements') {
      setActiveTab('announcements');
    } else {
      setActiveTab('discussions');
    }
  }, [activeTabParam]);

  // Posts Feed State
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Modal State for Floating Create Post Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load User & Feed Posts
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name, role')
          .eq('id', session.user.id)
          .single();

        setCurrentUser({
          id: session.user.id,
          name: profile?.full_name || session.user.email?.split('@')[0] || 'Engineer Member',
          role: profile?.role || 'Member',
        });
      } else {
        const guestData = localStorage.getItem('ee_guest_user');
        if (guestData) {
          try {
            const parsed = JSON.parse(guestData);
            setCurrentUser({
              id: 'guest',
              name: parsed.full_name || 'Guest Researcher',
              role: 'Guest',
            });
          } catch {
            // ignore
          }
        }
      }

      await fetchCommunityPosts();
      setLoading(false);
    }

    loadData();
  }, []);

  const fetchCommunityPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('community_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        if (error.code === '42P01') {
          setPosts([]);
          return;
        }
        throw error;
      }

      setPosts(data || []);
    } catch (err) {
      console.log('Error fetching posts:', err);
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || posting) return;

    const authorName = currentUser?.name || 'Anonymous Member';
    const authorRole = currentUser?.role || 'Member';
    const authorId = currentUser?.id !== 'guest' ? currentUser?.id : null;

    setPosting(true);
    try {
      const { data, error } = await supabase
        .from('community_posts')
        .insert([
          {
            author_id: authorId,
            author_name: authorName,
            author_role: authorRole,
            title: title.trim() || null,
            content: content.trim(),
            image_url: imageUrl.trim() || null,
            upvotes: 0,
            downvotes: 0,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      if (data) {
        setPosts((prev) => [data, ...prev]);
        setTitle('');
        setContent('');
        setImageUrl('');
        setIsModalOpen(false); // Close Modal on success
      }
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to publish post');
    } finally {
      setPosting(false);
    }
  };

  const handleVote = async (postId: string, type: 'up' | 'down') => {
    const post = posts.find((p) => p.id === postId);
    if (!post) return;

    let newUpvotes = post.upvotes || 0;
    let newDownvotes = post.downvotes || 0;

    if (type === 'up') {
      newUpvotes += 1;
    } else {
      newDownvotes += 1;
    }

    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              upvotes: newUpvotes,
              downvotes: newDownvotes,
              userVoted: type,
            }
          : p
      )
    );

    try {
      await supabase
        .from('community_posts')
        .update({
          upvotes: newUpvotes,
          downvotes: newDownvotes,
        })
        .eq('id', postId);
    } catch (err) {
      console.log('Vote update error:', err);
    }
  };

  return (
    <div className="py-8 px-4 sm:px-8 lg:px-12 w-full font-sans space-y-6 text-stone-900 dark:text-stone-100">
      {/* Breadcrumb Navigation */}
      <div className="text-xs font-mono text-stone-500 border-b border-stone-200 dark:border-stone-800 pb-2">
        <Link href="/" className="hover:underline">domain</Link>
        {' / '}
        <span className="text-black dark:text-white font-bold">community</span>
      </div>

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-stone-800 dark:border-stone-200 pb-3 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-black dark:text-white tracking-tight uppercase">
            COMMUNITY FEED &amp; DISCUSSION FORUM
          </h1>
          <p className="text-xs font-mono text-stone-600 dark:text-stone-400 mt-0.5">
            FULL TECHNICAL POSTS, SCHEMATIC ANALYSIS &amp; OFFICIAL ANNOUNCEMENTS.
          </p>
        </div>

        {/* Action Buttons: Add Post Modal Trigger & Tabs */}
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
          {activeTab === 'discussions' && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-stone-900 dark:bg-stone-100 text-white dark:text-black font-extrabold uppercase hover:opacity-90 transition-opacity shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Create Post</span>
            </button>
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('discussions')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-bold transition-colors ${
                activeTab === 'discussions'
                  ? 'bg-stone-800 text-white dark:bg-stone-200 dark:text-black'
                  : 'border border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Community Feed</span>
            </button>

            <button
              onClick={() => setActiveTab('announcements')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-bold transition-colors ${
                activeTab === 'announcements'
                  ? 'bg-stone-800 text-white dark:bg-stone-200 dark:text-black'
                  : 'border border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              <Megaphone className="w-4 h-4" />
              <span>Announcements</span>
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: FULL COMMUNITY FEED WITH LEFT & RIGHT SIDEBARS */}
      {activeTab === 'discussions' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Sidebar: Guidelines & Trending Topics (3 Columns) */}
          <aside className="lg:col-span-3 space-y-4 font-sans text-xs">
            {/* Quick Guidelines Card */}
            <div className="border border-stone-300 dark:border-stone-800 bg-[#FCFCF9] dark:bg-[#141414] rounded-xl p-5 space-y-3 shadow-sm">
              <span className="font-mono text-[11px] font-bold text-stone-500 uppercase block tracking-wider flex items-center gap-1.5 border-b border-stone-200 dark:border-stone-800 pb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>FORUM GUIDELINES</span>
              </span>
              <ul className="space-y-2 text-stone-700 dark:text-stone-300 leading-relaxed text-xs">
                <li className="flex items-start gap-2">
                  <span className="font-mono font-bold text-black dark:text-white">•</span>
                  <span>Keep posts relevant to Electrical Engineering, Power Systems &amp; IoT.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono font-bold text-black dark:text-white">•</span>
                  <span>Attach clear circuit schematic images or direct repository URLs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono font-bold text-black dark:text-white">•</span>
                  <span>Respect peer feedback and manuscript reviews.</span>
                </li>
              </ul>
            </div>

            {/* Trending Tags Card */}
            <div className="border border-stone-300 dark:border-stone-800 bg-[#FCFCF9] dark:bg-[#141414] rounded-xl p-5 space-y-3 shadow-sm">
              <span className="font-mono text-[11px] font-bold text-stone-500 uppercase block tracking-wider flex items-center gap-1.5 border-b border-stone-200 dark:border-stone-800 pb-2">
                <Flame className="w-3.5 h-3.5 text-rose-500" />
                <span>TRENDING TOPICS</span>
              </span>
              <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                {['#Microcontrollers', '#Verilog', '#PCB-Design', '#GaN-Power', '#DSP-Filters', '#Embedded-C'].map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 rounded hover:bg-stone-200 dark:hover:bg-stone-700 cursor-pointer">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Posts Feed Column (6 Columns - ONLY POSTS SHOWN HERE) */}
          <main className="lg:col-span-6 space-y-6">
            {/* Create Post Action Strip */}
            <div className="p-4 border border-stone-300 dark:border-stone-800 bg-[#FCFCF9] dark:bg-[#141414] rounded-xl flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-2 font-mono text-xs text-stone-600 dark:text-stone-400">
                <UserCheck className="w-4 h-4 text-stone-500" />
                <span>Logged in as <strong>{currentUser?.name || 'Member'}</strong></span>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-black font-mono text-xs font-bold uppercase rounded-lg hover:opacity-90 transition-opacity flex items-center gap-1.5 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create New Post</span>
              </button>
            </div>

            {/* Posts Stream List */}
            {loading ? (
              <div className="py-16 text-center text-stone-500 font-mono text-xs flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Loading community posts...</span>
              </div>
            ) : posts.length === 0 ? (
              <div className="p-12 border-2 border-dashed border-stone-300 dark:border-stone-800 rounded-xl text-center text-stone-500 font-mono text-xs space-y-3">
                <MessageSquare className="w-8 h-8 mx-auto text-stone-400" />
                <p className="font-bold text-black dark:text-white uppercase">No Community Posts Yet</p>
                <p className="text-[11px]">Click the button below to publish the first technical post!</p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-5 py-2.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-black font-mono text-xs font-bold uppercase rounded-lg inline-flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create First Post</span>
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {posts.map((post) => (
                  <article
                    key={post.id}
                    className="border border-stone-300 dark:border-stone-800 bg-[#FCFCF9] dark:bg-[#141414] rounded-xl p-6 shadow-md space-y-4 font-sans"
                  >
                    {/* Author Header */}
                    <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-stone-900 dark:bg-stone-100 text-white dark:text-black font-bold text-sm flex items-center justify-center">
                          {post.author_name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-black dark:text-white">
                            {post.author_name}
                          </h4>
                          <span className="text-[11px] font-mono text-stone-500 uppercase">
                            {post.author_role || 'Member'}
                          </span>
                        </div>
                      </div>

                      <span className="text-xs font-mono text-stone-400">
                        {new Date(post.created_at).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>

                    {/* Post Title */}
                    {post.title && (
                      <h3 className="text-lg font-bold text-black dark:text-white tracking-tight">
                        {post.title}
                      </h3>
                    )}

                    {/* Full Text Content */}
                    <p className="text-stone-800 dark:text-stone-200 leading-relaxed text-sm whitespace-pre-wrap">
                      {post.content}
                    </p>

                    {/* Optional Embedded Image */}
                    {post.image_url && (
                      <div className="relative w-full h-64 sm:h-80 rounded-lg overflow-hidden border border-stone-300 dark:border-stone-800 bg-stone-100 dark:bg-stone-900">
                        <Image
                          src={post.image_url}
                          alt={post.title || 'Post attachment'}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}

                    {/* Upvote / Downvote Bar */}
                    <div className="pt-3 border-t border-stone-200 dark:border-stone-800 flex items-center gap-4 font-mono text-xs text-stone-500">
                      <button
                        onClick={() => handleVote(post.id, 'up')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors ${
                          post.userVoted === 'up' ? 'text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300' : ''
                        }`}
                      >
                        <ThumbsUp className="w-4 h-4" />
                        <span>{post.upvotes || 0} Upvotes</span>
                      </button>

                      <button
                        onClick={() => handleVote(post.id, 'down')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 hover:bg-rose-50 dark:hover:bg-rose-950/50 hover:text-rose-700 dark:hover:text-rose-400 transition-colors ${
                          post.userVoted === 'down' ? 'text-rose-600 font-bold bg-rose-50 dark:bg-rose-950/60 border-rose-300' : ''
                        }`}
                      >
                        <ThumbsDown className="w-4 h-4" />
                        <span>{post.downvotes || 0} Downvotes</span>
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </main>

          {/* Right Sidebar: Active Stats & Member Resources (3 Columns) */}
          <aside className="lg:col-span-3 space-y-4 font-sans text-xs">
            {/* Forum Statistics Card */}
            <div className="border border-stone-300 dark:border-stone-800 bg-[#FCFCF9] dark:bg-[#141414] rounded-xl p-5 space-y-3 shadow-sm">
              <span className="font-mono text-[11px] font-bold text-stone-500 uppercase block tracking-wider flex items-center gap-1.5 border-b border-stone-200 dark:border-stone-800 pb-2">
                <TrendingUp className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>FORUM ACTIVITY</span>
              </span>
              <div className="space-y-2 text-stone-700 dark:text-stone-300 font-mono text-xs">
                <div className="flex justify-between items-center">
                  <span>Total Posts:</span>
                  <span className="font-bold text-black dark:text-white">{posts.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Active Members:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">140+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Status:</span>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold">ONLINE</span>
                </div>
              </div>
            </div>

            {/* Quick Links Card */}
            <div className="border border-stone-300 dark:border-stone-800 bg-[#FCFCF9] dark:bg-[#141414] rounded-xl p-5 space-y-3 shadow-sm">
              <span className="font-mono text-[11px] font-bold text-stone-500 uppercase block tracking-wider flex items-center gap-1.5 border-b border-stone-200 dark:border-stone-800 pb-2">
                <HelpCircle className="w-3.5 h-3.5 text-stone-500" />
                <span>ACADEMIC LINKS</span>
              </span>
              <div className="space-y-2 text-xs">
                <Link href="/resources/academics" className="block text-stone-700 dark:text-stone-300 hover:text-black dark:hover:text-white underline">
                  &rarr; EE Practice Set Archive
                </Link>
                <Link href="/projects" className="block text-stone-700 dark:text-stone-300 hover:text-black dark:hover:text-white underline">
                  &rarr; Flagship Hardware Repos
                </Link>
                <Link href="/software?category=downloads" className="block text-stone-700 dark:text-stone-300 hover:text-black dark:hover:text-white underline">
                  &rarr; Software Utilities &amp; Downloads
                </Link>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* TAB 2: ANNOUNCEMENTS */}
      {activeTab === 'announcements' && (
        <div className="space-y-4 font-sans max-w-4xl mx-auto">
          <div className="flex items-center justify-between text-xs font-mono text-stone-500 border-b border-stone-200 dark:border-stone-800 pb-2">
            <span>OFFICIAL ADMIN BULLETINS: [{ANNOUNCEMENTS.length} ENTRIES]</span>
            <span>VERIFIED NOTICES</span>
          </div>

          <div className="divide-y divide-stone-200 dark:divide-stone-800 border border-stone-300 dark:border-stone-800 rounded-xl bg-[#FCFCF9] dark:bg-[#161616] overflow-hidden">
            {ANNOUNCEMENTS.map((ann) => (
              <div key={ann.id} className="p-5 space-y-2 hover:bg-stone-100 dark:hover:bg-stone-900 transition-colors">
                <div className="flex items-center justify-between font-mono text-xs text-stone-500">
                  <span className="font-bold text-blue-900 dark:text-blue-400">[{ann.tag}]</span>
                  <span>{ann.date}</span>
                </div>

                <h3 className="text-base font-bold text-black dark:text-white">
                  {ann.title}
                </h3>

                <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed font-sans">
                  {ann.summary}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FLOATING POPUP MODAL FOR CREATING NEW POST */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FCFCF9] dark:bg-[#141414] border-2 border-stone-800 dark:border-stone-200 rounded-2xl p-6 sm:p-8 max-w-xl w-full shadow-2xl space-y-4 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 p-1.5 rounded-full border border-stone-300 dark:border-stone-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="border-b border-stone-200 dark:border-stone-800 pb-3">
              <span className="font-mono text-xs font-bold text-blue-900 dark:text-blue-400 uppercase tracking-wider block">
                [ PUBLISH COMMUNITY POST ]
              </span>
              <h3 className="text-xl font-bold text-black dark:text-white mt-1">
                Create Technical Post as {currentUser?.name || 'Member'}
              </h3>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4 font-sans text-xs">
              <div className="space-y-3">
                <div>
                  <label className="block text-stone-600 dark:text-stone-400 font-medium mb-1">
                    Post Headline / Topic Title (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Analysis of PWM Duty Cycle in GaN Inverters"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-3 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-black dark:text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-stone-500 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-stone-600 dark:text-stone-400 font-medium mb-1">
                    Technical Post Content
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Write your complete technical post, circuit analysis, or engineering query..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full p-3 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-black dark:text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-stone-500 leading-relaxed font-sans"
                  />
                </div>

                <div>
                  <label className="block text-stone-600 dark:text-stone-400 font-medium mb-1">
                    Attach Image URL (Optional)
                  </label>
                  <div className="relative">
                    <ImageIcon className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
                    <input
                      type="url"
                      placeholder="e.g. https://.../schematic.png"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="w-full pl-9 p-3 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-black dark:text-white rounded-xl text-xs font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 border border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-400 font-mono text-xs font-bold uppercase rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={posting || !content.trim()}
                  className="px-6 py-2.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-black font-mono text-xs font-bold uppercase rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2 disabled:opacity-50 shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{posting ? 'Publishing...' : 'Publish Post'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
