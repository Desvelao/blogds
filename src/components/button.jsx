import React from 'react'

export const Button = ({ className = '', children = '', disabled = false, onClick = () => { } }) => (<button className={`th-button ${className} ${disabled ? 'disabled' : ''}`} onClick={onClick}>{children}</button>)
export const ButtonDanger = (props) => <Button {...props} className={`th-button-danger ${props.className}`}/>
export const ButtonWarning = (props) => <Button {...props} className={`th-button-warning ${props.className}`}/>
export const ButtonSuccess = (props) => <Button {...props} className={`th-button-success ${props.className}`}/>
export const ButtonPrimary = (props) => <Button {...props} className={`th-button-primary ${props.className}`}/>

export const ButtonEdit = ({ className = '', disabled = false, onClick = () => { } }) => (<ButtonWarning className={className} disabled={disabled} onClick={onClick}><i className='far fa-edit' /></ButtonWarning>)
export const ButtonRemove = ({ className = '', disabled = false, onClick = () => { } }) => (<ButtonDanger className={className} disabled={disabled} onClick={onClick}><i className='far fa-trash-alt'/></ButtonDanger>)

// export {
//     Button,
//     ButtonEdit
// }

export default Button

