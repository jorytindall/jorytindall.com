import { RichText } from 'app/components/rich-text';
import { RichTextWrapper, GridWrapper, CenteredWrapper, Container } from 'app/components/layout';
import { Features } from 'app/components/features';
import { Gallery, FullWidthImage } from 'app/components/gallery';
import { PortfolioList } from 'app/components/portfolio';
import { Results } from 'app/components/results';
import { Button } from 'app/components/button';

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
			case 'fileDownload':
				return (
					<CenteredWrapper semanticElement='section' key={m._key}>
						<Container semanticElement='div'>
							<Button
								isFullWidth
								isDownload
								href={m.file.asset.url}
							>
								{m.text}
							</Button>
						</Container>
					</CenteredWrapper>
				)
			default:
				return console.error('Nothing came back for this module');
		}
	});

	return <GridWrapper>{getModule}</GridWrapper>;
};
