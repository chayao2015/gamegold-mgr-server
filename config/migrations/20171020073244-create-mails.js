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
  return db.createTable('mails', {
    id: { type: 'int', primaryKey: true, autoIncrement: true},  //日志编号
    src: {type: 'string', length: 100},
    dst: {type: 'string', length: 100},
    content: {type: 'string', length: 500},
    time: {type: 'string', length: 500},
    state: {type: 'int', defaultValue:0},
  });
};

exports.down = function(db) {
  return db.dropTable('mails').then(
    function(result) {
    },
    function(err) {
    }
  );
};

exports._meta = {
  "version": 1
};
