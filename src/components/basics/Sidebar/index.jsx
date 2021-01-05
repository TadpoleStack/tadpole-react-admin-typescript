import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { SidebarWrap } from './style'
import { Menu } from 'antd'
import IconFont from '@/components/basics/IconFont'
import { ResponsiveContext } from '@/context'
import { adminRoutes } from '@/routes'
const {SubMenu, Item} = Menu

class Sidebar extends Component {
   static contextType = ResponsiveContext;

   constructor(props) {
      super(props)
      this.state = {
         width: this.props.width || '200px',
         theme: 'dark',
         current: '/admin',
         sidebarState: false,
         openKeys: [],
         sidebarList: [//侧边栏导航
            {
               key: '/admin',
               icon: 'Tadpoleshouye',
               text: '首页'
            },
            {
               key: 'ui',
               icon: 'Tadpolegongju',
               text: 'UI',
               children: [
                  {
                     key: '/admin/iconpage',
                     icon: 'Tadpoleview',
                     text: '小图标',
                  }
               ]
            },
            {
               key: 'charts',
               icon: 'Tadpoletubiao1-copy',
               text: 'charts',
               children: [
                  {
                     key: '/admin/echartsmap',
                     icon: 'Tadpoletubiao',
                     text: 'EchartsMap'
                  },
                  // {
                  //    key: '/admin/highcharts',
                  //    icon: 'Tadpoletubiaozhexiantu',
                  //    text: 'HighCharts'
                  // },
                  // {
                  //    key: '/admin/recharts',
                  //    icon: 'Tadpoletubiao1',
                  //    text: 'ReCharts'
                  // }
               ]
            },
            {
               key: 'rich',
               icon: 'Tadpoleedit-profile',
               text: '富文本',
               children: [
                  {
                     key: '/admin/braft',
                     icon: 'Tadpolexiepinglun',
                     text: 'BraftEditor'
                  },
                  {
                     key: '/admin/reactquill',
                     icon: 'Tadpolexiepinglun',
                     text: 'ReactQuill'
                  },
                  {
                     key: '/admin/vditormarkdown',
                     icon: 'Tadpoleedit1',
                     text: 'Vditor'
                  },
                  {
                     key: '/admin/jsonedit',
                     icon: 'Tadpoleedit',
                     text: 'JSON编辑器'
                  }
               ]
            },
            {
               key:'table',
               icon: 'Tadpoletable1',
               text: 'Table',
               children: [
                  {
                     key: '/admin/simpletable',
                     icon: 'Tadpoletable1',
                     text: 'SimpleTable'
                  },
                  {
                     key: '/admin/sortablehoctable',
                     icon: 'Tadpoletable1',
                     text: 'SortableHocTable'
                  },
                  {
                     key: '/admin/editabletable',
                     icon: 'Tadpoletable1',
                     text: 'EditableTable'
                  }
               ]
            },
            {
               key: '/admin/form',
               icon: 'Tadpole17',
               text: 'Form'
            },
            {
               key: '/admin/dataexport',
               icon: 'Tadpole17',
               text: '数据导出'
            },
            {
               key: '/admin/typedplugin',
               icon: 'TadpoleLC_icon_edit_line_1',
               text: 'TypedPlugin'
            },
            {
               key: '/404',
               icon: 'Tadpoleapptubiao-',
               text: '404'
            },
            {
               key: '/login',
               icon: 'Tadpoleai207',
               text: '返回登录'
            },
         ]
      }
   }
   /**
    * 点击跳转路由
    * @param {*} e 
    */
   handleClick = e => {
      if (e.keyPath.length < 2) this.setState({ openKeys: [] })
      this.props.history.push(e.key)
      this.setState({ current: e.key })
      if (this.context === 'MOBILE') this.setState({ sidebarState: false })

   }
   /**
    * 侧边栏折叠
    * @param {*} openKeys 
    */
   // handleOpenChange = openKeys => {
   //    if (openKeys[openKeys.length - 1]) {
   //       this.setState({ openKeys: [openKeys[openKeys.length - 1]] })
   //    } else {
   //       this.setState({ openKeys: [] })
   //    }
   // }
   /**
    * 初始化设置sidebar的高亮状态及展开项
    */
   // initSidebarState() {
   //    if (this.props.location.pathname) {
   //       this.setState({ current: this.props.location.pathname })
   //       let item = this.state.sidebarList.find(v => v.children && v.children.find(v2 => v2.key === this.props.location.pathname))
   //       item && this.setState({ openKeys: [item.key] })
   //    }
   // }
   /**
    * 监听事件分发处理sidebar状态
    */
   EventEmitterListener() {
      React.$eventEmitter.on('changeSidebarState', () => {
         this.setState(state => {
            return { sidebarState: !state.sidebarState }
         })
      })
   }
   componentDidMount() {
      this.EventEmitterListener()
      const RecursionMenu = this.renderMenu({routes:adminRoutes[0].children, rootPath:adminRoutes[0].path});
      this.setState({
         RecursionMenu
      })
      // this.initSidebarState()
   }
   renderMenu = (props) => {
      const routes = props.routes
      const currRootPath = props.rootPath?props.rootPath:''
      return(
         routes.map(route => {
            const nextRootPath = currRootPath+route.path
            return route.children
            ? <SubMenu
                     key={currRootPath+route.path}
                     icon={route.meta.icon ? <IconFont type={route.meta.icon} /> : null}
                     title={route.meta.title}>
                     { this.renderMenu({routes:route.children,rootPath:nextRootPath}) }
               </SubMenu>
            : <Item key={currRootPath+route.path} icon={route.meta.icon ? <IconFont type={route.meta.icon} /> : null}> {route.meta.title}</Item>
         })
      )
    }

   componentWillUnmount() {
      React.$eventEmitter.removeAllListeners('changeSidebarState')
   }
   render() {

      return (
         <SidebarWrap
            width={(this.context==='PC'&&this.state.sidebarState)?'80px':this.state.width}
            device={this.context}
            sidebarState={this.state.sidebarState}
         >
            <Menu
               theme={this.state.theme}
               onClick={this.handleClick}
               onOpenChange={this.handleOpenChange}
               style={{ minHeight: '100%' }}
               // openKeys={this.state.openKeys}
               selectedKeys={[this.state.current]}
               mode="inline"
               inlineCollapsed={this.context==='PC'?this.state.sidebarState?true:false:false}
            >
               {this.state.RecursionMenu}
            </Menu>
         </SidebarWrap>
      )
   }
}
export default withRouter(Sidebar)
