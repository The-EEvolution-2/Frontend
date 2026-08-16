export interface Project {
  id: string;
  name: string;
  summary: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  status: 'Active' | 'Completed' | 'In Progress';
}

export interface ProjectState {
  items: Project[];
  loading: boolean;
  error: string | null;
}
