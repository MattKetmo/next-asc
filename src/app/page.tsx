'use client'

import { useState } from "react"
import asc from "assemblyscript/asc"

export const dynamic = 'force-dynamic'

const defaultCode = `export function add(a: i32, b: i32): i32 {
  return a + b;
}`

export default function Home() {
  const [code, setCode] = useState(defaultCode)
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  async function compile() {
    try {
      const result = await asc.compileString(code, {
        // optimizeLevel: 3,
      });
      setOutput(result.text || '')
    } catch (e) {
      setError(e as string)
    }
  }

  return (
    <div className="max-w-[800px] mx-auto mt-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <textarea
          className="border w-full min-h-[300px] rounded-lg outline-none focus:ring-2 focus:ring-blue-400 p-2 focus:ring-offset-2"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button
          onClick={() => compile()}
          className="bg-blue-400 px-8 py-2 text-white rounded-md"
        >
          Compile
        </button>
        <div>{error}</div>
        <pre>{output}</pre>
      </main>
    </div>
  )
}
