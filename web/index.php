<?php 
    $host_requests = getenv('HOST_REQUESTS') == False ? "localhost": getenv('HOST_REQUESTS');
    $port_requests = getenv('PORT_REQUESTS') == False ? "8080": getenv('PORT_REQUESTS');
?>
<!DOCTYPE html>
<html lang ='pt-br'>
<head>
    <meta charset ='utf-8'>
    <meta name='viewport' content="width=device-width, intial-scale=1">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title> CON-JIFs</title>
    <script src="./core/jquery-1.10.2.js"></script>
    <script src="./core/util-storage.js"></script>
    <script type="text/javascript" charset="utf-8" async defer>
        const host_request = "http://<?php echo $host_requests; ?>:<?php echo $port_requests; ?>";
    </script>
    <link href="./css/bootstrap.min.css" rel="stylesheet">
    <script src="./core/request-errors.js"></script>
    <script src="./core/api-request.js"></script>
    <script src="./requests/login-requests.js"></script>
    <style>
        .campo {
            background-color: #EFEFEF;
            padding: 25px;
        }
        .nome {
            color: #73C16D
        }
    </style>
</head>
<body>
    <div class="main-login">
            <div class="row">
            <div class="col-sm-6  align-middle">
                <div class="left-login nome ml-5 mt-5">
                    
                    <div class="card-body">
                        <br/> <br/>  <h1 class="font-weight-bold nome" > Login</h1>   <br/><br/>
                            <div class="form-group" style="width: 35rem" >
                                <label for="login">ADMINSTRADOR</label>
                                <input type="text" onkeydown = "
                                    if (event.keyCode == 13){
                                        login_api($('#login').val() ,$('#password').val(), function(data){setData('token', data ,1); window.location.replace('./menu.php');})
                                    }"
                                class="form-control campo" id="login" placeholder="Digite seu usuario" required/> 
                            </div>
                            <div class="form-group" style="width: 35rem" >
                                <label for="password">Senha:</label>
                                <input type="password" onkeydown = "
                                    if (event.keyCode == 13){
                                        login_api($('#login').val() ,$('#password').val(), function(data){setData('token', data ,1); window.location.replace('./menu.php');})
                                    }"
                                    class="form-control campo" id="password" placeholder="Digite sua senha" required/>
                            </div>
                            <div class="form-group" style="width: 35rem; display: flex; justify-content: space-around;">
                                <button id="entrarLogin" onclick="login_api($('#login').val() ,$('#password').val(), function(data){setData('token', data ,1); window.location.replace('./totem.php');})" type="submit" class="btn btn-success btn-block btn-lg" style="width: 49%; margin: 0; padding: 0;">
                                    Exibir Totem
                                </button>                            
                                <button id="entrarLogin" onclick="login_api($('#login').val() ,$('#password').val(), function(data){setData('token', data ,1); window.location.replace('./menu.php');})" type="submit" class="btn btn-success btn-block btn-lg" style="width: 49%; margin: 0; padding: 0;">
                                    Gerenciar Campeonatos
                                </button>
                            </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="text-center" >
                    <img src="img/logo.png" >
                    <img style="width: 200px"  src="img/if.png" >
                </div>
            </div>
        </div>
    </div>
</body>
</html>