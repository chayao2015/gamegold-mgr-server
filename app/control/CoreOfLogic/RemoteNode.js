//引入查看权限必备的包
let facade = require('gamecloud');
//引入工具包
const toolkit = require('gamegoldtoolkit')


function RemoteNode() { 
    var name; 
    this.setName = function(thyName) { 
        name = thyName; 
    }; 
    this.sayHello = function() { 
        console.log('Hello ' + name); 
    }; 

    // 连接并返回连接器
    this.connY=function(userinfo) {
        console.log("remote note：");
        console.log(JSON.stringify(userinfo));
        //创建授权式连接器实例
        const remote = new toolkit.conn();
        //兼容性设置，提供模拟浏览器环境中的 fetch 函数
        remote.setFetch(require('node-fetch'));
        return remote;
    }

    // 授权连接器的预备代码，调试完成后转正
    this.conn=function(userinfo) {
        console.log("remoteX：");
        console.log(JSON.stringify(userinfo));
        //创建授权式连接器实例
        const remote = new toolkit.conn();
        //获取cid和token
        let operator = facade.GetObject(104, userinfo.id);
        console.log(operator);
        if(!!operator) {
            //设置连接器的值
            remote.setup({
                type:   'testnet',
                ip:     '127.0.0.1',          //远程服务器地址
                head:   'http',               //远程服务器通讯协议，分为 http 和 https
                id:     'primary',            //默认访问的钱包编号
                apiKey: 'bookmansoft',        //远程服务器基本校验密码
                cid:    operator.getAttr('cid'),
                token:  operator.getAttr('token'),
            });
            //兼容性设置，提供模拟浏览器环境中的 fetch 函数
            remote.setFetch(require('node-fetch'));
            return remote;
        }
        return null;
    }
}; 
module.exports = RemoteNode;