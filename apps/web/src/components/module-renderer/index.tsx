import { RichText } from 'components/rich-text';
import { RichTextWrapper, GridWrapper, GridItem, Container } from 'components/layout';
import { Features } from 'components/features';
import { Gallery, FullWidthImage } from 'components/gallery';
import { PortfolioList } from 'components/portfolio';
import { Results } from 'components/results';
import { PersonalStats } from 'components/personal-stats';
import { StravaStats } from 'components/personal-stats/strava';
import { Tabs, TabsList, TabsTrigger, TabsContent } from 'components/tabs';

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
			case 'portfolioList':
				return <PortfolioList input={m} key={m._key} />;
			case 'results':
				return <Results input={m} key={m._key} />;
			case 'features':
				return <Features input={m} key={m._key} />;
			case 'stravaStats':
				return <StravaStats input={m} key={m._key} />;
			case 'personalStats':
				return <PersonalStats input={m} key={m._key} />;
			case 'tabs':
				return (
					<GridItem
						key={m._key}
						density="collapse"
						gridColumn="1"
						gridSpan="3"
						className="max-width--x-large"
					>
						<Tabs defaultValue={m.tabs[0]._key}>
							<TabsList>
								{m.tabs.map((tab) => (
									<TabsTrigger key={tab._key} value={tab._key}>
										{tab.label}
									</TabsTrigger>
								))}
							</TabsList>
							{m.tabs.map((tab) => {
								return (
									<TabsContent key={tab._key} value={tab._key}>
										<Container semanticElement="div">
											<RichText value={tab.content[0].content} />
										</Container>
									</TabsContent>
								);
							})}
						</Tabs>
					</GridItem>
				);
			default:
				/*
				 * A _type with no case here renders as nothing at all — no error,
				 * no warning, just a missing section. That is how `mainImage`,
				 * `form`, `brandLogoBlock` and `impactBlock` sat unrendered in the
				 * Studio for months. Fail loudly in development so the next one is
				 * caught immediately; in production, drop the single module rather
				 * than take the whole page down with it.
				 */
				if (process.env.NODE_ENV !== 'production') {
					throw new Error(
						`ModuleRenderer: no case for module _type "${m._type}". Add one here, or remove the type from moduleContent in apps/admin.`,
					);
				}
				return null;
		}
	});

	return <GridWrapper>{getModule}</GridWrapper>;
};
