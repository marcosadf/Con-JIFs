const sort_disputes = (disputes, ordem) => {
	if(!disputes){
		return [];
	}
	var newDisputes = disputes;

	if(ordem == 1){	
		newDisputes.sort((a, b) =>{
			if(a[0].match.date > b[0].match.date) return 1;
			if(a[0].match.date < b[0].match.date) return -1;
			return 0;
		});		
	}
	else if(ordem == -1){	
		newDisputes.sort((a, b) =>{
			if(a[0].match.date < b[0].match.date) return 1;
			if(a[0].match.date > b[0].match.date) return -1;
			return 0;
		});		
	}
	return newDisputes;
}