import { Project } from '../types/project';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    name: 'Smart Energy Grid Monitor',
    summary: 'Real-time power consumption metrics telemetry dashboard with instant alert dispatching.',
    techStack: ['Next.js', 'Redux', 'Node.js', 'WebSocket'],
    githubUrl: 'https://github.com/The-EEvolution-2/Frontend',
    liveUrl: '#',
    status: 'Active',
  },
  {
    id: 'proj-2',
    name: 'EEvolution Admin Gateway',
    summary: 'Unified central management console to configure frontend content dynamically.',
    techStack: ['Express', 'TypeScript', 'PostgreSQL'],
    githubUrl: 'https://github.com/The-EEvolution-2/Backend',
    status: 'Active',
  },
  {
    id: 'proj-3',
    name: 'Automated Circuit Optimizer',
    summary: 'CAD integration tooling designed for automatic schematic layout validation.',
    techStack: ['Python', 'C++', 'WebAssembly'],
    githubUrl: '#',
    status: 'In Progress',
  },
];
