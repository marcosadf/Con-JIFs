<?php 
    $host_requests = getenv('HOST_REQUESTS') == False ? "localhost": getenv('HOST_REQUESTS');
    $port_requests = getenv('PORT_REQUESTS') == False ? "8080": getenv('PORT_REQUESTS');
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>Totem</title>
	<link rel="stylesheet" href="./css/bootstrap.min.css">
    <link rel="stylesheet" href="./css/bootstrap.min.css.map">
    <link rel="stylesheet" href="./css/totem-style.css">
	<script src="./core/jquery-1.10.2.js"></script>
	<script src="./core/util-storage.js"></script>
    <script type="text/javascript" charset="utf-8" async defer>
    	const host_request = "http://<?php echo $host_requests; ?>:<?php echo $port_requests; ?>";
    </script>
	<script src="./core/request-errors.js"></script>
	<script src="./core/api-request.js"></script>
	<script src="./core/screen-ratio.js"></script>
	<script src="./core/sort-ranking.js"></script>
	<script src="./core/sort-disputes.js"></script>
	<script src="./core/sort-brackets.js"></script>
	<script src="./core/format-date.js"></script>
    <script src="./js/bootstrap.min.js"></script>
    <script src="./requests/modalities-requests.js"></script>
    <script src="./requests/login-requests.js"></script>
    <script src="./requests/championships-requests.js"></script>
    <script src="./requests/stages-requests.js"></script>
    <script src="./requests/disputes-requests.js"></script>
    <script src="./requests/competes-requests.js"></script>
    <script src="./requests/brackets-requests.js"></script>
    <script src="./requests/matches-requests.js"></script>
    <script src="./requests/teams-requests.js"></script>
    <script src="./view/totem-tables-groups.js"></script>
    <script src="./view/totem-ranking-groups.js"></script>
    <script src="./view/totem-table-brackets.js"></script>
    <!-- <script src="./test/data.js"></script> -->
    <!-- <script src="./test/trigger-settest.js"></script> -->
</head>
<body>
	<select class="form-select" id="champs" >
      <option selected value="0">Campeonato</option>
 	</select>	
	<div id="titleChampionship" class="titleTables"></div>
	<div id="container" class="containerTotem">
		<div id="containerDataRanking" class="containerData">
			<div class="titleTables">Ranking</div>
			<div id="containerGroupsRanking" class="containerGroups">
			</div>
		</div>
		<div id="containerDataMatches" class="containerData">
			<div class="titleTables">Partidas</div>
			<div id="containerGroupsMatches" class="containerGroups">		
			</div>	
		</div>
	</div>
	<script type="text/javascript">
		$('#champs').change(function() {
		        if ($(this).val() != "0") {
		            setTimeout(listAllActive_modalities, 1000, this.value, callback);
		            console.log(listAllActive_modalities, 1000, this.value, callback)
		        }
		 });		
		function selChamps(){
			list_championships(function(champs){
			    $('#champs').html(`<option selected value="0">Campeonato</option>`);
			    $.each(champs, function (i, item) {
			        $('#champs').append($('<option>', { 
			            value: item.id,
			            text : item.name
			        }));
			    });
				$('#champs').val(champs[0].id);
			});
		}
		function callback(modalities) {
				if(modalities.length > 0){
					renderTotem(modalities, 0, parseInt($('#champs').val()));
				}else{
					alert("N??o existem modalidades ativas no momento!");
				}
		}

		function animateContainer() {			
			$("#titleChampionship").attr("class" , "titleTables containers");
			$("#container").attr("class" , "containerTotem containers");
			$("#titleChampionship").css({"display": "flex"});
			$("#container").css({"display": "flex"});
		}

		function renderTotem(modalities, x, champs) {
			if(parseInt($('#champs').val()) == champs){
				$("#titleChampionship").attr("class" , "titleTables");
				$("#container").attr("class" , "containerTotem");
				$("#titleChampionship").css({"display": "none"});			
				$("#container").css({"display": "none"});			
				setTimeout(animateContainer, 5);
				let modality = modalities[x];
				$("#titleChampionship").html(modality.name);			
				searchCurrent_stage(modality.championship.id, modality.id, process_stages);	
				if (x == 0) 
					x = modalities.length - 1;
				else
					x--;
				setTimeout(renderTotem, 10000, modalities, x, champs);
			}
		}

		var listModalitiesId = [];
		function check_stage(stages){
			for (var i = 0; i < stages.length; i++) {
				listAllStageForBracket_disputes(stages[i].modality.championship.id, stages[i].modality.id, stages[i].id, function(listDisputesForGroups){
					for (var k = 0; k < listDisputesForGroups.length; k++) {
						let listDisputes = listDisputesForGroups[k];
						for(var n = 0; n < listDisputes.length; n++){
							for(var j = 0; j < listDisputes[n].length; j++){
								listModalitiesId.push(listDisputes[n][j].match.bracket.stage.modality.id);
							}
						}
					}
					setData("modalitiesIds", JSON.stringify(listModalitiesId), 1);
				});
			};
		}

		function process_stages(stage){
			if(stage.nameStage == "GROUP"){
				$("#containerDataRanking").css({"display": "flex"});
				setTimeout(()=>{
					listAllStage_competes(stage.modality.championship.id, stage.modality.id, stage.id, renderResults);
					listAllStageForBracket_disputes(stage.modality.championship.id, stage.modality.id, stage.id, renderDisputes);
				}, 10);
			}else{
				$("#containerDataRanking").css({"display": "none"});
				listForTotem_stages(stage.modality.championship.id, stage.modality.id,renderBrackets)
			}
		}

		function renderDisputes(listDisputesForGroups){
			for (var i = 0; i < listDisputesForGroups.length; i++) {
				let listDisputes = listDisputesForGroups[i];
				renderTable({
						rWidth: window.width,
						rHeight: window.width
					},
					sort_disputes(listDisputes, 1),
					(i + 1),
					 listDisputesForGroups.length,
					 false
				);
			}
		}
		function renderResults(listCompetesForGroups){
			for (var i = 0; i < listCompetesForGroups.length; i++) {
				let listCompetes = listCompetesForGroups[i];
				renderRank({
						rWidth: window.width,
						rHeight: window.width
					},
					sort_ranking(listCompetes, -1),
					(i + 1),
					listCompetesForGroups.length,
					false
				);
			}			
		}
		selChamps();
		list_championships((champs)=>{
			if(champs.length > 0){
				setTimeout(listAllActive_modalities, 1000, champs[0].id, callback);
			}else
				alert("N??o h?? campeonatos disponiv??is!");
			}
		);
	</script>
</body>
</html>