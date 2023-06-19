import { getClasses } from 'utils/getClasses'
import styles from 'styles/components/bento/BentoItem.module.scss'

interface BentoItemProps {
  children: React.ReactNode,
  background?: string,
  className?: string,
  size: string,
  padding: string,
  gap: string,
}

export const BentoItem = ({
  children,
  background,
  className,
  size,
  padding,
  gap,
}: BentoItemProps) => {

  const classes = getClasses([
    styles.wrapper,
    styles[background],
    styles[`size--${size}`],
    styles[`padding--${padding}`],
    styles[`gap--${gap}`],
    className,
  ])

  return (
    <article className={classes}>
      {children}
    </article>
  )
}