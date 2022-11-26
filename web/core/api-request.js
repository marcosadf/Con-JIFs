function api_request(endpoint, type, header, body, callback, error) {
    $.ajax({
	   	url : "http://localhost:8080" + endpoint,
	    type : type,
	    headers: header,
	    data : body,
	    beforeSend : function(){
	       console.log("Requesting...")
	    }
	})
	.done(function(data){
 		callback(data);
	})
	.fail(function(jqXHR, textStatus, msg){
	    error(jqXHR, textStatus, msg);
	});		   
}
