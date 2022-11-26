function renderTable(elemBase, vetDisputes, id, length, repet) {
	let proportion = repet ? elemBase : screenRatio();
	let lastHeight = $("#containerGroupsMatches").height();
	let auxProportion = lastHeight / length / 550;
	if($('#baseTable'+ id)){
		$('#baseTable'+ id).remove();
	} 
	let baseTable = $("<div />", {
	  id: "baseTable" + id,
	  "class": "baseTable",
	  style: 
		  `
		  margin: auto;
		  padding: ${proportion.rWidth * 0.001 * auxProportion + 'px'};
		  width:${((proportion.rWidth * 3 > proportion.rHeight) ?  proportion.rWidth : (proportion.rHeight * 0.9 / 3)) * 1.55 * auxProportion +'px'};
		  min-width: 50%;
		  background-color: #000;`
		 
	});
	let tab = $("<table />", {
	  id: "tab",
	  style: 
		  `width: 100%;
		  border: solid 1px #000;
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
	tabCaption.html(`${vetDisputes[0][0].match.bracket.name}`);
	let tabThead = $("<thead />", {
	  id: "tabThead"
	});
	let tabTheadTr = $("<tr />", {
	  "class": "tabTr"
	});
	
	let tabTheadThLocale = $("<th />", {
	  "class": "tabTheadTh",
	  style:`
	  		text-align: center;
			font-size: ${((proportion.rWidth * 3 > proportion.rHeight) ?  proportion.rWidth : (proportion.rHeight * 0.9 / 3)) * 0.05 * auxProportion +'px'};
			height: ${((proportion.rWidth * 3> proportion.rHeight) ?  proportion.rWidth : (proportion.rHeight * 0.9 / 3)) * 0.05 * auxProportion +'px'};
			`
	});
	tabTheadThLocale.html("Local");
	let tabTheadThMatch = $("<th />", {
	  "class": "tabTheadTh",
	  style:`
			width: 60%;
			text-align: center;
			font-size: ${((proportion.rWidth * 3 > proportion.rHeight) ?  proportion.rWidth : (proportion.rHeight * 0.9 / 3)) * 0.05 * auxProportion +'px'};
	  `
	});
	tabTheadThMatch.html("Partida");

	let tabTheadThDate = $("<th />", {
	  "class": "tabTheadTh",
	  style:`
	  		text-align: center;
			font-size: ${((proportion.rWidth * 3 > proportion.rHeight) ?  proportion.rWidth : (proportion.rHeight * 0.9 / 3)) * 0.05 * auxProportion +'px'};
	  `
	});
	tabTheadThDate.html("Data");
	
	tabTheadTr.append(tabTheadThLocale);
	tabTheadTr.append(tabTheadThDate);
	tabTheadTr.append(tabTheadThMatch);
	
	tabThead.append(tabTheadTr);
	baseTable.append(tabCaption);
	tab.append(tabThead);
	
	
	let tabTbody = $("<tbody />", {
	  id: "tabTbody"

	});
	for(var i = 0; i < vetDisputes.length; i++){
			
		let tabTbodyTr = $("<tr />", {
		  "class": "tabTr",
		  style: 
			  `background-color: ${ i % 2 ? '#DCDCDC': '#cFcFcF'}  
			  `
		});
		let tabTbodyTdLocale = $("<td />", {
		  "class": "tabTd",
		  style:`
		  		text-align: center;
				font-size: ${(proportion.rWidth * 0.05 * auxProportion) +'px'};
		  `
		});
		let tabTbodyTdMatch = $("<td />", {
		  "class": "tabTd",
		  style:`
		  		display: flex;
		  		justify-content: space-around;
				font-size: ${(proportion.rWidth * 0.05 * auxProportion) +'px'};
				`
		});
		let tabTbodyTdDate = $("<td />", {
		  "class": "tabTd",
			style:`
				text-align: center;
				font-size: ${(proportion.rWidth * 0.05 * auxProportion) +'px'};
				`
		})
		tabTbodyTdLocale.html(vetDisputes[i][0].match.locale);
		let dateTime = formatDate(vetDisputes[i][0].match.dateTime);
		tabTbodyTdDate.html(dateTime);
		tabTbodyTdMatch.html(`<table width="100%">
				<tr>
					<td width="40%" style="text-align: center;">${vetDisputes[i][0].team.name}</td>
					<td width="8%" style="text-align: center;">${vetDisputes[i][0].points}</td>
					<td width="4%" style="text-align: center;">X</td>
					<td width="8%" style="text-align: center;">${vetDisputes[i][1].points}</td>
					<td width="40%" style="text-align: center;">${vetDisputes[i][1].team.name}</td>
				</tr>
			</table>`);
		tabTbodyTr.append(tabTbodyTdLocale);
		tabTbodyTr.append(tabTbodyTdDate);
		tabTbodyTr.append(tabTbodyTdMatch);
		
		tabTbody.append(tabTbodyTr);
	}
	
	tab.append(tabTbody);
	
	baseTable.append(tab);
	

	$("#containerGroupsMatches").append(baseTable);

	let container = $("#containerGroupsMatches");
	

	if(!repet){
		if($("#containerGroupsMatches").height() > $("#baseTable"+id).height() * length * 0.01 ){
			proportion = {
				rWidth: lastHeight * 0.55,
				rHeight: lastHeight * 0.55
			}
		}
		if($("#containerGroupsMatches").width() > $("#baseTable"+id).width() * 2){
			renderTable(proportion, vetDisputes, id, length / 2, true);
			$("#containerGroupsMatches").css("grid-template-columns", "repeat(2, 1fr)");
		}
	} 	

}