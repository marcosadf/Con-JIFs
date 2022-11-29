function renderBrackets(elemBase, vetCompetes, repet){
	let proportion = repet ? elemBase : screenRatio();
	let lastHeight = $("#containerGroupsRanking").height();
	let auxProportion = lastHeight / length / 500;
	if($('#baseBracket')){
		$('#baseBracket').remove();
	} 	

	let baseBracket = $("<div />", {
	  id: "baseBracket",
	  style: 
		  `
		  margin: auto;
		  padding: ${proportion.rWidth * 0.005  * auxProportion+ 'px'};
		  width:${((proportion.rWidth * 3 > proportion.rHeight) ?  proportion.rWidth : (proportion.rHeight * 0.9 / 3)) * 1.3 * auxProportion +'px'};
		  */ height: ${proportion.rWidth + 'px'}; */ 
		  `
		 
	});
	let tab = $("<table />", {
	  id: "tabBracket",
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
	tabCaption.html(`${vetCompetes[0][0].bracket.name}`);
	baseBracket.append(tabCaption);


	let tabTbody = $("<tbody />", {
	  id: "tabBracketTbody"

	});

	for (var i = 0; i < vetCompetes.length; i++) {
		let tabTbodyTr = $("<tr />", {
		  "class": "tabBracketTr",
		  style: 
			  `
			  `
		});
		let brackets = vetCompetes[i];
		for (var k = 0; k < brackets.length; k++) {
			let tabTbodyTd = $("<td />", {
			  "class": "tabBracketTd",
			  style:`
			  `
			});
			if(true){
				let tab = $("<table />", {
				  id: "tabBracket",
				  style: 
					  `width: 100%;
					  border: solid 1px;
					  border-spacing: 0;
					  `
				});				
				let tabTbody = $("<tbody />", {
				  id: "tabBracketTbody"
				});
				let tabTbodyTr = $("<tr />", {
				  "class": "tabBracketTr",
				  style: 
					  `
					  `
				});
				let tabTbodyTd = $("<td />", {
				  "class": "tabBracketTd",
				  style:`
				  `
				});			
				tabTbodyTr.append(tabTbodyTd);
				tabTbody.append(tabTbodyTr);
				tab.append(tabTbody);		
			}
			tabTbodyTr.append(tabTbodyTd);		
		}
		tabTbody.append(tabTbodyTr);
	}

	tab.append(tabTbody);
	
	baseBracket.append(tab);
	
	$("#containerGroupsRanking").append(baseBracket);

	let container = $("#containerGroupsRanking");
	

	if(!repet){
		if($("#containerGroupsRanking").height() > $("#baseBracket").height() * length * 0.01 ){
			proportion = {
				rWidth: lastHeight * 0.55,
				rHeight: lastHeight * 0.55
			}
		}
		if($("#containerGroupsRanking").width() > $("#baseBracket").width() * 2){
			console.log($("#containerGroupsRanking").width() , $("#baseBracket").width() * 2);
			renderBrackets(proportion, vetCompetes, true);
			$("#containerGroupsRanking").css("grid-template-columns", "repeat(2, 1fr)");
		}
	} 		
}