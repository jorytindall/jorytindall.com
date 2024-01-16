import { useState, useEffect } from 'react'
import { useTheme } from "next-themes"
import { getClasses } from 'utils/getClasses';
import s from 'styles/components/navigation/NavTrigger.module.scss'

const ThemePicker = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const lightClasses = getClasses([
    s['theme-button'],
    theme === 'light' ? s.current : null
  ])

  const darkClasses = getClasses([
    s['theme-button'],
    theme === 'dark' ? s.current : null
  ])

  const systemClasses = getClasses([
    s['theme-button'],
    theme === 'system' ? s.current : null
  ])

  return (
    <div className={s['theme-picker']}>
      <button
        onClick={() => setTheme('light')}
        className={lightClasses}
        aria-label='Toggle light theme'
      >
        <svg className={s['theme-icon']} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 12C8 13.0609 8.42143 14.0783 9.17157 14.8284C9.92172 15.5786 10.9391 16 12 16C13.0609 16 14.0783 15.5786 14.8284 14.8284C15.5786 14.0783 16 13.0609 16 12C16 10.9391 15.5786 9.92172 14.8284 9.17157C14.0783 8.42143 13.0609 8 12 8C10.9391 8 9.92172 8.42143 9.17157 9.17157C8.42143 9.92172 8 10.9391 8 12Z" stroke="#160F29" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M3 12H4M12 3V4M20 12H21M12 20V21M5.6 5.6L6.3 6.3M18.4 5.6L17.7 6.3M17.7 17.7L18.4 18.4M6.3 17.7L5.6 18.4" stroke="#160F29" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <span className={s['button-text']}>Light theme</span>
      </button>
      <button
        className={darkClasses}
        onClick={() => setTheme('dark')}
        aria-label='Toggle dark theme'
      >
        <svg className={s['theme-icon']} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.9998 2.99994C12.1318 2.99994 12.2628 2.99994 12.3928 2.99994C11.1081 4.19365 10.2824 5.79979 10.0591 7.53916C9.83577 9.27854 10.229 11.0412 11.1705 12.5207C12.112 14.0002 13.5422 15.103 15.2124 15.6374C16.8826 16.1718 18.6873 16.1041 20.3128 15.4459C19.6875 16.9504 18.6656 18.257 17.356 19.2262C16.0464 20.1954 14.4982 20.791 12.8767 20.9493C11.2552 21.1077 9.62104 20.8229 8.14867 20.1253C6.6763 19.4278 5.42089 18.3436 4.51637 16.9885C3.61185 15.6334 3.09213 14.0582 3.01267 12.4309C2.9332 10.8036 3.29696 9.18524 4.06515 7.74846C4.83334 6.31167 5.97714 5.11037 7.37454 4.27268C8.77195 3.43499 10.3705 2.99234 11.9998 2.99194V2.99994Z" stroke="#160F29" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <span className={s['button-text']}>Dark theme</span>
      </button>
      <button
        className={systemClasses}
        onClick={() => setTheme('system')}
        aria-label='Toggle dark theme'
      >
        <svg className={s['theme-icon']} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 5C3 4.73478 3.10536 4.48043 3.29289 4.29289C3.48043 4.10536 3.73478 4 4 4H20C20.2652 4 20.5196 4.10536 20.7071 4.29289C20.8946 4.48043 21 4.73478 21 5V15C21 15.2652 20.8946 15.5196 20.7071 15.7071C20.5196 15.8946 20.2652 16 20 16H4C3.73478 16 3.48043 15.8946 3.29289 15.7071C3.10536 15.5196 3 15.2652 3 15V5Z" stroke="#160F29" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M7 20H17" stroke="#160F29" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M9 16V20" stroke="#160F29" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M15 16V20" stroke="#160F29" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <span className={s['button-text']}>System theme</span>
      </button>
    </div>
  )
}

export { ThemePicker }