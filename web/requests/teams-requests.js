function add_teams(championshipId, modalityId, name, campus, callback){
	endpoint = `/teams`;
	type = "post";
	header = {
		"Content-Type": "application/json",
		"Accept-Language": "pt",
		"Authorization": "Bearer " + getData("token",false)
	}
	body =  JSON.stringify({
		modality: {
			id: modalityId,
	        championship: {
	            id: championshipId
	        }
	    },
        name: name,
        campus: campus
    });
	error = request_errors;
	api_request(endpoint, type, header, body, callback, error);
}

function list_teams(championshipId, modalityId, callback){
	endpoint = `/teams/championship/${championshipId}/modality/${modalityId}`;
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

function listAllForGroup_teams(championshipId, modalityId, bracketId, callback){
	endpoint = `/teams/championship/${championshipId}/modality/${modalityId}/bracket/${bracketId}`;
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


function search_teams(championshipId, modalityId, teamId, callback){
	endpoint = `/teams/championship/${championshipId}/modality/${modalityId}${teamId}`;
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

function searchName_teams(championshipId, modalityId, name, callback){
	endpoint = `/teams/championship/${championshipId}/modality/${modalityId}/name`;
	type = "get";
	header = {
		"Content-Type": "application/json",
		"Accept-Language": "pt",
		"Authorization": "Bearer " + getData("token",false)
	}
	body =  JSON.stringify({
        name: name
    });
	error = request_errors;
	api_request(endpoint, type, header, body, callback, error);
}

function edit_teams(championshipId, modalityId, teamId, name, campus, callback){
	endpoint = `/teams/${teamId}`;
	type = "put";
	header = {
		"Content-Type": "application/json",
		"Accept-Language": "pt",
		"Authorization": "Bearer " + getData("token",false)
	}
	body =  JSON.stringify({
		modality: {
			id: modalityId,
	        championship: {
	            id: championshipId
	        }
	    },
        name: name,
        campus: campus
    });
	error = request_errors;
	api_request(endpoint, type, header, body, callback, error);
}

function delete_teams(championshipId, modalityId, teamId, callback){
	endpoint = `/teams/championship/${championshipId}/modality/${modalityId}/${teamId}`;
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