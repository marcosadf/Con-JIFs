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
		'Authorization': `Bearer ` + getData(`token`)
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

function listAllActive_modalities(championshipId, callback){
	endpoint = `/modalities/championship/${championshipId}/active`;
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

function searchName_modalities(championshipId, nameModali, callback){
	endpoint = `/modalities/championship/${championshipId}/name`;
	type = "post";
	header = {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
		"Content-Type": "application/json",
		"Accept-Language": "pt",
		"Authorization": "Bearer " + getData("token",false)
	}
	body =  JSON.stringify({
        name: nameModali
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