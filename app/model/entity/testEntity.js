let facade = require('gamecloud');
let BaseEntity = facade.BaseEntity
let {Test} = require('../table/test')

class testEntity extends BaseEntity
{
    constructor(orm, router){
        super(orm, router);
    }

    /**
     * 数据发生变化时的事件句柄
     */
    onUpdate() {
        //可选方法1：立即存储
        //this.Save();

        //可选方法2：抛出更新事件
        facade.current.notifyEvent('test.update', {test:this})
    }

    //region 集合功能

    /**
     * 索引值，用于配合Mapping类的索引/反向索引
     */
    IndexOf(type) {
        switch(type){
            default:
                return this.orm.id;
        }
    }

    /**
     * 使用Mapping映射类时的配置参数
     */
    static get mapParams(){
        return {
            model: Test,                    //对应数据库单表的ORM封装
            entity: this,                   //实体对象，在model之上做了多种业务封装
            etype: 101,                     //实体类型
        };
    }

    /**
     * 创建时的回调函数
     */
    static async onCreate(item) {
        try{
            let it = await Test().create({
                'item': item,
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
     * 进行字典映射时的回调函数
     * @param {*} record 
     */
    static onMapping(record){
        let obj = new testEntity(record, facade.current);
        return obj;
    }

    /**
     * 载入数据库记录时的回调函数
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
            let ret = await Test(db, sa, pwd).findAll();
            ret.map(it=>{
                callback(it);
            });
        } catch(e) {}
    }
    //endregion
}

exports = module.exports = testEntity;
