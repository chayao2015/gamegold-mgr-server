let facade = require('gamecloud')
let {ReturnCode, NotifyType} = facade.const

//引入工具包
const toolkit = require('gamegoldtoolkit')
//创建授权式连接器实例
const remote = new toolkit.conn();
//兼容性设置，提供模拟浏览器环境中的 fetch 函数
remote.setFetch(require('node-fetch'))  

/**
 * 账户的控制器
 * Updated by thomasFuzhou on 2018-11-20.
 */
class account extends facade.Control
{
    /**
     * 中间件设置
     */
    get middleware() {
        return ['parseParams', 'commonHandle'];
    }

    /**
     * 列表账户
     * @param {*} user 
     * @param {*} paramGold 其中的成员 items 是传递给区块链全节点的参数数组
     */
    async List(user, paramGold) {
        console.log(paramGold.items);
        let ret = await remote.execute('account.list', paramGold.items);
        console.log(ret);
        return {code: ReturnCode.Success,data: ret};
    }

    /**
     * 查询账户
     * @param {*} user 
     * @param {*} paramGold 其中的成员 items 是传递给区块链全节点的参数数组
     */
    async Get(user, paramGold) {
        console.log(paramGold.items);
        let ret = await remote.execute('account.get', paramGold.items);
        console.log(ret);
        return {code: ReturnCode.Success,data: ret};
    }

    /**
     * 创建账户
     * @param {*} user 
     * @param {*} paramGold 其中的成员 items 是传递给区块链全节点的参数数组
     */
    async Create(user, paramGold) {
        console.log(paramGold.items);
        let ret = await remote.execute('account.create', paramGold.items);
        console.log(ret);
        return {code: ReturnCode.Success,data: ret};
    }

    /**
     * 账户余额（似乎是指定账户的余额）
     * @param {*} user 
     * @param {*} paramGold 其中的成员 items 是传递给区块链全节点的参数数组
     */
    async Amount(user, paramGold) {
        console.log(paramGold.items);
        let ret = await remote.execute('account.amount', paramGold.items);
        console.log(ret);
        return {code: ReturnCode.Success,data: ret};
    }
    
    /**
     * 查询收款总额
     * @param {*} user 
     * @param {*} paramGold 其中的成员 items 是传递给区块链全节点的参数数组
     */
    async Received(user, paramGold) {
        console.log(paramGold.items);
        let ret = await remote.execute('account.received', paramGold.items);
        console.log(ret);
        return {code: ReturnCode.Success,data: ret};
    }

    /**
     * 列表收款记录
     * @param {*} user 
     * @param {*} paramGold 其中的成员 items 是传递给区块链全节点的参数数组
     */
    async ListReceived(user, paramGold) {
        console.log(paramGold.items);
        let ret = await remote.execute('account.listreceived', paramGold.items);
        console.log(ret);
        return {code: ReturnCode.Success,data: ret};
    }

    /**
     * 已确认余额
     * @param {*} user 
     * @param {*} paramGold 其中的成员 items 是传递给区块链全节点的参数数组
     */
    async BalanceConfirmed(user, paramGold) {
        console.log(paramGold.items);
        let ret = await remote.execute('balance.confirmed', paramGold.items);
        console.log(ret);
        return {code: ReturnCode.Success,data: ret};
    }

    /**
     * 余额
     * @param {*} user 
     * @param {*} paramGold 其中的成员 items 是传递给区块链全节点的参数数组
     */
    async BalanceAll(user, paramGold) {
        console.log(paramGold.items);
        let ret = await remote.execute('balance.all', paramGold.items);
        console.log(ret);
        return {code: ReturnCode.Success,data: ret};
    }

    /**
     * 未确认余额
     * @param {*} user 
     * @param {*} paramGold 其中的成员 items 是传递给区块链全节点的参数数组
     */
    async BalanceUnconfirmed(user, paramGold) {
        console.log(paramGold.items);
        let ret = await remote.execute('balance.unconfirmed', paramGold.items);
        console.log(ret);
        return {code: ReturnCode.Success,data: ret};
    }

}

exports = module.exports = account;
