function request_errors(jqXHR, textStatus, msg){
	switch (jqXHR.status){
		case 404:
			alert(`ERROR ${jqXHR.status}: ${jqXHR.responseJSON.title}`);
			break;
		case 400:
			alert(`ERROR ${jqXHR.status}: ${jqXHR.responseJSON.title}`);
			break;			
		case 401:
			alert(`ERROR ${jqXHR.status}: ${jqXHR.responseJSON.title}`);
			break;
		case 403:
			alert(`Seu login expirou, logar novamente para continuar acessando!`);
			window.location.replace('./index.php');
			break;				
		case 500:
			alert(`ERROR ${jqXHR.status}: ${jqXHR.responseJSON.title}`);
			break;			
	}
}