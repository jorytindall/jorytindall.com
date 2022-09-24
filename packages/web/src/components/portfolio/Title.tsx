import { Headline, Paragraph } from 'components/typography'
import { TextArrow } from 'components/button'
import { Badge } from 'components/badge'
import { Container } from 'components/layout'
import { linkResolver } from 'utils/linkResolver'
import styles from 'styles/components/portfolio/Title.module.scss'

interface TitleProps {
    title: string,
    client: string,
    projectTypes: string[],
    roles: string[],
    tools: string[],
    timeline: string,
    overview: string,
    link: string,
}

export const Title = ({
    title,
    client,
    projectTypes,
    roles,
    tools,
    timeline,
    overview,
    link,
}:TitleProps) => {

    const mapTypes = projectTypes.map(type => <Badge text={type} key={type} />)
    const mapTools = tools.map(tool => <Badge text={tool} key={tool} />)
    const mapRoles = roles.map(role => <Badge text={role} key={role} />)

    return (
        <section className={styles.wrapper}>
            <div className={styles.content}>
                <article className={styles.titleWrapper}>
                    <Headline type='h6'>{client}</Headline>
                    <Headline type='h1' collapse>{title}</Headline>
                </article>
                <aside className={styles.details}>
                    <div className={styles.detailItem}>
                        <Headline type='h6'>Type</Headline>
                        <Container>{mapTypes}</Container>
                    </div>
                    <div className={styles.detailItem}>
                        <Headline type='h6'>Role</Headline>
                        <Container>{mapRoles}</Container>
                    </div>
                    <div className={styles.detailItem}>
                        <Headline type='h6'>Tools</Headline>
                        <Container>{mapTools}</Container>
                    </div>
                    <div className={styles.detailItem}>
                        <Headline type='h6'>Timeline</Headline>
                        <Container><Badge text={timeline} /></Container>
                    </div>
                </aside>
                <article className={styles.overview}>
                    <Paragraph type='lead'>{overview}</Paragraph>
                </article>
                <TextArrow href={linkResolver('portfolio', link)}>See it live</TextArrow>
            </div>
        </section>
    )
}