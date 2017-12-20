-- CREATE DATABASE family;
use family;

CREATE TABLE users (
  id int(11) unsigned not null auto_increment,
  username varchar(255) not null,
  password varchar(255) not null,
  created_at datetime not null default current_timestamp,
  updated_at datetime not null default current_timestamp on update current_timestamp,
  deleted_at datetime not null default current_timestamp,
  primary key (id)
);
