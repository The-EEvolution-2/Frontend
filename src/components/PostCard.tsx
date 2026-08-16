'use client';

import React from 'react';
import { Post } from '../types/community';
import { useAppDispatch } from '../hooks/useRedux';
import { toggleLike } from '../redux/communitySlice';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const dispatch = useAppDispatch();

  return (
    <article className="py-4 border-b border-stone-200 dark:border-stone-800 font-serif">
      <div className="text-xs font-mono text-stone-500 mb-1">
        Contributor: {post.authorName} ({post.authorRole}) | Posted: {post.createdAt}
      </div>

      <h3 className="text-base font-bold text-black dark:text-white mb-1">
        {post.title}
      </h3>

      <p className="text-xs text-stone-800 dark:text-stone-300 leading-relaxed mb-3">
        {post.content}
      </p>

      <div className="flex items-center gap-4 text-xs font-mono text-stone-600 dark:text-stone-400">
        <button
          onClick={() => dispatch(toggleLike(post.id))}
          className="hover:underline"
        >
          [Citations / Endorsements: {post.likes}]
        </button>
        <span>[Responses: {post.commentsCount}]</span>
      </div>
    </article>
  );
}
