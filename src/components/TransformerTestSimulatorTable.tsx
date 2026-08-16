'use client';

import React, { useState } from 'react';

export default function TransformerTestSimulatorTable() {
  // OC Test Inputs: Rated Voltage Vo (V), No-Load Current Io (A), Core Power Po (W)
  const [vO, setVO] = useState<number>(230);
  const [iO, setIO] = useState<number>(0.6);
  const [pO, setPO] = useState<number>(45);

  // SC Test Inputs: Short-Circuit Voltage Vsc (V), Rated Current Isc (A), Copper Loss Psc (W)
  const [vSC, setVSC] = useState<number>(12);
  const [iSC, setISC] = useState<number>(4.35);
  const [pSC, setPSC] = useState<number>(38);

  // OC Derivations:
  // cos(phi_o) = Po / (Vo * Io)
  // Iw = Io * cos(phi_o) = Po / Vo
  // Im = sqrt(Io^2 - Iw^2)
  // Ro = Vo / Iw
  // Xo = Vo / Im
  const cosPhiO = Math.min(1, pO / (vO * iO || 1));
  const iW = pO / (vO || 1);
  const iM = Math.sqrt(Math.max(0, iO * iO - iW * iW));
  const rO = vO / (iW || 1);
  const xO = vO / (iM || 1);

  // SC Derivations:
  // Zeq = Vsc / Isc
  // Req = Psc / (Isc^2)
  // Xeq = sqrt(Zeq^2 - Req^2)
  const zEq = vSC / (iSC || 1);
  const rEq = pSC / (iSC * iSC || 1);
  const xEq = Math.sqrt(Math.max(0, zEq * zEq - rEq * rEq));

  // Efficiency calculation at Full Load (1.0 PF)
  // Total Loss = Po + Psc
  // Pout = Vo * Isc (S_KVA)
  const pOut = vO * iSC;
  const eta = (pOut / (pOut + pO + pSC)) * 100;

  return (
    <div className="my-6 border border-stone-300 dark:border-stone-800 bg-[#F8F8F5] dark:bg-[#161616] p-4 font-serif space-y-4">
      <div className="border-b border-stone-300 dark:border-stone-800 pb-2 flex flex-wrap justify-between items-baseline">
        <h3 className="font-bold text-sm text-black dark:text-white uppercase font-mono">
          TRANSFORMER OC &amp; SC TEST EQUIVALENT CIRCUIT SOLVER
        </h3>
        <span className="text-xs font-mono text-stone-500">[TRANSFORMER PARAMETER SOLVER]</span>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
        <div className="p-3 border border-stone-300 dark:border-stone-800 bg-white dark:bg-stone-900 rounded space-y-2">
          <h4 className="font-bold text-black dark:text-white border-b pb-1">OPEN CIRCUIT TEST (LV SIDE)</h4>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-stone-500 mb-1">Vo (Volts):</label>
              <input
                type="number"
                value={vO}
                onChange={(e) => setVO(parseFloat(e.target.value) || 1)}
                className="w-full p-1 border rounded bg-stone-50 dark:bg-stone-800"
              />
            </div>
            <div>
              <label className="block text-stone-500 mb-1">Io (Amps):</label>
              <input
                type="number"
                step="0.05"
                value={iO}
                onChange={(e) => setIO(parseFloat(e.target.value) || 0.1)}
                className="w-full p-1 border rounded bg-stone-50 dark:bg-stone-800"
              />
            </div>
            <div>
              <label className="block text-stone-500 mb-1">Po (Watts):</label>
              <input
                type="number"
                value={pO}
                onChange={(e) => setPO(parseFloat(e.target.value) || 0)}
                className="w-full p-1 border rounded bg-stone-50 dark:bg-stone-800"
              />
            </div>
          </div>
        </div>

        <div className="p-3 border border-stone-300 dark:border-stone-800 bg-white dark:bg-stone-900 rounded space-y-2">
          <h4 className="font-bold text-black dark:text-white border-b pb-1">SHORT CIRCUIT TEST (HV SIDE)</h4>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-stone-500 mb-1">Vsc (Volts):</label>
              <input
                type="number"
                value={vSC}
                onChange={(e) => setVSC(parseFloat(e.target.value) || 1)}
                className="w-full p-1 border rounded bg-stone-50 dark:bg-stone-800"
              />
            </div>
            <div>
              <label className="block text-stone-500 mb-1">Isc (Amps):</label>
              <input
                type="number"
                step="0.1"
                value={iSC}
                onChange={(e) => setISC(parseFloat(e.target.value) || 0.1)}
                className="w-full p-1 border rounded bg-stone-50 dark:bg-stone-800"
              />
            </div>
            <div>
              <label className="block text-stone-500 mb-1">Psc (Watts):</label>
              <input
                type="number"
                value={pSC}
                onChange={(e) => setPSC(parseFloat(e.target.value) || 0)}
                className="w-full p-1 border rounded bg-stone-50 dark:bg-stone-800"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Outputs Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs font-mono border border-stone-300 dark:border-stone-800 text-left">
          <thead className="bg-stone-200 dark:bg-stone-800 text-black dark:text-white">
            <tr>
              <th className="p-2 border border-stone-300 dark:border-stone-700">Derived Parameter</th>
              <th className="p-2 border border-stone-300 dark:border-stone-700">Analytical Equation</th>
              <th className="p-2 border border-stone-300 dark:border-stone-700">Calculated Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
            <tr>
              <td className="p-2 font-bold border border-stone-300 dark:border-stone-800">Core Loss Resistance (Ro)</td>
              <td className="p-2 border border-stone-300 dark:border-stone-800">Vo / Iw = Vo / (Po / Vo)</td>
              <td className="p-2 font-bold text-blue-900 dark:text-blue-400 border border-stone-300 dark:border-stone-800">{rO.toFixed(1)} &Omega;</td>
            </tr>
            <tr>
              <td className="p-2 font-bold border border-stone-300 dark:border-stone-800">Magnetizing Reactance (Xo)</td>
              <td className="p-2 border border-stone-300 dark:border-stone-800">Vo / Im = Vo / sqrt(Io^2 - Iw^2)</td>
              <td className="p-2 font-bold text-blue-900 dark:text-blue-400 border border-stone-300 dark:border-stone-800">{xO.toFixed(1)} &Omega;</td>
            </tr>
            <tr>
              <td className="p-2 font-bold border border-stone-300 dark:border-stone-800">Equivalent Resistance (Req)</td>
              <td className="p-2 border border-stone-300 dark:border-stone-800">Psc / (Isc^2)</td>
              <td className="p-2 font-bold text-blue-900 dark:text-blue-400 border border-stone-300 dark:border-stone-800">{rEq.toFixed(2)} &Omega;</td>
            </tr>
            <tr>
              <td className="p-2 font-bold border border-stone-300 dark:border-stone-800">Equivalent Reactance (Xeq)</td>
              <td className="p-2 border border-stone-300 dark:border-stone-800">sqrt(Zeq^2 - Req^2)</td>
              <td className="p-2 font-bold text-blue-900 dark:text-blue-400 border border-stone-300 dark:border-stone-800">{xEq.toFixed(2)} &Omega;</td>
            </tr>
            <tr>
              <td className="p-2 font-bold border border-stone-300 dark:border-stone-800">Full-Load Efficiency (&eta; @ 1.0 PF)</td>
              <td className="p-2 border border-stone-300 dark:border-stone-800">Pout / (Pout + Po + Psc) * 100</td>
              <td className="p-2 font-bold text-emerald-800 dark:text-emerald-400 border border-stone-300 dark:border-stone-800">{eta.toFixed(2)} %</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
