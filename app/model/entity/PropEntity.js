let facade = require('gamecloud');
let BaseEntity = facade.BaseEntity
let {Prop} = require('../table/Prop.js')

class PropEntity extends BaseEntity
{
    //region 集合功能

    /**
     * 为 Mapping 映射进行参数配置
     */
    static get mapParams() {
        return {
            etype: 103,                     //表类型
            model: Prop,                    //表映射类
            entity: PropEntity,             //ORM映射类
        };
    }

    /**
     * 创建记录时的钩子函数
     */
    static async onCreate(id,propsName,propsType,cid,propsDesc,iconUrl,
        iconPreview,pid,oid,oper,prev,current,gold,status,cp) {
        try{
            let it = await Prop().create({
                'id': id,
                'cp_name': cp_name,
                'propsName': propsName,
                'propsType': propsType,
                'cid': cid,
                'propsDesc': propsDesc,
                'iconUrl': iconUrl,
                'iconPreview': iconPreview,
                'pid': pid,
                'oid': oid,
                'oper': oper,
                'prev': prev,
                'current': current,
                'gold':gold,
                'status':status,
                'cp':cp,
            });
            await it.save();
    
            return it;
        }
        catch(e){
            console.error(e);
        }
        return null;
    }

    /**
     * 进行字典映射时的钩子函数
     * @param {*} record 
     */
    static onMapping(record){
        return new PropEntity(record, facade.current);
    }

    /**
     * 载入数据库记录时的钩子函数
     * @param {*} db 
     * @param {*} sa 
     * @param {*} pwd 
     * @param {*} callback 
     */
    static async onLoad(db, sa, pwd, callback){
        db = db || facade.current.options.mysql.db;
        sa = sa || facade.current.options.mysql.sa;
        pwd = pwd || facade.current.options.mysql.pwd;

        try {
            let ret = await Prop(db, sa, pwd).findAll();
            ret.map(it=>{
                callback(it);
            });
        } catch(e) {}
    }

    //endregion

    /**
     * 记录更新函数，可省略而直接使用基类方法(调用 this.Save() 直接写数据库)
     */
    onUpdate() {
        //抛出更新事件，可以将短时间内的频繁更新合并为单条数据库写
        facade.current.notifyEvent('Prop.update', {Prop:this})
    }
}

exports = module.exports = PropEntity;
