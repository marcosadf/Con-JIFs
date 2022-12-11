function manage_compete() {
    let content = $("#screen");
    content.html(`
   <p class="nome"> Competição</p>
    <div class="nav-screen-top">
        <div>
            <input type="hidden" hidden id="current-page" value="1"/>
            <select class="custom-select btn-verde" id="inputGroupSelect01">
                <option selected value="0">Campeonato</option>
            </select>
            <select class="custom-select btn-verde" id="inputGroupSelect02">
                <option selected value="0">Modalidade</option>
            </select>
            <select class="custom-select btn-verde" id="inputGroupSelect03">
                <option selected value="0">Etapa</option>
            </select>
            <div class="check-stage">
                <input title="Selecione para ir para etapa corrente" class="btn" id="current-stage" onclick="current_stage(this)" type="checkbox" value="0" id="flexCheckDefault">
                <label title="Selecione para ir para etapa corrente" for="flexCheckDefault">
                Etapa corrente
                </label>
            </div>
            <select class="custom-select btn-verde" id="inputGroupSelect04">
                <option selected value="0">Grupo/Chave</option>
            </select>
        </div>
        <div class="dropdown">
            
        </div>
    </div>
    <table class="table-striped table">
       <thead>
            <tr style="border: 0;">
                <th scope="row">
                    <div class="aliamento">
                        <button class="btn" type="button" id="dropdownMenuButton" aria-expanded="false">
                         Time
                        </button>
                    </div>
                </th>
                <th scope="row">
                    <div class="aliamento">
                        <button class="btn" type="button" id="dropdownMenuButton" aria-expanded="false">
                         Grupo/Chave
                        </button>
                    </div>
                </th>
                <th scope="row">
                    <div class="aliamento">
                        <button class="btn" type="button" id="dropdownMenuButton" aria-expanded="false">
                         Aprovação
                        </button>
                    </div>
                </th>
                <th scope="row">
                    <div class="aliamento">
                        <button class="btn" type="button" id="dropdownMenuButton" aria-expanded="false">
                         Pontos
                        </button>
                    </div>
                </th>
            </tr>
       </thead> 
        <tbody id="tab-competes">
        </tbody>
    </table>
    <ul id="pagination" class="pagination">
        
    </ul>
    <nav class="nav-screen">
        <button onclick="create_compete()" type="button" class="button">
            <img style="width: 40px; height: 32px;" src="img/mais.png" height="80" width="100" />
            Criar
        </button>
    </nav>
    `);
    list_championships(function(champs){
        $.each(champs, function (i, item) {
            $('#inputGroupSelect01').html(`<option selected value="0">Campeonato</option>`);
            $('#inputGroupSelect01').append($('<option>', { 
                value: item.id,
                text : item.name
            }));
        });
    });    
    $('#inputGroupSelect01').change(function() {
        insert_competes([], 1);
        $('#inputGroupSelect02').html(`<option selected value="0">Modalidade</option>`);
        if (parseInt($(this).val()) != 0) {
            list_modalities(parseInt($(this).val()), function(modalities){
                $.each(modalities, function (i, item) {
                    $('#inputGroupSelect02').append($('<option>', { 
                        value: item.id,
                        text : item.name
                    }));
                });                         
            });
        }
    });
    $('#inputGroupSelect02').change(function() {
        insert_competes([], 1);
        $('#current-stage').prop('checked', false);
        $('#inputGroupSelect03').html(`<option selected value="0">Etapa</option>`);
        if (parseInt($(this).val()) != 0) { 
            list_stages(parseInt($('#inputGroupSelect01').val()), parseInt($('#inputGroupSelect02').val()), function(competes){
                $.each(competes, function (i, item) {
                    let nameStage = "";
                    switch(item.nameStage){
                        case "GROUP":
                            nameStage = "GRUPO";
                            break;
                        case "ROUNDOF16":
                            nameStage = "OITAVAS";
                            break;
                        case "QUARTERFINALS":
                            nameStage = "QUARTAS";
                            break;
                        case "SEMIFINALS":
                            nameStage = "SEMI";
                            break;
                        case "FINAL":
                            nameStage = "FINAL";
                            break;                            
                    }
                    $('#inputGroupSelect03').append($('<option>', { 
                        value: item.id,
                        text : nameStage
                    }));
                });                         
            });
            searchCurrent_stage(parseInt($('#inputGroupSelect01').val()), parseInt($('#inputGroupSelect02').val()), function(stage){
                $('#current-stage').val(stage.id);
            });                    
        }
    });
    $('#inputGroupSelect03').change(function() {
        insert_competes([], 1);
        if($(this).val() != $('#current-stage').val())
            $('#current-stage').prop('checked', false);
        else
            $('#current-stage').prop('checked', true);       
        $('#inputGroupSelect04').html(`<option selected value="0">Grupo/Chave</option>`);
        if (parseInt($(this).val()) != 0) {     
            list_brackets(parseInt($('#inputGroupSelect01').val()), parseInt($('#inputGroupSelect02').val()), parseInt($(this).val()), function(brackets){
                $.each(brackets, function (i, item) {
                    $('#inputGroupSelect04').append($('<option>', { 
                        value: item.id,
                        text : item.name
                    }));
                });                
            });
        }
    });
    $('#inputGroupSelect04').change(function() {
        if (parseInt($(this).val()) != 0) {     
            listAllBracket_competes(parseInt($('#inputGroupSelect01').val()), parseInt($('#inputGroupSelect02').val()), parseInt($('#inputGroupSelect03').val()), parseInt($(this).val()), function(competes){
                insert_competes(competes, 1);
            });
        }
    });
};

function insert_competes(competes, page){
    var trs = ``;
    if(page == 1 || competes.length / 4 > (page - 1)){
        for (var i = (page - 1) * 4; i < competes.length && i < page * 4; i++) {
            trs += `<tr>
                <th scope="row">
                    <input title="Esse campo não pode ser alterado" type="text" readonly="true"
                    name="team" id="team-${competes[i].id}" class="tab-input form-control" value="${competes[i].team.name}" />
                </th>
                <th scope="row">
                    <input title="Esse campo não pode ser alterado" type="text" readonly="true"
                    name="bracket" id="bracket-${competes[i].id}" class="tab-input form-control" value="${competes[i].bracket.name}" />
                </th>
                <th scope="row">
                    <select title="Dê dois cliques para alterar" type="text"  onchange="edit_competes(${parseInt(competes[i].bracket.stage.modality.championship.id)}, ${parseInt(competes[i].bracket.stage.modality.id)}, ${parseInt(competes[i].bracket.stage.id)}, ${parseInt(competes[i].bracket.id)}, ${parseInt(competes[i].team.id)}, ${parseInt(competes[i].id)}, $('#points-${competes[i].id}').val(), $('#result-${competes[i].id}').val(), ()=>{});"
                    name="result" id="result-${competes[i].id}" class="tab-select form-control" value="${competes[i].typeCompetition}">
                        <option ${competes[i].result != 'APPROVED'? 'selected': ''} value="DISAPPROVED">REPROVADO</option>
                        <option ${competes[i].result == 'APPROVED'? 'selected': ''} value="APPROVED">APROVADO</option>
                    </select>
                </th>
                <th scope="row">
                    <input title="Dê dois cliques para alterar" type="text" readonly="true" ondblclick="this.readOnly='';" onkeydown = "
                        if (event.keyCode == 13){
                            this.readOnly='true';
                            edit_competes(${parseInt(competes[i].bracket.stage.modality.championship.id)}, ${parseInt(competes[i].bracket.stage.modality.id)}, ${parseInt(competes[i].bracket.stage.id)}, ${parseInt(competes[i].bracket.id)}, ${parseInt(competes[i].team.id)}, ${parseInt(competes[i].id)}, $('#points-${competes[i].id}').val(), $('#result-${competes[i].id}').val(), ()=>{});
                        }"
                    name="points" id="points-${competes[i].id}" class="tab-input form-control" value="${competes[i].points}" />
                </th>
            </tr>`;          
        };
        var nPages = parseInt(competes.length / 4) + (competes.length % 4 != 0 ? 1: 0);
        var btnPages = page != 1 ? `
            <li class="page-item">
                <a class="page-link" onclick="nextCompetes_page(${page - 1})" aria-label="Anterior">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>` : ``;                    
        for (var i = 1; i <= nPages; i++) {
            btnPages += page != i ? `
                <li class="page-item"><a class="page-link" onclick="nextCompetes_page(${i});">${i}</a></li>
                ` : `
                <li class="page-item"><a class="page-link" href="#" style="background-color: #0AB41E">${i}</a></li>
                `;   
        }
        btnPages += page < nPages ? `
            <li class="page-item">
                <a class="page-link" onclick="nextCompetes_page(${page + 1});" aria-label="Próximo">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>` : ``;
        $('#current-page').val(page);
        $('#pagination').html(btnPages);
    }
    $('#tab-competes').html(trs);
}
function nextCompetes_page(page){
    if(parseInt($('#inputGroupSelect04').val()) > 0){
        listAllBracket_competes(parseInt($('#inputGroupSelect01').val()), parseInt($('#inputGroupSelect02').val()), parseInt($('#inputGroupSelect03').val()), parseInt($('#inputGroupSelect04').val()), function(competes){
            insert_competes(competes, page);
        });
    }
}
function current_stage(check){
    if($(check).is(':checked')){
        $('#inputGroupSelect03').val($(check).val());
        $('#inputGroupSelect03').trigger("change");
    }
}
function selectorCompete(bracket){
    list_championships(function(champs){
        $.each(champs, function (i, item) {
            $('#inputGroupSelect01').html(`<option selected value="0">Campeonato</option>`);
            $('#inputGroupSelect01').append($('<option>', { 
                value: item.id,
                text : item.name
            }));
        });
        $('#inputGroupSelect01').val(bracket.stage.modality.championship.id);
        list_modalities(bracket.stage.modality.championship.id, function(modalities){
            $.each(modalities, function (i, item) {
                $('#inputGroupSelect02').append($('<option>', { 
                    value: item.id,
                    text : item.name
                }));
            });                         
            $('#inputGroupSelect02').val(bracket.stage.modality.id);
            searchCurrent_stage(parseInt($('#inputGroupSelect01').val()), parseInt($('#inputGroupSelect02').val()), function(stage){
                $('#current-stage').val(stage.id);
            });            
            list_stages(bracket.stage.modality.championship.id, bracket.stage.modality.id, function(stages){
                $.each(stages, function (i, item) {
                    let nameStage = "";
                    switch(item.nameStage){
                        case "GROUP":
                            nameStage = "GRUPO";
                            break;
                        case "ROUNDOF16":
                            nameStage = "OITAVAS";
                            break;
                        case "QUARTERFINALS":
                            nameStage = "QUARTAS";
                            break;
                        case "SEMIFINALS":
                            nameStage = "SEMI";
                            break;
                        case "FINAL":
                            nameStage = "FINAL";
                            break;                            
                    }
                    $('#inputGroupSelect03').append($('<option>', { 
                        value: item.id,
                        text : nameStage
                    }));
                });
                $('#inputGroupSelect03').val(bracket.stage.id);
                $('#current-stage').prop('checked', true);

            });            
            list_brackets(bracket.stage.modality.championship.id, bracket.stage.modality.id, bracket.stage.id, function(brackets){
                $.each(brackets, function (i, item) {
                    $('#inputGroupSelect04').append($('<option>', { 
                        value: item.id,
                        text : item.name
                    }));
                });
                $('#inputGroupSelect04').val(bracket.id);        
                $('#inputGroupSelect04').trigger("change");
            });
        });
    });    
}
function create_compete(){
    if(parseInt($('#inputGroupSelect02').val()) > 3){
        listAllStage_competes(parseInt($('#inputGroupSelect01').val()), parseInt($('#inputGroupSelect02').val()), parseInt($('#inputGroupSelect03').val()), function(competes){
            if(competes.length < 1){
                if(window.confirm('Click em "Ok" para confirmar a criação das competes da etapa corrente.') == true){
                    create_competes(parseInt($('#inputGroupSelect01').val()), parseInt($('#inputGroupSelect02').val()), ()=>{
                        $('#inputGroupSelect04').trigger("change");
                    });
                }
            }else{
                 if(length == 0){
                    if(window.confirm('Click em "Ok" para confirmar a criação das competes da etapa corrente.') == true){
                        create_competes(parseInt($('#inputGroupSelect01').val()), parseInt($('#inputGroupSelect02').val()), ()=>{
                            $('#inputGroupSelect04').trigger("change");
                        });
                    }
                }                
            }
        });
    }else{
        alert("Selecione a etapa!");
    }
}
