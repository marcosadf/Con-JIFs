const sort_ranking = (ranking, ordem) => {
	if(!ranking){
		return [];
	}
	var newRanking = ranking;
	
	if(ordem == 1){	
		newRanking.sort((a, b) =>{
			if(a.points > b.points) return 1;
			if(a.points < b.points) return -1;
			return 0;
		});		
	}
	else if(ordem == -1){	
		newRanking.sort((a, b) =>{
			if(a.points < b.points) return 1;
			if(a.points > b.points) return -1;
			return 0;
		});		
	}
	return newRanking;
}