import React from 'react'

export const AuthorAvatar = ({ avatar, name, className='', hovername = false}) =>
    (<img className={`rounded-circle ${className}`} title={hovername ? name : ''} height="24" src={avatar} alt={`${name}'s avatar`}/>)

export const AuthorAvatarName = ({ avatar, name, url='#', className = '', link=false}) => (
    <span>
        {link ? (<a href={url} target="__blank"><AuthorAvatarNameSpan avatar={avatar} name={name} /></a>) : (<AuthorAvatarNameSpan avatar={avatar} name={name}/>)}
    </span>
)

export const AuthorAvatarNameSpan = ({ avatar, name, hovername, className=''}) => (
    <span className={className}>
        <AuthorAvatar className='mr-2' avatar={avatar} name={name} hovername={hovername}/>
        {/* <img className={`rounded-circle mr-2 ${className}`} src={avatar} alt={`${name}'s avatar`} /> */ }
        <span className='' > {name}</span>
    </span>
)

    