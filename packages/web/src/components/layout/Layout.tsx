import styles from 'styles/components/layout/Layout.module.scss'

interface LayoutProps {
	children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
	return <main className={styles.layout}>{children}</main>;
};
