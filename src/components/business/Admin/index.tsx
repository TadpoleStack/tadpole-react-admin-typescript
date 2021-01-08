import React, { Component } from 'react'
import { HashRouter as Router, Route, Redirect, Switch, withRouter } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from "react-transition-group";
import './index.scss'
import LazyLoading from '@/components/basics/LazyLoading'
import ErrorBoundary from '@/components/basics/ErrorBoundary'
import { adminRoutes } from '@/routes'
import { getToken } from '@/utils/public'
const Header = React.lazy(() => import('@/components/basics/Header'))
const Sidebar = React.lazy(() => import('@/components/basics/Sidebar'))
// const AuthRoute = React.lazy(() => import('@/components/basics/AuthRoute'))

const RouterView = (props: any) => {
   const routes = props.routes
   const currRootPath = props.rootPath?props.rootPath:''
   return (
      routes.map((route: any, index: number) =>{
         const nextRootPath = currRootPath+route.path
         return (
            route.children
            ?<RouterView key={index} routes={route.children} rootPath={nextRootPath} />
            :<Route 
               key={currRootPath+route.path}
               path={currRootPath+route.path}
               exact={route.exact}
               component={route.component}
            />
         )
      })
   )
}

class Admin extends Component {
   state: any = {
      windowWidth: window.innerWidth + 'px',
      headerHeight: '60px',
      sidebarWidth: '200px',
   }
   render() {
      const {location} = (this.props as any)
      return (
         <div style={{ width: '100%', height: '100%' }}>
            <Header
               // height={this.state.headerHeight}
               {...{height:this.state.headerHeight}}
            />
            <div
               style={{
                  width: '100%',
                  height: `calc(100% - ${this.state.headerHeight})`,
                  display: 'flex',
                  position: 'relative',
               }}
            >
               <Sidebar
                  width={this.state.sidebarWidth}
               />
               <div
                  style={{ height: '100%', flex: 1, overflowY: 'auto' }}
               >
                  <Router>
                     <ErrorBoundary>
                        <React.Suspense fallback={<LazyLoading />}>
                           <TransitionGroup style={{height:'100%'}}>
                              <CSSTransition style={{height:'100%'}} key={location.pathname} classNames="fade" timeout={300}>
                                 <Switch location={location}>
                                 {
                                    getToken()
                                       ? <RouterView routes={adminRoutes}></RouterView>
                                       : <Redirect to="/login" />
                                 }
                                 </Switch>
                              </CSSTransition>
                           </TransitionGroup>
                        </React.Suspense>
                     </ErrorBoundary>
                  </Router>
               </div>
            </div>
         </div>
      )
   }
}

export default withRouter((Admin as any))
