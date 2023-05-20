create table tb_contatos(
  id serial primary key,
  nome varchar(50),
  email varchar(100),
  celular varchar(15)
);

insert into tb_contatos(nome, email, celular)
values('Jose','jose@gmail.com','(47)9087-0987');

insert into tb_contatos(nome, email, celular)
values('Maria','maria@gmail.com','(47)9087-0945');

alter table tb_contatos add column idcontato INTEGER DEFAULT 1; 

create table tb_usuarios(
  id serial primary key,
  nome varchar(50),
  email varchar(100),
  senha varchar(300),
  perfil varchar(10)
);

create table tb_compromissos(
  id serial primary key,
  descricao varchar(100),
  local varchar(100),
  idcontato int,
  data Date,
  hora Time
);

insert into tb_compromissos(descricao,local, idcontato, data, hora)
values('Chá','Casa do Zé',1,'2023-05-13','10:30:00');

