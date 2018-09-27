-- 如果存在先drop掉再创建
drop table if exists `moco`;
CREATE TABLE `moco` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT primary key,
  `sqlKey` varchar(10) NOT NULL  COMMENT 'sql关键字',
  `method` varchar(10) NOT NULL DEFAULT 'post' COMMENT 'HTTP方法',
  `uri` varchar(50) NOT NULL COMMENT '请求地址',
  `req` varchar(20) DEFAULT '' COMMENT 'req关键字',
  `rsp` longtext NOT NULL COMMENT '期待返回值'
)
ENGINE=InnoDB DEFAULT CHARSET=utf8
COMMENT='mock表';