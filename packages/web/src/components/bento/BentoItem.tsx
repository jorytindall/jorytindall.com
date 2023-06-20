import { getClasses } from 'utils/getClasses'
import styles from 'styles/components/bento/BentoItem.module.scss'

interface BentoItemProps {
  children: React.ReactNode,
  background?: string,
  className?: string,
  size: string,
  padding: string,
  gap: string,
  isJustified?: boolean
}

export const BentoItem = ({
  children,
  background,
  className,
  size,
  padding,
  gap,
  isJustified
}: BentoItemProps) => {

  const classes = getClasses([
    styles.wrapper,
    styles[background],
    styles[`size--${size}`],
    styles[`padding--${padding}`],
    styles[`gap--${gap}`],
    isJustified ? styles.isJustified : null,
    className,
  ])

  return (
    <article className={classes}>
      {children}
    </article>
  )
}