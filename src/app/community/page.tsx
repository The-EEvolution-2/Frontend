'use client';

import React, { useState } from 'react';
import PostCard from '../../components/PostCard';
import { useAppSelector, useAppDispatch } from '../../hooks/useRedux';
import { addPost } from '../../redux/communitySlice';

export default function CommunityPage() {
  const posts = useAppSelector((state) => state.community.posts);
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    dispatch(
      addPost({
        id: `post-${Date.now()}`,
        authorName: 'Engineer Member',
        authorRole: 'Community Contributor',
        title,
        content,
        likes: 0,
        commentsCount: 0,
        createdAt: 'Just now',
      })
    );
    setTitle('');
    setContent('');
  };

  return (
    <div className="py-12 px-4 max-w-4xl mx-auto font-mono">
      <div className="mb-8 pb-4">
        <h1 className="text-2xl font-bold uppercase text-black dark:text-white mb-1">[ COMMUNITY FORUM ]</h1>
        <p className="text-xs uppercase text-black dark:text-white">
          SHARE TECHNICAL INSIGHTS AND DISCUSS HARDWARE SCHEMATICS.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mb-8 p-4 bg-white dark:bg-black space-y-3 text-xs font-bold"
      >
        <h2 className="text-sm font-bold uppercase">&gt; POST NEW DISCUSSION:</h2>
        <input
          type="text"
          placeholder="TOPIC TITLE"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 bg-slate-100 text-black dark:bg-slate-900 dark:text-white focus:outline-none uppercase"
        />
        <textarea
          placeholder="DISCUSSION CONTENT..."
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 bg-slate-100 text-black dark:bg-slate-900 dark:text-white focus:outline-none uppercase"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black uppercase"
        >
          [ SUBMIT POST ]
        </button>
      </form>

      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
