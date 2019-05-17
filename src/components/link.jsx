import React from 'react'
import { Link } from 'react-router-dom'

const RouterLink = props => <Link {...props} className={`th-link ${props.className || ''}`}>{props.children}</Link>
const A = props => <a {...props} className={`th-link ${props.className || ''}`}>{props.children}</a>

export default (props) => (
    props.href ? <A {...props}/> : <RouterLink {...props}/>
)