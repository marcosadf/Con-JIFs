function create_brackets(championshipId, modalityId, callback){
	endpoint = `/brackets/championship/${championshipId}/modality/${modalityId}`;
	type = "post";
	header = {
		"Content-Type": "application/json",
		"Accept-Language": "pt",
		"Authorization": "Bearer " + getData("token",false)
	}
	body = "";
	error = request_errors;
	api_request(endpoint, type, header, body, callback, error);
}

function list_brackets(championshipId, modalityId, stageId, callback){
	endpoint = `/brackets/championship/${championshipId}/modality/${modalityId}/stage/${stageId}`;
	type = "get";
	header = {
		"Content-Type": "application/json",
		"Accept-Language": "pt",
		"Authorization": "Bearer " + getData("token",false)
	}
	body = "";
	error = request_errors;
	api_request(endpoint, type, header, body, callback, error);
}

function listGroup_brackets(championshipId, modalityId, callback){
	endpoint = `/brackets/championship/${championshipId}/modality/${modalityId}/group`;
	type = "get";
	header = {
		"Content-Type": "application/json",
		"Accept-Language": "pt",
		"Authorization": "Bearer " + getData("token",false)
	}
	body = "";
	error = request_errors;
	api_request(endpoint, type, header, body, callback, error);
}

function search_brackets(championshipId, modalityId, stageId, bracketId, callback){
	endpoint = `/brackets/championship/${championshipId}/modality/${modalityId}/stage/${stageId}/${bracketId}`;
	type = "get";
	header = {
		"Content-Type": "application/json",
		"Accept-Language": "pt",
		"Authorization": "Bearer " + getData("token",false)
	}
	body = "";
	error = request_errors;	api_request(endpoint, type, header, body, callback, error);
}

function searchName_brackets(championshipId, modalityId, stageId, name, callback){
	endpoint = `/brackets/championship/${championshipId}/modality/${modalityId}/stage/${stageId}/name`;
	type = "get";
	header = {
		"Content-Type": "application/json",
		"Accept-Language": "pt",
		"Authorization": "Bearer " + getData("token",false)
	}
	body =  JSON.stringify({
        nameSatge: name
    });
	error = request_errors;
	api_request(endpoint, type, header, body, callback, error);
}

function edit_brackets(championshipId, modalityId, stageId, bracketId, name, concluded, callback){
	endpoint = `/brackets/${stageId}`;
	type = "put";
	header = {
		"Content-Type": "application/json",
		"Accept-Language": "pt",
		"Authorization": "Bearer " + getData("token",false)
	}
	body =  JSON.stringify({
		stage:{
			id: stageId,	
		    modality: {
		    	id: modalityId,
		    	championship: {
		            id: championshipId
		        }
		    }
		},
		name: name,
		concluded: concluded
    });
	error = request_errors;
	api_request(endpoint, type, header, body, callback, error);
}

function clear_brackets(championshipId, modalityId, stageId, bracketId, callback){
	endpoint = `/brackets/championship/${championshipId}/modality/${modalityId}/stage/{stageId}/${bracketId}`;
	type = "delete";
	header = {
		"Content-Type": "application/json",
		"Accept-Language": "pt",
		"Authorization": "Bearer " + getData("token",false)
	}
	body = "";
	error = request_errors;
	api_request(endpoint, type, header, body, callback, error);
}

function clearAll_brackets(championshipId, modalityId, stageId, callback){
	endpoint = `/brackets/championship/${championshipId}/modality/${modalityId}/stage/${stageId}`;
	type = "delete";
	header = {
		"Content-Type": "application/json",
		"Accept-Language": "pt",
		"Authorization": "Bearer " + getData("token",false)
	}
	body = "";
	error = request_errors;
	api_request(endpoint, type, header, body, callback, error);
}