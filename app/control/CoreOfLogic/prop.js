/*
 * @Author: jinghh 
 * @Date: 2018-11-22 11:38:53 
 * @Last Modified by: jinghh
 * @Last Modified time: 2018-12-04 14:09:56
 */


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
 * 道具管理类
 * @class prop
 * @extends {facade.Control}
 */
class prop extends facade.Control
{
    /**
     * 中间件设置
     */
    get middleware() {
        return ['parseParams', 'commonHandle'];
    }

    /**
     *
     * 道具列表
     * @param {*} user
     * @param {*} paramGold
     * @returns
     * @memberof prop
     */
    async List(user, paramGold) {
        let remote=new RemoteNode().conn(paramGold.userinfo);
        let paramArray=paramGold.items;
        if (typeof(paramArray)=="string") {
            paramArray=eval(paramArray);
        }
        let ret = await remote.execute('prop.list', paramArray);
        console.log(ret);
        return {code: ReturnCode.Success,data: ret};
    }
    
    
    /**
     * 获取本地道具列表
     * @param {*} objData 
     * @returns
     * @memberof prop
     */
    LocalList(user, objData) {
        if (objData==null) {
            objData={};
        }
        let pageSize = objData.pageSize || 10;
        let currentPage = objData.currentPage || 1;
        let paramArray=new Array();
        if (typeof(objData.id) != "undefined" && (objData.id!="")) {
            paramArray.push(['id','==',parseInt(objData.id)]);
        }
        if (typeof(objData.props_name) != "undefined" && (objData.props_name!="")) {
            paramArray.push(['props_name','==',objData.props_name]);
        }
        if (typeof(objData.cid) != "undefined" && (objData.cid!="")) {
            paramArray.push(['cid','==',objData.cid]);
        }
        let cpIdText = this.cpIdText();
        cpIdText = cpIdText.data || {};

        //得到 Mapping 对象
        let muster = facade.GetMapping(103) 
            .groupOf() // 将 Mapping 对象转化为 Collection 对象，如果 Mapping 对象支持分组，可以带分组参数调用
            .where(paramArray)
            .orderby('id', 'desc') //根据id字段倒叙排列
            .paginate(pageSize, currentPage, ['id', 'props_name','props_type', 'cid','props_desc','pid','oid','icon_url', 'icon_preview', 'gold', 'cp', 'stock', 'pro_num', 'status']); 
        
        let $data = {items:{},list:[],pagination:{}};
        //扩展分页器对象
        $data.pagination={"total":muster.data.size,"pageSize":parseInt(pageSize),"current":parseInt(muster.pageCur)};
        $data.total = muster.data.size;
        $data.page = muster.pageCur;

        let $idx = (muster.pageCur-1) * muster.pageSize;
        for(let $value of muster.records()){
            $data.items[$idx] = {id: $value['id'], props_name: $value['props_name'],props_type: $value['props_type'],cid: $value['cid'],props_desc: $value['props_desc'],
            pid: $value['pid'], oid: $value['oid'],icon_url: $value['icon_url'],icon_preview: $value['icon_preview'],gold: $value['gold'],
            cp: $value['cp'],stock: $value['stock'],pro_num: $value['pro_num'],status: $value['status'],cp_name: cpIdText[$value['cid']] || '',rank: $idx};
            $idx++ ;
        }
        $data.list= Object.keys($data.items).map(key=> $data.items[key]);
        return $data;

    }

    /**
     *
     *从数据库中获取游戏对应的所有道具列表
     * @param {*} user
     * @param {*} objData
     * @returns
     * @memberof prop
     */
    getAllPropsByParams(user, objData) {
        if (objData==null) {
            objData={};
        }
        let paramArray=new Array();
        if (typeof(objData.status) != "undefined" && (objData.status!="")) {
            paramArray.push(['status','==',parseInt(objData.status)]);
        }
        if (typeof(objData.cid) != "undefined" && (objData.cid!="")) {
            paramArray.push(['cid','==',objData.cid]);
        }
        console.log(paramArray);
        let resList = facade.GetMapping(103) //得到 Mapping 对象
        .groupOf() // 将 Mapping 对象转化为 Collection 对象，如果 Mapping 对象支持分组，可以带分组参数调用
        .where(paramArray)
        .orderby('id', 'desc') //根据id字段倒叙排列
        .records(['id', 'props_name','props_type', 'cid','props_desc','pid','oid','icon_url', 'icon_preview', 'gold', 'cp', 'stock', 'pro_num', 'status']); 

        let cpIdText = this.cpIdText();
        cpIdText = cpIdText.data || {};

        let $data = {};
        let $idx = 0;
        for(let $value of resList){
            $data[$idx] = {id: $value['id'], props_name: $value['props_name'],props_type: $value['props_type'],cid: $value['cid'],props_desc: $value['props_desc'],
            pid: $value['pid'], oid: $value['oid'],icon_url: $value['icon_url'],icon_preview: $value['icon_preview'],gold: $value['gold'],
            cp: $value['cp'],stock: $value['stock'],pro_num: $value['pro_num'],status: $value['status'],cp_name: cpIdText[$value['cid']] || '',rank: $idx};
            $idx++;
        }
        return {code: ReturnCode.Success, data: $data};
    }
    /**
     * 查看单个记录
     * @param {*} user 
     * @param {*} objData 
     */
    LocalDetail(user, objData) {
        let cpIdText = this.cpIdText();
        cpIdText = cpIdText.data || {};
        //根据上行id查找表中记录, 注意在 get 方式时 id 不会自动由字符串转换为整型
        let prop = facade.GetObject(103, parseInt(objData.id));
        if(!!prop) {
            return {
                code: ReturnCode.Success, 
                data: {
                    id:prop.getAttr('id'),
                    props_name:prop.getAttr('props_name'),
                    props_type:prop.getAttr('props_type'),
                    cid:prop.getAttr('cid'),
                    props_desc:prop.getAttr('props_desc'),
                    pid:prop.getAttr('pid'),
                    oid:prop.getAttr('oid'),
                    icon_url:prop.getAttr('icon_url'),
                    icon_preview:prop.getAttr('icon_preview'),
                    gold:prop.getAttr('gold'),
                    status:prop.getAttr('status'),
                    cp:prop.getAttr('cp'),
                    stock:prop.getAttr('stock'),
                    pro_num:prop.getAttr('pro_num'),
                    createdAt:prop.getAttr('createdAt'),
                    updatedAt:prop.getAttr('updatedAt'),
                    cp_name:cpIdText[prop.getAttr('cid')] || '',
                    create_res:prop.getAttr('create_res'),
                },

            };
        }
        return {code: -1};
    }
    /**
    * 道具保存本地
    * @param {*} user
    * @param {*} paramGold
    * @returns
    * @memberof prop
    */
   async CreateLocal(user, paramGold) {
        let insert = await facade.GetMapping(103).Create( 
            paramGold.props_name,
            paramGold.props_type,
            paramGold.cid,
            paramGold.props_desc,
            paramGold.icon_url,
            paramGold.icon_preview,
            paramGold.pid,
            paramGold.oid,
            paramGold.oper,
            paramGold.prev,
            paramGold.current,
            paramGold.gold,
            paramGold.status,
            paramGold.cp,
            paramGold.stock,
            paramGold.pro_num,
            paramGold.createdAt,
            paramGold.updatedAt,
            );
            console.log(insert);
        return {code: ReturnCode.Success,data: insert.id};
    }

   /**
    * 道具上链
    * @param {*} user
    * @param {*} paramGold
    * @returns
    * @memberof prop
    */
   async CreatePropRemote(user, paramGold) {
        let remote=new RemoteNode().conn(paramGold.userinfo);
        let paramArray=paramGold.items;
        if (typeof(paramArray)=="string") {
            paramArray=eval(paramArray);
        }
        //prop.create [cid oid gold]
        let ret = await remote.execute('prop.create', paramArray);
        return {code: ReturnCode.Success,data: ret};
    }
     /**
    * 道具批量上链
    * @param {*} user
    * @param {*} paramGold
    * @returns
    * @memberof prop
    */
   async CreatePropListRemote(user, paramGold) {
    let remote=new RemoteNode().conn(paramGold.userinfo);
    //prop.createlist "cid|oid|gold,cid|oid|gold"
    let reqStr = '';
    for(let i = 1; i<=paramGold.num; i++){
        if(i < paramGold.num){
            reqStr += `${paramGold.pid}|${paramGold.oid}|${paramGold.gold},`;
        }else{
            reqStr += `${paramGold.pid}|${paramGold.oid}|${paramGold.gold}`;
        }
    }
    let reqArr = new Array();
    reqArr[0] = reqStr;
    console.log(reqArr);
    let ret = await remote.execute('prop.createlist', reqArr);
    console.log(ret);
    //TODO 成功后这里修改道具库并记录
    return {code: ReturnCode.Success,data: ret};
    }

    /**
     * 从数据库中获取所有游戏cp_id => cp_text
     */
    cpIdText() {
        let paramArray=new Array();
        paramArray.push(['cp_state','==',2]);//读取已上架
        let resList = facade.GetMapping(102) 
        .groupOf() 
        .where(paramArray)
        .orderby('id', 'desc') 
        .records(['cp_id','cp_text']); 
        let $data = {};
        for(let $value of resList){
            $data[$value['cp_id']] = $value['cp_text'];
        }
        return {code: ReturnCode.Success, data: $data};
    }
    /**
     * 修改记录
     * @param {*} user 
     * @param {*} objData 
     */
    UpdateProp(user, objData) {
        if (objData==null) {
            objData={};
        }
        let id = '';
        let create_res = '';
        if (typeof(objData.id) != "undefined" && (objData.id!="")) {
            id = parseInt(objData.id);
        }
        if (typeof(objData.create_res) != "undefined" && (objData.create_res!="")) {
            create_res = objData.create_res;
        }
        if( id =='' || create_res == ''){
            return {code: -2};
        }
        let prop = facade.GetObject(103, id);
        if(!!prop) {
            //需要针对各个属性增加为null的判断；如果为null的情况下，则
            prop.setAttr('status',2);
            prop.setAttr('create_res',create_res);
            //prop.setAttr('updatedAt',objData.updatedAt);
            return {code: ReturnCode.Success};
        }
        return {code: -1};
    }
}

exports = module.exports = prop;
