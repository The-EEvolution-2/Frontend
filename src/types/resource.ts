export type ResourceCategorySlug =
  | 'academics'
  | 'general'
  | 'experimental'
  | 'books'
  | 'practice-sets'
  | 'history'
  | 'career';

export interface Resource {
  _id?: string;
  id: string;
  title: string;
  description: string;
  category: string;
  categorySlug: ResourceCategorySlug | string;
  categoryLabel: string;
  topicSlug: string;
  topicLabel: string;
  author: string;
  date: string;
  url: string;
  fileSize?: string;
  difficulty?: 'Introductory' | 'Intermediate' | 'Advanced' | string;
  contentBody?: string;
}

export type ResourceItem = Resource;

export interface ResourceState {
  items: Resource[];
  selectedCategory: string;
  loading: boolean;
  error: string | null;
}
