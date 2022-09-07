import HelloWorld from '../components/HelloWorld.vue'
// import layout from '../components/layout.vue'
import layout from '../components/layoutupdate.vue'
import index from '../components/index.vue'

export default [
        
    { // 配置默认路由
        path:"/", // 路由地址
        redirect:"/index" // 重定向
    },
    { path: '/helloWorld', component: HelloWorld },
    { path: '/layout/:id', component: layout },
    { path: '/index', component: index },
    
]