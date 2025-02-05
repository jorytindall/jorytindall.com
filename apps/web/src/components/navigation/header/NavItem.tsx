import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import styles from './NavItem.module.css';

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
};

const NavItem = ({ slug, text }) => {
  const pathname = usePathname();
  const isActive = slug === '/' 
    ? pathname === '/'
    : pathname?.startsWith(slug);

  return (
    <motion.li 
      variants={item}
      // @ts-ignore
      className={styles['nav-item--li']}
    >
      <Link 
        href={slug} 
        className={`${styles['nav-item']} ${isActive ? styles.active : ''}`}
        aria-current={isActive ? 'page' : undefined}
      >
        {text}
      </Link>
    </motion.li>
  );
}

export { NavItem }