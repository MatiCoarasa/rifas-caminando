'use client'

import dynamic from 'next/dynamic'

const App = dynamic(() => import('../components/App'))

export function ClientOnly() {
  return <App />
}
