'use client'

import { CopyBlock, atomOneDark } from 'react-code-blocks';
import { Paragraph } from 'components/typography';
import { getClasses } from 'utils/getClasses';
import styles from './CodeBlock.module.css';

interface CodeProps {
	code: string;
	description?: string;
	language: string;
	showLineNumbers?: boolean;
	startingLineNumber?: number;
	wrapLines?: boolean;
}

export const CodeBlock = ({
	code,
	description,
	language,
	showLineNumbers = true,
	startingLineNumber = 1,
	wrapLines = false,
}: CodeProps) => {
	const classes = getClasses([styles.wrapper]);

	// Bit 'o custom styling for the wrapper
	const codeWrapperStyles = {
		fontFamily: 'Fira Code, monospace',
	};

	return (
		<section className={classes}>
			<CopyBlock
				text={code}
				language={language}
				showLineNumbers={showLineNumbers}
				startingLineNumber={startingLineNumber}
				theme={atomOneDark}
				customStyle={codeWrapperStyles}
				wrapLongLines={wrapLines}
				codeBlock
			/>
			{description && (
				<Paragraph type="secondary" collapse>
					{description}
				</Paragraph>
			)}
		</section>
	);
};
