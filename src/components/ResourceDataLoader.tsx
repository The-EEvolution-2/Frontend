'use client';

import React, { useEffect } from 'react';
import { useAppDispatch } from '../hooks/useRedux';
import { setResources } from '../redux/resourceSlice';
import { supabase } from '../lib/supabaseClient';

export default function ResourceDataLoader({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function loadResourcesFromSupabase() {
      try {
        const { data, error } = await supabase
          .from('resources')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.log('Supabase fetch error, check environment variables:', error.message);
          return;
        }

        if (data && data.length > 0) {
          const formattedResources = data.map((item) => ({
            id: item.id,
            _id: item.id,
            title: item.title,
            description: item.description,
            category: item.category,
            categorySlug: item.category_slug,
            categoryLabel: item.category_label,
            topicSlug: item.topic_slug,
            topicLabel: item.topic_label,
            author: item.author,
            date: new Date(item.created_at).toISOString().split('T')[0],
            url: '#',
            fileSize: item.file_size,
            difficulty: item.difficulty,
            contentBody: item.content_body,
          }));

          dispatch(setResources(formattedResources));
        }
      } catch (err) {
        console.log('Supabase connection offline or empty:', err);
      }
    }

    loadResourcesFromSupabase();
  }, [dispatch]);

  return <>{children}</>;
}
