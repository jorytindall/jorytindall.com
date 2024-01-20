import { ThemePicker } from "./ThemePicker";
import { BurgerV2 } from "./BurgerV2";
import s from 'styles/components/navigation/NavTrigger.module.scss';

const NavTrigger = ({ overlay, toggle }) => {
  return (
    <div className={s.wrapper}>
      <ThemePicker />
      <span className={s.divider}></span>
      <BurgerV2 overlay={overlay} toggle={toggle} />
    </div>
  )
}

export { NavTrigger }