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
            operator.setAttr('state',objData.state);
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

        if (retAuth==null) {
            return {code:-1};
        }

        let operator = await facade.GetMapping(104).Create(
            objData.login_name,
            objData.password,
            retAuth.cid,
            retAuth.token,
            1,
            objData.remark,
        );
        // console.log("执行创建成功了吗？");
        if (operator==null) {
            return {code:-1,message:"违反唯一性约束"}
        }
        else {
            return {code:0};            
        }


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
                    state:1,
                    remark: operator.getAttr('remark'),
                },

            };
        }
        return {code: -1};
    }

    /**
     * 验证密码
     * @param {*} user 
     * @param {*} objData userName password type 
     */
    Login(user, objData) {
        //构造查询条件
        let paramArray=new Array();
        if (typeof(objData.userName) != "undefined" && (objData.userName!="")) {
            console.log(`login_name 参数: ${objData.userName}`);
            let tmp=['login_name','==',objData.userName];
            paramArray.push(tmp);
        }
        let tmp2=['state','==',1];
        paramArray.push(tmp2);
        console.log(paramArray);
        //得到 Mapping 对象
        let muster = facade.GetMapping(104) 
            .groupOf() // 将 Mapping 对象转化为 Collection 对象，如果 Mapping 对象支持分组，可以带分组参数调用
            .where(paramArray)
            .orderby('id', 'desc') //根据id字段倒叙排列
            .paginate(1, 1, ['id','login_name','password','cid','token']); //每页1条，显示第${objData.id}页，只选取'id'和'item'字段
        
        //获取值
        let $data=null;
        for(let $value of muster.records()){
            $data = {id: $value['id'], login_name: $value['login_name'],password: $value['password'],cid: $value['cid'],token: $value['token'], rank: 0};
            console.log($data);
        }
        //判断是否有值并处理
        if ($data==null) {
            console.log("登录失败，无此用户或用户已注销！");
            return {status: "error", type: "account", currentAuthority: "guest"};
        }
        //有值的情况下，判断密码是否正确
        if (objData.password==$data.password) {
            //密码正确
            console.log("登录成功");
            if (objData.userName=="admin") {
                return {status: "ok", type: "account", currentAuthority: "admin"};
            }
            else {
                return {status: "ok", type: "account", currentAuthority: "user"};
            }
        }
        else {
            //密码错误
            console.log("登录失败，密码错误！");
            return {status: "error", type: "account", currentAuthority: "guest"};
        }
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
        //login_name=3&state=1
        let paramArray=new Array();
        if (typeof(objData.login_name) != "undefined" && (objData.login_name!="")) {
            console.log(`login_name 参数: ${objData.login_name}`);
            let tmp=['login_name','==',objData.login_name];
            paramArray.push(tmp);
        }
        if (typeof(objData.state) != "undefined" && (objData.state!="")) {
            console.log(`state 参数: ${objData.state}`);
            let tmp=['state','==',objData.state];
            paramArray.push(tmp);
        }
        console.log(paramArray);
        //得到 Mapping 对象
        let muster = facade.GetMapping(104) 
            .groupOf() // 将 Mapping 对象转化为 Collection 对象，如果 Mapping 对象支持分组，可以带分组参数调用
            .where(paramArray)
            .orderby('id', 'desc') //根据id字段倒叙排列
            .paginate(10, currentPage, ['id','login_name','cid','state','remark']); //每页5条，显示第${objData.id}页，只选取'id'和'item'字段
        
        let $data = {items:{},list:[],pagination:{}};
        //扩展分页器对象
        $data.pagination={"total":muster.pageNum*10,"pageSize":10,"current":muster.pageCur};
        $data.total = muster.pageNum;
        $data.page = muster.pageCur;

        let $idx = (muster.pageCur-1) * muster.pageSize;
         $idx=$idx+5;
        for(let $value of muster.records()){
            $data.items[$idx] = {id: $value['id'], login_name: $value['login_name'],cid: $value['cid'],state: $value['state'],remark: $value['remark'], rank: $idx};
            $idx++ ;
        }

        //转化并设置数组属性
        $data.list= Object.keys($data.items).map(key=> $data.items[key]);

        // let ret=$data.list;
        return $data;
    }


}

exports = module.exports = operator;
