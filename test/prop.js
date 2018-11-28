/**
 * 单元测试：注册登录、简单应答、推送
 * Creted by liub 2017.3.24
 */

const remote = require('./util')

//一组单元测试流程
describe('道具（prop）', function() {

    it('prop.LocalList 获取道具List', async () => { 
            let msg = await remote.login({openid: `${Math.random()*1000000000 | 0}`});
            if(remote.isSuccess(msg)) {
                let list = await remote.fetching({func: "prop.LocalList"});
                console.log(list);
            }
        }
    );
    it('prop.LocalDetail 获取道具详情', async () => { 
        let msg = await remote.login({openid: `${Math.random()*1000000000 | 0}`});
        if(remote.isSuccess(msg)) {
            let detail = await remote.fetching({func: "prop.LocalDetail", id: 1});
            console.log(detail);
        }
    }
);

});
