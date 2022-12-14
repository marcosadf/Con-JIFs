function create_matches(championshipId, modalityId, callback){
	endpoint = `/matches/championship/${championshipId}/modality/${modalityId}`;
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

function listAllBracket_matches(championshipId, modalityId, stageId, bracketId, callback){
	endpoint = `/matches/championship/${championshipId}/modality/${modalityId}/stage/${stageId}/bracket/${bracketId}`;
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

function searchForTeam_matches(championshipId, modalityId, teamId, matchId, callback){
	endpoint = `/matches/championship/${championshipId}/modality/${modalityId}/team/${teamId}/matchId`;
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

function searchForBracket_matches(championshipId, modalityId, stageId, name, callback){
	endpoint = `/matches/championship/${championshipId}/modality/${modalityId}/stage/${stageId}/bracket/${bracketId}/${matchId}`;
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

function edit_matches(championshipId, modalityId, stageId, bracketId, matchId, dateTime, locale, callback){
	endpoint = `/matches/${matchId}`;
	type = "put";
	header = {
		"Content-Type": "application/json",
		"Accept-Language": "pt",
		"Authorization": "Bearer " + getData("token",false)
	}
	body =  JSON.stringify({
		bracket:{
			id: bracketId,
			stage:{
				id: stageId,	
			    modality: {
			    	id: modalityId,
			    	championship: {
			            id: championshipId
			        }
			    }
			}
		},
		locale: locale,
		dateTime: dateTime
       
    });
	error = request_errors;
	api_request(endpoint, type, header, body, callback, error);
}

function clear_matches(championshipId, modalityId, stageId, bracketId, matchId, callback){
	endpoint = `/matches/championship/${championshipId}/modality/${modalityId}/stage/${stageId}/bracket/${bracketId}/${matchId}`;
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