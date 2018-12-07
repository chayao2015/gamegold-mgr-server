let facade = require('gamecloud')
let {ReturnCode, NotifyType} = facade.const

//引入自定义的远程节点类
let RemoteNode=require('./RemoteNode');

// //引入工具包
// const toolkit = require('gamegoldtoolkit')
// //创建授权式连接器实例
// const remote = new toolkit.conn();
// //兼容性设置，提供模拟浏览器环境中的 fetch 函数
// remote.setFetch(require('node-fetch'))  

/**
 * 收款地址的控制器
 * Updated by thomasFuzhou on 2018-11-20.
 */
class address extends facade.Control
{
    /**
     * 中间件设置
     */
    get middleware() {
        return ['parseParams', 'commonHandle'];
    }

    /**
     * 创建收款地址
     * @param {*} user 
     * @param {*} paramGold 其中的成员 items 是传递给区块链全节点的参数数组
     */
    async Create(user, paramGold) {
        let remote=new RemoteNode().conn(paramGold.userinfo);
        console.log("address.Create参数串：");
        let paramArray=paramGold.items;
        if (typeof(paramArray)=="string") {
            paramArray=eval(paramArray);
        }
        console.log(paramArray);
        let ret = await remote.execute('address.create', paramArray);
        console.log(ret);
        return {code: ReturnCode.Success,data: ret};
    }

    /**
     * 创建收款地址
     * @param {*} user 
     * @param {*} paramGold 其中的成员 items 是传递给区块链全节点的参数数组
     */
    async Create(user, paramGold) {
        let remote=new RemoteNode().conn(paramGold.userinfo);
        console.log("address.Create参数串：");
        let paramArray=paramGold.items;
        if (typeof(paramArray)=="string") {
            paramArray=eval(paramArray);
        }
        console.log(paramArray);
        let ret = await remote.execute('address.create', paramArray);
        console.log(ret);
        return {code: ReturnCode.Success,data: ret};
    }

    /**
     * 获取最后一个收款地址
     * @param {*} user 
     * @param {*} paramGold 其中的成员 items 是传递给区块链全节点的参数数组
     */
    async Receive(user, paramGold) {
        let remote=new RemoteNode().conn(paramGold.userinfo);
        console.log("address.Receive参数串：");
        let paramArray=paramGold.items;
        if (typeof(paramArray)=="string") {
            paramArray=eval(paramArray);
        }
        console.log(paramArray);
        let ret = await remote.execute('address.receive', paramArray);
        console.log(ret);
        return {code: ReturnCode.Success,data: ret};
    }

}

exports = module.exports = address;
