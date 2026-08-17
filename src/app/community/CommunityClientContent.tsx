'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ThumbsUp, ThumbsDown, Send, MessageSquare, Megaphone, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { ANNOUNCEMENTS } from '@/constants/announcements';

interface ChatPost {
  id: string;
  author_id?: string;
  author_name: string;
  author_role?: string;
  content: string;
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

  // Chat Discussions State
  const [posts, setPosts] = useState<ChatPost[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Load User & Posts
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
          role: profile?.role || 'member',
        });
      } else {
        const guestData = localStorage.getItem('ee_guest_user');
        if (guestData) {
          try {
            const parsed = JSON.parse(guestData);
            setCurrentUser({
              id: 'guest',
              name: parsed.full_name || 'Guest Researcher',
              role: 'guest',
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
        .order('created_at', { ascending: true });

      if (error) {
        if (error.code === '42P01') {
          setPosts([]);
          return;
        }
        throw error;
      }

      setPosts(data || []);
      setTimeout(() => {
        chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      console.log('Error fetching chat posts:', err);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || sending) return;

    const authorName = currentUser?.name || 'Anonymous Member';
    const authorRole = currentUser?.role || 'Member';
    const authorId = currentUser?.id !== 'guest' ? currentUser?.id : null;

    setSending(true);
    try {
      const { data, error } = await supabase
        .from('community_posts')
        .insert([
          {
            author_id: authorId,
            author_name: authorName,
            author_role: authorRole,
            content: newMessage.trim(),
            upvotes: 0,
            downvotes: 0,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      if (data) {
        setPosts((prev) => [...prev, data]);
        setNewMessage('');
        setTimeout(() => {
          chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to send message');
    } finally {
      setSending(false);
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

    // Optimistic UI Update
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
    <div className="py-8 px-4 sm:px-8 lg:px-16 w-full font-sans space-y-6 text-stone-900 dark:text-stone-100 max-w-6xl mx-auto">
      {/* Breadcrumb Navigation */}
      <div className="text-xs font-mono text-stone-500 border-b border-stone-200 dark:border-stone-800 pb-2">
        <Link href="/" className="hover:underline">domain</Link>
        {' / '}
        <span className="text-black dark:text-white font-bold">community</span>
      </div>

      {/* 2-Option Header Tabs (Discussions & Q&A vs Announcements) */}
      <div className="flex items-center justify-between border-b-2 border-stone-800 dark:border-stone-200 pb-3">
        <div>
          <h1 className="text-2xl font-bold text-black dark:text-white tracking-tight uppercase">
            COMMUNITY &amp; DISCUSSIONS HUB
          </h1>
          <p className="text-xs font-mono text-stone-600 dark:text-stone-400 mt-0.5">
            PEER CHAT STREAM, SCHEMATIC Q&amp;A, AND OFFICIAL ADMIN ANNOUNCEMENTS.
          </p>
        </div>

        {/* 2 Tab Options */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <button
            onClick={() => setActiveTab('discussions')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-bold transition-colors ${
              activeTab === 'discussions'
                ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-black'
                : 'border border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Discussions &amp; Chat</span>
          </button>

          <button
            onClick={() => setActiveTab('announcements')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-bold transition-colors ${
              activeTab === 'announcements'
                ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-black'
                : 'border border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
            }`}
          >
            <Megaphone className="w-4 h-4" />
            <span>Announcements</span>
          </button>
        </div>
      </div>

      {/* TAB 1: DISCUSSIONS CHAT SYSTEM */}
      {activeTab === 'discussions' && (
        <div className="border border-stone-300 dark:border-stone-800 bg-[#FCFCF9] dark:bg-[#141414] rounded-xl flex flex-col h-[600px] shadow-lg overflow-hidden">
          {/* Chat Messages Stream Area */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 font-sans text-xs">
            {loading ? (
              <div className="h-full flex items-center justify-center text-stone-500 font-mono text-xs gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Syncing live community chat messages...</span>
              </div>
            ) : posts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-2 text-stone-500 font-mono">
                <MessageSquare className="w-8 h-8 text-stone-400" />
                <p className="font-bold text-black dark:text-white uppercase">No Chat Discussions Yet</p>
                <p className="text-[11px] max-w-xs">Be the first engineer to post a question or schematic feedback in the discussion room below!</p>
              </div>
            ) : (
              posts.map((post) => (
                <div
                  key={post.id}
                  className="p-4 border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 rounded-lg space-y-2 hover:border-stone-300 dark:hover:border-stone-700 transition-colors"
                >
                  {/* Author Header */}
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-black dark:text-white">
                        {post.author_name}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 uppercase text-[10px] font-bold">
                        {post.author_role || 'Member'}
                      </span>
                    </div>
                    <span className="text-stone-400">
                      {new Date(post.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  {/* Message Content */}
                  <p className="text-stone-800 dark:text-stone-200 leading-relaxed font-sans text-xs whitespace-pre-wrap">
                    {post.content}
                  </p>

                  {/* Upvote & Downvote Controls */}
                  <div className="pt-2 flex items-center gap-4 font-mono text-[11px] text-stone-500 border-t border-stone-100 dark:border-stone-800/80">
                    <button
                      onClick={() => handleVote(post.id, 'up')}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded hover:bg-emerald-50 dark:hover:bg-emerald-950/50 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors ${
                        post.userVoted === 'up' ? 'text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950/60' : ''
                      }`}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{post.upvotes || 0}</span>
                    </button>

                    <button
                      onClick={() => handleVote(post.id, 'down')}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded hover:bg-rose-50 dark:hover:bg-rose-950/50 hover:text-rose-700 dark:hover:text-rose-400 transition-colors ${
                        post.userVoted === 'down' ? 'text-rose-600 font-bold bg-rose-50 dark:bg-rose-950/60' : ''
                      }`}
                    >
                      <ThumbsDown className="w-3.5 h-3.5" />
                      <span>{post.downvotes || 0}</span>
                    </button>
                  </div>
                </div>
              ))
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Bottom Chat Text Area & Send Input */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 sm:p-4 border-t border-stone-200 dark:border-stone-800 bg-[#F5F5F0] dark:bg-[#181818] flex items-center gap-3"
          >
            <textarea
              required
              rows={1}
              placeholder="Type your discussion post or schematic question..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(e);
                }
              }}
              className="flex-1 p-2.5 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-black dark:text-white rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-stone-500 resize-none font-sans"
            />

            <button
              type="submit"
              disabled={sending || !newMessage.trim()}
              className="px-4 py-2.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-black font-mono text-xs font-bold uppercase rounded-lg hover:opacity-90 transition-opacity flex items-center gap-1.5 disabled:opacity-50 flex-shrink-0"
            >
              <span>{sending ? 'Sending...' : 'Send'}</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* TAB 2: ANNOUNCEMENTS */}
      {activeTab === 'announcements' && (
        <div className="space-y-4 font-sans">
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
    </div>
  );
}
