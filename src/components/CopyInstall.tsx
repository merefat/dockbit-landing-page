import { useEffect, useRef, useState } from 'react'
import { INSTALL_CMD } from '../data/site'

export default function CopyInstall() {
  const [label, setLabel] = useState('copy')
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => () => clearTimeout(timer.current), [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(INSTALL_CMD)
      setLabel('copied')
    } catch {
      setLabel('copy')
      return
    }
    timer.current = setTimeout(() => setLabel('copy'), 1600)
  }

  return (
    <div className="install">
      <span>
        <b>$</b> {INSTALL_CMD}
      </span>
      <button type="button" onClick={copy}>
        {label}
      </button>
    </div>
  )
}
