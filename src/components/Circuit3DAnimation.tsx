'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Circuit3DAnimation() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = 350;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111111);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 5, 14);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // Closed Circuit Loop Path (Rectangle)
    const points = [
      new THREE.Vector3(-4, 0, -2.5),
      new THREE.Vector3(4, 0, -2.5),
      new THREE.Vector3(4, 0, 2.5),
      new THREE.Vector3(-4, 0, 2.5),
      new THREE.Vector3(-4, 0, -2.5),
    ];

    // Circuit Wire Line
    const wireGeo = new THREE.BufferGeometry().setFromPoints(points);
    const wireMat = new THREE.LineBasicMaterial({ color: 0x555555 });
    const wireLine = new THREE.Line(wireGeo, wireMat);
    scene.add(wireLine);

    // DC Voltage Source (+ / - Terminals)
    const sourceGeo = new THREE.BoxGeometry(0.8, 0.8, 1.2);
    const sourceMat = new THREE.MeshBasicMaterial({ color: 0xee4444 });
    const sourceMesh = new THREE.Mesh(sourceGeo, sourceMat);
    sourceMesh.position.set(-4, 0, 0);
    scene.add(sourceMesh);

    // Resistor Load Element
    const resistorGeo = new THREE.BoxGeometry(1.4, 0.6, 0.6);
    const resistorMat = new THREE.MeshBasicMaterial({ color: 0x3388ff });
    const resistorMesh = new THREE.Mesh(resistorGeo, resistorMat);
    resistorMesh.position.set(4, 0, 0);
    scene.add(resistorMesh);

    // Drift Carrier Spheres (Electrons moving through loop)
    const carrierGeo = new THREE.SphereGeometry(0.2, 12, 12);
    const carrierMat = new THREE.MeshBasicMaterial({ color: 0xffff44 });

    const carriers: { mesh: THREE.Mesh; progress: number }[] = [];
    const totalCarriers = 16;

    for (let i = 0; i < totalCarriers; i++) {
      const mesh = new THREE.Mesh(carrierGeo, carrierMat);
      scene.add(mesh);
      carriers.push({ mesh, progress: i / totalCarriers });
    }

    // Function to calculate position along rectangular circuit loop
    const getLoopPosition = (t: number) => {
      const norm = ((t % 1) + 1) % 1;
      const perimeter = 8 + 5 + 8 + 5; // 26 units
      let dist = norm * perimeter;

      if (dist < 8) {
        // Top segment (-4, -2.5) -> (4, -2.5)
        return new THREE.Vector3(-4 + dist, 0, -2.5);
      } else if (dist < 13) {
        // Right segment (4, -2.5) -> (4, 2.5)
        return new THREE.Vector3(4, 0, -2.5 + (dist - 8));
      } else if (dist < 21) {
        // Bottom segment (4, 2.5) -> (-4, 2.5)
        return new THREE.Vector3(4 - (dist - 13), 0, 2.5);
      } else {
        // Left segment (-4, 2.5) -> (-4, -2.5)
        return new THREE.Vector3(-4, 0, 2.5 - (dist - 21));
      }
    };

    // Animation Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      carriers.forEach((c) => {
        c.progress += 0.003; // Drift velocity speed
        const pos = getLoopPosition(c.progress);
        c.mesh.position.copy(pos);
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      camera.aspect = w / height;
      camera.updateProjectionMatrix();
      renderer.setSize(w, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="my-6 border border-stone-300 dark:border-stone-800 rounded bg-[#111111] overflow-hidden font-serif">
      <div className="p-2 border-b border-stone-800 bg-[#181818] text-white font-mono text-xs flex justify-between items-center">
        <span>FIG 2.1: CLOSED DC CIRCUIT DRIFT VELOCITY &amp; OHM LAW DRIFT</span>
        <div className="flex gap-3 text-[11px]">
          <span className="text-red-400">■ DC Source (V)</span>
          <span className="text-blue-400">■ Resistor (R)</span>
          <span className="text-yellow-300">● Electrons (I = dq/dt)</span>
        </div>
      </div>
      <div ref={mountRef} className="w-full h-[350px]" />
    </div>
  );
}
