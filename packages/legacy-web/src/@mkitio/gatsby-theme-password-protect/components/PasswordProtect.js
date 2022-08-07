import React, { useState } from 'react';
import { Link } from 'gatsby';
import { setSessionPassword } from '../utils/utils';
import styled from 'styled-components';
import { Layout } from '../../../components/layout';
import { H1, Paragraph } from '../../../components/typography';
import { Container } from '../../../components/layout';
import { Input } from '../../../components/form';

const PasswordProtect = () => {
	const [password, setPassword] = useState('');
	// const [isThemeHovered, themeHover] = useState(false);
	// const [isSiteHovered, siteHover] = useState(false);

	const onSubmit = (event) => {
		event.preventDefault();
		setSessionPassword(password);
		window.location.reload(); // eslint-disable-line
	};

	return (
		<Layout>
			<Wrapper>
				<div className="content">
					<H1 textAlign="center">Dead end</H1>
					<Paragraph textAlign="center">
						This page is password protected for confidentiality
						reasons. Please <Link to="/contact">contact</Link> for
						access and more information.
					</Paragraph>
					<StyledForm onSubmit={onSubmit}>
						<StyledInput
							name="password"
							type="password"
							value={password}
							onChange={(event) =>
								setPassword(event.target.value)
							}
						/>

						<StyledButton type="submit">Submit</StyledButton>
					</StyledForm>
				</div>
			</Wrapper>
		</Layout>
	);
};

export default PasswordProtect;

const Wrapper = styled.section`
	display: grid;
	grid-template-columns: 1fr minmax(250px, 65ch) 1fr;

	.content {
		grid-column: 2;
		padding: 2.5rem 1rem;
	}
`;

const StyledButton = styled.button`
	padding: 16px 24px;
	color: ${(props) => props.color || `var(--color-accent-01)`};
	background: ${(props) => props.background || `var(--color-primary-main)`};
	font-family: var(--font-headline);
	border: none;
	font-size: 1rem;
	font-weight: 400;
	line-height: 1rem;
	margin: 2rem 0;
	transition: all 0.15s ease;

	&:hover {
		background: var(--color-primary-shade);
		cursor: pointer;
		transform: translateY(-2px);
		box-shadow: 4px 4px 8px rgba(0, 47, 128, 0.05);
	}
`;

const StyledInput = styled.input`
	padding: 1rem 1.5rem;
	font-size: 1rem;
	background: var(--color-tertiary-main);
	border: none;
	color: var(--color-dark-main);
	font-family: var(--font-body);
	border-radius: 0;
	transition: all 0.15s ease;

	&:focus {
		outline: none;
		box-shadow: 4px 4px 8px rgba(0, 47, 128, 0.05);
		transform: translateY(-2px);
		background: var(--color-accent-01);

		&::placeholder {
			color: var(--color-accent-04);
		}
	}

	&::placeholder {
		color: var(--color-tertiary-dark-shade);
	}
`;

const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
`;
