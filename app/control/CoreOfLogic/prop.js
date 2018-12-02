/*
 * @Author: jinghh 
 * @Date: 2018-11-22 11:38:53 
 * @Last Modified by: jinghh
 * @Last Modified time: 2018-11-30 15:56:28
 */


let facade = require('gamecloud')
let {ReturnCode, NotifyType} = facade.const

//引入工具包
const toolkit = require('gamegoldtoolkit')
//创建授权式连接器实例
const remote = new toolkit.conn();
//兼容性设置，提供模拟浏览器环境中的 fetch 函数
remote.setFetch(require('node-fetch'))  


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
        if (typeof(objData.props_id) != "undefined" && (objData.props_id!="")) {
            paramArray.push(['id','==',parseInt(objData.props_id)]);
        }
        if (typeof(objData.props_name) != "undefined" && (objData.props_name!="")) {
            paramArray.push(['props_name','==',objData.props_name]);
        }
        if (typeof(objData.cid) != "undefined" && (objData.cid!="")) {
            paramArray.push(['cid','==',objData.cid]);
        }
        console.log(paramArray);
        //得到 Mapping 对象
        let muster = facade.GetMapping(103) 
            .groupOf() // 将 Mapping 对象转化为 Collection 对象，如果 Mapping 对象支持分组，可以带分组参数调用
            .where(paramArray)
            .orderby('id', 'desc') //根据id字段倒叙排列
            .paginate(pageSize, currentPage, ['id', 'props_name','props_type', 'cid','props_desc','pid','oid','icon_url', 'icon_preview', 'gold', 'cp', 'stock', 'pro_num']); 
        
        let $data = {items:{},list:[],pagination:{}};
        //扩展分页器对象
        $data.pagination={"total":muster.data.size,"pageSize":parseInt(pageSize),"current":parseInt(muster.pageCur)};
        $data.total = muster.data.size;
        $data.page = muster.pageCur;

        let $idx = (muster.pageCur-1) * muster.pageSize;
        for(let $value of muster.records()){
            $data.items[$idx] = {id: $value['id'], props_name: $value['props_name'],props_type: $value['props_type'],cid: $value['cid'],props_desc: $value['props_desc'],
            pid: $value['pid'], oid: $value['oid'],icon_url: $value['icon_url'],icon_preview: $value['icon_preview'],gold: $value['gold'],
            cp: $value['cp'],stock: $value['stock'],pro_num: $value['pro_num'],rank: $idx};
            $idx++ ;
        }
        $data.list= Object.keys($data.items).map(key=> $data.items[key]);
        return $data;

    }
    /**
     * 查看单个记录
     * @param {*} user 
     * @param {*} objData 
     */
    LocalDetail(user, objData) {
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
    CreateLocal(user, paramGold) {
        let insert = facade.GetMapping(103).Create( 
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
        return {code: ReturnCode.Success,data: insert};
    }

   /**
    * 道具上链
    * @param {*} user
    * @param {*} paramGold
    * @returns
    * @memberof prop
    */
   async CreatePropRemote(user, paramGold) {
        let paramArray=paramGold.items;
        if (typeof(paramArray)=="string") {
            paramArray=eval(paramArray);
        }
        let ret = await remote.execute('prop.create', paramArray);
        return {code: ReturnCode.Success,data: ret};
    }
}

exports = module.exports = prop;
