/*
 * @Author: jinghh 
 * @Date: 2018-11-26 23:07:21 
 * @Last Modified by: jinghh
 * @Last Modified time: 2018-11-28 16:31:33
 */
const facade = require('gamecloud');
let {Sequelize, seqconn} = facade.tools;

//建立数据库ORM模型
let Prop = (db, sa, pwd) => seqconn.seqConnector(db, sa, pwd).define(
    'Prop',
    {
        'props_name': Sequelize.STRING,
        'props_type': Sequelize.INTEGER,
        'cid': Sequelize.STRING,
        'props_desc': Sequelize.STRING,
        'icon_url': Sequelize.STRING,
        'icon_preview': Sequelize.STRING,
        'oid': Sequelize.STRING,
        'status':Sequelize.INTEGER,
        'stock':Sequelize.INTEGER,
        'pro_num':Sequelize.INTEGER,
        'create_res':Sequelize.TEXT,
        'createdAt':Sequelize.DATE,
        'updatedAt':Sequelize.DATE,
    },
    {
        'timestamps': false,    // 是否需要增加createdAt、updatedAt、deletedAt字段
        'tableName': 'prop',    // 实际使用的表名
        'paranoid': false       // true表示删除数据时不会进行物理删除，而是设置deletedAt为当前时间
    }
);
exports.Prop = Prop;

