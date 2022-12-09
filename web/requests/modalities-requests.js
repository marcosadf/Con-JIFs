function add_modalities(championshipId, name, typeCompetition, groupTeamsNumber, groupApprovedNumber, callback){
	endpoint = `/modalities`;
	type = "post";
	header = {
		"Content-Type": "application/json",
		"Accept-Language": "pt",
		"Authorization": "Bearer " + getData("token",false)
	}
	body = JSON.stringify({
        championship: {
            id: championshipId
        },
        name: name,
        typeCompetition: typeCompetition,
        groupTeamsNumber: groupTeamsNumber,
        groupApprovedNumber: groupApprovedNumber
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

function list_modalities(championshipId, callback){
	endpoint = `/modalities/championship/${championshipId}`;
	type = "get";
	header = {
		'Content-Type': `application/json`,
		'Accept-Language': `pt`,
		'Authorization': `Bearer ` + getData(`token`,false)
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

function search_modalities(championshipId, modalityId, callback){
	endpoint = `/modalities/championship/${championshipId}/${modalityId}`;
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

function searchName_modalities(championshipId, name, callback){
	endpoint = `/modalities/championship/${championshipId}/name`;
	type = "get";
	header = {
		"Content-Type": "application/json",
		"Accept-Language": "pt",
		"Authorization": "Bearer " + getData("token",false)
	}
	body =  JSON.stringify({
        name: name
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

function edit_modalities(championshipId, modalityId, name, typeCompetition, groupTeamsNumber, groupApprovedNumber, callback){
	endpoint = `/modalities/${modalityId}`;
	type = "put";
	header = {
		"Content-Type": "application/json",
		"Accept-Language": "pt",
		"Authorization": "Bearer " + getData("token",false)
	}
	body =  JSON.stringify({
        championship: {
            id: championshipId
        },
        name: name,
        typeCompetition: typeCompetition,
        groupTeamsNumber: groupTeamsNumber,
        groupApprovedNumber: groupApprovedNumber
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

function delete_modalities(championshipId, modalityId, callback){
	endpoint = `/modalities/championship/${championshipId}/${modalityId}`;
	type = "delete";
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