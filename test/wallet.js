/**
 * 单元测试：注册登录、简单应答、推送
 * Creted by liub 2017.3.24
 */

const remote = require('./util')

//一组单元测试流程
describe('钱包', function() {
    it('钱包信息 wallet.info', async () => {
        let msg = await remote.login({openid: `${Math.random()*1000000000 | 0}`});
        if(remote.isSuccess(msg)) {
        //所有的控制器都拥有echo方法
            msg = await remote.fetching({func: "wallet.Info",items:[]});
            remote.isSuccess(msg, true);
        }
    });

    it('钱包备份', async () => {
        let msg = await remote.login({openid: `${Math.random()*1000000000 | 0}`});
        if(remote.isSuccess(msg)) {
        //所有的控制器都拥有echo方法
            let ran=Math.random()*100000000 | 0;
            console.log(ran);
            msg = await remote.fetching({func: "wallet.Backup",items:['walletbackup'+ran]});
            remote.isSuccess(msg, true);
        }
    });

    it('获取钱包助记词', async () => {
        let msg = await remote.login({openid: `${Math.random()*1000000000 | 0}`});
        if(remote.isSuccess(msg)) {
        //所有的控制器都拥有echo方法
            msg = await remote.fetching({func: "wallet.KeyMaster",items:[]});
            console.log(msg);
            remote.isSuccess(msg, true);
        }
    });
});
