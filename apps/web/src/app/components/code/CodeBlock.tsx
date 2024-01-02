import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { Paragraph } from 'app/components/typography';
import { getClasses } from 'utils/getClasses';
import styles from 'styles/components/CodeBlock.module.scss';

interface CodeProps {
	code: string;
	description?: string;
	language: string;
}

export const CodeBlock = ({ code, description, language }: CodeProps) => {
	const classes = getClasses([styles.wrapper]);

	const codeWrapperStyles = {
		padding: '1.5rem',
		borderRadius: '10px',
		boxShadow: '0px 0px 24px 0px rgba(0,0,0,0.05)',
	};

	return (
		<section className={classes}>
			<SyntaxHighlighter
				language={language}
				style={atomOneDark}
				customStyle={codeWrapperStyles}
			>
				{code}
			</SyntaxHighlighter>
			{description && (
				<Paragraph type="secondary" collapse>
					{description}
				</Paragraph>
			)}
		</section>
	);
};
