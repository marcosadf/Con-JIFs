function login_api(login, password, callback){
	endpoint = "/login";
	type = "post";
	header = {
		"Content-Type": "application/json",
		"Accept-Language": "pt"
	}
	body =  JSON.stringify({
		login: login,
		password: password
	});
	error = function(jqXHR, textStatus, msg){
		switch (jqXHR.status){
			case 401:
				setData('token', "" ,1)
				alert("ERROR 401: Usuário ou senha incorretos!");
				break;
			case 500:
				setData('token', "" ,1)
				alert("ERROR 500: Falha no acesso ao servidor!");
				break;				
		}
	}
	api_request(endpoint, type, header, body, callback, error);
}
