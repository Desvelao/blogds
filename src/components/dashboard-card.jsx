import React from 'react'


export const DashboardCard = ({ ribbon = '', children, className = ''}) => {
    return (
        <div className={`th-card p-2 ${className}`}>
            {children}
        </div>
    )
}

export const DashboardCardTitle = (props) => (<div {...props} className='th-title'>{props.children}</div>)