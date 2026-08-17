export interface NavSubItem {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  subItems?: NavSubItem[];
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Resources',
    href: '/resources',
    subItems: [
      { label: 'Academics', href: '/resources/academics' },
      { label: 'General', href: '/resources/general' },
      { label: 'Experimental', href: '/resources/experimental' },
      { label: 'Books', href: '/resources/books' },
      { label: 'Practice Sets', href: '/resources/practice-sets' },
      { label: 'History of Electrical Engineering', href: '/resources/history' },
      { label: 'Career & Industry Paths', href: '/resources/career' },
    ],
  },
  { label: 'Research', href: '/research' },
  { label: 'Projects', href: '/projects' },
  {
    label: 'Software',
    href: '/software',
    subItems: [
      { label: 'Downloads', href: '/software?category=downloads' },
      { label: 'Tutorial', href: '/software?category=tutorial' },
    ],
  },
  { label: 'Membership', href: '/membership' },
  {
    label: 'Community',
    href: '/community',
    subItems: [
      { label: 'Discussions & Q&A', href: '/community?tab=discussions' },
      { label: 'Announcements', href: '/community?tab=announcements' },
    ],
  },
  { label: 'About', href: '/about' },
];
