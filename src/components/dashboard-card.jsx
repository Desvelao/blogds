import React from 'react'


export const DashboardCard = ({ ribbon = '', children, className = ''}) => {
    return (
        <div className={`ds-card ${className} ${ribbon ? `ds-card-ribbon ds-card-ribbon-${ribbon}` : ''}`}>
            {children}
        </div>
    )
}

export const DashboardCardTitle = (props) => (<div {...props} className='ds-card-title'>{props.children}</div>)