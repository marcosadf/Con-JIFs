function renderRank(elemBase, vetCompetes, id, length, repet){
	let proportion = repet ? elemBase : screenRatio();
	let lastHeight = $("#containerGroupsRanking").height();
	let auxProportion = lastHeight / length / 500;
	if($('#baseRank'+ id)){
		$('#baseRank'+ id).remove();
	} 	

	let baseRank = $("<div />", {
	  id: "baseRank" + id,
	  style: 
		  `
		  margin: auto;
		  padding: ${proportion.rWidth * 0.005  * auxProportion+ 'px'};
		  width:${((proportion.rWidth * 3 > proportion.rHeight) ?  proportion.rWidth : (proportion.rHeight * 0.9 / 3)) * 1.3 * auxProportion +'px'};
		  */ height: ${proportion.rWidth + 'px'}; */ 
		  `
		 
	});
	let tab = $("<table />", {
	  id: "tab",
	  style: 
		  `width: 100%;
		  border: solid 1px;
		  border-spacing: 0;
		  `
	});
	let tabCaption = $("<div />",{
	  "class": "tabCaption",
	  style:`
			font-size: ${((proportion.rWidth * 3 > proportion.rHeight) ?  proportion.rWidth : (proportion.rHeight * 0.9 / 3)) * 0.05 * auxProportion +'px'};
			height: ${((proportion.rWidth * 3> proportion.rHeight) ?  proportion.rWidth : (proportion.rHeight * 0.9 / 3)) * 0.06 * auxProportion +'px'};	  				
			`		  				
	});
	tabCaption.html(`${vetCompetes[0].bracket.name}`);
	let tabThead = $("<thead />", {
	  id: "tabThead"
	});
	let tabTheadTr = $("<tr />", {
	  "class": "tabTr"
	});
	
	let tabTheadThPosi = $("<th />", {
	  "class": "tabTheadTh",
	  style:`
	  		text-align: center;
			font-size: ${((proportion.rWidth * 3 > proportion.rHeight) ?  proportion.rWidth : (proportion.rHeight * 0.9 / 3)) * 0.05 * auxProportion +'px'};
			height: ${((proportion.rWidth * 3> proportion.rHeight) ?  proportion.rWidth : (proportion.rHeight * 0.9 / 3)) * 0.06 * auxProportion +'px'};
			`
	});
	tabTheadThPosi.html("Posição");
	let tabTheadThUsua = $("<th />", {
	  "class": "tabTheadTh",
	  style:`
			width: 60%;
			text-align: center;
			font-size: ${((proportion.rWidth * 3 > proportion.rHeight) ?  proportion.rWidth : (proportion.rHeight * 0.9 / 3)) * 0.05 * auxProportion +'px'};
			height: ${((proportion.rWidth * 3> proportion.rHeight) ?  proportion.rWidth : (proportion.rHeight * 0.9 / 3)) * 0.06 * auxProportion +'px'};
	  `
	});
	tabTheadThUsua.html("Times");

	let tabTheadThPont = $("<th />", {
	  "class": "tabTheadTh",
	  style:`
	  		text-align: center;
			font-size: ${((proportion.rWidth * 3 > proportion.rHeight) ?  proportion.rWidth : (proportion.rHeight * 0.9 / 3)) * 0.05 * auxProportion +'px'};
			height: ${((proportion.rWidth * 3> proportion.rHeight) ?  proportion.rWidth : (proportion.rHeight * 0.9 / 3)) * 0.06 * auxProportion +'px'};
	  `
	});
	tabTheadThPont.html("Pontos");
	
	tabTheadTr.append(tabTheadThPosi);
	tabTheadTr.append(tabTheadThUsua);
	tabTheadTr.append(tabTheadThPont);
	
	tabThead.append(tabTheadTr);
	
	baseRank.append(tabCaption);
	tab.append(tabThead);
	
	
	let tabTbody = $("<tbody />", {
	  id: "tabTbody"

	});
	for(var i = 0; i < vetCompetes.length; i++){
		let tabTbodyTr = $("<tr />", {
		  "class": "tabTr",
		  style: 
			  `background-color: ${ vetCompetes[i].result != "APPROVED" ? (i % 2 ? '#DCDCDC': '#cFcFcF') : '#22A4DE'}  
			  `
		});
		let tabTbodyTdPosi = $("<td />", {
		  "class": "tabTd",
		  style:`
				font-size: ${((proportion.rWidth * 3 > proportion.rHeight) ?  proportion.rWidth : (proportion.rHeight * 0.9 / 3)) * 0.05 * auxProportion +'px'};
			height: ${((proportion.rWidth * 3> proportion.rHeight) ?  proportion.rWidth : (proportion.rHeight * 0.9 / 3)) * 0.06 * auxProportion +'px'};
		  `
		});
		let tabTbodyTdUsua = $("<td />", {
		  "class": "tabTd",
		  style:`
				font-size: ${((proportion.rWidth * 3 > proportion.rHeight) ?  proportion.rWidth : (proportion.rHeight * 0.9 / 3)) * 0.05 * auxProportion +'px'};
			height: ${((proportion.rWidth * 3> proportion.rHeight) ?  proportion.rWidth : (proportion.rHeight * 0.9 / 3)) * 0.06 * auxProportion +'px'};
				`
		});
		let tabTbodyTdPont = $("<td />", {
		  "class": "tabTd",
			style:`
				font-size: ${((proportion.rWidth * 3 > proportion.rHeight) ?  proportion.rWidth : (proportion.rHeight * 0.9 / 3)) * 0.05 * auxProportion +'px'};
			height: ${((proportion.rWidth * 3> proportion.rHeight) ?  proportion.rWidth : (proportion.rHeight * 0.9 / 3)) * 0.06 * auxProportion +'px'};
				`
		})
		tabTbodyTdPosi.html(i + 1);
		tabTbodyTdUsua.html(vetCompetes[i].team.name);
		tabTbodyTdPont.html(vetCompetes[i].points);
		tabTbodyTr.append(tabTbodyTdPosi);
		tabTbodyTr.append(tabTbodyTdUsua);
		tabTbodyTr.append(tabTbodyTdPont);
		
		tabTbody.append(tabTbodyTr);
	}
	
	tab.append(tabTbody);
	
	baseRank.append(tab);
	
	$("#containerGroupsRanking").append(baseRank);

	let container = $("#containerGroupsRanking");
	

	if(!repet){
		if($("#containerGroupsRanking").height() > $("#baseRank"+id).height() * length * 0.01 ){
			proportion = {
				rWidth: lastHeight * 0.55,
				rHeight: lastHeight * 0.55
			}
		}
		if($("#containerGroupsRanking").width() > $("#baseRank"+id).width() * 2){
			console.log($("#containerGroupsRanking").width() , $("#baseRank"+id).width() * 2);
			renderRank(proportion, vetCompetes, id, length / 2, true);
			$("#containerGroupsRanking").css("grid-template-columns", "repeat(2, 1fr)");
		}
	} 		
}