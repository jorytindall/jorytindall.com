import { ThemePicker } from "./ThemePicker";
import { Burger } from "./Burger";
import { NowPlaying } from "components/now-playing";
import s from './NavTrigger.module.css';

const NavTrigger = ({ overlay, toggle }) => {
  return (
    <div className={s.wrapper}>
      <NowPlaying />
      <ThemePicker />
      <span className={s.divider}></span>
      <Burger overlay={overlay} toggle={toggle} />
    </div>
  )
}

export { NavTrigger }