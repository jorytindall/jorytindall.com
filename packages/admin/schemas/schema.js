import createSchema from 'part:@sanity/base/schema-creator';
import schemaTypes from 'all:part:@sanity/base/schema-type';

// Document Schemas
import page from './documents/page';
import musicProject from './documents/musicProject';
import portfolioProject from './documents/portfolioProject';
import person from './documents/person';
import post from './documents/post';
import landingPage from './documents/landingPage';
import banner from './documents/banner';
import homePage from './documents/homePage';
import siteSettings from './documents/siteSettings';
import category from './documents/category';
import event from './documents/event';

// Object Schemas
import moduleContent from './objects/moduleContent';
import richText from './objects/richText';
import mainImage from './objects/mainImage';
import hero from './objects/hero';
import button from './objects/button';
import gallery from './objects/gallery';
import features from './objects/features';
import featureItems from './objects/features/featureItem';
import form from './objects/form/index';
import input from './objects/form/input';
import submit from './objects/form/submit';
import textarea from './objects/form/textarea';
import fullWidthImage from './objects/fullWidthImage';
import calloutBlock from './objects/calloutBlock';
import colors from './objects/colors';
import socialLink from './objects/socialLink';
import brandLogoBlock from './objects/brandLogoBlock';
import brandLogo from './objects/brandLogo';
import impactBlock from './objects/impactBlock';
import impactItem from './objects/impactItem';
import portfolioList from './objects/portfolioList';
import portfolioListItem from './objects/portfolioListItem';
import results from './objects/results';
import resultItem from './objects/resultItem';
import codeBlock from './objects/codeBlock';
import figmaEmbed from './objects/figmaEmbed';
import fileDownload from './objects/fileDownload';

export default createSchema({
	name: `web`,
	types: schemaTypes.concat([
		// Documents
		banner,
		page,
		musicProject,
		portfolioProject,
		post,
		person,
		landingPage,
		homePage,
		siteSettings,
		category,
		event,
		// Objects
		moduleContent,
		richText,
		mainImage,
		hero,
		button,
		gallery,
		features,
		featureItems,
		form,
		input,
		submit,
		textarea,
		fullWidthImage,
		calloutBlock,
		colors,
		socialLink,
		brandLogoBlock,
		brandLogo,
		impactBlock,
		impactItem,
		portfolioList,
		portfolioListItem,
		results,
		resultItem,
		codeBlock,
		figmaEmbed,
		fileDownload,
	]),
});
