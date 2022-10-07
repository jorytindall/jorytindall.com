import { Footer, Header } from 'components/navigation'
import styles from 'styles/components/layout/Layout.module.scss'

interface LayoutProps {
	children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
	return (
		<div className={styles.layout}>
			<Header />
			<main>{children}</main>
			<Footer />
		</div>
	)
};
