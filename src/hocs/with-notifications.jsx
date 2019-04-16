import React from 'react'
import { Alert } from 'reactstrap'

export const NotificationsManager = class NotificationManager{
    constructor(setState){
        this.setState = setState
        this.bucket = []
    }
    add(text, style){
        console.log('ADD MANAGER',this.bucket, text, style)
        this.bucket.push({text, style})
        this.setState(this)
        console.log('ADD MANAGER',this.bucket, text, style)
    }
    map(fn){
        return this.bucket.map(fn)
    }
}

export const NotificationsContext = React.createContext(new NotificationsManager())

export const NotificationsProvider = class extends React.Component{
    constructor(props){
        super(props)
        this.defaultTime = this.props.time || 5
        this.state = {
            bucket: [],
            add: (text, style) => this.addNotification(text, style),
            map: (fn) =>  this.mapNotifications(fn)
        }
    }
    createNotification(text, style){
        return {text, style, id: new Date().getTime()}
    }
    addNotification(text, style, time){
        console.log('ADDING TO NOTIFICATION MANAGER', text, style)
        const newNotification = this.createNotification(text, style)
        this.setState({ bucket: [...this.state.bucket, newNotification] })
        setTimeout(() => this.setState({ bucket: [...this.state.bucket.filter(notification => notification.id !== newNotification.id)] }), (time || this.defaultTime)*1000)
    }
    mapNotifications(fn){
        return this.state.bucket.map(fn)
    }
    render(){
        return (
            <NotificationsContext.Provider value={this.state}>
                {this.props.children}
                <NotificationsComponent/>
            </NotificationsContext.Provider>
        )
    }
}

export const withNotifications = (Component) => class extends React.Component {
    render() {
        return (
            <NotificationsContext.Consumer>
                {context => <Component {...this.props} notiManager={context} />}
            </NotificationsContext.Consumer>
        )
    }
}

export const NotificationsComponent = withNotifications(class extends React.Component {
    constructor(props) {
        super(props)
        console.log('NOT MANAGER', this.props)
    }
    render() {
        console.log('Render Notifications', this.props.notiManager)
        return (
            <div className='position-fixed' style={{ top: '2em', right: '2em' }}>
                {this.props.notiManager.map((notification, index) => {
                    return (<Alert key={`notification-${index}`} color={notification.style}>
                        <div>{notification.text}</div>
                    </Alert>)
                })}
            </div>
        )
    }
})

export default withNotifications
