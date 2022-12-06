const sort_brackets = (brackets, ordem) => {
	if(!brackets){
		return [];
	}
	var newBrackets = brackets;
	
	if(ordem == 1){	
		newBrackets.sort((a, b) =>{
			if(a.name > b.name) return 1;
			if(a.name < b.name) return -1;
			return 0;
		});		
	}
	else if(ordem == -1){	
		newBrackets.sort((a, b) =>{
			if(a.name < b.name) return 1;
			if(a.name > b.name) return -1;
			return 0;
		});		
	}
	return newBrackets;
}