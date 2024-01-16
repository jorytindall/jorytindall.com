import s from 'styles/components/navigation/NavTrigger.module.scss';

const BurgerV2 = () => {
  return (
    <button className={s.burger}>
      <span>Menu</span>
      <svg className={s['menu-icon']} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 8H20" stroke="#160F29" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M4 16H20" stroke="#160F29" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
  )
}

export { BurgerV2 }