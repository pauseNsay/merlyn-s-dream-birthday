import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, RoundedBox, Cylinder, Text } from '@react-three/drei';
import * as THREE from 'three';

interface RecordPlayer3DProps {
  isPlaying: boolean;
}

const Vinyl = ({ isPlaying }: { isPlaying: boolean }) => {
  const vinylRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (vinylRef.current && isPlaying) {
      vinylRef.current.rotation.y += delta * 2;
    }
  });

  return (
    <group ref={vinylRef} position={[0, 0.15, 0]}>
      {/* Main vinyl */}
      <Cylinder args={[1.8, 1.8, 0.05, 64]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.4} />
      </Cylinder>
      
      {/* Grooves */}
      {[1.6, 1.4, 1.2, 1.0, 0.8].map((radius, i) => (
        <mesh key={i} position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[radius - 0.02, radius, 64]} />
          <meshStandardMaterial color="#2a2a2a" side={THREE.DoubleSide} />
        </mesh>
      ))}

      {/* Center label */}
      <Cylinder args={[0.5, 0.5, 0.06, 32]} position={[0, 0.01, 0]}>
        <meshStandardMaterial color="#c4a052" metalness={0.5} roughness={0.3} />
      </Cylinder>
      
      {/* Center hole */}
      <Cylinder args={[0.05, 0.05, 0.1, 16]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#0a0a0a" />
      </Cylinder>
    </group>
  );
};

const ToneArm = ({ isPlaying }: { isPlaying: boolean }) => {
  const armRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (armRef.current) {
      const targetRotation = isPlaying ? -0.3 : 0;
      armRef.current.rotation.y = THREE.MathUtils.lerp(
        armRef.current.rotation.y,
        targetRotation,
        delta * 2
      );
    }
  });

  return (
    <group ref={armRef} position={[1.8, 0.3, 1.5]}>
      {/* Base */}
      <Cylinder args={[0.15, 0.15, 0.2, 16]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#888" metalness={0.8} roughness={0.2} />
      </Cylinder>
      
      {/* Arm */}
      <group rotation={[0, 0, -0.1]}>
        <RoundedBox args={[0.08, 0.08, 2]} radius={0.02} position={[0, 0.1, -1]}>
          <meshStandardMaterial color="#aaa" metalness={0.8} roughness={0.2} />
        </RoundedBox>
        
        {/* Headshell */}
        <RoundedBox args={[0.12, 0.05, 0.2]} radius={0.01} position={[0, 0.08, -2]}>
          <meshStandardMaterial color="#666" metalness={0.7} roughness={0.3} />
        </RoundedBox>
      </group>
    </group>
  );
};

const PlayerBase = () => {
  return (
    <group>
      {/* Wooden base */}
      <RoundedBox args={[5, 0.3, 4]} radius={0.05} position={[0, -0.15, 0]}>
        <meshStandardMaterial color="#5c3d2e" metalness={0.1} roughness={0.8} />
      </RoundedBox>
      
      {/* Platter */}
      <Cylinder args={[2, 2, 0.1, 64]} position={[0, 0.05, 0]}>
        <meshStandardMaterial color="#333" metalness={0.6} roughness={0.3} />
      </Cylinder>
      
      {/* Decorative rim */}
      <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.95, 2.05, 64]} />
        <meshStandardMaterial color="#c4a052" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
};

const Scene = ({ isPlaying }: { isPlaying: boolean }) => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#ffd700" />
      <pointLight position={[-5, 3, -5]} intensity={0.5} color="#ff69b4" />
      <spotLight position={[0, 8, 0]} intensity={0.8} angle={0.5} penumbra={0.5} />
      
      <PlayerBase />
      <Vinyl isPlaying={isPlaying} />
      <ToneArm isPlaying={isPlaying} />
      
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2.5}
        autoRotate={!isPlaying}
        autoRotateSpeed={0.5}
      />
    </>
  );
};

const RecordPlayer3D = ({ isPlaying }: RecordPlayer3DProps) => {
  return (
    <div className="w-full h-64 md:h-80 lg:h-96">
      <Canvas 
        camera={{ position: [0, 4, 6], fov: 45 }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
      >
        <Scene isPlaying={isPlaying} />
      </Canvas>
    </div>
  );
};

export default RecordPlayer3D;
