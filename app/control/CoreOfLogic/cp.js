let facade = require('gamecloud')
let {ReturnCode, NotifyType} = facade.const

//引入工具包
const toolkit = require('gamegoldtoolkit')
//创建授权式连接器实例
const remote = new toolkit.conn();
remote.setFetch(require('node-fetch'))  //兼容性设置，提供模拟浏览器环境中的 fetch 函数

/**
 * 游戏的控制器
 * Updated by thomasFuzhou on 2018-11-19.
 */
class cp extends facade.Control
{
    /**
     * 中间件设置
     */
    get middleware() {
        return ['parseParams', 'commonHandle'];
    }

    /**
     * 增
     * @param {*} user 
     * @param {*} objData 
     */
    async Create(user, objData) {
        /**
        let test = await facade.GetMapping(101).Create(Math.random().toString());
        return {code: ReturnCode.Success, data: test.item};
         */
    }

    /**
     * 改
     * @param {*} user 
     * @param {*} objData 
     */
    Update(user, objData) {
        /**
        let test = facade.GetObject(101, objData.id);           //根据上行id查找test表中记录
        if(!!test) {
            test.setAttr('item', Math.random().toString());     //修改所得记录的item字段，下次查询时将得到新值，同时会自动存入数据库
            return {code: ReturnCode.Success, data: test.getAttr('item')};
        }
         */
        return {code: -1};

    }

    /**
     * 查
     * @param {*} user 
     * @param {*} objData 
     */
    Retrieve(user, objData) {
        //根据上行id查找test表中记录, 注意在 get 方式时 id 不会自动由字符串转换为整型
        let test = facade.GetObject(101, parseInt(objData.id));
        console.log("控制器添加日志：");
        console.log(test);
        console.log(objData.id);
        if(!!test) {
            return {code: ReturnCode.Success, data: test.getAttr('item')};
        }
        return {code: -1};
    }

    /**
     * 删
     * @param {*} user 
     * @param {*} objData 
     */
    Delete(user, objData) {
        /**
        facade.GetMapping(101).Delete(objData.id, true);
        return {code: ReturnCode.Success};
         */
    }

    /**
     * cp.list 列表
     * @param {*} user 
     * @param {*} objData 
     */
    async List(user, objData) {
        console.log("cp.js line 86");
        let ret = await remote.execute('cp.list', []);
        console.log(ret);
        return {code: ReturnCode.Success,list: ret};
    }


}

exports = module.exports = cp;
