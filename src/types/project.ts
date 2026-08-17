export interface Project {
  id: string;
  name: string;
  summary: string;
  description?: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  status: 'Active' | 'Completed' | 'In Progress';
  image_url?: string;
  project_type?: string;
}

export interface ProjectState {
  items: Project[];
  loading: boolean;
  error: string | null;
}
