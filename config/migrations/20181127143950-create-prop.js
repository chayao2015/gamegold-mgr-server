/*
 * @Author: jinghh 
 * @Date: 2018-11-26 23:20:12 
 * @Last Modified by: jinghh
 * @Last Modified time: 2018-11-27 14:45:47
 */

'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable('prop', {
    id: { type: 'int', primaryKey: true, autoIncrement: true},        //主键，本服内用户唯一编号
    props_name: {type: 'string', length: 200}, 
    props_type: {type: 'int', length: 11}, 
    cid: {type: 'string', length: 500}, 
    props_desc: {type: 'text', length: 0}, 
    icon_url: {type: 'string', length: 200}, 
    icon_preview: {type: 'text', length: 0}, 
    pid: {type: 'string', length: 200}, 
    oid: {type: 'string', length: 200}, 
    oper: {type: 'string', length: 100}, 
    prev: {type: 'text', length: 0}, 
    current: {type: 'text', length: 0}, 
    gold: {type: 'int', length: 11}, 
    status: {type: 'int', length: 2}, 
    cp: {type: 'text', length: 0}, 
  }).then(
    function(result) {
    },
    function(err) {
    }
  );
};

exports.down = function(db) {
  return db.dropTable('prop').then(
    function(result) {
    },
    function(err) {
    }
  );
};

exports._meta = {
  "version": 1
};
