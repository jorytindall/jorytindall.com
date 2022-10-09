import styles from 'styles/components/layout/RichTextWrapper.module.scss';

interface RichTextWrapperProps {
	children: React.ReactNode;
}

export const RichTextWrapper = ({ children }: RichTextWrapperProps) => (
	<div className={styles.wrapper}>{children}</div>
);
