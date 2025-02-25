import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

function Earth() {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.1;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += delta * 0.12;
    }
  });

  return (
    <group position={[0, -2, 0]}>
      {/* Earth core */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshPhongMaterial
          map={new THREE.TextureLoader().load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg')}
          bumpMap={new THREE.TextureLoader().load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg')}
          bumpScale={0.05}
          specularMap={new THREE.TextureLoader().load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg')}
          specular={new THREE.Color('grey')}
          shininess={5}
        />
      </mesh>
      
      {/* Clouds layer */}
      <mesh ref={cloudsRef} scale={1.003}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshPhongMaterial
          map={new THREE.TextureLoader().load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png')}
          transparent={true}
          opacity={0.4}
          depthWrite={false}
        />
      </mesh>

      {/* Atmosphere glow */}
      <mesh scale={1.1}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshPhongMaterial
          color="#4B7BE5"
          transparent
          opacity={0.2}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

function Mars() {
  const marsRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (marsRef.current) {
      marsRef.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <group position={[0, 15, 0]}>
      {/* Mars core */}
      <mesh ref={marsRef}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshPhongMaterial
          map={new THREE.TextureLoader().load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/mars_1k_color.jpg')}
          bumpMap={new THREE.TextureLoader().load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/mars_1k_normal.jpg')}
          bumpScale={0.1}
        />
      </mesh>

      {/* Mars atmosphere */}
      <mesh scale={1.1}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshPhongMaterial
          color="#C1440E"
          transparent
          opacity={0.2}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

function Rocket({ isLaunching, phase }: { isLaunching: boolean; phase: 'launch' | 'cruise' | 'landing' }) {
  const rocketRef = useRef<THREE.Group>(null);
  const [rotation, setRotation] = useState(0);
  const [orbitAngle, setOrbitAngle] = useState(0);

  useFrame((state, delta) => {
    if (!rocketRef.current) return;

    if (isLaunching) {
      switch (phase) {
        case 'launch':
          rocketRef.current.position.y += delta * 4;
          rocketRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.05;
          break;
        case 'cruise':
          // Orbital movement
          setOrbitAngle(prev => prev + delta * 0.2);
          const radius = 8;
          rocketRef.current.position.x = Math.sin(orbitAngle) * radius;
          rocketRef.current.position.y = 8 + Math.cos(orbitAngle) * radius * 0.5;
          rocketRef.current.position.z = Math.cos(orbitAngle) * radius;
          
          // Rocket orientation
          rocketRef.current.rotation.y = orbitAngle + Math.PI / 2;
          rocketRef.current.rotation.x = Math.sin(orbitAngle) * 0.2;
          break;
        case 'landing':
          rocketRef.current.position.y = Math.max(15 - delta * 2, 13);
          rocketRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 3) * 0.03;
          break;
      }
    } else {
      if (phase === 'launch') {
        rocketRef.current.position.set(0, 0, 0);
        rocketRef.current.rotation.set(0, 0, 0);
      } else if (phase === 'landing') {
        rocketRef.current.position.set(0, 15, 0);
        rocketRef.current.rotation.set(0, 0, 0);
      }
    }
  });

  return (
    <group ref={rocketRef}>
      {/* Main body */}
      <mesh position={[0, 2, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 4, 32]} />
        <meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Nose cone */}
      <mesh position={[0, 4.5, 0]}>
        <coneGeometry args={[0.5, 1, 32]} />
        <meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Fins */}
      {[0, 120, 240].map((rotation, i) => (
        <mesh key={i} position={[0, 0.5, 0]} rotation={[0, (rotation * Math.PI) / 180, 0]}>
          <boxGeometry args={[0.1, 1, 1]} />
          <meshStandardMaterial color="#ff0000" metalness={0.6} roughness={0.3} />
        </mesh>
      ))}

      {/* Engine flames */}
      {isLaunching && (
        <>
          <mesh position={[0, 0, 0]}>
            <coneGeometry args={[0.3, 2, 32]} />
            <meshStandardMaterial
              color="#ff6b00"
              emissive="#ff6b00"
              emissiveIntensity={2}
              transparent
              opacity={0.8}
            />
          </mesh>
          {/* Additional flame particles */}
          {Array.from({ length: 10 }).map((_, i) => (
            <mesh
              key={i}
              position={[
                (Math.random() - 0.5) * 0.2,
                -1 - Math.random() * 1,
                (Math.random() - 0.5) * 0.2
              ]}
            >
              <sphereGeometry args={[0.1, 16, 16]} />
              <meshBasicMaterial
                color={i % 2 === 0 ? '#ff9500' : '#ff4400'}
                transparent
                opacity={0.6}
              />
            </mesh>
          ))}
        </>
      )}
    </group>
  );
}

interface RocketSimulationProps {
  isLaunching: boolean;
}

export const RocketSimulation: React.FC<RocketSimulationProps> = ({ isLaunching }) => {
  const [phase, setPhase] = useState<'launch' | 'cruise' | 'landing'>('launch');

  useEffect(() => {
    if (isLaunching) {
      // Launch sequence timing
      setTimeout(() => setPhase('cruise'), 2000);
      setTimeout(() => setPhase('landing'), 4000);
      setTimeout(() => setPhase('launch'), 6000);
    } else {
      setPhase('launch');
    }
  }, [isLaunching]);

  return (
    <div className="w-full h-[400px] rounded-xl overflow-hidden">
      <Canvas
        camera={{ position: [0, 8, 20], fov: 50 }}
        style={{ background: 'linear-gradient(to bottom, #000000, #001f3f)' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <Earth />
        <Mars />
        <Rocket isLaunching={isLaunching} phase={phase} />
        
        <OrbitControls
          enableZoom={true}
          maxDistance={30}
          minDistance={5}
        />
      </Canvas>
    </div>
  );
};