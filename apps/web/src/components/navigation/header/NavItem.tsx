import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from 'styles/components/navigation/NavItem.module.scss';

const item = {
  hidden: {
    opacity: 0,
    y: 20,
    x: 5,
  },
  enter: {
    opacity: 1,
    y: 0,
    x: 0,
  }
}

const NavItem = ({ slug, text }) => {
  return (
    <motion.li variants={item}>
      <Link href={slug} className={styles.navItem}>
        {text}
      </Link>
    </motion.li>
  );
}

export { NavItem }