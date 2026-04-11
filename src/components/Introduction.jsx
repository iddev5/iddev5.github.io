import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, useTexture, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

import IconGithub from "../assets/icons/brand-github.svg";
import IconLeetcode from "../assets/icons/brand-leetcode.svg";
import IconLinkedin from "../assets/icons/brand-linkedin.svg";
import IconMatrix from "../assets/icons/brand-matrix.svg";
import IconMail from "../assets/icons/mail.svg";

const WheelSegment = () => {
  const radius = 3.6;
  const x = Math.cos(50) * radius;
  const y = Math.sin(40) * radius;

  return (
    <group position={[x, y, 0]}>
      <Html center zIndexRange={[100, 0]}>
        <div className='md:visible invisible'>
          <Socials />
          </div>
      </Html>
    </group>
  );
};

const Socials = () => {
  const links = [
    ["https://github.com/iddev5", IconGithub, "githun"],
    ["https://matrix.to/#/@iddev5:matrix.org", IconMatrix, "matrix"],
    ["https://linkedin.com/in/ayush-bardhan-tripathy", IconLinkedin, "linkedin"],
    ["https://leetcode.com/u/ayushbardhan/", IconLeetcode, "leetcode"],
    ["mailto:ayushbardhan5@gmail.com", IconMail, "mail"]
  ]

  return <div className="justify-left flex items-center justify-between gap-2 w-[280px] h-[80px] scale-90 md:scale-100 hover:bg-accent bg-[#2a374f] backdrop-blur-[8px] rounded-full md:rounded-bl-none shadow-xl shadow-zinc-300/20 border-2 border-zinc-300/10 px-2">
    {
      links.map(l =>
        <a href={l[0]} target="blank" aria-label={l[2]}>
          <img src={l[1].src} className="hover:scale-120 transition-all hover:bg-yellow-600 rounded-full p-2" />
        </a>
      )
    }
  </div>;
}

const WheelGroup = () => {
  const groupRef = useRef();
  const texture = useTexture('./Ayush.jpg');

  useFrame((state) => {
    if (!groupRef.current) return;

    const targetX = (state.pointer.y * Math.PI) / 8;
    const targetY = (state.pointer.x * Math.PI) / 8;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetX, 0.1);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.1);
  });

  return (
    <group ref={groupRef}>
      <group rotation={[0, 0, 0]}>
        <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
          <circleGeometry args={[2.4, 64]} />
          <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>

      </group>
      <WheelSegment />
    </group>
  );
};

// Replacement for maath/rand.inSphere()
function randomInSphere(
  array,
  { radius = 1, center = [0, 0, 0] } = {}
) {
  const cx = center[0], cy = center[1], cz = center[2];

  for (let i = 0; i < array.length; i += 3) {
    const u = Math.random();
    const v = Math.random();

    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);

    const r = Math.cbrt(Math.random()) * radius;

    const sinPhi = Math.sin(phi);

    array[i] = r * sinPhi * Math.cos(theta) + cx;
    array[i + 1] = r * sinPhi * Math.sin(theta) + cy;
    array[i + 2] = r * Math.cos(phi) + cz;
  }

  return array;
}

const Stars = (props) => {
  const ref = useRef(null);
  console.log(randomInSphere(new Float32Array(5000), { radius: 1.2 }));
  const [sphere] = useState(() => randomInSphere(new Float32Array(5000), { radius: 1.2 }));

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color='#f272c8'
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

function StarCanvas() {
  return <div className="w-screen h-screen fixed top-0 left-0 z-[-1]">
    <Canvas camera={{position:[0,0,1]}}>
      <Stars />
    </Canvas>
  </div>
}

export default function Introduction() {
    const md = window.matchMedia('(min-width: 768px)').matches;

    return (
      <div className="w-full h-[40vh] md:h-[90vh] bg-transparent flex flex-col items-center relative">
        <StarCanvas />
        <Canvas camera={{ position: [0, 0, md ? 16 : 6], fov: 45 }}>
          <WheelGroup />
        </Canvas>
        <div className="text-white flex flex-col items-center relative md:-top-[25%]">
              <h1 className="py-6 text-2xl font-semibold select-none md:text-3xl">
                Ayush Bardhan Tripathy
              </h1>
              <h2 className="md:text-md flex gap-4 text-sm">
                <span>Full Stack Developer</span><li>CSE Undergrad</li>
              </h2>
              <div className='mt-5 visible md:invisible'>
                <Socials />
              </div>
            </div>
            <div className='invisible md:visible w-[2px] h-full bg-linear-to-b from-transparent via-zinc-300/20 to-transparent absolute right-0'></div>
      </div>
    );
  }