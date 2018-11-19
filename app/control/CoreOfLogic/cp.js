let facade = require('gamecloud')
let {ReturnCode, NotifyType} = facade.const

//引入工具包
const toolkit = require('gamegoldtoolkit')
//创建授权式连接器实例
const remote = new toolkit.conn();
//兼容性设置，提供模拟浏览器环境中的 fetch 函数
remote.setFetch(require('node-fetch'))  

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
     * CP注册指令：cp.create "name" "url" ["ip"]
     * @param {*} user 
     * @param {*} paramGold 其中的成员 items 是传递给区块链全节点的参数数组
     */
    async Create(user, paramGold) {
        console.log(paramGold.items[0]);
        console.log(paramGold.items[1]);
        console.log(paramGold.items[2]);
        let ret = await remote.execute('cp.create', paramGold.items);//数组参数调用，无参数时传入空数组
        console.log(ret);
        return {code: ReturnCode.Success,result: ret};
    }

    /**
     * 查询系统中现有的所有CP列表：cp.list
     * @param {*} user 
     * @param {*} paramGold 其中的成员 items 是传递给区块链全节点的参数数组
     */
    async List(user, paramGold) {
        console.log(paramGold.items[0]);
        console.log(paramGold.items[1]);
        console.log(paramGold.items[2]);
        console.log(paramGold.items[3]);
        let ret = await remote.execute('cp.list', paramGold.items);//数组参数调用，无参数时传入空数组
        console.log(ret);
        return {code: ReturnCode.Success,list: ret};
    }


}

exports = module.exports = cp;
