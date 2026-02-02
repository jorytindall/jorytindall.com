'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Label } from 'components/form/Label';
import { ItemWrapper } from 'components/form/ItemWrapper';
import { Button } from 'components/button/Button';
import styles from './PasswordGate.module.css';
import inputStyles from 'components/form/Input.module.css';

interface PasswordGateProps {
	title?: string;
}

export const PasswordGate = ({ title }: PasswordGateProps) => {
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');
		setIsLoading(true);

		try {
			const response = await fetch('/api/auth/portfolio', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ password }),
			});

			const data = await response.json();

			if (!response.ok) {
				setError(data.error || 'Invalid password');
				setIsLoading(false);
				return;
			}

			// Refresh the page to show the protected content
			router.refresh();
		} catch {
			setError('An error occurred. Please try again.');
			setIsLoading(false);
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<div className={styles.header}>
					<h1 className={styles.title}>Protected Content</h1>
					{title && <p className={styles.projectTitle}>{title}</p>}
					<p className={styles.description}>
						This portfolio project is password protected. Please enter the
						access code to continue.
					</p>
				</div>

				<form onSubmit={handleSubmit} className={styles.form}>
					<ItemWrapper>
						<Label htmlFor="password">Access Code</Label>
						<input
							type="password"
							id="password"
							name="password"
							className={inputStyles.input}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Enter access code"
							required
							autoFocus
						/>
					</ItemWrapper>

					{error && <p className={styles.error}>{error}</p>}

					<Button type="submit" variant="primary" disabled={isLoading}>
						{isLoading ? 'Verifying...' : 'Access Project'}
					</Button>
				</form>
			</div>
		</div>
	);
};
