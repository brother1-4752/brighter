import { useRouter } from 'next/router'
import { ChangeEvent, FormEvent, useState } from 'react'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

export default function Home() {
  const router = useRouter()
  const handleSign = () => {
    // 카드 컴포넌트 띄우기
    // createPortal
    console.log('카드 컴포넌트임')
  }
  const [imgFile, setImgFile] = useState<File>()
  const [gltfUrl, setGltfUrl] = useState<string>('')

  const onChangeImgFile = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files as FileList
    const file = files[0]
    const url = URL.createObjectURL(file)

    setImgFile(file)
    setGltfUrl(url)
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <div>
      <header>
        <div>Brighter</div>
        <div onClick={handleSign}>로그인 / 회원가입</div>
      </header>

      <section>
        <h1>CREATE STUNNING VISUALS</h1>
        <p>IN SECONDS</p>
      </section>

      <form onSubmit={onSubmit}>
        <label htmlFor="img-file">img 파일을 업로드하세요</label>
        <input type="file" id="img-file" onChange={onChangeImgFile} />
        <button>제출</button>
      </form>

      {/* {imgFile && <div>z</div>} */}
    </div>
  )
}
