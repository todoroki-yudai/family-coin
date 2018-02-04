-- CREATE DATABASE family;
use family;

CREATE TABLE users (
  id int(11) unsigned not null auto_increment,
  username varchar(255) not null,
  password varchar(255) not null,
  address varchar(255) not null,
  created_at datetime not null default current_timestamp,
  updated_at datetime not null default current_timestamp on update current_timestamp,
  deleted_at datetime not null default current_timestamp,
  primary key (id)
);

CREATE TABLE users_balance_log (
  id int(11) unsigned not null auto_increment,
  address varchar(255) not null,
  balance integer not null,
  created_at datetime not null default current_timestamp,
  primary key (id)
);

CREATE TABLE transactions (
  id int(11) unsigned not null auto_increment,
  sender_address varchar(255) not null,
  receiver_address varchar(255) not null,
  message varchar(255) not null,
  amount integer not null,
  created_at datetime not null default current_timestamp,
  updated_at datetime not null default current_timestamp on update current_timestamp,
  deleted_at datetime not null default current_timestamp,
  primary key (id)
);

CREATE TABLE thanks_term (
  id int(11) unsigned not null auto_increment,
  start_date datetime not null,
  end_date datetime not null,
  is_sent tinyint(1) not null default '0',
  created_at datetime not null default current_timestamp,
  updated_at datetime not null default current_timestamp on update current_timestamp,
  deleted_at datetime not null default current_timestamp,
  primary key (id)
);
