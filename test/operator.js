/**
 * 操作员
 */
let moment  = require('moment');
const remote = require('./util')

//一组单元测试流程
describe('操作员', function() {
    
    it('operator.listRecord 列表', async () => {
        let msg = await remote.login({openid: `${Math.random()*1000000000 | 0}`});
        if(remote.isSuccess(msg)) {
            let msg = await remote.fetching({func: "operator.ListRecord"});
            console.log(msg);
        }
    });

    
    it('operator.Retrieve 获取指定id的记录', async () => { 
            let msg = await remote.login({openid: `${Math.random()*1000000000 | 0}`});
            if(remote.isSuccess(msg)) {
                console.log(await remote.fetching({func: "operator.Retrieve", id: 2}));
            }
        }
    );

    it('operator创建表记录', async () => {
        await remote.login({openid: `${Math.random()*1000000000 | 0}`});
        let msg = await remote.fetching({func: "operator.CreateRecord",
            login_name: `operator${Math.random()*1000 | 0}`,
            password: `${Math.random()*1000000 | 0}`,
            remark: 'who are you?',
            state:1,
        });
    });

    it.only('operator登录A', async () => {
        await remote.login({openid: `${Math.random()*1000000000 | 0}`});
        let msg = await remote.fetching({func: "operator.Login",
            userName: `admin`,
            password: `888888`,
        });
        console.log(msg);
    });

    it.only('operator登录B', async () => {
        await remote.login({openid: `${Math.random()*1000000000 | 0}`});
        let msg = await remote.fetching({func: "operator.Login",
            userName: `operater111`,
            password: `888888`,
        });
        console.log(msg);
    });
});
