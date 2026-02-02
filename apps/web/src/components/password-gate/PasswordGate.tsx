'use client';

import { useState } from 'react';
import { Input } from 'components/form/Input';
import { Button } from 'components/button/Button';
import { Headline } from 'components/typography/Headline';
import { Paragraph } from 'components/typography/Body';
import styles from './PasswordGate.module.css';

interface PasswordGateProps {
	title?: string;
}

export const PasswordGate = ({ title }: PasswordGateProps) => {
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

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

			// Hard reload to ensure server reads the new cookie
			window.location.reload();
		} catch {
			setError('An error occurred. Please try again.');
			setIsLoading(false);
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<div className={styles.header}>
					<Headline tag="h1" size="h2">Protected Content</Headline>
					{title && (
						<Paragraph type="primary" color="primary">
							{title}
						</Paragraph>
					)}
					<Paragraph type="secondary" color="secondary">
						This portfolio project is password protected. Please enter the
						access code to continue.
					</Paragraph>
				</div>

				<form onSubmit={handleSubmit} className={styles.form}>
					<Input
						type="password"
						id="password"
						name="password"
						label="Access Code"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Enter access code"
						required
						autoFocus
					/>

					{error && (
						<Paragraph type="secondary" className={styles.error}>
							{error}
						</Paragraph>
					)}

					<Button
						type="submit"
						variant="primary"
						isFullWidth
						disabled={isLoading}
					>
						{isLoading ? 'Verifying...' : 'Access Project'}
					</Button>
				</form>
			</div>
		</div>
	);
};
