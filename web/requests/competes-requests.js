function create_competes(championshipId, modalityId, callback){
	endpoint = `/competes/championship/${championshipId}/modality/${modalityId}`;
	type = "post";
	header = {
		"Content-Type": "application/json",
		"Accept-Language": "pt",
		"Authorization": "Bearer " + getData("token",false)
	}
	body = "";
	error = function(jqXHR, textStatus, msg){
		switch (jqXHR.status){
			case 404:
				alert(`ERROR ${jqXHR.status}: ${jqXHR.responseJSON.title}`);
				break
			case 400:
				alert(`ERROR ${jqXHR.status}: ${jqXHR.responseJSON.title}`);
				break;			
			case 401:
				alert(`ERROR ${jqXHR.status}: ${jqXHR.responseJSON.title}`);
				break;
			case 500:
				alert(`ERROR ${jqXHR.status}: ${jqXHR.responseJSON.title}`);
				break;			
		}
	}
	api_request(endpoint, type, header, body, callback, error);
}

function listAllStage_competes(championshipId, modalityId, stageId, callback){
	endpoint = `/competes/championship/${championshipId}/modality/${modalityId}/stage/${stageId}`;
	type = "get";
	header = {
		"Content-Type": "application/json",
		"Accept-Language": "pt",
		"Authorization": "Bearer " + getData("token",false)
	}
	body = "";
	error = function(jqXHR, textStatus, msg){
		switch (jqXHR.status){
			case 404:
				alert(`ERROR ${jqXHR.status}: ${jqXHR.responseJSON.title}`);
				break
			case 400:
				alert(`ERROR ${jqXHR.status}: ${jqXHR.responseJSON.title}`);
				break;			
			case 401:
				alert(`ERROR ${jqXHR.status}: ${jqXHR.responseJSON.title}`);
				break;
			case 500:
				alert(`ERROR ${jqXHR.status}: ${jqXHR.responseJSON.title}`);
				break;			
		}
	}
	api_request(endpoint, type, header, body, callback, error);
}

function listAllBracket_competes(championshipId, modalityId, stageId, bracketId, callback){
	endpoint = `/competes/championship/${championshipId}/modality/${modalityId}/stage/${stageId}/bracket/${bracketId}`;
	type = "get";
	header = {
		"Content-Type": "application/json",
		"Accept-Language": "pt",
		"Authorization": "Bearer " + getData("token",false)
	}
	body = "";
	error = function(jqXHR, textStatus, msg){
		switch (jqXHR.status){
			case 404:
				alert(`ERROR ${jqXHR.status}: ${jqXHR.responseJSON.title}`);
				break
			case 400:
				alert(`ERROR ${jqXHR.status}: ${jqXHR.responseJSON.title}`);
				break;			
			case 401:
				alert(`ERROR ${jqXHR.status}: ${jqXHR.responseJSON.title}`);
				break;
			case 500:
				alert(`ERROR ${jqXHR.status}: ${jqXHR.responseJSON.title}`);
				break;			
		}
	}
	api_request(endpoint, type, header, body, callback, error);
}

function searchTeamStage_competes(championshipId, modalityId, stageId, teamId, callback){
	endpoint = `/competes/championship/${championshipId}/modality/${modalityId}/stage/${stageId}/team/${teamId}`;
	type = "get";
	header = {
		"Content-Type": "application/json",
		"Accept-Language": "pt",
		"Authorization": "Bearer " + getData("token",false)
	}
	body = "";
	error = function(jqXHR, textStatus, msg){
		switch (jqXHR.status){
			case 404:
				alert(`ERROR ${jqXHR.status}: ${jqXHR.responseJSON.title}`);
				break
			case 400:
				alert(`ERROR ${jqXHR.status}: ${jqXHR.responseJSON.title}`);
				break;			
			case 401:
				alert(`ERROR ${jqXHR.status}: ${jqXHR.responseJSON.title}`);
				break;
			case 500:
				alert(`ERROR ${jqXHR.status}: ${jqXHR.responseJSON.title}`);
				break;			
		}
	}
	api_request(endpoint, type, header, body, callback, error);
}

function edit_competes(championshipId, modalityId, stageId, bracketId, teamId, competeId, points, result, callback){
	endpoint = `/competes/${competeId}`;
	type = "put";
	header = {
		"Content-Type": "application/json",
		"Accept-Language": "pt",
		"Authorization": "Bearer " + getData("token",false)
	}
	body =  JSON.stringify({
		bracket: {
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
		team: {
			id: teamId
		},
		points: points,
		result: result
       
    });
	error = function(jqXHR, textStatus, msg){
		switch (jqXHR.status){
			case 404:
				alert(`ERROR ${jqXHR.status}: ${jqXHR.responseJSON.title}`);
				break
			case 400:
				alert(`ERROR ${jqXHR.status}: ${jqXHR.responseJSON.title}`);
				break;			
			case 401:
				alert(`ERROR ${jqXHR.status}: ${jqXHR.responseJSON.title}`);
				break;
			case 500:
				alert(`ERROR ${jqXHR.status}: ${jqXHR.responseJSON.title}`);
				break;			
		}
	}
	api_request(endpoint, type, header, body, callback, error);
}