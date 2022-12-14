<?php 
    $host_requests = getenv('HOST_REQUESTS') == False ? "localhost": getenv('HOST_REQUESTS');
    $port_requests = getenv('PORT_REQUESTS') == False ? "8080": getenv('PORT_REQUESTS');
?>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name='viewport' content="width=device-width, intial-scale=1">
    <link rel="stylesheet" href="./css/bootstrap.min.css">
    <link rel="stylesheet" href="./css/bootstrap.min.css.map">
    <link rel="stylesheet" href="./css/bootstrap-datepicker3.standalone.min.css">
    <link rel="stylesheet" href="./css/bootstrap-datepicker3.standalone.css.map">
    <link rel="stylesheet" href="./css/style.css">
    <script src="./core/jquery-1.10.2.js"></script>
    <script src="./core/util-storage.js"></script>
    <script type="text/javascript" charset="utf-8" async defer>
        const host_request = "http://<?php echo $host_requests; ?>:<?php echo $port_requests; ?>";
    </script>
    <script src="./js/bootstrap.min.js"></script>
    <script src="./js/jquery.mask.js"></script>
    <script src="./js/bootstrap-datepicker.min.js"></script>
    <script src="./core/request-errors.js"></script>
    <script src="./core/api-request.js"></script>
    <script src="./core/screen-ratio.js"></script>
    <script src="./core/sort-ranking.js"></script>
    <script src="./core/sort-disputes.js"></script>
    <script src="./core/sort-brackets.js"></script>
    <script src="./core/format-date.js"></script>
    <script src="./requests/modalities-requests.js"></script>
    <script src="./requests/login-requests.js"></script>
    <script src="./requests/championships-requests.js"></script>
    <script src="./requests/stages-requests.js"></script>
    <script src="./requests/disputes-requests.js"></script>
    <script src="./requests/competes-requests.js"></script>
    <script src="./requests/brackets-requests.js"></script>
    <script src="./requests/matches-requests.js"></script>
    <script src="./requests/teams-requests.js"></script>
    <script src="./view/manage-championship.js"></script>
    <script src="./view/manage-dispute.js"></script>
    <script src="./view/manage-group.js"></script>        
    <script src="./view/manage-match.js"></script>
    <script src="./view/manage-modality.js"></script>
    <script src="./view/manage-compete.js"></script>
    <script src="./view/manage-team.js"></script>
    <title>Con-JIFs</title>
</head>
<body >
    <nav id="menu">
        <div id="titulomenu"><h1> Menu</h1></div>
        <ul style="list-style: none;">
            <li >
                <button onclick='manage_championship()'id="menu_btn_championship" type="submit" class="btn btn-success btn-block btn-lg" style=" margin:center;" target="principal" >
                    Campeonato
                </button>
            </li>
            <li>
                <button onclick='manage_modality()'id="menu_btn_modality" type="submit" class="btn btn-success btn-block btn-lg " style="  margin:center" target="principal">
                    Modalidade
                </button>
            </li>
            <li>
                <button onclick='manage_team()'id="menu_btn_team" type="submit" class="btn btn-success btn-block btn-lg " style="  margin:center" target="principal"> 
                    Time
                </button>
            </li>
            <li>
                <button onclick='manage_group()'id="menu_btn_group"type="submit" class="btn btn-success btn-block btn-lg " style="  margin:center" target="principal">
                    Grupo/Chave
                </button>
            </li>
            <li>
                <button onclick='manage_compete()'id="menu_btn_compete" type="submit" class="btn btn-success btn-block btn-lg " style="  margin:center" target="principal">
                    Competi????o
                </button>
            </li>
            <li>
                <button onclick='manage_match()' id="menu_btn_match" type="submit" class="btn btn-success btn-block btn-lg " style="  margin:center" target="principal">
                    Partida
                </button>
            </li>
        </ul>
    </nav>
    <div id="container">
        <div id="screen">
            <img src="img/logo.png" id="logo"/>   
        </div>  
    </div>
</body>
<script type="text/javascript">
    document.getElementById("screen").addEventListener('click', function(e) {
        $.each($('.tab-input'), function(i, input){
            if(e.target != input && $(input).attr('readonly') != "readonly") {
                $(input).trigger($.Event("keydown", {keyCode: 13}))
            } 
        });      
    });            
</script>
</html>