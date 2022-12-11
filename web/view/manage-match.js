function manage_match() {
    let content = $("#screen");
    content.html(`
   <p class="nome"> Partida</p>
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
                             Disputa
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
                             Data
                            </button>
                        </div>
                    </th>
                    <th scope="row">
                        <div class="aliamento">
                            <button class="btn" type="button" id="dropdownMenuButton" aria-expanded="false">
                             Local
                            </button>
                        </div>
                    </th>
                    <th scope="row">
                    </th>                    
                </tr>
           </thead> 
            <tbody id="tab-matches">
            </tbody>
        </table>
        <ul id="pagination" class="pagination">
            
        </ul>

        <nav class="nav-screen">
            <button type="button" class="button" onclick="create_match()">
                <img style="width: 40px; height: 32px;" src="img/mais.png" height="80" width="100" />
                Criar
            </button>
        </nav>
        <div class="modal fade" id="myModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Disputas</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    </div>
                    <div class="container"></div>
                    <div class="modal-body">
                        <input type="hidden" hidden id="cad-match" value="0"/>
                        <table class="table table-striped">
                            <thead>
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
                                         Pontos
                                        </button>
                                    </div>
                                </th>
                            </thead>
                            <tbody id="tab-disputes">
                                
                            </tbody>
                        </table>
                    </div>
                    <div class="modal-footer">  
                        <a data-toggle="modal" href="#myModal2" class="btn btn-primary" title="Clique para abrir janela com a disputa" type="button" class="form-control tab-link" onclick="openAdd_dispute()">Adicionar Disputa</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="myModal2">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Cadastro de Disputa</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>

                    </div>
                    <div class="container"></div>
                    <div class="modal-body">
                        <form id="Cadastro" method="post" action="#">
                            <div class="form-group cadastro" style="width: 20rem">
                                <label for="team">Time</label>
                                <select class="form-control campo" id="cad-team"
                                     required>
                                    <option value="0">Selecione</option>
                                </select>                                            
                            </div>
                            <div class="form-group cadastro" style="width: 20rem">
                                <label for="points">Pontuação</label>
                                <input type="text" class="form-control campo" id="cad-points"
                                    placeholder="Digite pontuação" required>
                            </div>
                       </form>
                    </div>
                    <div class="modal-footer">
                        <a data-dismiss="modal" type="button" class="btn btn-primary" onclick="add_dispute(parseInt($('#cad-team').val()), parseInt($('#cad-points').val()))" href="#" class="form-control tab-link">Savar Disputada</a>
                    </div>
                </div>
            </div>
        </div>
    `);
     $('#openBtn').click(function () {
        $('#myModal').modal()
    });

    $('.modal')
        .on({
            'show.bs.modal': function() {
                var idx = $('.modal:visible').length;
                $(this).css('z-index', 1040 + (10 * idx));
            },
            'shown.bs.modal': function() {
                var idx = ($('.modal:visible').length) - 1; // raise backdrop after animation.
                $('.modal-backdrop').not('.stacked')
                .css('z-index', 1039 + (10 * idx))
                .addClass('stacked');
            },
            'hidden.bs.modal': function() {
                if ($('.modal:visible').length > 0) {
                    // restore the modal-open class to the body element, so that scrolling works
                    // properly after de-stacking a modal.
                    setTimeout(function() {
                        $(document.body).addClass('modal-open');
                    }, 0);
                }
            }
        });
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
        insert_matches([], 1);
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
        insert_matches([], 1);
        $('#current-stage').prop('checked', false);
        $('#inputGroupSelect03').html(`<option selected value="0">Etapa</option>`);
        if (parseInt($(this).val()) != 0) { 
            list_stages(parseInt($('#inputGroupSelect01').val()), parseInt($('#inputGroupSelect02').val()), function(matches){
                $.each(matches, function (i, item) {
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
            })            
        }
    });
    $('#inputGroupSelect03').change(function() {
        insert_matches([], 1);
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
        insert_matches([], 1);
        if (parseInt($(this).val()) != 0) {     
            listAllBracket_matches(parseInt($('#inputGroupSelect01').val()), parseInt($('#inputGroupSelect02').val()), parseInt($('#inputGroupSelect03').val()), parseInt($(this).val()), function(matches){
                insert_matches(matches, 1);
            });
        }
    });
};

function insert_matches(matches, page){
    var trs = ``;
    if(page == 1 || matches.length / 4 > (page - 1)){
        for (var i = (page - 1) * 4; i < matches.length && i < page * 4; i++) {
            trs += `<tr>
                <th scope="row">
                    <a id="btn-disputes-${matches[i].id}" data-toggle="modal" href="#myModal" title="Clique para abrir janela com a disputa" id="btn-disputes-${matches[i].id}" type="button" onclick="openDisputes_match(${matches[i].bracket.stage.modality.championship.id}, ${matches[i].bracket.stage.modality.id}, ${matches[i].bracket.stage.id}, ${matches[i].bracket.id}, ${matches[i].id})" class="form-control tab-link" style="text-decoration: underline; color: #F16868;">
                    </a>             
                </th>
                <th scope="row">
                    <input title="Esse campo não pode ser alterado" type="text" readonly="true" title="Campo não pode ser alterado"
                    name="bracket" id="bracket-${matches[i].id}" class="tab-input form-control" value="${matches[i].bracket.name}" />
                </th>
                <th scope="row">
                    <input title="Dê dois cliques para alterar" type="text" readonly="true" ondblclick="this.readOnly='';" onkeydown = "
                        if (event.keyCode == 13){
                            this.readOnly='true';
                            edit_matches(${matches[i].bracket.stage.modality.championship.id}, ${matches[i].bracket.stage.modality.id}, ${matches[i].bracket.stage.id}, ${matches[i].bracket.id}, ${matches[i].id}, $('#date-${matches[i].id}').val(), $('#locale-${matches[i].id}').val(), ()=>{});
                        }"
                    name="date" id="date-${matches[i].id}" class="tab-input form-control" value="${formatDate(matches[i].dateTime, true)}" />
                </th>
                <th scope="row">
                    <input title="Dê dois cliques para alterar" type="text" readonly="true" ondblclick="this.readOnly='';" onkeydown = "
                        if (event.keyCode == 13){
                            this.readOnly='true';
                            edit_matches(${matches[i].bracket.stage.modality.championship.id}, ${matches[i].bracket.stage.modality.id}, ${matches[i].bracket.stage.id}, ${matches[i].bracket.id}, ${matches[i].id}, $('#date-${matches[i].id}').val(), $('#locale-${matches[i].id}').val(), ()=>{});
                        }"
                    name="locale" id="locale-${matches[i].id}" class="tab-input form-control" value="${matches[i].locale}" />
                </th>
                <th scope="row">
                    <a title="Clique para formatar os dados da partida" onclick="clear_match(${matches[i].id})">
                        <img style="width: 30px;" src="img/lixo.png">
                    </a>
                </th>                
            </tr>`;          
        };
        var nPages = parseInt(matches.length / 4) + (matches.length % 4 != 0 ? 1: 0);
        var btnPages = page != 1 ? `
            <li class="page-item">
                <a class="page-link" onclick="nextMatches_page(${page - 1})" aria-label="Anterior">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>` : ``;                    
        for (var i = 1; i <= nPages; i++) {
            btnPages += page != i ? `
                <li class="page-item"><a class="page-link" onclick="nextMatches_page(${i});">${i}</a></li>
                ` : `
                <li class="page-item"><a class="page-link" href="#" style="background-color: #0AB41E">${i}</a></li>
                `;   
        }
        btnPages += page < nPages ? `
            <li class="page-item">
                <a class="page-link" onclick="nextMatches_page(${page + 1});" aria-label="Próximo">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>` : ``;
        $('#current-page').val(page);
        $('#pagination').html(btnPages);
    }
    $('#tab-matches').html(trs);
    $.each(matches, function(i, match){
        searchAllMatch_disputes(match.bracket.stage.modality.championship.id, match.bracket.stage.modality.id, match.bracket.stage.id, match.bracket.id, match.id, (disputes)=>{
            if(disputes.length == 1){
                $('#btn-disputes-'+ match.id).html(disputes[0].team.name);
                $('#btn-disputes-'+ match.id).attr('title', disputes[0].team.name);
            }
            else if(disputes.length == 2){
                $('#btn-disputes-'+ match.id).html(`${disputes[0].team.name}  X  ${disputes[1].team.name}`);
                $('#btn-disputes-'+ match.id).attr('title', `${disputes[0].team.name}  X  ${disputes[1].team.name}`);
            }
        });
    });
}
function selectorMatch(bracket){
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
                listAllBracket_matches(parseInt($('#inputGroupSelect01').val()), parseInt($('#inputGroupSelect02').val()), parseInt($('#inputGroupSelect03').val()), parseInt($(this).val()), function(matches){
                    insert_matches(matches, 1);
                });                
            });
        });
    });    
}
function nextMatches_page(page){
    if(parseInt($('#inputGroupSelect04').val()) > 0){
        listAllBracket_matches(parseInt($('#inputGroupSelect01').val()), parseInt($('#inputGroupSelect02').val()), parseInt($('#inputGroupSelect03').val()), parseInt($('#inputGroupSelect04').val()), function(matches){
            insert_matches(matches, page);
        });
    }
}
function current_stage(check){
    if($(check).is(':checked')){
        $('#inputGroupSelect03').val($(check).val());
        $('#inputGroupSelect03').trigger("change");
    }
}
function openDisputes_match(championshipId, modalityId, stageId, bracketId, matchId) {
    $('#cad-match').val(matchId);
    searchAllMatch_disputes(championshipId, modalityId, stageId, bracketId, matchId, (disputes)=>{
        insert_disputes(disputes);
    });
}
function openAdd_dispute(){
    listAllBracket_competes(parseInt($('#inputGroupSelect01').val()), parseInt($('#inputGroupSelect02').val()), parseInt($('#inputGroupSelect03').val()), parseInt($('#inputGroupSelect04').val()), function(competes){
        $('#cad-team').html(`<option selected value="0">Selecione</option>`);
        $.each(competes, function (i, item) {
            $('#cad-team').append($('<option>', { 
                value: item.team.id,
                text : item.team.name
            }));
        });
    });
}
function add_dispute(){
    searchAllMatch_disputes(parseInt($('#inputGroupSelect01').val()), parseInt($('#inputGroupSelect02').val()), parseInt($('#inputGroupSelect03').val()), parseInt($('#inputGroupSelect04').val()), parseInt($('#cad-match').val()), function(disputesSc){
        if(disputesSc.length < 2){
            if(window.confirm('Click em "Ok" para confirmar a criação de disputa') == true)
                add_disputes(parseInt($('#inputGroupSelect01').val()), parseInt($('#inputGroupSelect02').val()), parseInt($('#inputGroupSelect03').val()), parseInt($('#inputGroupSelect04').val()), parseInt($('#cad-match').val()), parseInt($('#cad-team').val()), $('#cad-points').val(), function(){
                    searchAllMatch_disputes(parseInt($('#inputGroupSelect01').val()), parseInt($('#inputGroupSelect02').val()), parseInt($('#inputGroupSelect03').val()), parseInt($('#inputGroupSelect04').val()), parseInt($('#cad-match').val()), function(disputesPs){
                        insert_disputes(disputesPs);
                    });
                });
        }else{
            alert("Uma partida não pode ser disputada por mais de dois times!");
        }
    });
}
function create_match(){
        if(parseInt($('#inputGroupSelect04').val()) > 0){
        listAllBracket_matches(parseInt($('#inputGroupSelect01').val()), parseInt($('#inputGroupSelect02').val()), parseInt($('#inputGroupSelect03').val()), parseInt($('#inputGroupSelect04').val()), function(matches){
            if(matches.length == 0){
                if(window.confirm('Click em "Ok" para confirmar a criação das partidas da etapa corrente.') == true){
                    create_matches(parseInt($('#inputGroupSelect01').val()), parseInt($('#inputGroupSelect02').val()), ()=>{
                        $('#inputGroupSelect04').trigger("change");
                    });
                }
            }else{
                alert("Já existem partidas criadas.")
            }
        });
    }else{
        alert("Selecione o(a) grupo/chave!");
    }

}
function clear_match(matchId){
    if(window.confirm('Click em "Ok" para confirmar a exclusão do conteudo da fase.') == true){
        clear_matches(parseInt($('#inputGroupSelect01').val()), parseInt($('#inputGroupSelect02').val()), parseInt($('#inputGroupSelect03').val()), parseInt($('#inputGroupSelect04').val()), matchId, ()=>{
            $('#inputGroupSelect04').trigger("change");
        });
    }
}