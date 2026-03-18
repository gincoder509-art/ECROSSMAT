import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const Globe: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglError, setWebglError] = useState(false);

  useEffect(() => {
    // Check for WebGL support before doing anything
    const checkWebGL = () => {
      try {
        const canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      } catch (e) {
        return false;
      }
    };

    if (!checkWebGL()) {
      setWebglError(true);
      return;
    }

    if (!containerRef.current) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let animationFrameId: number;

    try {
      // Scene setup
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 2.5;

      renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true,
        powerPreference: "high-performance"
      });
      
      if (!renderer.getContext()) {
        throw new Error("Could not create WebGL context");
      }

      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap pixel ratio for performance
      containerRef.current.appendChild(renderer.domElement);

      // Orbit Controls
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.enableZoom = false;

      // Lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
      scene.add(ambientLight);

      const sunLight = new THREE.DirectionalLight(0xffffff, 1.2);
      sunLight.position.set(5, 3, 5);
      scene.add(sunLight);

      // Textures
      const loader = new THREE.TextureLoader();
      const earthTexture = loader.load('https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg');
      const bumpMap = loader.load('https://threejs.org/examples/textures/planets/earth_normal_2048.jpg');
      const specMap = loader.load('https://threejs.org/examples/textures/planets/earth_specular_2048.jpg');
      const cloudTexture = loader.load('https://threejs.org/examples/textures/planets/earth_clouds_1024.png');

      // Earth
      const earthGeometry = new THREE.SphereGeometry(1, 64, 64);
      const earthMaterial = new THREE.MeshPhongMaterial({
        map: earthTexture,
        bumpMap: bumpMap,
        bumpScale: 0.01,
        specularMap: specMap,
        specular: new THREE.Color('grey'),
        shininess: 5
      });
      const earth = new THREE.Mesh(earthGeometry, earthMaterial);
      scene.add(earth);

      // Clouds
      const cloudGeometry = new THREE.SphereGeometry(1.01, 64, 64);
      const cloudMaterial = new THREE.MeshPhongMaterial({
        map: cloudTexture,
        transparent: true,
        opacity: 0.3,
        depthWrite: false
      });
      const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
      scene.add(clouds);

      // Atmosphere Glow
      const atmosphereGeometry = new THREE.SphereGeometry(1.1, 64, 64);
      const atmosphereMaterial = new THREE.ShaderMaterial({
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          void main() {
            float intensity = pow(0.6 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
            gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity;
          }
        `,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true
      });
      const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
      scene.add(atmosphere);

      // Starfield
      const starGeometry = new THREE.BufferGeometry();
      const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.015 });
      const starVertices = [];
      for (let i = 0; i < 5000; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = -Math.random() * 2000;
        starVertices.push(x, y, z);
      }
      starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
      const stars = new THREE.Points(starGeometry, starMaterial);
      scene.add(stars);

      // Animation
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        
        earth.rotation.y += 0.0008;
        clouds.rotation.y += 0.0012;
        
        controls.update();
        if (renderer) renderer.render(scene, camera);
      };

      animate();

      // Resize handler
      const handleResize = () => {
        if (!renderer) return;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationFrameId);
        if (containerRef.current && renderer && renderer.domElement.parentNode) {
          containerRef.current.removeChild(renderer.domElement);
        }
        scene.clear();
        if (renderer) renderer.dispose();
      };
    } catch (e) {
      console.warn("WebGL Initialization failed, using fallback:", e);
      setWebglError(true);
    }
  }, []);

  if (webglError) {
    return (
      <div className="absolute inset-0 z-0 bg-[#050505] overflow-hidden">
        {/* Animated Starfield Fallback */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 3}px`,
                height: `${Math.random() * 3}px`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
        
        {/* Subtle Nebula Glow */}
        <div className="absolute inset-0 bg-radial-gradient from-indigo-500/10 via-transparent to-transparent opacity-40" />
        
        {/* Abstract Orbital Rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] rounded-full border border-white/5 animate-[spin_60s_linear_infinite]" />
          <div className="absolute w-[450px] h-[450px] rounded-full border border-white/10 animate-[spin_40s_linear_infinite_reverse]" />
          <div className="absolute w-[300px] h-[300px] rounded-full border border-indigo-500/10 animate-[spin_20s_linear_infinite]" />
        </div>

        <div className="absolute inset-0 flex items-end justify-center pb-12 opacity-20 pointer-events-none">
          <p className="text-white text-[10px] font-mono tracking-[0.2em] uppercase">
            Mode Performance : Arrière-plan Optimisé
          </p>
        </div>
      </div>
    );
  }

  return <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-auto" />;
};

export default Globe;
