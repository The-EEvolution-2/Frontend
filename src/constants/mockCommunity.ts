import { Post } from '../types/community';

export const INITIAL_POSTS: Post[] = [
  {
    id: 'post-1',
    authorName: 'Alex Rivera',
    authorRole: 'Senior Hardware Engineer',
    title: 'Optimizing high-frequency PCB trace routing',
    content: 'What techniques do you employ to manage signal crosstalk in multi-layer board designs?',
    likes: 24,
    commentsCount: 8,
    createdAt: '2 hours ago',
  },
  {
    id: 'post-2',
    authorName: 'Elena Rostova',
    authorRole: 'System Administrator',
    title: 'Admin Panel & Frontend Synchronization',
    content: 'Our latest backend API bridge ensures instant content updates on the main portal.',
    likes: 42,
    commentsCount: 15,
    createdAt: '5 hours ago',
  },
];
