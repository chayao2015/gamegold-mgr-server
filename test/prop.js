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
            props_id:'',
            props_name:'奥的灰烬',
            cid:'',
        });
         console.log(list);
        }
    }
    );
    it('prop.LocalDetail 获取道具详情LocalDetail', async () => { 
        let msg = await remote.login({openid: `${Math.random()*1000000000 | 0}`});
        if(remote.isSuccess(msg)) {
            let detail = await remote.fetching({func: "prop.LocalDetail", id: 1});
            console.log(detail);
        }
    });

    it('prop.CreateProp 道具上链CreateProp', async () => { 
        let msg = await remote.login({openid: `${Math.random()*1000000000 | 0}`});
        if(remote.isSuccess(msg)) {
            let res = await remote.fetching({func: "prop.CreateProp", items: ['xxxxxxxx-game-gold-boss-xxxxxxxxxxxx','xxxxxxxx-game-gold-boss-toekn20181130',100000]});
            console.log(res);
        }
    });
    it('prop.CreateLocal 道具本地创建CreateLocal', async () => { 
        let msg = await remote.login({openid: `${Math.random()*1000000000 | 0}`});
        
        if(remote.isSuccess(msg)) {
            let res = await remote.fetching({func: "prop.CreateLocal", 
            props_name:'奥的灰烬',
            props_type:1,
            cid:'xxxxxxxx-game-gold-boss-xxxxxxxxxxxx',
            props_desc:'这是一种飞行坐骑',
            icon_url:'http://db.duowan.com/wow/resources/screenshot/item/3/32458/normal/257646.jpg',
            icon_preview:'[http://db.duowan.com/wow/resources/screenshot/item/3/32458/normal/171317.jpg,http://db.duowan.com/wow/resources/screenshot/item/3/32458/normal/219355.jpg]',
            pid:'xxxxxxxx-game-gold-boss-tokenxxx0004',
            oid:'xxxxxxxx-game-gold-boss-tokenxxx0004',
            oper:'exchange',
            prev:'',
            current:'',
            gold:100000000,
            status:1,
            cp:'{"cid":"xxxxxxxx-game-gold-boss-xxxxxxxxxxxx","name":"BOSS","url":"920.cc","ip":"*"}',
            stock :0,
            pro_num :0,
            createdAt :'2018-12-2 16:49:39',
            updatedAt :'2018-12-2 16:49:46'
        });
            console.log(res);
        }
    });

});
