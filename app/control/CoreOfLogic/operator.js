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
class operator extends facade.Control
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
        facade.GetMapping(104).Delete(objData.id, true);
        return {code: ReturnCode.Success};
    }
    /**
     * 修改数据库记录
     * @param {*} user 
     * @param {*} objData 
     */
    UpdateRecord(user, objData) {
        let operator = facade.GetObject(104, objData.id);
        if(!!operator) {
            //需要针对各个属性增加为null的判断；如果为null的情况下，则
            operator.setAttr('login_name',objData.login_name);
            operator.setAttr('password',objData.password);
            operator.setAttr('cid',objData.cid);
            operator.setAttr('token',objData.token);
            operator.setAttr('remark',objData.remark);
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
        let paramArray=new Array();
        paramArray.push(objData.login_name);
        console.log("创建操作员参数串：");
        console.log(paramArray);
        let retAuth = await remote.execute('token.auth', paramArray);
        console.log(retAuth);

        // let paramArray2=new Array();
        // paramArray2.push(objData.login_name);
        // paramArray2.push(objData.login_name);
        // let ret2 = await remote.execute('cp.create', paramArray2);
        // console.log(ret2);


        if (retAuth==null) {
            return {code:-1};
        }

        let operator = await facade.GetMapping(104).Create(
            objData.login_name,
            objData.password,
            retAuth.cid,
            retAuth.token,
            objData.remark,
        );
        //console.log("执行创建成功了吗？");
        console.log({code: ReturnCode.Success});
        return {code: ReturnCode.Success};
    }
    /**
     * 页面入口
     * 创建指定操作员对应的验证信息：token.auth "operactor_name" 
     * @param {*} user 
     * @param {*} paramGold 其中的成员 items 是传递给区块链全节点的参数数组
     */
    async Create(user, paramGold) {
        console.log("创建操作员参数串：");
        let paramArray=paramGold.items;
        if (typeof(paramArray)=="string") {
            paramArray=eval(paramArray);
        }
        console.log(paramArray);
        let ret = await remote.execute('token.auth', paramArray);
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
        let operator = facade.GetObject(104, parseInt(objData.id));
        console.log(operator);
        if(!!operator) {
            return {code: ReturnCode.Success, 
                data: {
                    login_name:operator.getAttr('login_name'),
                    password:operator.getAttr('password'),
                    cid:operator.getAttr('cid'),
                    token: operator.getAttr('token'),
                    remark: operator.getAttr('remark'),
                },

            };
        }
        return {code: -1};
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
        // console.log("129");
        // console.log(objData);
        //得到 Mapping 对象
        let muster = facade.GetMapping(104) 
            .groupOf() // 将 Mapping 对象转化为 Collection 对象，如果 Mapping 对象支持分组，可以带分组参数调用
            .orderby('id', 'desc') //根据id字段倒叙排列
            .paginate(10, currentPage, ['id','login_name','cid','remark']); //每页5条，显示第${objData.id}页，只选取'id'和'item'字段
        
        let $data = {items:{},list:[],pagination:{}};
        //扩展分页器对象
        $data.pagination={"total":muster.pageNum*10,"pageSize":10,"current":muster.pageCur};
        $data.total = muster.pageNum;
        $data.page = muster.pageCur;

        let $idx = (muster.pageCur-1) * muster.pageSize;
         $idx=$idx+5;
        for(let $value of muster.records()){
            $data.items[$idx] = {id: $value['id'], login_name: $value['login_name'],cid: $value['cid'],remark: $value['remark'], rank: $idx};
            $idx++ ;
        }

        //转化并设置数组属性
        $data.list= Object.keys($data.items).map(key=> $data.items[key]);

        // let ret=$data.list;
        return $data;
    }


}

exports = module.exports = operator;
