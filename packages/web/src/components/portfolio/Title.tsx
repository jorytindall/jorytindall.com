import { Headline, Paragraph } from 'components/typography'
import { TextArrow } from 'components/button'
import { Badge } from 'components/badge'
import { Container } from 'components/layout'
import styles from 'styles/components/portfolio/Title.module.scss'

interface TitleProps {
    title: string,
    client: string,
    types: string[],
    roles: string[],
    tools: string[],
    timeline: string,
    overview: string,
    externalLink: string,
}

export const Title = ({
    title,
    client,
    types,
    roles,
    tools,
    timeline,
    overview,
    externalLink,
}:TitleProps) => {

    // Map through the detail arrays of the project 
    const mapTypes = types.map(type => <Badge text={type} type='secondary' key={type} />)
    const mapTools = tools.map(tool => <Badge text={tool} type='secondary' key={tool} />)
    const mapRoles = roles.map(role => <Badge text={role} type='secondary' key={role} />)

    // Define objects for the project details
    const projectDetails = [
        {
            title: 'Type',
            content: mapTypes,
        },
        {
            title: 'Role',
            content: mapRoles,
        },
        {
            title: 'Tools',
            content: mapTools,
        },
        {
            title: 'Timeline',
            content: timeline,
        }
    ]

    // Map through the project details to render them with consistency
    const mapProjectDetails = projectDetails.map(project => {
        return (
            <div className={styles.detailItem} key={project.title}>
                <Headline type='h6' collapse>{project.title}</Headline>
                <Container
                    density='collapse'
                    flexDirection='row'
                    semanticElement='div'
                    gap='default'
                    isFlex
                >{project.content}</Container>
            </div>
        )
    })

    return (
        <section className={styles.wrapper}>
            <div className={styles.content}>
                <article className={styles.titleWrapper}>
                    <Headline type='h6'>{client}</Headline>
                    <Headline type='h1' collapse>{title}</Headline>
                </article>
                <aside className={styles.details}>
                    {mapProjectDetails}
                </aside>
                <article className={styles.overview}>
                    <Paragraph type='lead'>{overview}</Paragraph>
                </article>
                {externalLink &&
                    <TextArrow href={externalLink}>See it live</TextArrow>
                }
            </div>
        </section>
    )
}