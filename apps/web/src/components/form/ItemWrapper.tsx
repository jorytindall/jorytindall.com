import styles from './ItemWrapper.module.css';

interface ItemWrapperProps {
	children: React.ReactNode;
}

export const ItemWrapper = ({ children }: ItemWrapperProps) => (
	<div className={styles.itemWrapper}>{children}</div>
);
