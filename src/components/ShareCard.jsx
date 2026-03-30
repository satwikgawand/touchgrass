import { useRef } from 'react'
import html2canvas from 'html2canvas'

export default function ShareCard({ quest }) {
  const cardRef = useRef(null)

  const handleShare = async () => {
    if (!quest) return

    try {
      // Capture the off-screen card as a PNG
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#0d0d0d',
        scale: 2,
        useCORS: true,
        logging: false,
      })

      canvas.toBlob(async (blob) => {
        if (!blob) throw new Error('Canvas capture failed')

        const file = new File([blob], 'touchgrass-quest.png', { type: 'image/png' })

        // Try native share with file first
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              files: [file],
              title: 'Touch Grass',
              text: `Today's quest: ${quest.title} — touchgrass.brnrot.fun`,
            })
            return
          } catch {
            // User cancelled or share failed — fall through
          }
        }

        // Fallback: download the image
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'touchgrass-quest.png'
        a.click()
        URL.revokeObjectURL(url)
      }, 'image/png')
    } catch {
      // Final fallback: copy text to clipboard
      try {
        await navigator.clipboard.writeText(
          `Touch Grass — Today's Quest\n\n${quest.title}\n\n${quest.flavour}\n\ntouchgrass.brnrot.fun`
        )
        alert('Quest copied to clipboard!')
      } catch {
        // Clipboard also failed — do nothing
      }
    }
  }

  if (!quest) return null

  const categoryColors = {
    social: '#60a5fa',
    body: '#4ade80',
    mind: '#c084fc',
    skill: '#fbbf24',
    chaos: '#f87171',
  }
  const accentColor = categoryColors[quest.category] || '#00ff41'

  return (
    <>
      {/* Off-screen share card — captured by html2canvas */}
      <div
        ref={cardRef}
        style={{
          position: 'fixed',
          left: '-9999px',
          top: 0,
          width: '600px',
          padding: '48px',
          backgroundColor: '#0d0d0d',
          fontFamily: '"JetBrains Mono", "Fira Code", monospace',
          color: '#ffffff',
        }}
      >
        {/* App name */}
        <div style={{ marginBottom: '32px' }}>
          <p style={{ color: '#00ff41', fontSize: '11px', letterSpacing: '4px', marginBottom: '8px', textTransform: 'uppercase' }}>
            &gt; SIDE QUEST ASSIGNED
          </p>
          <h1 style={{ fontSize: '36px', fontWeight: '700', letterSpacing: '-1px', lineHeight: 1, color: '#ffffff' }}>
            TOUCH <span style={{ color: '#00ff41' }}>GRASS</span>
          </h1>
        </div>

        {/* Category + difficulty */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
          <span style={{
            display: 'inline-block', padding: '3px 10px', borderRadius: '4px',
            border: `1px solid ${accentColor}66`, color: accentColor,
            backgroundColor: `${accentColor}11`, fontSize: '11px',
            letterSpacing: '3px', textTransform: 'uppercase',
          }}>
            {quest.category}
          </span>
          <span style={{
            display: 'inline-block', padding: '3px 10px', borderRadius: '4px',
            border: '1px solid #3a3a3a', color: '#888888',
            backgroundColor: '#1a1a1a', fontSize: '11px',
            letterSpacing: '3px', textTransform: 'uppercase',
          }}>
            {quest.difficulty}
          </span>
        </div>

        {/* Quest title */}
        <h2 style={{ fontSize: '22px', fontWeight: '600', lineHeight: '1.4', color: '#ffffff', marginBottom: '20px' }}>
          {quest.title}
        </h2>

        {/* Flavour text */}
        <p style={{
          fontSize: '14px', color: '#888888', fontStyle: 'italic',
          lineHeight: '1.6', borderLeft: `2px solid ${accentColor}44`,
          paddingLeft: '16px', marginBottom: '32px',
        }}>
          {quest.flavour}
        </p>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #2a2a2a', paddingTop: '20px' }}>
          <p style={{ fontSize: '11px', color: '#444444', letterSpacing: '2px', textTransform: 'uppercase' }}>
            ⏱ {quest.duration}
          </p>
          <p style={{ fontSize: '12px', color: '#00ff41', letterSpacing: '2px' }}>
            touchgrass.brnrot.fun
          </p>
        </div>
      </div>
    </>
  )
}

// Export the handleShare logic separately so App can call it
export function useShareCard(quest) {
  const cardRef = useRef(null)

  const share = async () => {
    if (!quest || !cardRef.current) return

    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#0d0d0d',
        scale: 2,
        useCORS: true,
        logging: false,
      })

      canvas.toBlob(async (blob) => {
        if (!blob) throw new Error('Canvas capture failed')

        const file = new File([blob], 'touchgrass-quest.png', { type: 'image/png' })

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              files: [file],
              title: 'Touch Grass',
              text: `Today's quest: ${quest.title} — touchgrass.brnrot.fun`,
            })
            return
          } catch {
            // fall through
          }
        }

        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'touchgrass-quest.png'
        a.click()
        URL.revokeObjectURL(url)
      }, 'image/png')
    } catch {
      try {
        await navigator.clipboard.writeText(
          `Touch Grass — Today's Quest\n\n${quest.title}\n\n${quest.flavour}\n\ntouchgrass.brnrot.fun`
        )
      } catch {
        // nothing
      }
    }
  }

  return { cardRef, share }
}
