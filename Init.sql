use qiz_sub;

CREATE TABLE `article` (  
  `id` mediumint(8) unsigned auto_increment,
  `title` varchar(40) DEFAULT '' COMMENT '//标题',
  `content` text COMMENT '//',
  `type` tinyint(1) unsigned DEFAULT 0,
  `createdAt` datetime DEFAULT now() COMMENT '//',
  `updatedAt` datetime DEFAULT now() COMMENT '//',
  PRIMARY KEY  (`id`)
);

create table `userInfo`(
	`id` mediumint(8) unsigned auto_increment,
	`userid` mediumint(8) unsigned,
	`identitycard` varchar(30) DEFAULT '',
  `name` char(10) default '',
	PRIMARY KEY  (`id`)
);

//迁移原先的competition_web的article数据库导入qiz_sub的article

alter table referrer modify referrerid varchar(20) DEFAULT '';
alter table referrer modify recommendedid varchar(20) DEFAULT '';
alter table referrer_request modify userid varchar(20) default '';

-- CREATE TABLE `degree` (  
--   `degreeID` mediumint(8) unsigned auto_increment,
--   `degree` char(10) DEFAULT '', 
--   PRIMARY KEY  (`degreeID`)
-- );

-- CREATE TABLE `userDegree` (  
--   `degreeID` char(10) DEFAULT '' COMMENT '//',
--   `userID` mediumint(8) unsigned COMMENT '//',
--   PRIMARY KEY  (`userID`)
-- );

-- CREATE TABLE `profits` (  
--   `id` mediumint(8) unsigned auto_increment,
--   `userID` tinyint(1) unsigned DEFAULT 0 COMMENT '//',
--   `totalProfits` varchar unsigned DEFAULT '' COMMENT '//',
--   `profitsDays` varchar unsigned DEFAULT 0 COMMENT '//',
--   `payoutDays` varchar unsigned DEFAULT 0 COMMENT '//',
--   `totalProfits` varchar unsigned DEFAULT '' COMMENT '//',
--   `20daysProfits` varchar unsigned DEFAULT '' COMMENT '//',
--   PRIMARY KEY  (`id`)
-- );







