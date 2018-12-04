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
     * 删除记录
     * @param {*} user 
     * @param {*} objData 
     */
    DeleteRecord(user, objData) {
        facade.GetMapping(102).Delete(objData.id, true);
        return {code: ReturnCode.Success};
    }
    /**
     * 修改数据库记录
     * @param {*} user 
     * @param {*} objData 
     */
    UpdateRecord(user, objData) {
        let cp = facade.GetObject(102, objData.id);
        if(!!cp) {
            //需要针对各个属性增加为null的判断；如果为null的情况下，则
            cp.setAttr('cp_id',objData.cp_id);
            cp.setAttr('cp_name',objData.cp_name);
            cp.setAttr('cp_text',objData.cp_text);
            cp.setAttr('cp_url',objData.cp_url);
            cp.setAttr('wallet_addr',objData.wallet_addr);
            cp.setAttr('cp_type',objData.cp_type);
            cp.setAttr('develop_name',objData.develop_name);
            cp.setAttr('cp_desc',objData.cp_desc);
            cp.setAttr('cp_version',objData.cp_version);
            cp.setAttr('cp_version',objData.cp_version);
            cp.setAttr('cp_state',objData.cp_state);
            cp.setAttr('publish_time',objData.publish_time);
            cp.setAttr('audit_time',objData.audit_time);
            cp.setAttr('online_time',objData.online_time);
            cp.setAttr('offline_time',objData.offline_time);
            return {code: ReturnCode.Success};
        }
        return {code: -1};
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
            objData.cp_text,
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
                    cp_text:cp.getAttr('cp_text'),
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
     * 20181128:此方法暂不使用。
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

    /**
     * 从数据库中获取列表
     * 客户端直接调用此方法
     * @param {*} user 
     * @param {*} objData 查询及翻页参数，等整体调通以后再细化。
     */
    ListRecord(user, objData) {
        if (objData==null) {
            objData={};
        }
        let currentPage=objData.currentPage;
        console.log(Number.isNaN(parseInt(currentPage)));
        if (Number.isNaN(parseInt(currentPage))) {
            currentPage=1;
        }
        //构造查询条件
        //cp_text=3&cp_id=23&cp_type=1&cp_state=2
        let paramArray=new Array();
        if (typeof(objData.cp_text) != "undefined" && (objData.cp_text!="")) {
            console.log(`cp_text 参数: ${objData.cp_text}`);
            let tmp=['cp_text','==',objData.cp_text];
            paramArray.push(tmp);
        }
        if (typeof(objData.cp_id) != "undefined" && (objData.cp_id!="")) {
            console.log(`cp_id 参数: ${objData.cp_id}`);
            let tmp=['cp_id','==',objData.cp_id];
            paramArray.push(tmp);
        }
        if (typeof(objData.cp_type) != "undefined" && (objData.cp_type!="")) {
            console.log(`cp_type 参数: ${objData.cp_type}`);
            let tmp=['cp_type','==',objData.cp_type];
            paramArray.push(tmp);
        }
        if (typeof(objData.cp_state) != "undefined" && (objData.cp_state!="")) {
            console.log(`cp_state 参数: ${objData.cp_state}`);
            let tmp=['cp_state','==',objData.cp_state];
            paramArray.push(tmp);
        }
        console.log(paramArray);


        //得到 Mapping 对象
        let muster = facade.GetMapping(102) 
            .groupOf() // 将 Mapping 对象转化为 Collection 对象，如果 Mapping 对象支持分组，可以带分组参数调用
            .where(paramArray)
            .orderby('id', 'desc') //根据id字段倒叙排列
            .paginate(10, currentPage, ['id', 'cp_id','cp_text','cp_type','cp_state','publish_time']); //每页5条，显示第${objData.id}页，只选取'id'和'item'字段
        
        let $data = {items:{},list:[],pagination:{}};
        //扩展分页器对象
        $data.pagination={"total":muster.pageNum*10,"pageSize":10,"current":muster.pageCur};
        $data.total = muster.pageNum;
        $data.page = muster.pageCur;

        let $idx = (muster.pageCur-1) * muster.pageSize;
         $idx=$idx+5;
        for(let $value of muster.records()){
            $data.items[$idx] = {id: $value['id'], cp_id: $value['cp_id'],cp_text: $value['cp_text'],cp_type: $value['cp_type'],cp_state: $value['cp_state'],publish_time: $value['publish_time'], rank: $idx};
            $idx++ ;
        }

        //转化并设置数组属性
        $data.list= Object.keys($data.items).map(key=> $data.items[key]);

        // let ret=$data.list;
        return $data;
    }

    /**
     * 从数据库中获取所有列表
     * 客户端直接调用此方法
     * jinghh 用做创建道具获取所有游戏
     */
    async ListAllRecord() {

      
        let paramArray=new Array();
        paramArray.push(['cp_state','==',2]);//读取已上架
        let resList = facade.GetMapping(102) 
        .groupOf() 
        .where(paramArray)
        .orderby('id', 'desc') 
        .records(['id', 'cp_id','cp_text','cp_type','cp_state','publish_time']); 
        let $data = {};
        let $idx = 0;
        for(let $value of resList){
            $data[$idx] = {id: $value['id'], cp_id: $value['cp_id'],cp_text: $value['cp_text'],cp_type: $value['cp_type'],cp_state: $value['cp_state'],publish_time: $value['publish_time'], rank: $idx};;
            $idx++;

        }
        return {code: ReturnCode.Success, data: $data};
    }


    /**
     * 从外部获取URL
     */
    async getGameFromUrl(user, objData) {
        let fetch=require("node-fetch");
        let res = await fetch(objData.cp_url, {mode: 'no-cors'});
        let json= await res.json();//fetch正常返回后才执行
        return json;//这样就能返回res不用担心异步的问题啦啦啦
    }
}

exports = module.exports = cp;
