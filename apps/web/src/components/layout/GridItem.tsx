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
  const columnMap: Record<string, string> = {
    '1': s.gridColumn1,
    '2': s.gridColumn2,
    '3': s.gridColumn3,
  };

  const spanMap: Record<string, string> = {
    '1': s.gridSpan1,
    '2': s.gridSpan2,
    '3': s.gridSpan3,
  };

  const classes = classnames([
    s.gridItem,
    gridColumn ? columnMap[gridColumn] : null,
    gridSpan ? spanMap[gridSpan] : null,
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