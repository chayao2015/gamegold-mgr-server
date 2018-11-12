# 中间件开发

## 中间件的书写和存放

所有的用户自定义中间件存放于 app/control/ 目录下，按照节点类型分类存储

## 中间件的配置

中间件可以配置于各个控制器的 middleware 函数中，对输入流进行依序处理，例如：

```js
    class test extends facade.Control {
        get middleware() {
            return ['parseParams', 'commonHandle'];
        }
    }
```
如上代码指示对造访控制器test的信息流，依次应用 parseParams 和 commonHandle 这两个中间件进行处理

中间件的默认配置位于 CoreBase 类中：
```js
class CoreOfBase
{
    constructor($env) {
        //中间件设定，子类可覆盖
        this.middlewareSetting = {
            default: ['parseParams', 'commonHandle']
        };
    }
}
```