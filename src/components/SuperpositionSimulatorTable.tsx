'use client';

import React, { useState } from 'react';

export default function SuperpositionSimulatorTable() {
  const [v1, setV1] = useState<number>(12);
  const [v2, setV2] = useState<number>(6);
  const [r1, setR1] = useState<number>(100);
  const [r2, setR2] = useState<number>(220);
  const [r3, setR3] = useState<number>(150);

  // Case 1: V1 Active (V2 Shorted)
  // Req1 = R1 + (R2 || R3)
  const r23 = (r2 * r3) / (r2 + r3);
  const req1 = r1 + r23;
  const iTotal1 = v1 / req1;
  const iR3_1 = (iTotal1 * (r2 / (r2 + r3))) * 1000; // mA

  // Case 2: V2 Active (V1 Shorted)
  // Req2 = R3 + (R1 || R2)
  const r12 = (r1 * r2) / (r1 + r2);
  const req2 = r3 + r12;
  const iTotal2 = v2 / req2;
  const iR3_2 = (iTotal2 * (r2 / (r1 + r2))) * 1000; // mA

  // Case 3: Both Sources Active (Superposition Sum)
  const iR3_total = iR3_1 + iR3_2; // mA
  const vR3_total = (iR3_total / 1000) * r3; // V

  return (
    <div className="my-6 border border-stone-300 dark:border-stone-800 bg-[#F8F8F5] dark:bg-[#161616] p-4 font-serif space-y-4">
      <div className="border-b border-stone-300 dark:border-stone-800 pb-2 flex flex-wrap justify-between items-baseline">
        <h3 className="font-bold text-sm text-black dark:text-white uppercase font-mono">
          INTERACTIVE SUPERPOSITION THEOREM SIMULATION SOLVER
        </h3>
        <span className="text-xs font-mono text-stone-500">[MULTI-SOURCE SOLVER]</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 font-mono text-xs">
        <div>
          <label className="block text-stone-600 dark:text-stone-400 mb-1">Source V1 (V):</label>
          <input
            type="number"
            value={v1}
            onChange={(e) => setV1(parseFloat(e.target.value) || 0)}
            className="w-full p-1.5 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-black dark:text-white rounded"
          />
        </div>
        <div>
          <label className="block text-stone-600 dark:text-stone-400 mb-1">Source V2 (V):</label>
          <input
            type="number"
            value={v2}
            onChange={(e) => setV2(parseFloat(e.target.value) || 0)}
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
            onChange={(e) => setR3(parseFloat(e.target.value) || 1)}
            className="w-full p-1.5 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-black dark:text-white rounded"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs font-mono border border-stone-300 dark:border-stone-800 text-left">
          <thead className="bg-stone-200 dark:bg-stone-800 text-black dark:text-white">
            <tr>
              <th className="p-2 border border-stone-300 dark:border-stone-700">Operating Condition</th>
              <th className="p-2 border border-stone-300 dark:border-stone-700">Derivation Formula</th>
              <th className="p-2 border border-stone-300 dark:border-stone-700">Calculated R3 Current (I_R3)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
            <tr>
              <td className="p-2 font-bold border border-stone-300 dark:border-stone-800">Case I: V1 Active Only (V2 Shorted)</td>
              <td className="p-2 border border-stone-300 dark:border-stone-800">(V1 / Req1) * [R2 / (R2 + R3)]</td>
              <td className="p-2 font-bold text-blue-900 dark:text-blue-400 border border-stone-300 dark:border-stone-800">{iR3_1.toFixed(2)} mA</td>
            </tr>
            <tr>
              <td className="p-2 font-bold border border-stone-300 dark:border-stone-800">Case II: V2 Active Only (V1 Shorted)</td>
              <td className="p-2 border border-stone-300 dark:border-stone-800">(V2 / Req2) * [R2 / (R1 + R2)]</td>
              <td className="p-2 font-bold text-blue-900 dark:text-blue-400 border border-stone-300 dark:border-stone-800">{iR3_2.toFixed(2)} mA</td>
            </tr>
            <tr>
              <td className="p-2 font-bold border border-stone-300 dark:border-stone-800">Case III: Both V1 &amp; V2 Active (Total)</td>
              <td className="p-2 border border-stone-300 dark:border-stone-800">I_R3_total = I_R3_1 + I_R3_2</td>
              <td className="p-2 font-bold text-emerald-800 dark:text-emerald-400 border border-stone-300 dark:border-stone-800">{iR3_total.toFixed(2)} mA (VR3 = {vR3_total.toFixed(2)}V)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
