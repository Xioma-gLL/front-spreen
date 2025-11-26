import React, { useEffect, useRef, useState } from 'react'

function formatTime(ts) {
  const d = new Date(ts)
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [messages, setMessages] = useState([
    { id: Date.now() - 60000, from: 'reception', type: 'text', text: '¡Hola! Bienvenido a Plaza Trujillo. ¿En qué puedo ayudarle hoy?' },
  ])
  const [text, setText] = useState('')
  const fileRef = useRef(null)
  const listRef = useRef(null)
  const mediaRecorderRef = useRef(null)
  const audioChunksRef = useRef([])

  useEffect(() => {
    return () => {
      messages.forEach((m) => {
        if (m.blobUrl) URL.revokeObjectURL(m.blobUrl)
      })
    }
  }, [messages])

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [messages, open, expanded])

  useEffect(() => {
    function handler() {
      setOpen(false)
      setExpanded(false)
    }
    window.addEventListener('closeChat', handler)
    return () => window.removeEventListener('closeChat', handler)
  }, [])

  useEffect(() => {
    function onResize() {
      if (typeof window === 'undefined') return
      if (window.innerWidth < 1024) {
        // collapse expanded state on small screens
        setExpanded(false)
      }
    }
    window.addEventListener('resize', onResize)
    // run once
    onResize()
    return () => window.removeEventListener('resize', onResize)
  }, [])

  function pushMessage(msg) {
    setMessages((prev) => [...prev, { id: Date.now() + Math.random(), ...msg }])
  }

  function simulateReceptionReply() {
    setTimeout(() => {
      pushMessage({ from: 'reception', type: 'text', text: 'Gracias por escribir. En breve un recepcionista le responderá.' })
    }, 900)
  }

  function handleSendText(e) {
    e?.preventDefault()
    if (!text.trim()) return
    pushMessage({ from: 'user', type: 'text', text: text.trim() })
    setText('')
    simulateReceptionReply()
  }

  function handleFileChange(e) {
    const file = e.target.files && e.target.files[0]
    if (!file) return
    const blobUrl = URL.createObjectURL(file)
    const mime = file.type || ''
    let type = 'file'
    if (mime.startsWith('image/')) type = 'image'
    else if (mime.startsWith('video/')) type = 'video'
    else if (mime.startsWith('audio/')) type = 'audio'
    pushMessage({ from: 'user', type, blobUrl, name: file.name })
    e.target.value = ''
    simulateReceptionReply()
  }

  async function startRecording() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert('Su navegador no permite acceder al micrófono para grabar.')
      return
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRecorderRef.current = new MediaRecorder(stream)
      audioChunksRef.current = []
      mediaRecorderRef.current.ondataavailable = (ev) => audioChunksRef.current.push(ev.data)
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
        const blobUrl = URL.createObjectURL(blob)
        pushMessage({ from: 'user', type: 'audio', blobUrl, name: `recording-${Date.now()}.webm` })
        simulateReceptionReply()
      }
      mediaRecorderRef.current.start()
    } catch (err) {
      console.error(err)
      alert('No fue posible iniciar la grabación.')
    }
  }

  function stopRecording() {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop()
    }
  }

  const panelClass = expanded
    ? 'fixed top-20 right-6 w-[92%] sm:w-[420px] md:w-[420px] lg:w-[420px] h-[80vh] sm:h-[520px]'
    : 'bottom-20 right-4 w-11/12 sm:w-80 md:w-96 h-[380px] sm:h-[480px] md:h-[520px]'

  return (
    <div>
      <button
        aria-label="Abrir chat"
        onClick={() => {
          const newState = !open
          setOpen(newState)
          // if user clicks explicitly to open on large screens, expand near the right
          if (newState && typeof window !== 'undefined' && window.innerWidth >= 1024) {
            setExpanded(true)
          } else {
            setExpanded(false)
          }
        }}
        className="fixed bottom-6 right-6 z-50 h-12 px-4 rounded-full flex items-center justify-center shadow-xl text-white transition-transform transform hover:scale-105 chat-floating-btn"
        style={{ background: 'linear-gradient(135deg,#F26A4B 0%,#F21905 100%)' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3C7 3 3 6.6 3 11c0 2.1.9 4 2.4 5.5L5 21l4.7-1.6C11.1 19.7 11.5 19.8 12 19.8c5 0 9-3.6 9-8.8S17 3 12 3z" />
        </svg>
        <span className="hidden md:inline">Chatear</span>
      </button>

      {open && (
        <div className={`fixed z-50 bg-white rounded-xl shadow-2xl border ${panelClass} chat-panel`} style={{ borderColor: '#8C0808' }}>
          <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: '#F2F2F2' }}>
              <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-[#591117] flex items-center justify-center text-white font-semibold">R</div>
              <div>
                <div className="font-semibold text-sm">Recepción</div>
                <div className="text-xs text-gray-500">En línea</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                title={expanded ? 'Minimizar' : 'Expandir'}
                className="text-sm text-gray-600 px-2 py-1"
                onClick={() => setExpanded((v) => !v)}
              >
                {expanded ? '—' : '▢'}
              </button>
              <button className="text-sm text-gray-600 px-2 py-1" onClick={() => { stopRecording(); setOpen(false); setExpanded(false) }}>Cerrar</button>
            </div>
          </div>

          <div ref={listRef} className={`p-3 ${expanded ? 'h-[65vh]' : 'h-64'} overflow-y-auto space-y-3 bg-[#F9FAFB]`}>
            {messages.length === 0 && <div className="text-xs text-gray-500">Envía un mensaje, foto, video o audio.</div>}
            {messages.map((m) => (
              <div key={m.id} className={`flex items-end gap-3 ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                {m.from !== 'user' && (
                  <div className="w-8 h-8 rounded-full bg-[#591117] text-white grid place-items-center text-sm font-semibold">R</div>
                )}
                <div className={`max-w-[80%] ${m.from === 'user' ? 'text-right' : 'text-left'}`}>
                  {m.type === 'text' && (
                    <div className={`inline-block px-3 py-2 ${m.from === 'user' ? 'bg-[#F26A4B] text-white shadow-sm' : 'bg-white text-[#591117] border shadow-sm'} rounded-lg border`}>{m.text}</div>
                  )}
                  {m.type === 'image' && <img src={m.blobUrl} alt={m.name || 'imagen'} className="rounded-none max-w-full border" />}
                  {m.type === 'video' && <video controls src={m.blobUrl} className="rounded-sm max-w-full border" />}
                  {m.type === 'audio' && <audio controls src={m.blobUrl} className="w-full" />}
                  {m.type === 'file' && (
                    <a href={m.blobUrl} target="_blank" rel="noreferrer" className="text-sm text-[#591117] underline">{m.name}</a>
                  )}
                  <div className="text-xs text-gray-400 mt-1">{formatTime(m.id)}</div>
                </div>
                {m.from === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-[#F26A4B] text-white grid place-items-center text-sm font-semibold">U</div>
                )}
              </div>
            ))}
          </div>

          <form className="p-3 border-t" onSubmit={handleSendText} style={{ borderColor: '#F2F2F2' }}>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Escribe un mensaje..."
                className="flex-1 px-4 py-2 rounded-full border bg-white outline-none"
              />
              <input ref={fileRef} type="file" accept="image/*,video/*,audio/*" onChange={handleFileChange} className="hidden" />
              <button type="button" onClick={() => fileRef.current && fileRef.current.click()} className="px-2 py-2 rounded-full bg-transparent border-0">
                📎
              </button>
              <button type="button" onMouseDown={startRecording} onMouseUp={stopRecording} className="px-2 py-2 rounded-full bg-transparent border-0 text-red-600">
                🎤
              </button>
              <button type="submit" className="px-3 py-2 rounded-full bg-[#591117] text-white">Enviar</button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
