import Link from 'next/link'
import { getClasses } from 'utils/getClasses'
import { Headline } from 'app/components/typography'
import s from 'styles/components/list/ListItem.module.scss'

interface ListItemProps {
  title: string,
  children?: React.ReactNode,
  link?: string,
}

export const ListItem = ({
  title,
  children,
  link,
}: ListItemProps) => {

  const classes = getClasses(
    [s.wrapper, s.link]
  )
  if (link) {
    return (
      <Link href={link} className={classes}>
        <Headline
          tag="h4"
          size="h4"
          color="primary"
          collapse
        >{title}</Headline>
        {children}
      </Link>
    )
  } else {
    return (
      <article className={s.wrapper}>
        <Headline
          tag="h4"
          size="h4"
          color="primary"
          collapse
        >{title}</Headline>
        {children}
      </article>
    )
  }
}