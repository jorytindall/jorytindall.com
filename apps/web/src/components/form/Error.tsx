import s from './Error.module.css'

export const Error = ({ message }) => {
  return (
    <p className={s['form-error']}>{message}</p>
  )
}