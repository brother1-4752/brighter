import React, { useState, useEffect, useRef } from 'react'
import * as THREE from 'three'

const Home = () => {
  const [imageURL, setImageURL] = useState<string>('')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files as FileList
    const file = files[0]
    setImageURL(URL.createObjectURL(file))
  }

  useEffect(() => {
    if (canvasRef.current) {
      const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current })

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

      const geometry = new THREE.PlaneGeometry(2, 2)
      const textureLoader = new THREE.TextureLoader()
      const texture = textureLoader.load(imageURL)
      const material = new THREE.MeshBasicMaterial({ map: texture })
      const plane = new THREE.Mesh(geometry, material)
      scene.add(plane)

      const light = new THREE.PointLight(0xff0000, 1)
      scene.add(light)

      const mouse = new THREE.Vector2()
      const raycaster = new THREE.Raycaster()
      const lightPosition = new THREE.Vector3()

      window.addEventListener('mousemove', (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
        lightPosition.x = mouse.x * 5
        lightPosition.y = mouse.y * 5
      })

      camera.position.z = 5

      const animate = () => {
        requestAnimationFrame(animate)

        // 업데이트된 마우스 위치로 빛의 위치 업데이트
        light.position.copy(lightPosition)

        renderer.render(scene, camera)
      }

      animate()
    }
  }, [imageURL])

  return (
    <div>
      <input type="file" onChange={handleImageUpload} accept="image/*" />
      <canvas ref={canvasRef} style={{ width: '100%', height: '100vh' }} />
    </div>
  )
}

export default Home
