import styles from './Honeypot.module.css';

interface HoneypotProps {
	name?: string;
	register?: any;
}

export const Honeypot = ({
	name = 'website',
	register,
}: HoneypotProps) => {
	return (
		<div className={styles.honeypot} aria-hidden="true">
			<label htmlFor={name}>Website</label>
			<input
				type="text"
				name={name}
				id={name}
				placeholder="https://example.com"
				tabIndex={-1}
				autoComplete="off"
				{...(register ? register(name) : {})}
			/>
		</div>
	);
};
