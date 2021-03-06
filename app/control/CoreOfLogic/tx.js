let facade = require('gamecloud')
let {ReturnCode, NotifyType} = facade.const

//引入自定义的远程节点类
let RemoteNode=require('./RemoteNode');

//引入工具包
const toolkit = require('gamegoldtoolkit')
//创建授权式连接器实例
const remote = new toolkit.conn();
//兼容性设置，提供模拟浏览器环境中的 fetch 函数
remote.setFetch(require('node-fetch'))  

/**
 * 交易的控制器
 * Updated by thomasFuzhou on 2018-11-19.
 */
class tx extends facade.Control
{
    /**
     * 中间件设置
     */
    get middleware() {
        return ['parseParams', 'commonHandle'];
    }

    /**
     * 查询交易记录(钱包)
     * tx.get.wallet
     * @param {*} user 
     * @param {*} paramGold 其中的成员 items 是传递给区块链全节点的参数数组
     */
    async GetWallet(user, paramGold) {
        let remote=new RemoteNode().conn(paramGold.userinfo);
        console.log("tx.GetWallet参数串：");
        let paramArray=paramGold.items;
        if (typeof(paramArray)=="string") {
            paramArray=eval(paramArray);
        }
        console.log(paramArray);
        let ret = await remote.execute('tx.get.wallet', paramArray);
        console.log(ret);
        return {code: ReturnCode.Success,data: ret};
    }

    /**
     * 交易列表(钱包)
     * tx.list
     * @param {*} user 
     * @param {*} paramGold 其中的成员 items 是传递给区块链全节点的参数数组
     */
    async List(user, paramGold) {
        let remote=new RemoteNode().conn(paramGold.userinfo);
        console.log("tx.List参数串：");
        let paramArray=paramGold.items;
        if (typeof(paramArray)=="string") {
            paramArray=eval(paramArray);
        }
        console.log(paramArray);
        let ret = await remote.execute('tx.list', paramArray);
        console.log(ret);
        return {code: ReturnCode.Success,data: ret};
    }

    /**
     * 签署交易(钱包)
     * tx.sign
     * @param {*} user 
     * @param {*} paramGold 其中的成员 items 是传递给区块链全节点的参数数组
     */
    async Sign(user, paramGold) {
        let remote=new RemoteNode().conn(paramGold.userinfo);
        console.log("tx.sign参数串：");
        let paramArray=paramGold.items;
        if (typeof(paramArray)=="string") {
            paramArray=eval(paramArray);
        }
        console.log(paramArray);
        let ret = await remote.execute('tx.sign', paramArray);
        console.log(ret);
        return {code: ReturnCode.Success,data: ret};
    }

    /**
     * 创建交易(钱包)
     * tx.create
     * @param {*} user 
     * @param {*} paramGold 其中的成员 items 是传递给区块链全节点的参数数组
     */
    async Create(user, paramGold) {
        let remote=new RemoteNode().conn(paramGold.userinfo);
        console.log("tx.Create参数串：");
        let paramArray=paramGold.items;
        if (typeof(paramArray)=="string") {
            paramArray=eval(paramArray);
        }
        console.log(paramArray);
        let ret = await remote.execute('tx.create', paramArray);
        console.log(ret);
        return {code: ReturnCode.Success,data: ret};
    }

    /**
     * 根据输入的金额和地址，创建、签署、发送一笔P2PKH类转账交易：
     * 【钱包-转出功能使用】
     * tx.send addr value
     * 目标地址、尘
     * @param {*} user 
     * @param {*} paramGold 其中的成员 items 是传递给区块链全节点的参数数组
     */
    async Send(user, paramGold) {
        let remote=new RemoteNode().conn(paramGold.userinfo);
        console.log("tx.Send参数串：");
        let paramArray=paramGold.items;
        if (typeof(paramArray)=="string") {
            paramArray=eval(paramArray);
        }
        console.log(paramArray);
        let ret = await remote.execute('tx.send', paramArray);
        console.log(ret);
        return {code: ReturnCode.Success,data: ret};
    }

}

exports = module.exports = tx;
