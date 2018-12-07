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