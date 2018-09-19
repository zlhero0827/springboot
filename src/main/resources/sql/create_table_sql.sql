-- 如果存在先drop掉再创建
drop table if exists `t_user`;
create table t_user(
`user_id` int(10) unsigned not null auto_increment primary key,
`username` varchar(50) not null default '' comment '用户姓名',
`password` varchar(50) not null default '' comment '用户密码',
`phonenum` varchar(15) default '' comment '用户手机号',
-- 创建唯一索引不允许重复
unique index idx_user_id(`user_id`)
)
default charset=utf8
comment='用户信息表';