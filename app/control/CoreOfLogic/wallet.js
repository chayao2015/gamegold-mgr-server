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
     * 创建钱包
     * @param {*} user 
     * @param {*} paramGold 其中的成员 items 是传递给区块链全节点的参数数组
     */
    async Create(user, paramGold) {
        console.log("wallet.Create参数串：");
        let paramArray=paramGold.items;
        if (typeof(paramArray)=="string") {
            paramArray=eval(paramArray);
        }
        console.log(paramArray);
        let ret = await remote.execute('wallet.create', paramArray);
        console.log(ret);
        return {code: ReturnCode.Success,list: ret};
    }

    /**
     * 列表钱包
     * @param {*} user 
     * @param {*} paramGold 其中的成员 items 是传递给区块链全节点的参数数组
     */
    async List(user, paramGold) {
        console.log("wallet.List参数串：");
        let paramArray=paramGold.items;
        if (typeof(paramArray)=="string") {
            paramArray=eval(paramArray);
        }
        console.log(paramArray);
        let ret = await remote.execute('wallet.list', paramArray);
        console.log(ret);
        return {code: ReturnCode.Success,list: ret};
    }

    /**
     * 查询钱包概要
     * @param {*} user 
     * @param {*} paramGold 其中的成员 items 是传递给区块链全节点的参数数组
     */
    async Info(user, paramGold) {
        console.log("wallet.Info参数串：");
        let paramArray=paramGold.items;
        if (typeof(paramArray)=="string") {
            paramArray=eval(paramArray);
        }
        console.log(paramArray);
        let ret = await remote.execute('wallet.info', paramArray);
        console.log(ret);
        return {code: ReturnCode.Success,list: ret};
    }

    /**
     * 转储钱包信息
     * @param {*} user 
     * @param {*} paramGold 其中的成员 items 是传递给区块链全节点的参数数组
     */
    async Dump(user, paramGold) {
        console.log("wallet.Dump参数串：");
        let paramArray=paramGold.items;
        if (typeof(paramArray)=="string") {
            paramArray=eval(paramArray);
        }
        console.log(paramArray);
        let ret = await remote.execute('wallet.dump', paramArray);
        console.log(ret);
        return {code: ReturnCode.Success,list: ret};
    }

    /**
     * 导入钱包备份
     * @param {*} user 
     * @param {*} paramGold 其中的成员 items 是传递给区块链全节点的参数数组
     */
    async ImportWallet(user, paramGold) {
        console.log("wallet.ImportWallet参数串：");
        let paramArray=paramGold.items;
        if (typeof(paramArray)=="string") {
            paramArray=eval(paramArray);
        }
        console.log(paramArray);
        let ret = await remote.execute('wallet.import', paramArray);
        console.log(ret);
        return {code: ReturnCode.Success,list: ret};
    }

    /**
     * 备份钱包
     * @param {*} user 
     * @param {*} paramGold 其中的成员 items 是传递给区块链全节点的参数数组
     */
    async Backup(user, paramGold) {
        console.log("wallet.Backup参数串：");
        let paramArray=paramGold.items;
        if (typeof(paramArray)=="string") {
            paramArray=eval(paramArray);
        }
        console.log(paramArray);
        let ret = await remote.execute('wallet.backup', paramArray);
        console.log(ret);
        return {code: ReturnCode.Success,list: ret};
    }

    /**
     * 获取钱包助记词
     * @param {*} user 
     * @param {*} paramGold 其中的成员 items 是传递给区块链全节点的参数数组
     */
    async KeyMaster(user, paramGold) {
        console.log("key.master参数串：");
        let paramArray=paramGold.items;
        if (typeof(paramArray)=="string") {
            paramArray=eval(paramArray);
        }
        console.log(paramArray);
        let ret = await remote.execute('key.master', paramArray);
        console.log(ret);
        return {code: ReturnCode.Success,list: ret};
    }
}

exports = module.exports = wallet;
