'use client';

import { useState } from 'react';
import { Input } from 'components/form/Input';
import { Button } from 'components/button/Button';
import { Headline, Paragraph, InlineLink } from 'components/typography';
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
					<Headline tag="h1" size="h2" color="primary">Protected Content</Headline>
					{title && (
						<Headline tag="h2" size="h3" color="secondary">
							{title}
						</Headline>
					)}
					<Paragraph type="secondary" color="secondary">
						This portfolio project is password protected. Please enter the
						access code to continue. Don&apos;t have an access code? <InlineLink type='internal' variant='primary' href='/contact'>Send me a note!</InlineLink>
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
						placeholder="Speak, friend, and enter"
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
