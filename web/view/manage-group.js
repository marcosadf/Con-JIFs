function manage_group(){
    let content = $("#screen");
    content.html(`
    <p class="nome"> Grupo / Chave</p>
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
        </div>
        <div class="dropdown">
            
        </div>
    </div>
    <table class="table table-striped">
        <thead>
            <th scope="row">
                <div class="aliamento">
                    <button class="btn" type="button" id="dropdownMenuButton" aria-expanded="false">
                     Nome
                    </button>
                </div>
            </th>
            <th scope="row">
                <div class="aliamento">
                    <button class="btn" type="button" id="dropdownMenuButton" aria-expanded="false">
                     Competição
                    </button>
                </div>
            </th>
            <th scope="row">
                <div class="aliamento">
                    <button class="btn" type="button" id="dropdownMenuButton" aria-expanded="false">
                     Partidas
                    </button>
                </div>
            </th>            
        </thead>
        <tbody id="tab-brackets">
            
        </tbody>
    </table>
    <ul id="pagination" class="pagination">
        
    </ul>
    <nav class="nav-screen">
        <button type="button" class="button" onclick="drop_stage()">
            <img style="width: 40px; height: 32px;" src="img/mais.png" height="80" width="100" />
            Excluir Etapas
        </button>      
        <button type="button" class="button" onclick="clearAll_bracket()">
            <img style="width: 40px; height: 32px;" src="img/mais.png" height="80" width="100" />
            Formatar grupos/chaves
        </button>          
        <button type="button" class="button" onclick="conclue_stage()">
            <img style="width: 40px; height: 32px;" src="img/mais.png" height="80" width="100" />
            Concluir Etapa
        </button>        
        <button type="button" class="button" onclick="create_bracket()">
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
        insert_brackets([], 1);
        $('#current-stage').prop('checked', false);
        $('#inputGroupSelect02').html(`<option selected value="0">Modalidade</option>`);
        if ($(this).val() != "0") {
            list_modalities(parseInt($('#inputGroupSelect01').val()), function(modalities){
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
        insert_brackets([], 1);
        $('#current-stage').prop('checked', false);
        $('#inputGroupSelect03').html(`<option selected value="0">Etapa</option>`);
        if ($(this).val() != "0") { 
            list_stages(parseInt($('#inputGroupSelect01').val()), parseInt($('#inputGroupSelect02').val()), function(stages){
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
            });
            searchCurrent_stage(parseInt($('#inputGroupSelect01').val()), parseInt($('#inputGroupSelect02').val()), function(stage){
                $('#current-stage').val(stage.id);
            });
        }
    });
    $('#inputGroupSelect03').change(function() {
        insert_brackets([], 1);
        if($(this).val() != $('#current-stage').val())
            $('#current-stage').prop('checked', false);
        else
            $('#current-stage').prop('checked', true);
        if ($(this).val() != "0") {     
            list_brackets($('#inputGroupSelect01').val(), $('#inputGroupSelect02').val(), $(this).val(), function(brackets){
                insert_brackets(brackets, 1);
            });
        }else{
            insert_brackets([], 1);
        }
    });
}
function insert_brackets(brackets, page){
    var trs = ``;
    if(page == 1 || brackets.length / 4 > (page - 1)){
        for (var i = (page - 1) * 4; i < brackets.length && i < page * 4; i++) {
            trs += `<tr>
                <th scope="row">
                    <input title="Dê dois cliques para alterar" type="text" readonly="true" ondblclick="this.readOnly='';" onkeydown = "
                        if (event.keyCode == 13){
                            this.readOnly='true';
                            edit_brackets(${parseInt(brackets[i].stage.modality.championship.id)}, ${parseInt(brackets[i].stage.modality.id)}, ${parseInt(brackets[i].stage.id)},${parseInt(brackets[i].id)}, $('#name-${brackets[i].id}').val(), $('#campus-${brackets[i].id}').val(), ()=>{});
                        }"
                    name="name" id="name-${brackets[i].id}" class="tab-input form-control" value="${brackets[i].name}" />
                </th>
                <th scope="row">
                    <button title="Clique para ir para a competição desse(a) grupo/chave" id="btn-competes-${brackets[i].id}" type="button" onclick="openCompetes_group(${parseInt(brackets[i].stage.modality.championship.id)}, ${parseInt(brackets[i].stage.modality.id)}, ${parseInt(brackets[i].stage.id)} ,${parseInt(brackets[i].id)})" name="compete" id="compete-${brackets[i].id}" class="form-control tab-link" style="text-decoration: underline; color: #F16868;">
                        Ir para Competição
                    </button>
                </th>
                <th scope="row">
                    <button title="Clique para ir para as partidas desse(a) grupo/chave" id="btn-match-${brackets[i].id}" type="button" onclick="openMatches_group(${parseInt(brackets[i].stage.modality.championship.id)}, ${parseInt(brackets[i].stage.modality.id)}, ${parseInt(brackets[i].stage.id)} ,${parseInt(brackets[i].id)})" name="compete" id="match-${brackets[i].id}" class="form-control tab-link" style="text-decoration: underline; color: #F16868;">
                        Ir para Partidas
                    </button>
                </th>                
            </tr>`;          
        };
        var nPages = parseInt(brackets.length / 4) + (brackets.length % 4 != 0 ? 1: 0);
        var btnPages = page != 1 ? `
            <li class="page-item">
                <a class="page-link" onclick="nextBrackets_page(${page - 1})" aria-label="Anterior">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>` : ``;                    
        for (var i = 1; i <= nPages; i++) {
            btnPages += page != i ? `
                <li class="page-item"><a class="page-link" onclick="nextBrackets_page(${i});">${i}</a></li>
                ` : `
                <li class="page-item"><a class="page-link" href="#" style="background-color: #0AB41E">${i}</a></li>
                `;   
        }
        btnPages += page < nPages ? `
            <li class="page-item">
                <a class="page-link" onclick="nextBrackets_page(${page + 1});" aria-label="Próximo">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>` : ``;
        $('#current-page').val(page);
        $('#pagination').html(btnPages);
    }
    $('#tab-brackets').html(trs);
}
function nextBrackets_page(page){
    if(parseInt($('#inputGroupSelect02').val()) > 0){
        list_brackets(parseInt($('#inputGroupSelect01').val()), parseInt($('#inputGroupSelect02').val()), parseInt($('#inputGroupSelect03').val()), function(brackets){
            insert_brackets(brackets, page);
        });
    }
}
function current_stage(check){
    if($(check).is(':checked')){
        $('#inputGroupSelect03').val($(check).val());
        $('#inputGroupSelect03').trigger("change");
    }
}

function openCompetes_group(championshipId, modalityId, stageId, bracketId) {
    search_brackets(championshipId, modalityId, stageId, bracketId, (bracket)=>{
        $.when(
            manage_compete,
            selectorCompete
        ).done(function(fn1, fn2){
            fn1();
            fn2(bracket);
        });        
    });
}
function openMatches_group(championshipId, modalityId, stageId, bracketId) {
    search_brackets(championshipId, modalityId, stageId, bracketId, (bracket)=>{
        $.when(
            manage_match,
            selectorMatch
        ).done(function(fn1, fn2){
            fn1();
            fn2(bracket);
        });        
    });
}
function create_bracket(){
    if(window.confirm('Click em "Ok" para confirmar a criação de nova etapa.') == true){
        create_stages(parseInt($('#inputGroupSelect01').val()), parseInt($('#inputGroupSelect02').val()), (staeg)=>{
            $('#inputGroupSelect03').html(`<option selected value="0">Etapa</option>`);
            if ($('#inputGroupSelect02').val() != "0") { 
                list_stages(parseInt($('#inputGroupSelect01').val()), parseInt($('#inputGroupSelect02').val()), function(modalities){
                    $.each(modalities, function (i, item) {
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
            }            
            create_brackets(parseInt($('#inputGroupSelect01').val()), parseInt($('#inputGroupSelect02').val()), (brackets)=>{
                console.log(brackets)
            });
            $('#inputGroupSelect02').trigger("change");
        });      
    }
}
function conclue_stage(){
    search_stages(parseInt($('#inputGroupSelect01').val()), parseInt($('#inputGroupSelect02').val()), parseInt($('#inputGroupSelect03').val()), (stageSearch)=>{
        if (stageSearch.concluded != true) {
            if(window.confirm('Click em "Ok" para concluir essa etapa') == true)
                setConcluded_stages(stageSearch.modality.championship.id, stageSearch.modality.id, stageSearch.id, (stage)=>{});
        }else{
            if(window.confirm('Click em "Ok" para abrir novamente essa etapa') == true)
                edit_stages(stageSearch.modality.championship.id, stageSearch.modality.id, stageSearch.id, stageSearch.nameStage, false, (stage)=>{});
        }
    });
}
function clearAll_bracket(){
    if(window.confirm('Click em "Ok" para formatar grupos/chaves dessa etapa') == true)
        search_stages(parseInt($('#inputGroupSelect01').val()), parseInt($('#inputGroupSelect02').val()), parseInt($('#inputGroupSelect03').val()), (stageSearch)=>{
            clearAll_brackets(stageSearch.modality.championship.id, stageSearch.modality.id, stageSearch.id, (brackets)=>{
                $('#inputGroupSelect03').trigger("change");
            });
        });    
}
function drop_stage(){
    search_stages(parseInt($('#inputGroupSelect01').val()), parseInt($('#inputGroupSelect02').val()), parseInt($('#inputGroupSelect03').val()), (stageSearch)=>{
        if(stageSearch.nameStage != "GROUP"){
            if(window.confirm('Click em "Ok" para confirmar a exclusão dessa etapa e todas subsequentes.') == true){
                drop_stages(parseInt($('#inputGroupSelect01').val()), parseInt($('#inputGroupSelect02').val()), parseInt($('#inputGroupSelect03').val()), ()=>{
                    $('#inputGroupSelect02').trigger("change");
                });
            }
        }else{
            if(window.confirm('Click em "Ok" para confirmar a exclusão de todas as etapas de chaveamento.') == true){
                drop_stages(parseInt($('#inputGroupSelect01').val()), parseInt($('#inputGroupSelect02').val()), parseInt($('#inputGroupSelect03').val()), ()=>{
                    $('#inputGroupSelect02').trigger("change");
                });
            }
         }
    });
}