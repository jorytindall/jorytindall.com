import classnames from 'classnames'
import { Container } from './Container'
import s from './GridItem.module.css'

import type { ContainerProps } from './Container'

interface GridItemProps extends ContainerProps {
  gridColumn?: '1' | '2' | '2'
  gridSpan?: '1' | '2' | '3'
  children: React.ReactNode
  className?: string
}

const GridItem = ({
  gridColumn = '2',
  gridSpan,
  children,
  className,
}: GridItemProps) => {

  const classes = classnames([
    s[`grid-item`],
    gridColumn ? s[`grid-column-${gridColumn}`] : null,
    gridSpan ? s[`grid-span-${gridSpan}`] : null,
    className,
  ])

  return (
    <Container
      semanticElement="section"
      className={classes}
    >
      {children}
    </Container>
  )
}

export { GridItem }