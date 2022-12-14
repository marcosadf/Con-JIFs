function add_championships(name, date, locale, callback){
	endpoint = '/championships';
	type = 'post';
	header = {
		'Content-Type': 'application/json',
		'Accept-Language': 'pt',
		'Authorization': 'Bearer ' + getData('token',false)
	}
	body =  JSON.stringify({
	    name: name,
	    date: date,
	    locale: locale
	});
	error = request_errors;
	api_request(endpoint, type, header, body, callback, error);
}

function list_championships(callback){
	endpoint = '/championships';
	type = 'get';
	header = {
		'Content-Type': 'application/json',
		'Accept-Language': 'pt',
		'Authorization': 'Bearer ' + getData('token',false)
	}
	body = "";
	error = request_errors;
	api_request(endpoint, type, header, body, callback, error);
}

function edit_championships(id, name, date, locale, callback){
	endpoint = `/championships/${id}`;
	type = 'put';
	header = {
		'Content-Type': 'application/json',
		'Accept-Language': 'pt',
		'Authorization': 'Bearer ' + getData('token',false)
	}
	body =  JSON.stringify({
	    name: name,
	    date: date,
	    locale: locale
	});
	error = request_errors;
	api_request(endpoint, type, header, body, callback, error);
}

function search_championships(id, callback){
	endpoint = `/championships/${id}`;
	type = 'get';
	header = {
		'Content-Type': 'application/json',
		'Accept-Language': 'pt',
		'Authorization': 'Bearer ' + getData('token',false)
	}
	body = "";
	error = request_errors;
	api_request(endpoint, type, header, body, callback, error);
}

function searchName_championships(nameModali, callback){
	endpoint = `/championships/name`;
	type = 'post';
	header = {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
		'Content-Type': 'application/json',
		'Accept-Language': 'pt',
		'Authorization': 'Bearer ' + getData('token',false)
	}
	body = JSON.stringify({
	    name: nameModali
	});
	error = request_errors;
	api_request(endpoint, type, header, body, callback, error);
}

function delete_championships(id, callback){
	endpoint = `/championships/${id}`;
	type = 'delete';
	header = {
		'Content-Type': 'application/json',
		'Accept-Language': 'pt',
		'Authorization': 'Bearer ' + getData('token',false)
	}
	body = "";
	error = request_errors;
	api_request(endpoint, type, header, body, callback, error);
}