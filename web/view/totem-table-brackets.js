function renderBrackets(firstStage){
	if($('.baseTable')){
		$('.baseTable').remove();
	} 
	if($('#baseBracket')){
		$('#baseBracket').remove();
	}

	let baseBracket = $("<div />", {
	  id: "baseBracket"
	});
	let tabBracket = $("<table />", {
	  id: "tabBracket"
	});

	$("#titleChampionship").html(firstStage.nameModality);


	let tabBracketThead = $("<thead />", {
	  id: "tabBracketThead"

	});

	let tabBracketTbody = $("<tbody />", {
	  id: "tabBracketTbody"

	});	
	let tabBracketTheadTr = $("<tr />", {
	  "class": "tabBracketTheadTr"
	});
	


	let stage = firstStage;
	let countStage = 0;

	if(firstStage.nameStage == "GROUP"){
		stage = stage.parentStage;
	}

	do{
		let tabBracketTheadTh = $("<th />", {
		  "class": "tabBracketTheadTh",
		  style:`
				`
		});
		let nameStage = stage.nameStage;
		switch(stage.nameStage){
			case "ROUNDOF16":
				nameStage = "OITAVAS DE FINAL";
				break;
			case "QUARTERFINALS":
				nameStage = "QUARTAS DE FINAL";
				break;
			case "SEMIFINALS":
				nameStage = "SEMI FINAL";
				break;
			case "FINAL":
				nameStage = "FINAL";
				break;
		}
		tabBracketTheadTh.html(nameStage)
		tabBracketTheadTr.append(tabBracketTheadTh)
		tabBracketThead.append(tabBracketTheadTr)
		stage = stage.parentStage;
		countStage++;
	}while(stage != null);
	tabBracket.append(tabBracketThead);
	let auxRowTab = 0
	switch(countStage){
		case 4:
			auxRowTab = 29;
			break;
		case 3:
			auxRowTab = 13;
			break;
		case 2:
			auxRowTab = 5;
			break;
		case 1:
			auxRowTab = 1;
			break;
	}

	for (var i = 0; i < auxRowTab; i++) {
		let tabBracketTr = $("<tr />", {
		  id: "tabBracketTr" + i,
		  "class": "tabBracketTr",
		});
		for (var j = 0; j < countStage; j++) {
			let tabBracketTd = $("<td />", {
			  id: `tabBracketTd${i}-${j}`,
			  "class": "tabBracketTr"
			});
			tabBracketTr.append(tabBracketTd)		
		}
		tabBracketTbody.append(tabBracketTr);
	}

	
	

	tabBracket.append(tabBracketTbody);
	
	baseBracket.append(tabBracket);
	
	$("#containerGroupsMatches").append(baseBracket);

	stage = firstStage;
	if(firstStage.nameStage == "GROUP"){
		stage = stage.parentStage;
	}		
	let auxCol = 0;
	let auxRow = 0;
	let auxPreRow = 0;
	let matrixBrackets = [];
	do{
		let brackets = sort_brackets(stage.brackets);
		switch(countStage){
			case 4:
				switch (auxCol){
					case 0:
						auxRow = 4;
						auxPreRow = 0;
						break;
					case 1:
						auxRow = 8;
						auxPreRow = 2;
						break;
					case 2:
						auxRow = 16;
						auxPreRow = 6;
						break;
					case 3:
						auxRow = 0;
						auxPreRow = 14;
						break;										
				}
				break;
			case 3:
				switch (auxCol){
					case 0:
						auxRow = 4;
						auxPreRow = 0;
						break;
					case 1:
						auxRow = 8;
						auxPreRow = 2;
						break;
					case 2:
						auxRow = 0;
						auxPreRow = 6;
						break;									
				}
				break;
			case 2:
				switch (auxCol){
					case 0:
						auxRow = 4;
						auxPreRow = 0;
						break;
					case 1:
						auxRow = 0;
						auxPreRow = 2;
						break;									
				}
				break;
			case 1:
				switch (auxCol){
					case 0:
						auxRow = 4;
						auxPreRow = 0;
						break;
					case 1:
						auxRow = 8;
						auxPreRow = 2;
						break;
					case 2:
						auxRow = 16;
						auxPreRow = 6;
						break;
					case 3:
						auxRow = 0;
						auxPreRow = 14;
						break;										
				}
				break;					
		}
		if(auxCol == 0){
			for (var i = 0; i < auxRowTab; i++) {
				let colMatrix = []
				for (var j = 0; j < 4; j++) {
					colMatrix.push(0);
				}
				matrixBrackets.push(colMatrix);
			}
		}

		for (var i = 0; i < brackets.length; i++) {
			let tabSub = $("<table />", {
	 		 "class": "tabSubBracket",
			});
			if(brackets[i].competes.length == 2){
				tabSub.html(`
					<thead>
						<tr>
							<th width="40%">${brackets[i].competes[0].nameTeam}</th>
							<th width="8%">${brackets[i].competes[0].points}</th>
							<th width="4%">X</th>
							<th width="8%">${brackets[i].competes[1].points}</th>
							<th width="40%">${brackets[i].competes[1].nameTeam}</th>
						</tr>
					</thead>
					</tbody>
						<tr>
							<td colspan="5">${formatDate(brackets[i].matchs[0].dateTime)}</td>
						</tr>
						<tr>
							<td colspan="5">${brackets[i].matchs[0].locale}</td>
						</tr>
					</tbody>
					`);
			}
			else if(brackets[i].competes.length == 1){
				tabSub.html(`
					<thead>
						<tr>
							<th width="100%"">${brackets[i].competes[0].nameTeam}</th>
						</tr>
					</thead>
					</tbody>
						<tr>
							<td>Passagem Automática</td>
						</tr>
					</tbody>					
					`);				
			}
			else{
				tabSub.html(`
					<thead>
						<tr>
							<th width="100%">Indefinida</th>
						</tr>
					</thead>
					</tbody>
						<tr>
							<td colspan="5">${formatDate(brackets[i].matchs[0].dateTime)}</td>
						</tr>
						<tr>
							<td colspan="5">${brackets[i].matchs[0].locale}</td>
						</tr>
					</tbody>
					`);						
			}

			$(`#tabBracketTd${i * auxRow  + auxPreRow}-${auxCol}`).append(tabSub);
			matrixBrackets[i * auxRow  + auxPreRow][auxCol] = 1;
		}
		auxCol++;
		stage = stage.parentStage;
	}while(stage != null);
	$(".tabBracketTheadTh").css("width", ($("#containerGroupsMatches").width() / countStage));

	let auxLineDirection = 1;
	for (var j = 0; j < countStage; j++) {
		for (var i = 0; i < auxRowTab; i++) {
			if(matrixBrackets[i][j] == 1){
				if(auxLineDirection == 1 && j + 1 < countStage){
					let k = i;
					while(matrixBrackets[k][j+1] == 0){
						matrixBrackets[k][j+1] = (k == i) ? 3: 2;
						if(k + 1 >= auxRowTab){
							break;
						}
						k++;
					}
					auxLineDirection = -1;
				} else if(auxLineDirection == -1 && j + 1 < countStage){
					let k = i;
					while(matrixBrackets[k][j+1] == 0){
						matrixBrackets[k][j+1] = (k == i) ? -3: -2;
						if(k - 1 < 0){
							break;
						}
						k--;
					}
					auxLineDirection = 1;
				}
			}
		}
	}
	let tabBracketDivLine;
	let tabTbodyTd;
	for (var i = 0; i < auxRowTab; i++) {
		for (var j = 0; j < countStage; j++) {
			switch(matrixBrackets[i][j]){
				case 3:
					tabTbodyTd = $(`#tabBracketTd${i}-${j}`);
					tabTbodyTd.css({
						"width": ($("#containerGroupsMatches").width() / countStage),
						"height": "100%"
					});
					tabBracketDivLine = $("<div />", {
					  id: `tabBracketDivLine${i}-${j}`,
					  "class": "tabBracketDivLine",
					  style: `
					  		margin-top: ${tabTbodyTd.height()/2}px;
					  		width: ${tabTbodyTd.width()/2}px;
					  		height: 50%;
					  		border-top: 2px solid black;
					  		border-right: 2px solid black;
					 	`
					});
					tabTbodyTd.append(tabBracketDivLine);
					tabTbodyTd.attr("class","tdDivLine")
					break;
				case 2:
					tabTbodyTd = $(`#tabBracketTd${i}-${j}`);
					tabTbodyTd.css({
						"width": ($("#containerGroupsMatches").width() / countStage),
						"height": "100%"
					});
					tabBracketDivLine = $("<div />", {
					  id: `tabBracketDivLine${i}-${j}`,
					  "class": "tabBracketDivLine",
					  style: `
					  		width: ${tabTbodyTd.width()/2}px;
					  		height: 100%;
					  		border-top: 0px solid black;
					  		border-right: 2px solid black;
					 	`
					});
					tabTbodyTd.append(tabBracketDivLine);
					tabTbodyTd.attr("class","tdDivLine")
					break;
				case -3:
					tabTbodyTd = $(`#tabBracketTd${i}-${j}`);
					tabTbodyTd.css({
						"width": ($("#containerGroupsMatches").width() / countStage),
						"height": "100%"
					});
					tabBracketDivLine = $("<div />", {
					  id: `tabBracketDivLine${i}-${j}`,
					  "class": "tabBracketDivLine",
					  style: `
					  		margin-bottom: ${tabTbodyTd.height()/2}px;
					  		width: ${tabTbodyTd.width()/2}px;
					  		height: 50%;
					  		border-bottom: 2px solid black;
					  		border-right: 2px solid black;
					 	`
					});
					tabTbodyTd.append(tabBracketDivLine);
					tabTbodyTd.attr("class","tdDivLine")
					break;
				case -2:
					tabTbodyTd = $(`#tabBracketTd${i}-${j}`);
					tabTbodyTd.css({
						"width": ($("#containerGroupsMatches").width() / countStage),
						"height": "100%"
					});
					tabBracketDivLine = $("<div />", {
					  id: `tabBracketDivLine${i}-${j}`,
					  "class": "tabBracketDivLine",
					  style: `
					  		width: ${tabTbodyTd.width()/2}px;
					  		height: 100%;
					  		border-bottom: 0px solid black;
					  		border-right: 2px solid black;
					 	`
					});
					tabTbodyTd.append(tabBracketDivLine);
					tabTbodyTd.attr("class","tdDivLine")
					break;				
			}
		}	
	}
}