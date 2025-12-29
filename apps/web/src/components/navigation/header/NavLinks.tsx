import { motion } from "framer-motion"
import styles from "./NavLinks.module.css"

const staggerItems = {
  hidden: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: {
      staggerChildren: 0.025,
    }
  }
}

const NavLinks = ({ children, overlay }) => {
  return (
    <motion.ul
      variants={staggerItems}
      initial="hidden"
      animate={overlay ? "enter" : "hidden"}
      // @ts-ignore
      className={styles.linkWrapper}
    >
      {children}
    </motion.ul>
  )
}

export { NavLinks }