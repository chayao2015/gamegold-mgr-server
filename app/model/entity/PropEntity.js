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
    static async onCreate(propsName,propsType,cid,propsDesc,iconUrl,
        iconPreview,oid,status,stock,pro_num,createdAt,updatedAt,create_res) {
        try{
            let it = await Prop().create({
                'props_name': propsName,
                'props_type': propsType,
                'cid': cid,
                'props_desc': propsDesc,
                'icon_url': iconUrl,
                'icon_preview': iconPreview,
                'oid': oid,
                'status':status,
                'stock':stock,
                'pro_num':pro_num,
                'createdAt':createdAt,
                'updatedAt':updatedAt,
                'create_res':create_res,
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
