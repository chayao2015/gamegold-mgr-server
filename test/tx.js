/**
 * 单元测试：注册登录、简单应答、推送
 * Creted by liub 2017.3.24
 */

const remote = require('./util')

//一组单元测试流程
describe('交易', function() {
    it('tx.list 钱包收支流水', async () => {
        let msg = await remote.login({openid: `${Math.random()*1000000000 | 0}`});
        if(remote.isSuccess(msg)) {
        //所有的控制器都拥有echo方法
            msg = await remote.fetching({func: "tx.List",items:[]});
            remote.isSuccess(msg, true);
        }
    });

    //b8b6681ca6ee4614321c8d34a5b3edf8c5a9fb49b44375024e55d84eea57840d
    it.only('tx.GetWallet 钱包收支详情', async () => {
        let msg = await remote.login({openid: `${Math.random()*1000000000 | 0}`});
        if(remote.isSuccess(msg)) {
        //所有的控制器都拥有echo方法
            msg = await remote.fetching({func: "tx.GetWallet",items:["b8b6681ca6ee4614321c8d34a5b3edf8c5a9fb49b44375024e55d84eea57840d"]});
            remote.isSuccess(msg, true);
        }
    });
});
