function manage_modality(){
    let content = $("#screen");
    content.html(`
     <p class="nome"> Modalidade</p>
    <div>
        <input type="hidden" hidden id="current-page" value="1"/>
        <select class="custom-select btn-verde" id="inputGroupSelect01">
          <option value="0" selected >Campeonato</option>
        </select>
    
            <div class="dropdown">
                <div class="divBusca">
                    <input type="text" class="txtBusca" placeholder="Buscar..." />
                    <img style="width: 30px;" src="img/lupa.png" id="btnBusca" alt="Buscar" />
                </div> 
                
            </div>
            </div> 
         <table class="table table-striped">
            <thead>
                <th scope="row">
                    <div class="aliamento">
                        <button class="btn  dropdown-toggle " type="button" id="dropdownMenuButton" aria-expanded="false">
                         Nome
                        </button>
                    </div>
                </th>
                <th scope="row">
                    <div class="aliamento">
                        <button class="btn  dropdown-toggle " type="button" id="dropdownMenuButton" aria-expanded="false">
                         Tipo
                        </button>
                    </div>
                </th>
                <th scope="row">
                    <div class="aliamento">
                        <button class="btn  dropdown-toggle " type="button" id="dropdownMenuButton" aria-expanded="false">
                         Nº de times por grupo
                        </button>
                    </div>
                </th>
                <th scope="row">
                    <div class="aliamento">
                        <button class="btn  dropdown-toggle " type="button" id="dropdownMenuButton" aria-expanded="false">
                         Nº de times aprovados
                        </button>
                    </div>
                </th>
            </thead>
                <tbody id="tab-modalities">
                    
                </tbody>
            </table>
            <nav aria-label="Navegação de página exemplo">
                <ul class="pagination" id="pagination">
                    
                </ul>
                <button type="button" class="button" data-toggle="modal" data-target="#ExemploModalCentralizado">
                    <img style="width: 40px; height: 32px;" src="img/mais.png" height="80" width="100" />
                    Adicionar
                </button>
                <!-- Modal -->
                <div class="modal fade" id="ExemploModalCentralizado" tabindex="-1" role="dialog"
                    aria-labelledby="TituloModalCentralizado" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="TituloModalCentralizado">Cadastrar Modalidade</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form id="Cadastro" method="post" action="#">
                                    <div class="form-group cadastro" style="width: 20rem">
                                        <label for="name">Nome</label>
                                        <input type="text" class="form-control campo" id="cad-name"
                                            placeholder="Digite nome " required>
                                    </div>
                                    <div class="form-group cadastro" style="width: 20rem">
                                        <label for="type">Tipo</label>
                                        <select class="form-control campo" id="cad-type"
                                             required>
                                            <option value="0">Selecione</option>
                                            <option value="GROUP">GRUPOS</option>
                                            <option value="BRACKET">CHAVES</option>
                                            <option value="MIXED">MIXTO</option>
                                        </select>                                            
                                    </div>
                                    <div class="form-group cadastro" style="width: 20rem">
                                        <label for="groupTeamsNumber">Nº de times por grupos</label>
                                        <input type="text" class="form-control campo" id="cad-ngroup"
                                            placeholder="Digite nº de times por grupos" required>
                                    </div>
                                    <div class="form-group cadastro" style="width: 20rem">
                                        <label for="groupApprovedNumber">Nº de times aprovados</label>
                                        <input type="text" class="form-control campo" id="cad-nteam"
                                            placeholder="Digite nº de times aprovados" required>
                                    </div>                                    
                               </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" data-dismiss="modal" onclick="save_modality($('#cad-name').val(), $('#cad-type').val(), parseInt($('#cad-nteam').val()), parseInt($('#cad-ngroup').val()))" class="buttonsal">Salvar </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    </div>
    `);
    
    list_championships(function(champs){
        $('#inputGroupSelect01').html(`<option selected value="0">Campeonato</option>`);
        $.each(champs, function (i, item) {
            $('#inputGroupSelect01').append($('<option>', { 
                value: item.id,
                text : item.name
            }));
        });
    });
    $('#inputGroupSelect01').change(function() {
        if ($(this).val() != "0") {
            list_modalities(parseInt($('#inputGroupSelect01').val()), function(modalities){
                insert_modalities(modalities, 1);             
            });
        }
    });
    document.getElementById("screen").addEventListener('click', function(e) {
        $.each($('.tab-input'), function(i, input){
            if(e.target != input && $(input).attr('readonly') != "readonly") {
                $(input).trigger($.Event("keydown", {keyCode: 13}))
            } 
        });      
    });
}
function insert_modalities(modalities, page){
    if(page == 1 || modalities.length / 4 > (page - 1)){
        var trs = ``;
        for (var i = (page - 1) * 4; i < modalities.length && i < page * 4; i++) {
            trs += `<tr>
                <th scope="row">
                    <input type="text" readonly="true" ondblclick="this.readOnly='';" onkeydown = "
                        if (event.keyCode == 13){
                            this.readOnly='true';
                            edit_modalities(${parseInt(modalities[i].championship.id)}, ${parseInt(modalities[i].id)}, $('#name-${modalities[i].id}').val(), $('#type-${modalities[i].id}').val(), $('#ngroup-${modalities[i].id}').val(), $('#napprov-${modalities[i].id}').val(), ()=>{});
                        }"
                    name="name" id="name-${modalities[i].id}" class="tab-input form-control" value="${modalities[i].name}" />
                </th>
                <th scope="row">
                    <select type="text"  onchange="edit_modality(${parseInt(modalities[i].championship.id)}, ${parseInt(modalities[i].id)}, $('#name-${modalities[i].id}').val(), $('#type-${modalities[i].id}').val(), $('#ngroup-${modalities[i].id}').val(), $('#napprov-${modalities[i].id}').val(), ()=>{});"
                    name="type" id="type-${modalities[i].id}" class="tab-select form-control" value="${modalities[i].typeCompetition}">
                        <option >Selecione</option>
                        <option ${modalities[i].typeCompetition == 'GROUP'? 'selected': ''} value="GROUP">GRUPOS</option>
                        <option ${modalities[i].typeCompetition == 'BRACKET'? 'selected': ''} value="BRACKET">CHAVES</option>
                        <option ${modalities[i].typeCompetition == 'MIXED'? 'selected': ''} value="MIXED">MIXTO</option>
                    </select>
                </th>
                <th scope="row">
                    <input type="text" readonly="true" ondblclick="this.readOnly='';" onkeydown = "
                        if (event.keyCode == 13){
                            this.readOnly='true';
                            edit_modalities(${parseInt(modalities[i].championship.id)}, ${parseInt(modalities[i].id)}, $('#name-${modalities[i].id}').val(), $('#type-${modalities[i].id}').val(), $('#ngroup-${modalities[i].id}').val(), $('#napprov-${modalities[i].id}').val(), ()=>{});
                        }"
                    name="ngroup" id="ngroup-${modalities[i].id}" class="tab-input form-control" value="${modalities[i].groupTeamsNumber}" />
                </th>
                <th scope="row">
                    <input type="text" readonly="true" ondblclick="this.readOnly='';" onkeydown = "
                        if (event.keyCode == 13){
                            this.readOnly='true';
                            edit_modalities(${parseInt(modalities[i].championship.id)}, ${parseInt(modalities[i].id)}, $('#name-${modalities[i].id}').val(), $('#type-${modalities[i].id}').val(), $('#ngroup-${modalities[i].id}').val(), $('#napprov-${modalities[i].id}').val(), ()=>{});
                        }"
                    name="napprov" id="napprov-${modalities[i].id}" class="tab-input form-control" value="${modalities[i].groupApprovedNumber}" />
                </th>
                <th scope="row" width="5" rowspan="1">
                    <a onclick="delete_modality(${page}, ${parseInt(modalities[i].id)})"">
                        <img style="width: 30px;" src="img/lixo.png">
                    </a>
                </th>
            </tr>`;          
        };
        $('#tab-modalities').html(trs);
        var nPages = parseInt(modalities.length / 4) + (modalities.length % 4 != 0 ? 1: 0);
        var btnPages = page != 1 ? `
            <li class="page-item">
                <a class="page-link" onclick="nextModality_page(${page - 1})" aria-label="Anterior">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>` : ``;                    
        for (var i = 1; i <= nPages; i++) {
            btnPages += page != i ? `
                <li class="page-item"><a class="page-link" onclick="nextModality_page(${i});">${i}</a></li>
                ` : `
                <li class="page-item"><a class="page-link" href="#" style="background-color: #0AB41E">${i}</a></li>
                `;   
        }
        btnPages += page < nPages ? `
            <li class="page-item">
                <a class="page-link" onclick="nextModality_page(${page + 1});" aria-label="Próximo">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>` : ``;
        $('#current-page').val(page);
        $('#pagination').html(btnPages);
    }
}
function nextModality_page(page){
        list_modalities(parseInt($('#inputGroupSelect01').val()), function(modalities){
            insert_modalities(modalities, page);
        });
}
function edit_modality(championshipId, modalityId, name, typeCompetition, groupTeamsNumber, groupApprovedNumber){
   edit_modalities(championshipId, modalityId, name, typeCompetition, groupTeamsNumber, groupApprovedNumber, ()=>{});
}
function save_modality(name, typeCompetition, groupTeamsNumber, groupApprovedNumber){
    if(window.confirm('Click em "Ok" para confirmar a adição da modalidade.') == true){
        add_modalities(parseInt($('#inputGroupSelect01').val()) , name, typeCompetition, groupTeamsNumber, groupApprovedNumber, ()=>{
            list_modalities(parseInt($('#inputGroupSelect01').val()), function(modalities){
                insert_modalities(modalities, $('#current-page').val());
            });            
        });
    }
}

function delete_modality(page, modalityId){
    if(window.confirm('Click em "Ok" para confirmar a exclusão da modalidade.') == true){
        delete_modalities(parseInt($('#inputGroupSelect01').val()), modalityId, ()=>{
            list_modalities(parseInt($('#inputGroupSelect01').val()), function(modalities){
                insert_modalities(modalities, page);
            });            
        });
    }
}