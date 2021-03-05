-- create database ubersite;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE SCHEMA IF NOT EXISTS ubersite;

drop table if exists ubersite.settings;

drop table if exists ubersite.logs;

drop table if exists ubersite.menus;

drop table if exists ubersite.newletter;

drop table if exists ubersite.posts;

drop table if exists ubersite.pages;

drop table if exists ubersite.tags;

drop table if exists ubersite.categories;

drop table if exists ubersite.medias;

drop table if exists ubersite.users;

drop table if exists ubersite.permissions;

/** Settings **/
CREATE TABLE IF NOT EXISTS ubersite.settings (
    id           SERIAL,
    active       boolean default false,
    
	key          varchar(100) not null,
	value        varchar(100) not null,
	
	created_at	 timestamp NOT NULL DEFAULT NOW(),
    updated_at	 timestamp NOT NULL DEFAULT NOW(),
     
    PRIMARY KEY (id)
);

/** Logs **/
CREATE TABLE IF NOT EXISTS ubersite.logs (
    id           SERIAL,
    active       boolean default false,
	
	type         varchar(20) NOT NULL,
	log          text,
    
	created_at	 timestamp NOT NULL DEFAULT NOW(),
    updated_at	 timestamp NOT NULL DEFAULT NOW(),
     
    PRIMARY KEY (id)

);

/** menu  **/
CREATE TABLE IF NOT EXISTS ubersite.menus (
    id           SERIAL,
    active       boolean default false,
    menu_id      integer NOT null default 0,
    
    title 		 text NOT NULL,
    icon         text NOT NULL,
    uri          varchar(255) NOT NULL,
    target       varchar(255) NOT NULL,
       
	created_at	 timestamp NOT NULL DEFAULT NOW(),
    updated_at	 timestamp NOT NULL DEFAULT NOW(),
     
    PRIMARY KEY (id)
);

/** Newletter  **/
CREATE TABLE IF NOT EXISTS ubersite.newletter (
    id           SERIAL,
    active       boolean default false,
    email 		 varchar(50) NOT NULL,
	created_at	 timestamp NOT NULL DEFAULT NOW(),
    updated_at	 timestamp NOT NULL DEFAULT NOW(),
     
    PRIMARY KEY (id)
);

/** permissions  **/
CREATE TABLE IF NOT EXISTS ubersite.permissions (
    id           SERIAL,
    active       boolean default false,

    
    title 		 text NOT NULL,
    level        integer default 0,  
    
	created_at	 timestamp NOT NULL DEFAULT NOW(),
    updated_at	 timestamp NOT NULL DEFAULT NOW(),
     
    PRIMARY KEY (id)
);

/** Cadastro de Usuarios **/
CREATE TABLE IF NOT EXISTS ubersite.users (
    id           SERIAL,
    active       boolean default false,
    permission_id integer NOT NULL,
        
    first_name   varchar(50) NOT NULL,
    last_name    varchar(50),
    avatar       varchar(255),
    email        varchar(100) NOT null UNIQUE,
    password     varchar(10) NOT NULL,
    mobile       varchar(20) NOT NULL,
    mobile_check boolean default false,
    email_check  boolean default false,
    hash         varchar(32),
	created_at	 timestamp NOT NULL DEFAULT NOW(),
    updated_at	 timestamp NOT NULL DEFAULT NOW(),
     
    PRIMARY KEY (id),
    FOREIGN KEY (permission_id)
    	REFERENCES ubersite.permissions (id)
);

/** Posts  **/
CREATE TABLE IF NOT EXISTS ubersite.posts (
    id           SERIAL,
    active       boolean default false,
    user_id      integer NOT NULL,
    
    title 		 text NOT NULL,
    slug         text NOT NULL,
    resume       text,
    content 	 text,
    
    publish  	 timestamp,
    status		 integer default 0,
    image_cover	 text,
    thumbnail    text,
    
	created_at	 timestamp NOT NULL DEFAULT NOW(),
    updated_at	 timestamp NOT NULL DEFAULT NOW(),
     
    PRIMARY KEY (id),
    FOREIGN KEY (user_id)
    	REFERENCES ubersite.users (id)
);

/** Pages  **/
CREATE TABLE IF NOT EXISTS ubersite.pages (
    id           SERIAL,
    active       boolean default false,
    user_id      integer NOT NULL,
    
    title 		 text NOT NULL,
    slug         text NOT NULL,
    resume       text,
    content 	 text,
    
    publish  	 timestamp,
    status		 integer default 0,
    image_cover	 text,
    thumbnail    text,
    
	created_at	 timestamp NOT NULL DEFAULT NOW(),
    updated_at	 timestamp NOT NULL DEFAULT NOW(),
     
    PRIMARY KEY (id),
    FOREIGN KEY (user_id)
    	REFERENCES ubersite.users (id)
);

/** Tags  **/
CREATE TABLE IF NOT EXISTS ubersite.tags (
    id           SERIAL,
    active       boolean default false,
    user_id      integer NOT NULL,
    
    title 		 text NOT NULL,
    slug         text NOT NULL,
    tag       	text,
    
	created_at	 timestamp NOT NULL DEFAULT NOW(),
    updated_at	 timestamp NOT NULL DEFAULT NOW(),
     
    PRIMARY KEY (id),
    FOREIGN KEY (user_id)
    	REFERENCES ubersite.users (id)
);

/** Categories  **/
CREATE TABLE IF NOT EXISTS ubersite.categories (
    id           SERIAL,
    active       boolean default false,
    user_id      integer NOT NULL,
    
    title 		 text NOT NULL,
    slug         text NOT NULL,
    category     text,
    
	created_at	 timestamp NOT NULL DEFAULT NOW(),
    updated_at	 timestamp NOT NULL DEFAULT NOW(),
     
    PRIMARY KEY (id),
    FOREIGN KEY (user_id)
    	REFERENCES ubersite.users (id)
);

/** Media  **/
CREATE TABLE IF NOT EXISTS ubersite.medias (
    id           SERIAL,
    active       boolean default false,
    user_id      integer NOT NULL,
    
    title 		 text NOT NULL,
    slug         text NOT NULL,
    uri          varchar(255) NOT NULL,
    path         varchar(255) NOT NULL,
    file         varchar(255) NOT NULL,
    ext          varchar(10),
    
	created_at	 timestamp NOT NULL DEFAULT NOW(),
    updated_at	 timestamp NOT NULL DEFAULT NOW(),
     
    PRIMARY KEY (id),
    FOREIGN KEY (user_id)
    	REFERENCES ubersite.users (id)
);

insert into ubersite.settings 
( active, key, value ) values
( true, 'url', 'https://www.ubersite.com' ),
( true, 'email', 'contato@ubersite.com.br' );

select * from ubersite.settings;

insert into ubersite.logs 
( active, type, log ) values
( true, 'error', 'Ocorreu um erro na conexão do banco de dados' ),
( true, 'warnning', 'Nome do usuario não foi informado' );

select * from ubersite.logs;

insert into ubersite.menus 
( active, title, icon, uri, target ) values
( true, 'Posts', 'fa fa-user', 'posts', '' ),
( true, 'Categories', 'fa fa-user', '', '' ),
( true, 'Tags', 'fa fa-user', '', '' ),
( true, 'News Letter', 'fa fa-user', '', '' );

select * from ubersite.menus;

insert into ubersite.newletter 
( active, email ) values
( true, 'julianocarneiro.np@hotmail.com' ),
( true, 'julianocarneiro.np@gmail.com' ),
( true, 'juliano.carneiro@ubersystem.com' );

select * from ubersite.newletter;

insert into ubersite.permissions 
( active, title, level ) values
( true, 'Author', 1 ),
( true, 'Moderate', 2 ),
( true, 'Leitor', 3 );

select * from ubersite.permissions;

insert into ubersite.users 
( active, permission_id, first_name, last_name, email, password, mobile, mobile_check, email_check  ) values
( true, 1, 'Juliano', 'Carneiro', 'juliano.carneiro@ubersystem.com.br', '123456', '+5534998677227', false, false ),
( true, 2, 'Luciana', 'Carneiro', 'luciana.quista@ubersystem.com.br', '123456', '+5534998677227', false, false ),
( true, 3, 'Anna Júlia', 'Carneiro', 'annajulia.carneiro@ubersystem.com.br', '123456', '+5534998677227', false, false );

select * from ubersite.users;

insert into ubersite.posts 
( active, user_id, title, slug, resume, content, publish, status, image_cover, thumbnail  ) values
( true, 1, 'titulo 1', ' titulo-1', 'resume', 'content', null, 1, '', '' ),
( true, 1, 'titulo 2', ' titulo-2', 'resume', 'content', null, 1, '', '' ),
( true, 1, 'titulo 3', ' titulo-3', 'resume', 'content', null, 1, '', '' ),
( true, 1, 'titulo 4', ' titulo-4', 'resume', 'content', null, 1, '', '' );

select * from ubersite.posts;

insert into ubersite.pages 
( active, user_id, title, slug, resume, content, publish, status, image_cover, thumbnail  ) values
( true, 1, 'Page 1', ' Page-1', 'resume', 'content', null, 1, '', '' ),
( true, 1, 'Page 2', ' Page-2', 'resume', 'content', null, 1, '', '' );

select * from ubersite.pages;

insert into ubersite.tags 
( active, user_id, title, slug, tag ) values
( true, 1, 'tag 1', 'tag-1', 'Tag 1' ),
( true, 1, 'tag 2', 'tag-2', 'Tag 2' ),
( true, 1, 'tag 3', 'tag-3', 'Tag 3' );

select * from ubersite.tags;

insert into ubersite.categories 
( active, user_id, title, slug, category ) values
( true, 1, 'category 1', 'category-1', 'Category 1' ),
( true, 1, 'category 2', 'category-2', 'Category 2' ),
( true, 1, 'category 3', 'category-3', 'Category 3' );

select * from ubersite.categories;

insert into ubersite.medias 
( active, user_id, title, slug, uri, path, file, ext ) values
( true, 1, 'relatorio 1', 'relatorio-1', 'http://localhost', 'files', 'relatorio01', '.pdg' );

select * from ubersite.medias;


















