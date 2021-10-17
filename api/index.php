<?php
require __DIR__.'/vendor/autoload.php';
require './Models/Db.php';
require './Models/User.php';

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

header("Access-Control-Allow-Origin: *");


$app = AppFactory::create();

$app->post('/cadastro', function(Request $request, Response $response){
    $data = $request->getParsedBody();

    $db = new Db();
    $user = new User($db);
    $user->__set('nome', $data['nome']);
    $user->__set('sobrenome', $data['sobrenome']);
    $user->__set('email', $data['email']);
    $user->__set('senha', $data['senha']);
    $user->__set('dataNascimento', $data['dataNascimento']);

    $dbResponse = $user->findUser();

    $signUpStatus = [
        'status' => false
    ];
    
    for($i = 0; $i < 1000000000; $i++){
        
    }
    if($dbResponse == false){
        $user->signUp();
        $signUpStatus['status'] = true;
        $response->getBody()->write(json_encode($signUpStatus));
    }else{
        $signUpStatus['status'] = false;
        $response->getBody()->write(json_encode($signUpStatus));
    }

    return $response;
    
});

$app->run();

?>