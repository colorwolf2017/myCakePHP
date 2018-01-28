create table visit_logs
(
  id int auto_increment primary key,
  site varchar(100),
  ip varchar(20) default '',
  username varchar(50),
  created datetime,
  modified datetime,
  useragent varchar(200) default '';
  action varchar(200) default '',
  reserved1 varchar(500) default '',
  reserved2 varchar(500) default '',
  reserved3 varchar(500) default '',
  reserved4 varchar(500) default '',
  reserved5 varchar(500) default ''
);

create table comments
(
	id int auto_increment primary key,
	postauthor varchar(100),
	postemail varchar(100),
	postsite varchar(200),
	postcontent text,
	postip varchar(20),
    posttime varchar(50),
    postto varchar(200),

    username varchar(50),
    ip varchar(20),
	created datetime,
	modified datetime
);
