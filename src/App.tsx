import React from 'react';
import {
   HashRouter as Router,
   Redirect,
   Switch,
   Route
} from 'react-router-dom'
import 'normalize.css'
import './App.scss';
import 'animate.css'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN';
import LazyLoading from '@/components/basics/LazyLoading'
import ErrorBoundary from '@/components/basics/ErrorBoundary'
import { mainRoutes } from '@/routes'
import { ResponsiveContext } from '@/context'
import { evil, getToken } from '@/utils/public'
const Admin = React.lazy(() => import('@/components/business/Admin'))
// const AuthRoute = React.lazy(() => import('@/components/basics/AuthRoute'))

class App extends React.Component {
      state = {
         ResponsiveValue: 'PC',
      }
   /**
    * 计算窗口宽度-对应响应的响应设备
    */
   resizeComputed() {
      const responsiveDevice = { 'PC': 'curr>=992', 'MOBILE': 'curr<992' }
      const width = (document.body && document.body.clientWidth) || (document.documentElement && document.documentElement.clientWidth) || (window && window.innerWidth)
      for (let item in responsiveDevice) {
         let element = (responsiveDevice as any)[item];
         element = element.replace('curr', width)
         element && evil(element) && this.setState({ ResponsiveValue: item })
      }
   }
   componentDidMount() {
      this.resizeComputed()
      window.addEventListener('resize', this.resizeComputed.bind(this))
   }
   render() {
      return (
         <ConfigProvider locale={zhCN}>
            <ResponsiveContext.Provider value={this.state.ResponsiveValue}>
               <Router>
                  <ErrorBoundary>
                     <React.Suspense fallback={<LazyLoading style={{ zIndex: 10000, position: 'fixed' }} />}>
                        <Switch>
                           <Route path="/admin" render={routeProps => getToken()
                              ?<Admin {...routeProps}></Admin>
                              :<Redirect to="/login" />
                           }></Route>
                           {
                              mainRoutes.map((route: any, index: number) => {
                                 return <Route {...route} key={index}></Route>
                              })
                           }
                        </Switch>
                     </React.Suspense>
                  </ErrorBoundary>
               </Router>
            </ResponsiveContext.Provider>
         </ConfigProvider>
      )
   }
}

export default App;