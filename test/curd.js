/**
 * 单元测试：CURD
 * Creted by liub 2017.3.24
 */

const remote = require('./util')

describe('CURD', function() {
    it('创建', done => {
        remote.auth({openid: `${Math.random()*1000000000 | 0}`}, msg => {
            remote.fetching({func: "test.Create"}, msg => {
                console.log(msg);
                done();
            });
        });
    });

    it('删除', done => {
        remote.auth({openid: `${Math.random()*1000000000 | 0}`}, msg => {
            remote.fetching({func: "test.Delete", id:1}, msg => {
                console.log(msg);
                done();
            });
        });
    });

    it('查询', done => {
        remote.auth({openid: `${Math.random()*1000000000 | 0}`}, msg => {
            remote.fetching({func: "test.Retrieve", id: 2}, msg => {
                console.log(msg);
                done();
            });
        });
    });

    it('更新', done => {
        remote.auth({openid: `${Math.random()*1000000000 | 0}`}, msg => {
            remote.fetching({func: "test.Update", id: 2}, msg => {
                console.log(msg);
                done();
            });
        });
    });

    it('列表', done => {
        remote.auth({openid: `${Math.random()*1000000000 | 0}`}, msg => {
            remote.fetching({func: "test.List"}, msg => {
                console.log(msg);
                done();
            });
        });
    });
});
