'use client';

import React, { useState } from 'react';

export default function CircuitSimulatorTable() {
  // R1, R2, R3 in Ohms, Vin in Volts, RL load in Ohms
  const [vIn, setVIn] = useState<number>(12);
  const [r1, setR1] = useState<number>(100);
  const [r2, setR2] = useState<number>(220);
  const [r3, setR3] = useState<number>(150);
  const [rL, setRL] = useState<number>(330);

  // Calculations for Thévenin's Equivalent:
  // Vth = Vin * (R2 / (R1 + R2))
  // Rth = R3 + (R1 * R2 / (R1 + R2))
  // IL = Vth / (Rth + RL)
  // VL = IL * RL
  // Norton IN = Vth / Rth
  const rParallel = (r1 * r2) / (r1 + r2);
  const vTh = vIn * (r2 / (r1 + r2));
  const rTh = r3 + rParallel;
  const iN = (vTh / rTh) * 1000; // in mA
  const iL = (vTh / (rTh + rL)) * 1000; // in mA
  const vL = (iL / 1000) * rL;

  return (
    <div className="my-6 border border-stone-300 dark:border-stone-800 bg-[#F8F8F5] dark:bg-[#161616] p-4 font-serif space-y-4">
      <div className="border-b border-stone-300 dark:border-stone-800 pb-2 flex flex-wrap justify-between items-baseline">
        <h3 className="font-bold text-sm text-black dark:text-white uppercase font-mono">
          INTERACTIVE THÉVENIN &amp; NORTON SIMULATION TABLE
        </h3>
        <span className="text-xs font-mono text-stone-500">[DYNAMIC INPUT SOLVER]</span>
      </div>

      {/* Input Parameters Form */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 font-mono text-xs">
        <div>
          <label className="block text-stone-600 dark:text-stone-400 mb-1">Source Vin (V):</label>
          <input
            type="number"
            value={vIn}
            onChange={(e) => setVIn(parseFloat(e.target.value) || 0)}
            className="w-full p-1.5 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-black dark:text-white rounded"
          />
        </div>
        <div>
          <label className="block text-stone-600 dark:text-stone-400 mb-1">Resistor R1 (&Omega;):</label>
          <input
            type="number"
            value={r1}
            onChange={(e) => setR1(parseFloat(e.target.value) || 1)}
            className="w-full p-1.5 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-black dark:text-white rounded"
          />
        </div>
        <div>
          <label className="block text-stone-600 dark:text-stone-400 mb-1">Resistor R2 (&Omega;):</label>
          <input
            type="number"
            value={r2}
            onChange={(e) => setR2(parseFloat(e.target.value) || 1)}
            className="w-full p-1.5 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-black dark:text-white rounded"
          />
        </div>
        <div>
          <label className="block text-stone-600 dark:text-stone-400 mb-1">Resistor R3 (&Omega;):</label>
          <input
            type="number"
            value={r3}
            onChange={(e) => setR3(parseFloat(e.target.value) || 0)}
            className="w-full p-1.5 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-black dark:text-white rounded"
          />
        </div>
        <div>
          <label className="block text-stone-600 dark:text-stone-400 mb-1">Load RL (&Omega;):</label>
          <input
            type="number"
            value={rL}
            onChange={(e) => setRL(parseFloat(e.target.value) || 1)}
            className="w-full p-1.5 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-black dark:text-white rounded"
          />
        </div>
      </div>

      {/* Computed Results Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs font-mono border border-stone-300 dark:border-stone-800 text-left">
          <thead className="bg-stone-200 dark:bg-stone-800 text-black dark:text-white">
            <tr>
              <th className="p-2 border border-stone-300 dark:border-stone-700">Parameter</th>
              <th className="p-2 border border-stone-300 dark:border-stone-700">Formula / Derivation</th>
              <th className="p-2 border border-stone-300 dark:border-stone-700">Calculated Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
            <tr>
              <td className="p-2 font-bold border border-stone-300 dark:border-stone-800">Th&eacute;venin Voltage (Vth)</td>
              <td className="p-2 border border-stone-300 dark:border-stone-800">Vin * [R2 / (R1 + R2)]</td>
              <td className="p-2 font-bold text-blue-900 dark:text-blue-400 border border-stone-300 dark:border-stone-800">{vTh.toFixed(3)} V</td>
            </tr>
            <tr>
              <td className="p-2 font-bold border border-stone-300 dark:border-stone-800">Th&eacute;venin Resistance (Rth)</td>
              <td className="p-2 border border-stone-300 dark:border-stone-800">R3 + [(R1 * R2) / (R1 + R2)]</td>
              <td className="p-2 font-bold text-blue-900 dark:text-blue-400 border border-stone-300 dark:border-stone-800">{rTh.toFixed(2)} &Omega;</td>
            </tr>
            <tr>
              <td className="p-2 font-bold border border-stone-300 dark:border-stone-800">Norton Current (IN)</td>
              <td className="p-2 border border-stone-300 dark:border-stone-800">Vth / Rth</td>
              <td className="p-2 font-bold text-blue-900 dark:text-blue-400 border border-stone-300 dark:border-stone-800">{iN.toFixed(2)} mA</td>
            </tr>
            <tr>
              <td className="p-2 font-bold border border-stone-300 dark:border-stone-800">Load Voltage (VL)</td>
              <td className="p-2 border border-stone-300 dark:border-stone-800">Vth * [RL / (Rth + RL)]</td>
              <td className="p-2 font-bold text-emerald-800 dark:text-emerald-400 border border-stone-300 dark:border-stone-800">{vL.toFixed(3)} V</td>
            </tr>
            <tr>
              <td className="p-2 font-bold border border-stone-300 dark:border-stone-800">Load Current (IL)</td>
              <td className="p-2 border border-stone-300 dark:border-stone-800">Vth / (Rth + RL)</td>
              <td className="p-2 font-bold text-emerald-800 dark:text-emerald-400 border border-stone-300 dark:border-stone-800">{iL.toFixed(2)} mA</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
