import { ThemePicker } from "./ThemePicker";
import { BurgerV2 } from "./BurgerV2";
import s from 'styles/components/navigation/NavTrigger.module.scss';

const NavTrigger = () => {
  return (
    <div className={s.wrapper}>
      <ThemePicker />
      <span className={s.divider}></span>
      <BurgerV2 />
    </div>
  )
}

export { NavTrigger }