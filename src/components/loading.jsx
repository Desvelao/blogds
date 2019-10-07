import React from 'react'
import loading from '../config/assets/loading.gif'
export default (props) => (<div {...props}>
    <img src={loading} class='th-loading' alt='loading'/>
</div>)