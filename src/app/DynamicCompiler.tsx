'use client'

import dynamic from 'next/dynamic'

const Compiler = dynamic(() => import('./Compiler'), { ssr: false })

export default function DynamicCompiler() {
  return (
    <Compiler />
  )
}
