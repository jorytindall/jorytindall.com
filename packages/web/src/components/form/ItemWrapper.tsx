import styles from 'styles/components/form/ItemWrapper.module.scss';

interface ItemWrapperProps {
	children: React.ReactNode;
}

export const ItemWrapper = ({ children }: ItemWrapperProps) => (
	<div className={styles.itemWrapper}>{children}</div>
);
