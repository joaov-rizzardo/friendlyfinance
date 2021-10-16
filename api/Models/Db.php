<?php
    class Db{
        private $host = 'localhost';
        private $dbname = 'db_finance';
        private $user = 'root';
        private $senha = '';

        public function connect(){
            try{
                $conexao = new PDO(
                    "mysql:host=$this->host;dbname=$this->dbname",
                    "$this->user",
                    "$this->senha"
                );

                return $conexao;

            }catch(PDOException $e){
                echo '<p>'.$e->getMessage().'</p>';
            }
        }
    }
?>