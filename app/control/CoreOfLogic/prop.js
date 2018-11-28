/*
 * @Author: jinghh 
 * @Date: 2018-11-22 11:38:53 
 * @Last Modified by: jinghh
 * @Last Modified time: 2018-11-27 16:31:13
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
     * 查看单个记录
     * @param {*} objData 
     */
    Retrieve(user,objData) {
        console.log("prop.Retrieve：");
        console.log(objData.id);
        console.log("惊喜？");
        //根据上行id查找test表中记录, 注意在 get 方式时 id 不会自动由字符串转换为整型
        let prop = facade.GetObject(103, objData.id);
        console.log(prop);
        if(!!prop) {
            return {code: ReturnCode.Success, 
                data: {
                    id:prop.getAttr('id'),
                },

            };
        }
        return {code: -1};
    }
    
}

exports = module.exports = prop;
