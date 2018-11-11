# 模型管理

## 概述

gamecloud 的模型管理为数据库表提供了一种面向对象的管理范式，这种范式是在 ORM 层面上进一步封装而成的
所有的用户自定义模型位于 app/model 目录下，分为 table 和 entity，其中 table 直接映射数据库表，entity映射orm对象

## 增删查改操作

...