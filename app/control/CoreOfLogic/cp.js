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
        console.log("cp.Create参数串：");
        let paramArray=paramGold.items;
        if (typeof(paramArray)=="string") {
            paramArray=eval(paramArray);
        }
        console.log(paramArray);
        let ret = await remote.execute('cp.create', paramArray);
        console.log(ret);
        return {code: ReturnCode.Success,data: ret};
    }

    /**
     * CP修改/转让指令： cp.change "name" ["url" "ip" "addr"]
     * @param {*} user 
     * @param {*} paramGold 其中的成员 items 是传递给区块链全节点的参数数组
     */
    async Change(user, paramGold) {
        console.log("cp.Change参数串：");
        let paramArray=paramGold.items;
        if (typeof(paramArray)=="string") {
            paramArray=eval(paramArray);
        }
        console.log(paramArray);
        let ret = await remote.execute('cp.change', paramArray);
        console.log(ret);
        return {code: ReturnCode.Success,data: ret};
    }

    /**
     * 根据ID查询CP注册信息 cid CP编码
     * @param {*} user 
     * @param {*} paramGold 其中的成员 items 是传递给区块链全节点的参数数组
     */
    async ById(user, paramGold) {
        console.log("cp.ById参数串：");
        let paramArray=paramGold.items;
        if (typeof(paramArray)=="string") {
            paramArray=eval(paramArray);
        }
        console.log(paramArray);
        let ret = await remote.execute('cp.byId', paramArray);
        console.log(ret);
        return {code: ReturnCode.Success,data: ret};
    }

    /**
     * 根据名称查询CP注册信息 name CP名称
     * @param {*} user 
     * @param {*} paramGold 其中的成员 items 是传递给区块链全节点的参数数组
     */
    async ByName(user, paramGold) {
        console.log("cp.ByName参数串：");
        let paramArray=paramGold.items;
        if (typeof(paramArray)=="string") {
            paramArray=eval(paramArray);
        }
        console.log(paramArray);
        let ret = await remote.execute('cp.byName', paramArray);
        console.log(ret);
        return {code: ReturnCode.Success,data: ret};
    }

    /**
     * 查看单个记录
     * @param {*} user 
     * @param {*} objData 
     */
    Retrieve(user, objData) {
        console.log("控制器添加日志：");
        console.log(objData.id);
        //根据上行id查找test表中记录, 注意在 get 方式时 id 不会自动由字符串转换为整型
        let cp = facade.GetObject(102, parseInt(objData.id));
        console.log(cp);
        if(!!cp) {
            return {code: ReturnCode.Success, 
                data: {cp_id:cp.getAttr('cp_id'),cp_name:cp.getAttr('cp_name')}  
            };
        }
        return {code: -1};
    }

    /**
     * 查询系统中现有的所有CP列表：cp.list
     * @param {*} user 
     * @param {*} paramGold 其中的成员 items 是传递给区块链全节点的参数数组
     */
    async List(user, paramGold) {
        console.log("cp.list参数串：");
        let paramArray=paramGold.items;
        if (typeof(paramArray)=="string") {
            paramArray=eval(paramArray);
        }
        console.log(paramArray);
        let ret = await remote.execute('cp.list', paramArray);
        console.log(ret);
        return {code: ReturnCode.Success,data: ret};
    }

    
}

exports = module.exports = cp;
