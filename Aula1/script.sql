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