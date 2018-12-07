//引入工具包
const toolkit = require('gamegoldtoolkit')

// remote.setup({
//     type:   'testnet',
//     ip:     '127.0.0.1',          //远程服务器地址
//     head:   'http',               //远程服务器通讯协议，分为 http 和 https
//     id:     'primary',            //默认访问的钱包编号
//     apiKey: 'bookmansoft',        //远程服务器基本校验密码
//     cid:    'xxxxxxxx-game-gold-root-xxxxxxxxxxxx', //授权节点编号，用于访问远程钱包时的认证
//     token:  '03aee0ed00c6ad4819641c7201f4f44289564ac4e816918828703eecf49e382d08', //授权节点令牌固定量，用于访问远程钱包时的认证
//   });

function RemoteNode() { 
    var name; 
    this.setName = function(thyName) { 
        name = thyName; 
    }; 
    this.sayHello = function() { 
        console.log('Hello ' + name); 
    }; 

    // 连接并返回连接器
    this.conn=function(userinfo) {
        console.log("remote note：");
        console.log(JSON.stringify(userinfo));
        //创建授权式连接器实例
        const remote = new toolkit.conn();
        //兼容性设置，提供模拟浏览器环境中的 fetch 函数
        remote.setFetch(require('node-fetch'));
        return remote;
    }
}; 
module.exports = RemoteNode;