function add_disputes(championshipId, modalityId, stageId, bracketId, matchId, teamId, points, callback){
	endpoint = `/disputes`;
	type = "post";
	header = {
		"Content-Type": "application/json",
		"Accept-Language": "pt",
		"Authorization": "Bearer " + getData("token",false)
	}
	body =  JSON.stringify({
		match: {
			id: matchId,
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
			}
		},
		team:{
			id: teamId
		},
		points: points
       
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

function searchTeamBracket_disputes(championshipId, modalityId, stageId, bracketId, teamId, callback){
	endpoint = `/disputes/championship/${championshipId}/modality/${modalityId}/stage/${stageId}/bracket/${bracketId}/team/${teamId}`;
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

function listAllStageForBracket_disputes(championshipId, modalityId, stageId, callback){
	endpoint = `/disputes/championship/${championshipId}/modality/${modalityId}/stage/${stageId}`;
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

function searchAllMatch_disputes(championshipId, modalityId, stageId, bracketId, matchId, callback){
	endpoint = `/disputes/championship/${championshipId}/modality/${modalityId}/stage/${stageId}/bracket/${bracketId}/match/${matchId}`;
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

function edit_disputes(championshipId, modalityId, stageId, bracketId, matchId, teamId, disputeId, points, callback){
	endpoint = `/disputes/${disputeId}`;
	type = "put";
	header = {
		"Content-Type": "application/json",
		"Accept-Language": "pt",
		"Authorization": "Bearer " + getData("token",false)
	}
	body =  JSON.stringify({
		match: {
			id: matchId,
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
			}
		},
		team:{
			id: teamId
		},
		points: points
       
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