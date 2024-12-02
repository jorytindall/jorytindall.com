import { ThemePicker } from "./ThemePicker";
import { Burger } from "./Burger";
import s from './NavTrigger.module.css';

const NavTrigger = ({ overlay, toggle }) => {
  return (
    <div className={s.wrapper}>
      <ThemePicker />
      <span className={s.divider}></span>
      <Burger overlay={overlay} toggle={toggle} />
    </div>
  )
}

export { NavTrigger }