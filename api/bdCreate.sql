create table tb_users(
    id int primary key not null AUTO_INCREMENT,
    email varchar(100) not null,
    senha varchar(32) not null,
    nome varchar(50) not null,
    sobrenome varchar(100) not null,
    dataNascimento date not null
);

