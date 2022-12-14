function create_stages(championshipId, modalityId, callback){
	endpoint = `/stages/championship/${championshipId}/modality/${modalityId}`;
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

function searchCurrent_stage(championshipId, modalityId, callback){
	endpoint = `/stages/championship/${championshipId}/modality/${modalityId}/current`;
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

function listForTotem_stages(championshipId, modalityId, callback){
	endpoint = `/stages/championship/${championshipId}/modality/${modalityId}/totem`;
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

function list_stages(championshipId, modalityId, callback){
	endpoint = `/stages/championship/${championshipId}/modality/${modalityId}`;
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

function search_stages(championshipId, modalityId, stageId, callback){
	endpoint = `/stages/championship/${championshipId}/modality/${modalityId}/${stageId}`;
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

function searchName_stages(championshipId, modalityId, nameStage, callback){
	endpoint = `/stages/championship/${championshipId}/modality/${modalityId}/nameStage`;
	type = "get";
	header = {
		"Content-Type": "application/json",
		"Accept-Language": "pt",
		"Authorization": "Bearer " + getData("token",false)
	}
	body =  JSON.stringify({
        nameSatge: nameStage
    });
	error = request_errors;
	api_request(endpoint, type, header, body, callback, error);
}

function edit_stages(championshipId, modalityId, stageId, nameStage, concluded, callback){
	endpoint = `/stages/${stageId}`;
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
        nameStage: nameStage,
        concluded: concluded
    });
	error = request_errors;
	api_request(endpoint, type, header, body, callback, error);
}

function setConcluded_stages(championshipId, modalityId, stageId, callback){
	endpoint = `/stages/${stageId}/concluded`;
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
	    }
    });
	error = request_errors;
	api_request(endpoint, type, header, body, callback, error);
}

function drop_stages(championshipId, modalityId, stageId, callback){
	endpoint = `/stages/championship/${championshipId}/modality/${modalityId}/stage/${stageId}/drop`;
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