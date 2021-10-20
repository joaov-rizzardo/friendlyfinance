<?php
    class User{
        private $email;
        private $senha;
        private $nome;
        private $sobrenome;
        private $dataNascimento;
        private $salario;
        private $diaPagamento;
        private $connection;

        public function __construct(Db $db){
            $this->connection = $db->connect();
        }

        public function __set($attr, $value){
            $this->$attr = $value;
        }

        public function __get($attr){
            return $this->$attr;
        }

        public function findUser(){
            $query = 'select * from tb_users where email = :email';
            $stmt = $this->connection->prepare($query);
            $stmt->bindValue(':email', $this->__get('email'));
            $stmt->execute();

            return $stmt->fetch(PDO::FETCH_OBJ);
        }

        public function signUp(){
            $query = "insert into tb_users(nome, sobrenome, email, senha, dataNascimento)
                        values(:nome,:sobrenome,:email, :senha, :dataNascimento);";
            $stmt = $this->connection->prepare($query);
            $stmt->bindValue(':nome', $this->__get('nome'));
            $stmt->bindValue(':sobrenome', $this->__get('sobrenome'));
            $stmt->bindValue(':email', $this->__get('email'));
            $stmt->bindValue(':senha', $this->__get('senha'));
            $stmt->bindValue(':dataNascimento', $this->__get('dataNascimento'));
            $stmt->execute();
        }

        public function setUserInfo(){
            $query = "update tb_users set salario = :salario, diaSalario = :diaPagamento where id = :id";
            $stmt = $this->connection->prepare($query);
            $stmt->bindValue(':salario', $this->__get('salario'));
            $stmt->bindValue(':diaPagamento', $this->__get('diaPagamento'));
            $stmt->bindValue(':id', $this->__get('id'));
            $stmt->execute();
        }
    }

?>