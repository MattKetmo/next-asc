'use client'

import { useState } from "react"

export default function Home() {
  const [code, setCode] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  function compile() {
    setOutput(code)
  }

  return (
    <div className="w-[500px] mx-auto mt-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <textarea
          className="border w-[500px] min-h-[300px] rounded-lg outline-none focus:ring-2 focus:ring-blue-400 p-2 focus:ring-offset-2"
          onChange={(e) => setCode(e.target.value)}
        />
        <button
          onClick={() => compile()}
          className="bg-blue-400 px-8 py-2 text-white rounded-md"
        >
          Compile
        </button>
        <div>{error}</div>
        <div>{output}</div>
      </main>
    </div>
  )
}
