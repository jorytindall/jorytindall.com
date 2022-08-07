import React from 'react';

// Modules
import { RichText } from '../richText';
import { Form } from '../form';
import { PortfolioListItem } from '../portfolio';
import { Gallery } from '../gallery';
import { FullWidthImage } from '../gallery/FullWidthImage';
import { Results } from '../results';
import { Features } from '../features';
import { Container } from '../layout';

export function ModuleRenderer({ modules }) {
	const module = modules.map((m) => {
		switch (m._type) {
			case 'richText':
				return (
					<Container>
						<RichText key={m._key} value={m} />
					</Container>
				);
			case 'form':
				return <Form key={m._key} input={m} />;
			case 'fullWidthImage':
				return <FullWidthImage key={m._key} input={m} />;
			case 'gallery':
				return <Gallery key={m._key} input={m} />;
			case 'hero':
				return <p key={m._key}>This is a hero.</p>;
			case 'portfolioList':
				return <PortfolioListItem key={m._key} input={m} />;
			case 'results':
				return <Results key={m._key} input={m} />;
			case 'features':
				return <Features key={m._key} input={m} />;
			default:
				return <p key={m._key}>Nothing came back :(</p>;
		}
	});

	return <>{module}</>;
}
