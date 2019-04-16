import React from 'react'

export const Button = ({ className = '', children = '', disabled = false, onClick = () => { } }) => (<button className={`btn ${className} ${disabled ? 'disabled' : ''}`} onClick={onClick}>{children}</button>)
export const ButtonDanger = (props) => <Button {...props} className={`btn-danger ${props.className}`}/>
export const ButtonWarning = (props) => <Button {...props} className={`btn-warning ${props.className}`}/>
export const ButtonSuccess = (props) => <Button {...props} className={`btn-success ${props.className}`}/>
export const ButtonPrimary = (props) => <Button {...props} className={`btn-primary ${props.className}`}/>

export const ButtonEdit = ({ className = '', disabled = false, onClick = () => { } }) => (<Button className={`p-1 ${className}`} disabled={disabled} onClick={onClick}><i className='far fa-edit text-warning'/></Button>)
export const ButtonRemove = ({ className = '', disabled = false, onClick = () => { } }) => (<Button className={`p-1 ${className}`} disabled={disabled} onClick={onClick}><i className='far fa-trash-alt text-danger'/></Button>)

// export {
//     Button,
//     ButtonEdit
// }

export default Button

