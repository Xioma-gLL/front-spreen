import React, { useEffect, useState } from 'react'

export default function Toast() {
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    function handler(e) {
      const { type = 'info', message = '', duration = 3000 } = e.detail || {}
      const id = Date.now() + Math.random()
      setToasts((prev) => [...prev, { id, type, message }])
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
      }, duration)
    }

    window.addEventListener('toast', handler)
    return () => window.removeEventListener('toast', handler)
  }, [])

  return (
    <div className="fixed right-6 bottom-20 z-60 flex flex-col gap-2">
      {toasts.map((t) => (
        <div key={t.id} className={`px-4 py-2 rounded shadow-lg text-sm font-medium ${t.type === 'success' ? 'bg-green-600 text-white' : t.type === 'error' ? 'bg-red-600 text-white' : 'bg-gray-800 text-white'}`}>
          {t.message}
        </div>
      ))}
    </div>
  )
}
