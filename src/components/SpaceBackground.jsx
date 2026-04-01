import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch {
    return false
  }
}

function StarField({ count, intensity }) {
  const pointsRef = useRef()

  const { positions, speeds } = useMemo(() => {
    const nextPositions = new Float32Array(count * 3)
    const nextSpeeds = new Float32Array(count)

    for (let i = 0; i < count; i += 1) {
      const i3 = i * 3
      nextPositions[i3] = (Math.random() - 0.5) * 36
      nextPositions[i3 + 1] = (Math.random() - 0.5) * 20
      nextPositions[i3 + 2] = -Math.random() * 50
      nextSpeeds[i] = 0.015 + Math.random() * 0.05
    }

    return { positions: nextPositions, speeds: nextSpeeds }
  }, [count])

  useFrame(() => {
    const geometry = pointsRef.current?.geometry
    if (!geometry) return

    const attribute = geometry.attributes.position
    for (let i = 0; i < count; i += 1) {
      const i3 = i * 3
      const depthFactor = Math.min(1.8, Math.max(0.35, Math.abs(attribute.array[i3 + 2]) / 20))
      attribute.array[i3 + 2] += speeds[i] * depthFactor
      if (attribute.array[i3 + 2] > 3.5) {
        attribute.array[i3] = (Math.random() - 0.5) * 36
        attribute.array[i3 + 1] = (Math.random() - 0.5) * 20
        attribute.array[i3 + 2] = -48 - Math.random() * 8
      }
    }

    attribute.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#73d7ff"
        size={0.085}
        sizeAttenuation
        transparent
        depthWrite={false}
        opacity={0.38 * intensity}
      />
    </points>
  )
}

function FloatingForms({ intensity, simplified }) {
  const groupRef = useRef()
  const ringRef = useRef()
  const blobRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.04
      groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.08
    }
    if (ringRef.current) {
      ringRef.current.position.y = 1.8 + Math.sin(t * 0.7) * 0.18
      ringRef.current.rotation.z = t * 0.15
    }
    if (blobRef.current) {
      blobRef.current.position.x = -2.6 + Math.cos(t * 0.45) * 0.28
      blobRef.current.position.y = -1.1 + Math.sin(t * 0.6) * 0.2
    }
  })

  return (
    <group ref={groupRef}>
      <mesh position={[2.6, -0.6, -8.8]}>
        <sphereGeometry args={[1.55, 28, 28]} />
        <meshStandardMaterial color="#18d9ff" transparent opacity={0.08 * intensity} emissive="#1bb6ff" emissiveIntensity={0.4} />
      </mesh>

      {!simplified && (
        <>
          <mesh ref={ringRef} position={[-1.6, 1.8, -9.6]} rotation={[1.3, 0.4, 0]}>
            <torusGeometry args={[1.15, 0.05, 16, 70]} />
            <meshStandardMaterial color="#6e7dff" transparent opacity={0.18 * intensity} emissive="#627cff" emissiveIntensity={0.33} />
          </mesh>

          <mesh ref={blobRef} position={[-2.6, -1.1, -7.7]}>
            <icosahedronGeometry args={[0.88, 1]} />
            <meshStandardMaterial color="#64f4ff" transparent opacity={0.12 * intensity} emissive="#34f2ff" emissiveIntensity={0.45} wireframe />
          </mesh>
        </>
      )}
    </group>
  )
}

function SpaceScene({ intensity, simplified }) {
  const groupRef = useRef()
  const glowRef = useRef()

  useFrame((state, delta) => {
    const { mouse, camera, clock } = state
    const targetX = mouse.x * 0.35
    const targetY = mouse.y * 0.25

    camera.position.x += (targetX - camera.position.x) * 0.045
    camera.position.y += (targetY - camera.position.y) * 0.045
    camera.lookAt(0, 0, -8)

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.022
      groupRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.18) * 0.03
    }

    if (glowRef.current) {
      glowRef.current.position.x = mouse.x * 5.4
      glowRef.current.position.y = mouse.y * 2.8
      glowRef.current.position.z = -2.8
      glowRef.current.intensity = 0.58 * intensity
    }
  })

  return (
    <>
      <color attach="background" args={['#030610']} />
      <fog attach="fog" args={['#050a18', 8, 30]} />

      <ambientLight intensity={0.3 * intensity} color="#84c7ff" />
      <directionalLight position={[4, 5, 5]} intensity={0.42 * intensity} color="#87f7ff" />
      <pointLight ref={glowRef} intensity={0.45 * intensity} color="#5dd8ff" distance={16} decay={2.2} />

      <group ref={groupRef}>
        <StarField count={simplified ? 110 : 240} intensity={intensity} />
        <FloatingForms intensity={intensity} simplified={simplified} />
      </group>
    </>
  )
}

function SpaceBackground({ activeSection }) {
  const [isReady, setIsReady] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsReady(supportsWebGL())
    const mq = window.matchMedia('(max-width: 1023px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const intensity = useMemo(() => {
    if (activeSection === 'home') return 1
    if (activeSection === 'about') return 0.68
    return 0.38
  }, [activeSection])

  if (!isReady) {
    return <div className="space-fallback pointer-events-none fixed inset-0 z-0" aria-hidden="true" />
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 4.8], fov: 58 }}
        dpr={[1, 1.6]}
        gl={{ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' }}
      >
        <SpaceScene intensity={intensity} simplified={isMobile} />
      </Canvas>
    </div>
  )
}

export default SpaceBackground