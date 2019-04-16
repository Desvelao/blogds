import React, { Component } from 'react'

export default (props) => (<div {...props}>
    <img width='32' src={process.env.PUBLIC_URL+'/assets/loading.gif'} alt='loading'/>
</div>)