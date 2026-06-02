import { useEffect, useRef } from "react";
import * as THREE from "three";

const zones = [
  { name: "宿舍区", x: -2.4, z: -1.1, color: 0x2fa782, height: 0.7 },
  { name: "教学楼", x: -0.7, z: -0.3, color: 0x2b7cc7, height: 1.15 },
  { name: "图书馆", x: 1.1, z: -0.8, color: 0xf0a23b, height: 0.9 },
  { name: "服务站", x: 0.2, z: 1.1, color: 0x1f9a73, height: 1.35 },
  { name: "运动场", x: 2.35, z: 0.75, color: 0xe75f5f, height: 0.45 }
];

function makeMaterial(color, opacity = 1) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: 0.55,
    metalness: 0.05,
    transparent: opacity < 1,
    opacity
  });
}

export default function CampusThreeMap({ intensity = 1 }) {
  const hostRef = useRef(null);

  useEffect(() => {
    if (!hostRef.current) return undefined;

    const host = hostRef.current;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8fffc);

    const camera = new THREE.PerspectiveCamera(42, host.clientWidth / host.clientHeight, 0.1, 100);
    camera.position.set(4.2, 4.1, 5.8);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(host.clientWidth, host.clientHeight);
    renderer.shadowMap.enabled = true;
    host.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const ambient = new THREE.HemisphereLight(0xffffff, 0xddeee8, 2.2);
    scene.add(ambient);
    const sun = new THREE.DirectionalLight(0xffffff, 2.4);
    sun.position.set(3, 7, 4);
    sun.castShadow = true;
    scene.add(sun);

    const ground = new THREE.Mesh(
      new THREE.BoxGeometry(6.4, 0.08, 4.4),
      makeMaterial(0xeaf7f1)
    );
    ground.position.y = -0.05;
    ground.receiveShadow = true;
    group.add(ground);

    const roadMaterial = makeMaterial(0xd7e8ef);
    const roadA = new THREE.Mesh(new THREE.BoxGeometry(6.1, 0.025, 0.12), roadMaterial);
    roadA.position.set(0, 0.02, 0.15);
    const roadB = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.025, 4.1), roadMaterial);
    roadB.position.set(0.35, 0.03, 0);
    group.add(roadA, roadB);

    const pulseDots = [];
    zones.forEach((zone, index) => {
      const block = new THREE.Mesh(
        new THREE.BoxGeometry(0.78, zone.height, 0.78),
        makeMaterial(zone.color, 0.9)
      );
      block.position.set(zone.x, zone.height / 2, zone.z);
      block.castShadow = true;
      block.receiveShadow = true;
      group.add(block);

      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(0.34 + index * 0.015, 0.018, 10, 48),
        makeMaterial(zone.color, 0.45)
      );
      ring.rotation.x = Math.PI / 2;
      ring.position.set(zone.x, 0.08, zone.z);
      group.add(ring);
      pulseDots.push(ring);
    });

    const routeMaterial = new THREE.LineBasicMaterial({ color: 0x1f9a73, transparent: true, opacity: 0.55 });
    const points = [
      new THREE.Vector3(-2.4, 0.18, -1.1),
      new THREE.Vector3(-0.7, 0.18, -0.3),
      new THREE.Vector3(0.2, 0.18, 1.1),
      new THREE.Vector3(1.1, 0.18, -0.8),
      new THREE.Vector3(2.35, 0.18, 0.75)
    ];
    group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), routeMaterial));

    const beacon = new THREE.Mesh(
      new THREE.SphereGeometry(0.16, 32, 32),
      makeMaterial(0xff7a4d)
    );
    beacon.position.set(0.2, 1.65, 1.1);
    group.add(beacon);

    let frame = 0;
    let raf = 0;
    const animate = () => {
      frame += 0.01;
      group.rotation.y = Math.sin(frame * 0.45) * 0.1 - 0.18;
      beacon.position.y = 1.55 + Math.sin(frame * 2.4) * 0.08;
      pulseDots.forEach((ring, index) => {
        const scale = 1 + Math.sin(frame * 2 + index) * 0.08 * intensity;
        ring.scale.setScalar(scale);
      });
      renderer.render(scene, camera);
      raf = window.requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      if (!host.clientWidth || !host.clientHeight) return;
      camera.aspect = host.clientWidth / host.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(host.clientWidth, host.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
      host.removeChild(renderer.domElement);
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose());
          else object.material.dispose();
        }
      });
      renderer.dispose();
    };
  }, [intensity]);

  return (
    <div className="relative h-[360px] min-h-[320px] overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-br from-white to-emerald-50">
      <div ref={hostRef} className="absolute inset-0" aria-label="校园互助三维数据地图" />
      <div className="pointer-events-none absolute left-4 top-4 rounded-2xl bg-white/85 px-4 py-3 text-sm font-black text-campus-ink shadow-sm backdrop-blur">
        三维服务态势
      </div>
      <div className="pointer-events-none absolute bottom-4 left-4 right-4 grid grid-cols-2 gap-2 text-xs font-bold text-campus-muted sm:grid-cols-5">
        {zones.map((zone) => (
          <span key={zone.name} className="rounded-xl bg-white/80 px-3 py-2 text-center shadow-sm backdrop-blur">
            {zone.name}
          </span>
        ))}
      </div>
    </div>
  );
}
