export interface Announcement {
  id: string;
  date: string;
  tag: string;
  title: string;
  summary: string;
}

export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    date: '2026-08-15',
    tag: 'ADMIN NOTICE',
    title: 'Admin Control Panel Integration v2.0 Released',
    summary: 'Content updates pushed from the EEvolution Admin panel now reflect instantly across public resource indices.',
  },
  {
    id: 'ann-2',
    date: '2026-08-12',
    tag: 'NEW DATASET',
    title: 'GaN Power FET Thermal Measurements Archive Uploaded',
    summary: 'Raw CSV telemetry files capturing high-frequency switching losses up to 2 MHz are now available in Experimental resources.',
  },
  {
    id: 'ann-3',
    date: '2026-08-07',
    tag: 'CURRICULUM',
    title: 'Analog Circuit Analysis Problem Set Added',
    summary: '120 graded practice problems with step-by-step solutions manual published under Practice Sets.',
  },
];
