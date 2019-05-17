import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import routes from './config/routes'
import store from './redux'
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import './config/theme/styles.scss'
import * as actions from './redux/actions'

// Navigation
import Navigation from './components/navigation'
// Pages
import Post from './pages/post.jsx'
import Posts from './pages/posts.jsx'
import NewPost from './pages/new-post'
import Login from './pages/login'
import SignUp from './pages/signup'
import ResetPassword from './pages/reset-password'
import Dashboard from './pages/dashboard'
import Loading from './components/loading'
import { NotificationsProvider } from './hocs/with-notifications'
import locale from './config/locale'
class App extends Component {
  constructor(){
    super()
    this.state = { loading: true }
  }
  async componentDidMount(){
    await actions.loadAllAuthors()(store.dispatch)
    // await actions.loadLastPosts()(store.dispatch)
    await actions.paginationPosts()(store.dispatch)
    await actions.loadImages()(store.dispatch)
    this.setState({loading : false})
  }
  render() {
    return (
      <NotificationsProvider>
        <Provider store={store}>
          <BrowserRouter basename={process.env.PUBLIC_URL}>
              <div className='mb-3'>
                <Navigation />
                {this.state.loading ? <Loading className='text-center'/> : (
                  <Switch>
                    <Route path={routes.dashboard} component={Dashboard} />
                    <Route path={routes.post + '/:post_id'} component={Post} />
                    <div className='container content mt-3'>
                      {/* <div className='mt-3'> */}
                        <Switch>
                          <Route exact path={routes.newpost} component={NewPost} />
                          <Route exact path={routes.login} component={Login} />
                          <Route exact path={routes.resetpassword} component={ResetPassword} />
                          <Route exact path={routes.signup} component={SignUp} />
                          <Route exact path={routes.home} component={Posts} />
                          <Route default component={() => (<div>{locale.RouteNotFound}</div>)} />
                        </Switch>
                      {/* </div> */}
                    </div>
                  </Switch>
                )}
              </div>
          </BrowserRouter>
        </Provider>
      </NotificationsProvider>
    );
  }
}

export default App;
