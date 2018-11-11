/**
 * 单元测试：注册登录
 * Creted by liub 2017.3.24
 */

//引入远程连接器
let {gameconn} = require('gamegoldtoolkit');

//创建连接器对象
let remote = new gameconn(
    gameconn.CommMode.ws,               //使用 WebSocket 连接方式
    {
        "UrlHead": "http",              //协议选择: http/https
        "webserver": {
            "host": "127.0.0.1",        //远程主机地址
            "port": 9901                //远程主机端口
        },
        "auth": {
            "openid": "18681223392",    //用户标识
            "openkey": "18681223392",   //和用户标识关联的用户令牌
            "domain": "tx.IOS",         //用户所在的域，tx是提供登录验证服务的厂商类别，IOS是该厂商下的服务器组别
        }
    }
)
.setFetch(require('node-fetch'));      //设置node服务端环境下兼容的fetch函数，**注意只能在node服务端环境中执行，浏览器环境中系统自带 fetch 函数**

//一组单元测试流程
describe('认证', function() {
    /**
     * 一个单元测试流程，可使用 .skip .only 修饰
     * 和负载均衡相关的单元测试，首先连接9901端口，发送config.getServerInfo请求，携带 "stype":"IOS", "oemInfo":{"openid":'helloworl'} 等参数，返回值：data.newbie:是否新注册用户 data.ip:服务器IP, data.port:服务器端口号
     */
    it(
        '注册并登录 - 自动负载均衡', /*单元测试的标题*/
        done => { /*单元测试的函数体，书写测试流程*/
        remote.auth({openid: `${Math.random()*1000000000 | 0}`}, msg => {
            remote.isSuccess(msg); //使用断言，对返回值进行合理性判定，如判定失败则抛出异常，下面的 done 就不会被执行
            done();
        });
    });

    it('简单应答', done => {
        remote.auth({openid: `${Math.random()*1000000000 | 0}`}, msg => {
            remote.isSuccess(msg);
            remote.fetching({func: "test.echo"}, msg => {
                remote.isSuccess(msg);
                done();
            });
        });
    });

    it.only('请求服务端推送一条下行消息', done => {
        let first = true;
        remote.auth({openid: `${Math.random()*1000000000 | 0}`}, msg => {
            remote.watch(msg => {
                console.log(msg);
                if(first) {
                    done();
                    first = false;
                }
            }, gameconn.NotifyType.test).fetching({func: "test.notify", id: 2}, msg => {
            });
        });
    });
});
