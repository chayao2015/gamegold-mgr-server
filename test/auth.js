/**
 * 单元测试：注册登录、简单应答、推送
 * Creted by liub 2017.3.24
 */

const remote = require('./util')

//一组单元测试流程
describe('认证', function() {
    /**
     * 一个单元测试流程，可使用 .skip .only 修饰
     * 和负载均衡相关的单元测试，首先连接9901端口，发送config.getServerInfo请求，携带 "stype":"IOS", "oemInfo":{"openid":'helloworl'} 等参数，返回值：data.newbie:是否新注册用户 data.ip:服务器IP, data.port:服务器端口号
     */
    it('注册并登录 - 自动负载均衡', /*单元测试的标题*/
        async () => { /*单元测试的函数体，书写测试流程*/
            let msg = await remote.login({openid: `${Math.random()*1000000000 | 0}`});
            remote.isSuccess(msg); 
        }
    );

    it('简单应答', async () => {
        let msg = await remote.login({openid: `${Math.random()*1000000000 | 0}`});
        if(remote.isSuccess(msg)) {
            //所有的控制器都拥有echo方法
            msg = await remote.fetching({func: "test.echo"});
            remote.isSuccess(msg, true);
        }
    });

    it('请求服务端推送一条下行消息', async () => {
        let msg = await remote.login({openid: `${Math.random()*1000000000 | 0}`});
        if(remote.isSuccess(msg)) { 
            await remote.watch(msg => {
                console.log(msg);
            }, remote.NotifyType.test).fetching({func: "test.notify", id: 2});
        }
    });

    it.only('cp.list', async () => {
        let msg = await remote.login({openid: `${Math.random()*1000000000 | 0}`});
        if(remote.isSuccess(msg)) {
            //所有的控制器都拥有echo方法
            msg = await remote.fetching({func: "cp.List"});
            remote.isSuccess(msg, true);
        }
    });

    it.only('test.Retrieve', async () => {
        let msg = await remote.login({openid: `${Math.random()*1000000000 | 0}`});
        if(remote.isSuccess(msg)) {
            //所有的控制器都拥有echo方法
            msg = await remote.fetching({func: "test.Retrieve",id:2});
            remote.isSuccess(msg, true);
        }
    });
});
