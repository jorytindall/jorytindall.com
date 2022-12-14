import { RichText } from 'components/rich-text';
import { Form, RenderFormControls } from 'components/form';
import { Paragraph } from 'components/typography';
import { RichTextWrapper, GridWrapper } from 'components/layout';
import { Features } from 'components/features';
import { Gallery, FullWidthImage } from 'components/gallery';
import { PortfolioList } from 'components/portfolio';
import { Results } from 'components/results';

interface ModuleRendererProps {
	modules?: any;
}

export const ModuleRenderer = ({ modules }: ModuleRendererProps) => {
	const getModule = modules.map((m) => {
		switch (m._type) {
			case 'richText':
				return (
					<RichTextWrapper key={m._key}>
						<RichText value={m.content} />
					</RichTextWrapper>
				);
			case 'form': {
				return (
					<Form key={m._key} name={m.name} method={m.method}>
						{/* <RenderFormControls input={m.fields} /> */}
						<Paragraph>
							<a href="mailto:hello@jorytindall.com">
								Get in touch with me!
							</a>
						</Paragraph>
					</Form>
				);
			}
			case 'fullWidthImage':
				return <FullWidthImage input={m} key={m._key} />;
			case 'gallery':
				return <Gallery input={m} key={m._key} />;
			case 'hero':
				return <p key={m._key}>Hero here</p>;
			case 'portfolioList':
				return <PortfolioList input={m} key={m._key} />;
			case 'results':
				return <Results input={m} key={m._key} />;
			case 'features':
				return <Features input={m} key={m._key} />;
			default:
				return console.error('Nothing came back for this module');
		}
	});

	return <GridWrapper>{getModule}</GridWrapper>;
};
