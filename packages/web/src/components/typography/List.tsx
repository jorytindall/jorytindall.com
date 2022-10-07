import styles from 'styles/components/typography/List.module.scss';

interface ItemProps {
	children: React.ReactNode;
}

interface ListProps {
	type: 'ol' | 'ul';
	children: React.ReactNode;
}

export const Item = ({ children }: ItemProps) => (
	<li className={styles.item}>{children}</li>
);

export const List = ({ type, children }: ListProps) => {
	switch (type) {
		case 'ol':
			return <ol className={styles.ordered}>{children}</ol>;
		case 'ul':
			return <ul className={styles.unordered}>{children}</ul>;
	}
};
