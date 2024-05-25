import s from 'styles/components/form/Error.module.scss'

export const Error = ({ message }) => {
  return (
    <p className={s['form-error']}>{message}</p>
  )
}