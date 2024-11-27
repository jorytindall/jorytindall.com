import styles from './Main.module.css';

export const Main = ({ children }: { children: React.ReactNode }) => {
  return <main className={styles.main}>{children}</main>;
}