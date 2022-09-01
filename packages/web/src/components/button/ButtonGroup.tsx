import styles from './ButtonGroup.module.scss'
import { getClasses } from 'utils/getClasses'

interface ButtonGroupProps {
    children: React.ReactNode,
}

export const ButtonGroup = ({ children }: ButtonGroupProps) => {

    const classes = getClasses([
        styles.buttonGroup,
    ])

    return (
        <div className={classes}>{children}</div>
    )
}