import SyntaxHighlighter from 'react-syntax-highlighter'
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styles from './CodeBlock.module.scss'
import { Paragraph } from 'components/typography'
import { getClasses } from 'utils/getClasses'

interface CodeProps {
    code: string,
    description?: string,
    language: string,
}

export const Code = ({ code, description, language }: CodeProps) => {

    const classes = getClasses([
        styles.wrapper
    ])

    return (
        <section className={classes}>
            <SyntaxHighlighter
                language={language}
                style={dark}
            >
                {code}
            </SyntaxHighlighter>
            {description && (
                <Paragraph type='secondary' collapse>{description}</Paragraph>
            )}
        </section>
    )
}