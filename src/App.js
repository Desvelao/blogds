import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { HashRouter as Router, BrowserRouter, Switch, Route } from 'react-router-dom'
import { Container, Row, Col, Input, InputGroup, InputGroupAddon, Form, FormGroup, FormText, Button } from 'reactstrap'
import routes from './config/routes'
import store from './redux'
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import './theme/styles.css'
import { db } from './backend'
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
import { NotificationsContext, NotificationsProvider } from './hocs/with-notifications'

class App extends Component {
  constructor(){
    super()
    console.log('Store',store)
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
              {/* <div> */}
                <Navigation />
                {this.state.loading ? <Loading className='text-center'/> : (
                  <Switch>
                    <Route path={routes.dashboard} component={Dashboard} />
                    <Route path={routes.post + '/:post_id'} component={Post} />
                    <Container className='content'>
                      <div className='mt-3'>
                        <Switch>
                          {/* <Route exact path={routes.HOME} component={Home} /> */}
                          {/* <Route exact path={routes.post} component={Post} /> */}
                          <Route path={routes.post + '/:post_id/edit'} component={NewPost} />
                          <Route exact path={routes.newpost} component={NewPost} />
                          <Route exact path={routes.login} component={Login} />
                          <Route exact path={routes.resetpassword} component={ResetPassword} />
                          <Route exact path={routes.login} component={SignUp} />
                          <Route exact path={routes.home} component={Posts} />
                          <Route component={() => (<div>Not found</div>)} />
                        </Switch>
                      </div>
                    </Container>
                  </Switch>
                )}
                
              {/* </div> */}
              </div>
          </BrowserRouter>
        </Provider>
      </NotificationsProvider>
    );
  }
}

export default App;
