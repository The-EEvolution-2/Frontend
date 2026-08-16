export interface Post {
  id: string;
  authorName: string;
  authorRole: string;
  title: string;
  content: string;
  likes: number;
  commentsCount: number;
  createdAt: string;
}

export interface CommunityState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}
