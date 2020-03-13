/*
 * @author: 殷鹏飞
 * @Date: 2019-12-26 08:52:22
 * @information: 自定义指令扫描
 */
export default class ScanDirectives {
    constructor() {
        // 扫描组件文件夹，约定放组件的文件夹名称是directives
        this.directives = require.context('@/directives', true, /\.js$/)
    }
    /*
    * @author: 殷鹏飞
    * @Date: 2019-12-26 08:52:22
    * @information: 注册指令
    */
    init() {
        // 判断环境
        let vue = window && window.Vue
        if(!vue) return new Error('当前环境不存在vue')
        let {directives} = this
        // 注册自定义指令
        let directivesPath = directives.keys()
        directivesPath.map(directives).forEach((el,index) => {
            let context = el.default
            let directivesName = directivesPath[index].split('/').pop().split('.')[0]
            vue.directive(directivesName, context)
        })
    }
}