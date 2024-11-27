import { Headline, Paragraph } from "components/typography"
import s from './Callout.module.css'

interface CalloutProps extends React.HTMLAttributes<HTMLDivElement> {
  headline?: string,
  subtitle?: string,
  children: React.ReactNode,
}

const Callout = ({
  headline,
  subtitle,
  children,
}: CalloutProps) => {
  return (
    <section className={s.wrapper}>
      {headline && <Headline tag="h4" collapse>{headline}</Headline>}
      {subtitle && <Paragraph collapse>{subtitle}</Paragraph>}
      {children}
    </section>
  )
}

export { Callout }