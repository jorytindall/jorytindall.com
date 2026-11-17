import { Fragment } from 'react';
import { Document, Link, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import type { JsonResume } from '../types';
import { FONT } from './fonts';
import { displayUrl, formatRange } from './format';

/**
 * One-page, single-column résumé rendered from JSON Resume.
 *
 * Built for applicant tracking systems as much as for people: real selectable text in
 * reading order, one column, no tables, no icons standing in for words, links spelled out.
 * Keep it that way — a two-column layout extracts as interleaved nonsense.
 */

const COLOR = {
	text: '#1a1a1a',
	muted: '#555555',
	rule: '#cccccc',
};

const styles = StyleSheet.create({
	page: {
		paddingTop: 32,
		paddingBottom: 28,
		paddingHorizontal: 40,
		fontFamily: FONT.body,
		fontSize: 9,
		lineHeight: 1.25,
		color: COLOR.text,
	},
	name: { fontFamily: FONT.heading, fontWeight: 'bold', fontSize: 20, lineHeight: 1.1 },
	label: { fontSize: 10.5, marginTop: 1, color: COLOR.muted },
	contact: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 4, color: COLOR.muted },
	contactItem: { color: COLOR.muted, textDecoration: 'none' },
	separator: { color: COLOR.rule, marginHorizontal: 6 },
	summary: { marginTop: 6 },
	section: { marginTop: 8 },
	sectionTitle: {
		fontFamily: FONT.heading,
		fontWeight: 'bold',
		fontSize: 10,
		textTransform: 'uppercase',
		paddingBottom: 2,
		marginBottom: 4,
		borderBottomWidth: 0.75,
		borderBottomColor: COLOR.rule,
	},
	role: { marginBottom: 5 },
	roleHeader: { flexDirection: 'row', justifyContent: 'space-between' },
	roleTitle: { fontWeight: 'bold', flexShrink: 1, paddingRight: 8 },
	roleDates: { color: COLOR.muted, flexShrink: 0 },
	roleMeta: { color: COLOR.muted },
	bullet: { flexDirection: 'row', marginTop: 1.5 },
	bulletMark: { width: 9 },
	bulletText: { flex: 1 },
	skillLine: { marginBottom: 1.5 },
	skillName: { fontWeight: 'bold' },
});

type Props = {
	resume: JsonResume;
	/** Shown in the header in place of a projects section. */
	portfolioUrl?: string;
};

type ContactItem = { text: string; href?: string };

function Contact({ resume, portfolioUrl }: Props) {
	const { basics } = resume;
	const location = [basics.location?.city, basics.location?.region].filter(Boolean).join(', ');
	const items: ContactItem[] = [
		location ? { text: location } : null,
		basics.email ? { text: basics.email, href: `mailto:${basics.email}` } : null,
		portfolioUrl ? { text: displayUrl(portfolioUrl), href: portfolioUrl } : null,
		...(basics.profiles ?? [])
			.filter((p) => p.url)
			.map((p) => ({ text: displayUrl(p.url as string), href: p.url })),
	].filter((item): item is ContactItem => item !== null);

	return (
		<View style={styles.contact}>
			{items.map((item, i) => (
				<Fragment key={item.text}>
					{i > 0 && <Text style={styles.separator}>|</Text>}
					{item.href ? (
						<Link src={item.href} style={styles.contactItem}>
							{item.text}
						</Link>
					) : (
						<Text>{item.text}</Text>
					)}
				</Fragment>
			))}
		</View>
	);
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
	return (
		<View style={styles.section}>
			<Text style={styles.sectionTitle}>{title}</Text>
			{children}
		</View>
	);
}

export function ResumeDocument({ resume, portfolioUrl }: Props) {
	const { basics, work, education, skills } = resume;
	const portfolio =
		portfolioUrl ?? (basics.url ? `${basics.url.replace(/\/$/, '')}/portfolio` : undefined);

	return (
		<Document
			title={`${basics.name} — Résumé`}
			author={basics.name}
			subject={basics.label}
			keywords={skills.flatMap((s) => s.keywords ?? []).join(', ')}
			creator="jorytindall.com"
			producer="jorytindall.com"
			language="en-US"
		>
			<Page size="LETTER" style={styles.page}>
				<Text style={styles.name}>{basics.name}</Text>
				{basics.label && <Text style={styles.label}>{basics.label}</Text>}
				<Contact resume={resume} portfolioUrl={portfolio} />
				{basics.summary && <Text style={styles.summary}>{basics.summary}</Text>}

				{work.length > 0 && (
					<Section title="Experience">
						{work.map((job) => (
							<View
								key={`${job.name}-${job.startDate}`}
								style={styles.role}
								wrap={false}
							>
								<View style={styles.roleHeader}>
									<Text style={styles.roleTitle}>
										{job.position}
										{job.name && `, ${job.name}`}
									</Text>
									<Text style={styles.roleDates}>
										{formatRange(job.startDate, job.endDate)}
									</Text>
								</View>
								{(job.location || job.summary) && (
									<Text style={styles.roleMeta}>
										{[job.location, job.summary].filter(Boolean).join(' · ')}
									</Text>
								)}
								{(job.highlights ?? []).map((highlight) => (
									<View key={highlight} style={styles.bullet}>
										<Text style={styles.bulletMark}>•</Text>
										<Text style={styles.bulletText}>{highlight}</Text>
									</View>
								))}
							</View>
						))}
					</Section>
				)}

				{skills.length > 0 && (
					<Section title="Skills">
						{skills.map((group) => (
							<Text key={group.name} style={styles.skillLine}>
								<Text style={styles.skillName}>{group.name}: </Text>
								{(group.keywords ?? []).join(', ')}
							</Text>
						))}
					</Section>
				)}

				{education.length > 0 && (
					<Section title="Education">
						{education.map((edu) => (
							<View key={edu.institution} style={styles.roleHeader}>
								<Text style={styles.roleTitle}>
									{edu.institution}
									<Text style={{ fontWeight: 'normal' }}>
										{[
											[edu.studyType, edu.area].filter(Boolean).join(', '),
											edu.score,
										]
											.filter(Boolean)
											.map((part) => ` — ${part}`)
											.join('')}
									</Text>
								</Text>
								<Text style={styles.roleDates}>
									{formatRange(edu.startDate, edu.endDate)}
								</Text>
							</View>
						))}
					</Section>
				)}
			</Page>
		</Document>
	);
}
