import React from 'react'
import { Input, InputGroup, InputGroupAddon, Label } from 'reactstrap'
// export default (props) => (<input {...props}/>)

export default (props) => {
    return (<div>
    {props.labeltitle ? (<Label for={props.labelid}>{props.labeltitle}</Label>) : null}
    <Input innerRef={props.innerRef} type={props.type || 'text'} id={props.labelid} placeholder={props.placeholder || ''} onChange={props.onChange || function(){}} value={props.value || ''} disabled={props.disabled} accept={props.accept}/>
</div>)}