import S from '@sanity/desk-tool/structure-builder';
import {
	BiBookmark,
	BiHome,
	BiFile,
	BiCog,
	BiPaint,
	BiPencil,
	BiMusic,
	BiFlag,
	BiUserCircle,
	BiPurchaseTag,
	BiCalendar,
} from 'react-icons/bi';

export default () =>
	S.list()
		.title(`Content`)
		.items([
			S.listItem()
				.title(`Site Settings`)
				.icon(BiCog)
				.child(S.editor().schemaType(`siteSettings`)),
			S.listItem()
				.title(`Home Page`)
				.icon(BiHome)
				.child(S.editor().schemaType(`homePage`)),
			S.listItem()
				.title(`Banner`)
				.icon(BiBookmark)
				.child(S.editor().schemaType(`banner`)),
			S.listItem()
				.title(`Categories`)
				.icon(BiPurchaseTag)
				.child(S.documentTypeList(`category`).title(`Categories`)),
			S.listItem()
				.title(`People`)
				.icon(BiUserCircle)
				.child(S.documentTypeList(`person`).title(`People`)),
			S.divider(),
			S.listItem()
				.title(`Pages`)
				.icon(BiFile)
				.child(S.documentTypeList(`page`).title(`Pages`)),
			S.listItem()
				.title(`Portfolio`)
				.icon(BiPaint)
				.child(
					S.documentTypeList(`portfolioProject`).title(`Portfolio`)
				),
			S.listItem()
				.title(`Posts`)
				.icon(BiPencil)
				.child(S.documentTypeList(`post`).title(`Posts`)),
			S.listItem()
				.title(`Music`)
				.icon(BiMusic)
				.child(S.documentTypeList(`musicProject`).title(`Music`)),
			S.listItem()
				.title(`Landing Pages`)
				.icon(BiFlag)
				.child(
					S.documentTypeList(`landingPage`).title(`Landing Pages`)
				),
			S.listItem()
				.title('Events')
				.icon(BiCalendar)
				.child(S.documentTypeList('event').title('Events')),
		]);
