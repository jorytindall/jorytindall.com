'use client';

import { useEffect } from 'react';
import { Container } from 'components/layout';
import { Headline, Paragraph } from 'components/typography';
import { Button, ButtonGroup, TextArrow } from 'components/button';

// `global-error.tsx` replaces the root layout entirely when the layout itself throws,
// so this file owns its own <html>/<body> and has to import the stylesheet that
// `layout.tsx` would normally pull in. There is no ThemeProvider here either — the
// tokens fall back to their light-theme defaults, which is the intent.
import 'styles/main.css';

interface GlobalErrorProps {
	error: Error & { digest?: string };
	reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<html lang="en">
			<body>
				<Container
					isFlex={true}
					flexDirection="column"
					justify="center"
					align="center"
					textAlign="center"
					gap="default"
					semanticElement="section"
				>
					<Headline color="primary" tag="h1" size="h1" collapse>
						500 🤒
					</Headline>
					<Paragraph collapse>
						The site failed to load. That one is on me — try again in a moment.
					</Paragraph>
					<ButtonGroup>
						<Button onClick={() => reset()}>Try again</Button>
						<TextArrow href="/">Go back home</TextArrow>
					</ButtonGroup>
				</Container>
			</body>
		</html>
	);
}
