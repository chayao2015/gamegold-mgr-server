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
class wallet extends facade.Control
{
    /**
     * 中间件设置
     */
    get middleware() {
        return ['parseParams', 'commonHandle'];
    }

    /**
     * 创建一个收款地址：address.create
     * @param {*} user 
     * @param {*} paramGold 其中的成员 items 是传递给区块链全节点的参数数组
     */
    async AddressCreate(user, paramGold) {
        console.log(paramGold.items);
        let ret = await remote.execute('address.create', paramGold.items);
        console.log(ret);
        return {code: ReturnCode.Success,list: ret};
    }


}

exports = module.exports = wallet;
