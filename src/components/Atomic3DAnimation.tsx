'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Atomic3DAnimation() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer setup
    const width = container.clientWidth || 600;
    const height = 350;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111111);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 14);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // Nucleus Group (Protons + Neutrons)
    const nucleusGroup = new THREE.Group();
    const protonGeo = new THREE.SphereGeometry(0.35, 16, 16);
    const protonMat = new THREE.MeshBasicMaterial({ color: 0xee4444 });
    const neutronMat = new THREE.MeshBasicMaterial({ color: 0x888888 });

    // Pack nucleus spheres
    for (let i = 0; i < 12; i++) {
      const isProton = i % 2 === 0;
      const mesh = new THREE.Mesh(protonGeo, isProton ? protonMat : neutronMat);
      mesh.position.set(
        (Math.random() - 0.5) * 0.8,
        (Math.random() - 0.5) * 0.8,
        (Math.random() - 0.5) * 0.8
      );
      nucleusGroup.add(mesh);
    }
    scene.add(nucleusGroup);

    // Orbit Orbits & Valence / Free Electrons
    const orbits = [
      { radius: 2.5, speed: 0.03, count: 2, color: 0x3388ff },
      { radius: 4.2, speed: 0.02, count: 4, color: 0x33ccaa },
      { radius: 6.0, speed: 0.015, count: 1, color: 0xffff44 }, // Free Electron
    ];

    const electronGroup = new THREE.Group();
    const electronGeo = new THREE.SphereGeometry(0.18, 12, 12);
    const electronData: { mesh: THREE.Mesh; radius: number; angle: number; speed: number }[] = [];

    orbits.forEach((orb) => {
      // Orbit Ring line
      const ringGeo = new THREE.BufferGeometry();
      const points: THREE.Vector3[] = [];
      for (let j = 0; j <= 64; j++) {
        const theta = (j / 64) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(theta) * orb.radius, 0, Math.sin(theta) * orb.radius));
      }
      ringGeo.setFromPoints(points);
      const ringMat = new THREE.LineBasicMaterial({ color: 0x444444 });
      const ring = new THREE.Line(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 6;
      scene.add(ring);

      for (let k = 0; k < orb.count; k++) {
        const mat = new THREE.MeshBasicMaterial({ color: orb.color });
        const eMesh = new THREE.Mesh(electronGeo, mat);
        const angle = (k / orb.count) * Math.PI * 2;
        electronGroup.add(eMesh);
        electronData.push({
          mesh: eMesh,
          radius: orb.radius,
          angle,
          speed: orb.speed,
        });
      }
    });

    scene.add(electronGroup);

    // Animation Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      nucleusGroup.rotation.y += 0.005;
      nucleusGroup.rotation.x += 0.003;

      electronData.forEach((ed) => {
        ed.angle += ed.speed;
        const x = Math.cos(ed.angle) * ed.radius;
        const z = Math.sin(ed.angle) * ed.radius;

        // Apply orbit tilt angle
        ed.mesh.position.set(
          x,
          z * Math.sin(Math.PI / 6),
          z * Math.cos(Math.PI / 6)
        );
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle Resize
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
        <span>FIG 1.1: INTERACTIVE ATOMIC MODEL &amp; FREE ELECTRON DRIFT</span>
        <div className="flex gap-3 text-[11px]">
          <span className="text-red-400">● Protons (+)</span>
          <span className="text-gray-400">● Neutrons (0)</span>
          <span className="text-yellow-300">● Free Electron</span>
        </div>
      </div>
      <div ref={mountRef} className="w-full h-[350px]" />
    </div>
  );
}
