import styles from './PostWrapper.module.scss'

interface PostWrapperProps {
    title: string,
    excerpt: string,
    link: string,
}

export const PostWrapper = ({ title, excerpt, link }: PostWrapperProps) => {
    return (
        <article className={styles.wrapper}>
            {/* Next link goes here */}
            <h4>{title}</h4>
            <p>{excerpt}</p>
            {/* Text arrow goes here */}
        </article>
    )
}