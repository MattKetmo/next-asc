'use client'

import { useState } from "react"
import asc from "assemblyscript/asc"
// import * as loader from "@assemblyscript/loader";

const defaultCode = `export function add(a: i32, b: i32): i32 {
  return a + b;
}`

export default function Compiler() {
  const [code, setCode] = useState(defaultCode)
  const [wasmModule, setWasmModule] = useState('')
  const [wasmBinary, setWasmBinary] = useState<WebAssembly.Module | null>(null)
  const [error, setError] = useState('')
  const [result, setResult] = useState('')

  async function compile() {
    try {
      const result = await asc.compileString(code, {
        optimizeLevel: 3,
      });
      if (result.error) {
        throw new Error(result.stderr.toString())
      }
      setWasmModule(result.text || '')
      setWasmBinary(result.binary)
      setError('')
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
      setWasmModule('')
    }
  }

  async function run() {
    // const wabtInstance = await wabt();
    // const module = wabtInstance.parseWat('example.wat', wasmModule);
    // const wasmBinary = module.toBinary({}).buffer;
    // const compiled = await WebAssembly.compile(wasmBinary as ArrayBuffer);
    const { instance } = await WebAssembly.instantiate(wasmBinary as ArrayBuffer, {});
    const add = instance.exports.add as (a: number, b: number) => number;
    setResult(String(add(1, 2)))
  }

  return (
    <div className="max-w-[800px] mx-auto mt-20">
      <main className="flex flex-col gap-4 row-start-2 items-center sm:items-start">
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
        <pre>{error}</pre>
        <pre>{wasmModule}</pre>
        {wasmModule && (
          <>
            <button
              onClick={() => run()}
              className="bg-blue-400 px-8 py-2 text-white rounded-md"
            >
              Run
            </button>
            <pre>{result}</pre>
          </>
        )}
      </main>
    </div>
  )
}
