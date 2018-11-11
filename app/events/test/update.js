let facade = require('gamecloud')
let autoSave = require('../../util/autoExec/testAutoSave')

/**
 * Created by admin on 2017-05-26.
 */
function handle(event) {
    facade.current.autoTaskMgr.addTask(new autoSave(event.test.orm.id));
}

module.exports.handle = handle;
