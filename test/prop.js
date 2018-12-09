/**
 * 单元测试：注册登录、简单应答、推送
 * Creted by liub 2017.3.24
 */

const remote = require('./util')

//一组单元测试流程
describe('道具（prop）', function() {

    it('prop.List 获取链上道具List', async () => { 
            let msg = await remote.login({openid: `${Math.random()*1000000000 | 0}`});
            if(remote.isSuccess(msg)) {
                let list = await remote.fetching({func: "prop.List",items:[1]});
                console.log(list);
            }
        }
    );
    it('prop.LocalList 获取本地库道具LocalList', async () => { 
        let msg = await remote.login({openid: `${Math.random()*1000000000 | 0}`});
        if(remote.isSuccess(msg)) {
            let list = await remote.fetching({func: "prop.LocalList",
            currentPage:1,
            pageSize:2,
            id:'',
            props_name:'',
            cid:'',
        });
        console.log(list);
        }
    }
    );
    it('prop.getAllPropsByParams 按照status获取本地库道具所有列表getAllPropsByParams', async () => { 
        let msg = await remote.login({openid: `${Math.random()*1000000000 | 0}`});
        if(remote.isSuccess(msg)) {
            let list = await remote.fetching({func: "prop.getAllPropsByParams",
            status: 1,
            cid:'',
        });
         console.log('getAllPropsByParams列表：');
         console.log(list);
        }
    }
    );
    it('prop.LocalDetail 获取道具详情LocalDetail', async () => { 
        let msg = await remote.login({openid: `${Math.random()*1000000000 | 0}`});
        if(remote.isSuccess(msg)) {
            let detail = await remote.fetching({func: "prop.LocalDetail", id: 30});
            console.log(detail);
        }
    });

    it('prop.CreatePropRemote道具上链CreatePropRemote', async () => { 
        let msg = await remote.login({openid: `${Math.random()*1000000000 | 0}`});
        if(remote.isSuccess(msg)) {
            let res = await remote.fetching({func: "prop.CreatePropRemote", items: ['18259163464','xxxxxxxx-game-gold-boss-toekn20181130',100000]});
            console.log(res);
        }
    });
    it('prop.CreateLocal 道具本地创建CreateLocal', async () => { 
        let msg = await remote.login({openid: `${Math.random()*1000000000 | 0}`});
        
        if(remote.isSuccess(msg)) {
            let res = await remote.fetching({func: "prop.CreateLocal", 
            props_name:'奥的灰烬',
            props_type:1,
            cid:'195062d0-fa01-11e8-a5d7-ad318d3cb4a9',
            props_desc:'这是一种飞行坐骑',
            icon_url:'http://db.duowan.com/wow/resources/screenshot/item/3/32458/normal/257646.jpg',
            icon_preview:'[http://db.duowan.com/wow/resources/screenshot/item/3/32458/normal/171317.jpg,http://db.duowan.com/wow/resources/screenshot/item/3/32458/normal/219355.jpg]',
            oid:'xxxxxxxx-game-gold-boss-tokenxxx00042',
            status:1,
            stock :0,
            pro_num :0,
            create_res :'',
            createdAt :'2018-12-2 16:49:39',
            updatedAt :'2018-12-2 16:49:46'
        });
            console.log(res);
        }
    });
    it('prop.cpIdText 获取本地库道具cpIdText', async () => { 
        let msg = await remote.login({openid: `${Math.random()*1000000000 | 0}`});
        if(remote.isSuccess(msg)) {
            let list = await remote.fetching({func: "prop.cpIdText"});
         console.log(list);
        }
    });
    it('prop.UpdateProp 修改本地库道具UpdateProp', async () => { 
        let msg = await remote.login({openid: `${Math.random()*1000000000 | 0}`});
        if(remote.isSuccess(msg)) {
            let list = await remote.fetching({func: "prop.UpdateProp",
            id:25,
            create_res:JSON.stringify([]),
        
        });
         console.log(list);
        }
    });
    it('钱包信息 wallet.info', async () => {
        let msg = await remote.login({openid: `${Math.random()*1000000000 | 0}`});
        if(remote.isSuccess(msg)) {
        //所有的控制器都拥有echo方法
            msg = await remote.fetching({func: "wallet.Info",items:[]});
            remote.isSuccess(msg, true);
        }
    });
    it('批量生产 prop.CreatePropListRemote', async () => {
        let msg = await remote.login({openid: `${Math.random()*1000000000 | 0}`});
        if(remote.isSuccess(msg)) {
            msg = await remote.fetching({func: "prop.CreatePropListRemote",
            cid : '195062d0-fa01-11e8-a5d7-ad318d3cb4a9', 
            oid : 'testtokenxxx00001', 
            gold :100000, 
            num : 2,
            id:25
        
        });
        console.log(msg);
        }
    });

});
