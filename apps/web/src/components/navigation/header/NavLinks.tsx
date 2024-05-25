import { motion } from "framer-motion"
import styles from "styles/components/navigation/NavLinks.module.scss"

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
      className={styles.linkWrapper}
    >
      {children}
    </motion.ul>
  )
}

export { NavLinks }