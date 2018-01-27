create table visit_logs
(
  id int auto_increment primary key,
  site varchar(100),
  ip varchar(20) default '',
  username varchar(50),
  created datetime,
  modified datetime,
  useragent varchar(200) default '';
  reserved1 varchar(500) default '',
  reserved2 varchar(500) default '',
  reserved3 varchar(500) default '',
  reserved4 varchar(500) default '',
  reserved5 varchar(500) default ''
);
