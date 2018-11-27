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
     * 增加数据库记录。
     * 此方法被从页面入口的Create方法所调用
     * @param {*} user 
     * @param {*} objData 
     */
    async CreateRecord(user, objData) {
        let cp = await facade.GetMapping(102).Create(
            objData.cp_id,
            objData.cp_name,
            objData.cp_url,
            objData.wallet_addr,
            objData.cp_type,
            objData.develop_name,
            objData.cp_desc,
            objData.cp_version,
            objData.picture_url,
            objData.cp_state,
            objData.publish_time,
            objData.audit_time,
            objData.online_time,
            objData.offline_time,
        );
        //console.log("执行创建成功了吗？");
        console.log({code: ReturnCode.Success});
        return {code: ReturnCode.Success};
    }
    /**
     * 页面入口
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
                data: {
                    cp_id:cp.getAttr('cp_id'),
                    cp_name:cp.getAttr('cp_name'),
                    cp_url: cp.getAttr('cp_url'),
                    wallet_addr: cp.getAttr('wallet_addr'),
                    cp_type: cp.getAttr('cp_type'),
                    develop_name: cp.getAttr('develop_name'),
                    cp_desc: cp.getAttr('cp_desc'),
                    cp_version: cp.getAttr('cp_version'),
                    picture_url: cp.getAttr('picture_url'),
                    cp_state: cp.getAttr('cp_state'),
                    publish_time: cp.getAttr('publish_time'),
                    audit_time: cp.getAttr('audit_time'),
                    online_time: cp.getAttr('online_time'),
                    offline_time: cp.getAttr('offline_time'),
                },

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
