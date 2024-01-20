import s from 'styles/components/navigation/NavTrigger.module.scss';

const BurgerV2 = ({ overlay, toggle }) => {
  return (
    <button
      className={s.burger}
      aria-label='Toggle navigation menu'
      onClick={() => toggle(!overlay)}
    >
      <span>Menu</span>
      {!overlay && (
        <svg className={s['menu-icon']} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M3.25 8C3.25 7.58579 3.58579 7.25 4 7.25H20C20.4142 7.25 20.75 7.58579 20.75 8C20.75 8.41421 20.4142 8.75 20 8.75H4C3.58579 8.75 3.25 8.41421 3.25 8Z" />
          <path fillRule="evenodd" clipRule="evenodd" d="M3.25 16C3.25 15.5858 3.58579 15.25 4 15.25H20C20.4142 15.25 20.75 15.5858 20.75 16C20.75 16.4142 20.4142 16.75 20 16.75H4C3.58579 16.75 3.25 16.4142 3.25 16Z" />
        </svg>
      )}
      {overlay && (
        <span
          role="img"
          aria-label="open menu"
          className={s.burgerEmoji}
        >
          🍔
        </span>
      )}
    </button>
  )
}

export { BurgerV2 }