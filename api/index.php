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
    $user->__set('senha', md5($data['senha']));
    $user->__set('dataNascimento', $data['dataNascimento']);

    $dbResponse = $user->findUser();

    $signUpData = [
        'status' => false
    ];
    /*
    for($i = 0; $i < 1000000000; $i++){
        
    }
    */
    if($dbResponse == false){
        $user->signUp();
        $signUpData['status'] = true;
        $userInfo = $user->findUser();
        $signUpData['user'] = $userInfo;
        $response->getBody()->write(json_encode($signUpData));
    }else{
        $signUpStatus['status'] = false;
        $response->getBody()->write(json_encode($signUpData));
    }

    return $response;
    
});

$app->post('/cadastro/info', function(Request $request, Response $response){
    $data = $request->getParsedBody();

    $db = new Db();
    $user = new User($db);

    $requestStatus = [
        'status' => false
    ];
    $user->__set('id', $data['id']);
    $user->__set('salario', $data['salario']);
    $user->__set('diaPagamento', $data['diaPagamento']);

    $user->setUserInfo();

    $requestStatus['status'] = true;

    $response->getBody()->write(json_encode($requestStatus));

    return $response;
});

$app->post('/login', function(Request $request, Response $response){
    $data = $request->getParsedBody();

    $db = new Db();
    $user = new User($db);

    $request = [
        'status' => false
    ];

    $user->__set('email', $data['email']);

    $dbResponse = $user->findUser();

    if ($dbResponse == false || $dbResponse->senha != md5($data['senha'])){
        $request['status'] = false;
        $response->getBody()->write(json_encode($request));
    }else{
        $request['status'] = true;
        $request['user'] = $dbResponse;
        $response->getBody()->write(json_encode($request));
    }

    return $response;

});

$app->run();

?>