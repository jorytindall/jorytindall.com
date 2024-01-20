import { ThemePicker } from "./ThemePicker";
import { Burger } from "./Burger";
import s from 'styles/components/navigation/NavTrigger.module.scss';

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