/**
 * 添加全局方法
 */
import * as EventEmitter from './EventEmitter'
import * as loadable from './loadable'
import * as publicFn from './public'
import * as api from '@/api'

const global_method: any = { ...EventEmitter, ...loadable, ...publicFn, ...api }

const addGlobalMethods = (React: object): void => {
   for (const key in global_method) {
      if (!React.hasOwnProperty(`$${key}`) && global_method.hasOwnProperty(key)) {
         (React as any)[`$${key}`] = global_method[key]
      }
   }
   (window as any).React = React
}
export default addGlobalMethods