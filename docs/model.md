# 模型管理

## 概述

gamecloud 的模型管理为数据库表提供了一种面向对象的管理范式，这种范式是在 ORM 层面上进一步封装而成的
所有的用户自定义模型位于 app/model 目录下，分为 table 和 entity，其中 table 直接映射数据库表，entity映射orm对象

## 建立 orm 模型

下面以新增 test 表为例，描述建立 orm 模型的详细步骤

1. 新增 db-migrate 迁移文件
20191111062616-create-test.js

2. 执行 db-migrage 计划，自动生成 test 表结构
```bash
npm run commit
```

3. 新增表映射文件
app/model/table/test.js

4. 新增ORM映射文件
app/model/entity/testEntity.js

**注意要为新增实体设立一个唯一编号，本案中为 101**
```js
    static get mapParams(){
        return {
            model: Test,                    //对应数据库单表的ORM封装
            entity: this,                   //实体对象，在model之上做了多种业务封装
            etype: 101,                     //实体类型
        };
    }
```

在 onUpdate 函数中填写更新策略：立即更新或者抛出更新事件

5. 如果第4步中选择事件更新模式，需要新增更新事件处理对象
app/util/autoExec/testAuteSave.js

6. 将新增表添加进系统自动加载列表中
```js
facade.boot({
    env: env,
    loading: [
        101,        //指示加载 test 表
    ],
});
```