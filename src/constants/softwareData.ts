export interface SoftwareTool {
  id: string;
  name: string;
  category: string;
  description: string;
  version: string;
  license: string;
  downloadUrl: string;
  docUrl: string;
}

export const SOFTWARE_TOOLS: SoftwareTool[] = [
  {
    id: 'sw-01',
    name: 'EEvolution PCB Trace Calculator v2.1',
    category: 'Analysis & CAD',
    description: 'IPC-2221 standard trace width, continuous DC current capacity, and thermal rise calculation utility.',
    version: '2.1.0',
    license: 'Open-Source Academic',
    downloadUrl: '#',
    docUrl: '/resources/general/current/res-gen-curr-01',
  },
  {
    id: 'sw-02',
    name: 'Embedded Firmware DMA Telemetry Monitor',
    category: 'Firmware & Debug',
    description: 'Real-time UART/SPI/I2C serial protocol packet sniffer and ring-buffer telemetry logging tool for ARM Cortex-M microcontrollers.',
    version: '1.4.2',
    license: 'MIT License',
    downloadUrl: '#',
    docUrl: '/resources/books/firmware/res-bk-firm-01',
  },
  {
    id: 'sw-03',
    name: 'Switching Transformer Design Synthesis Tool',
    category: 'Magnetics & Power',
    description: 'Analytical software for primary/secondary turn calculations, core saturation check, and ferrite B-H loop loss estimation.',
    version: '3.0.1',
    license: 'Academic Reference',
    downloadUrl: '#',
    docUrl: '/resources/general/transformer/res-gen-trans-01',
  },
  {
    id: 'sw-04',
    name: 'Verilog FSM Logic State Simulator & Testbench Generator',
    category: 'Digital Logic & HDL',
    description: 'Automated synthesis tool for generating Mealy/Moore state transition matrices and VerilogHDL testbenches.',
    version: '1.2.0',
    license: 'GPL v3',
    downloadUrl: '#',
    docUrl: '/resources/practice-sets/opamp/res-ps-opamp-01',
  },
];
