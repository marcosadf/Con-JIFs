function manage_team(){
    let content = $("#screen");
    content.html(`
    <p class="nome"> Time</p>
    <div>
        <input type="hidden" hidden id="current-page" value="1"/>
        <select class="custom-select btn-verde" id="inputGroupSelect01">
            <option selected value="0">Campeonato</option>
          </select>
          <select class="custom-select btn-verde" id="inputGroupSelect02">
            <option selected value="0">Modalidade</option>
          </select>
          <select class="custom-select btn-verde" id="inputGroupSelect03">
            <option selected value="0">Grupo</option>
          </select>
            </div>
        </div>
        </div>
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
                     Campus
                    </button>
                   </div>
                </th>
                <th scope="row">
                    <div class="aliamento">
                    <button class="btn  dropdown-toggle " type="button" id="dropdownMenuButton" aria-expanded="false">
                     Nome
                    </button>
                </div>
                </th>
            </thead>
            <tbody id="tab-teams">
            
            </tbody>
        </table>
        <nav aria-label="Navegação de página exemplo">
            <ul class="pagination">
                
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
                            <h5 class="modal-title" id="TituloModalCentralizado">Cadastrar Time</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                              <form id="Cadastro" method="post" action="#">
                                    <div class="form-group cadastro" style="width: 20rem">
                                        <label for="campus">Campus</label>
                                        <input type="text" class="form-control campo" id="cad-campus"
                                            placeholder="Digite o campus" required>
                                    </div>
                                    <div class="form-group cadastro" style="width: 20rem">
                                        <label for="name">Nome</label>
                                        <input type="text" class="form-control campo" id="cad-name"
                                            placeholder="Digite nome" required>
                                    </div>                                    
                               </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" data-dismiss="modal" onclick="save_team($('#cad-name').val(), $('#cad-campus').val())" class="buttonsal">Salvar </button>
                        </div>                        
                    </div>
                </div>
            </div>
        </nav>
    </div>
    </div>
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
        $('#inputGroupSelect03').html(`<option selected value="0">Grupo</option>`);
        if ($(this).val() != "0") { 
            listGroup_brackets($('#inputGroupSelect01').val(), $(this).val(), function(groups){
                $.each(groups, function (i, item) {
                    $('#inputGroupSelect03').append($('<option>', { 
                        value: item.id,
                        text : item.name
                    }));
                });
            });
            list_teams($('#inputGroupSelect01').val(), $(this).val(), function(teams){
                insert_teams(teams, 1);
            });
        }
    });  
    $('#inputGroupSelect03').change(function() {
        if ($(this).val() != "0") {
            listAllForGroup_teams($('#inputGroupSelect01').val(), $('#inputGroupSelect02').val(), $(this).val(), function(teams){
                insert_teams(teams, 1);
            });            
        }
    });
}

function insert_teams(teams, page){
    if(page == 1 || teams.length / 4 > (page - 1)){
        var trs = ``;
        for (var i = (page - 1) * 4; i < teams.length && i < page * 4; i++) {
            trs += `<tr>
                <th scope="row">
                    <input type="text" readonly="true" ondblclick="this.readOnly='';" onkeydown = "
                        if (event.keyCode == 13){
                            this.readOnly='true';
                            edit_teams(${parseInt(teams[i].modality.championship.id)}, ${parseInt(teams[i].modality.id)}, ${parseInt(teams[i].id)}, $('#name-${teams[i].id}').val(), $('#campus-${teams[i].id}').val(), ()=>{});
                        }"
                    name="campus" id="campus-${teams[i].id}" class="tab-input form-control" value="${teams[i].campus}" />
                </th>
                <th scope="row">
                    <input type="text" readonly="true" ondblclick="this.readOnly='';" onkeydown = "
                        if (event.keyCode == 13){
                            this.readOnly='true';
                            edit_teams(${parseInt(teams[i].modality.championship.id)}, ${parseInt(teams[i].modality.id)}, ${parseInt(teams[i].id)}, $('#name-${teams[i].id}').val(), $('#campus-${teams[i].id}').val(), ()=>{});
                        }"
                    name="name" id="name-${teams[i].id}" class="tab-input form-control" value="${teams[i].name}" />
                </th>
                <th scope="row" width="5" rowspan="1">
                    <a onclick="delete_team(${page}, ${parseInt(teams[i].id)})"">
                        <img style="width: 30px;" src="img/lixo.png">
                    </a>
                </th>
            </tr>`;          
        };
        $('#tab-teams').html(trs);
        var nPages = parseInt(teams.length / 4) + (teams.length % 4 != 0 ? 1: 0);
        var btnPages = page != 1 ? `
            <li class="page-item">
                <a class="page-link" onclick="nextTeam_page(${page - 1})" aria-label="Anterior">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>` : ``;                    
        for (var i = 1; i <= nPages; i++) {
            btnPages += page != i ? `
                <li class="page-item"><a class="page-link" onclick="nextTeam_page(${i});">${i}</a></li>
                ` : `
                <li class="page-item"><a class="page-link" href="#" style="background-color: #0AB41E">${i}</a></li>
                `;   
        }
        btnPages += page < nPages ? `
            <li class="page-item">
                <a class="page-link" onclick="nextTeam_page(${page + 1});" aria-label="Próximo">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>` : ``;
        $('#current-page').val(page);
        $('#pagination').html(btnPages);
    }
}
function nextTeam_page(page){
    if(parseInt($('#inputGroupSelect03').val()) > 0){
        listAllForGroup_teams(parseInt($('#inputGroupSelect01').val()), parseInt($('#inputGroupSelect02').val()), parseInt($('#inputGroupSelect03').val()), function(teams){
            insert_teams(teams, page);
        }); 
    }else{
        list_teams(parseInt($('#inputGroupSelect01').val()), parseInt($('#inputGroupSelect02').val()), function(teams){
            insert_teams(teams, page);
        });
    }
}
function save_team(name, campus){
    if(window.confirm('Click em "Ok" para confirmar a adição do time.') == true){
        add_teams(parseInt($('#inputGroupSelect01').val()), parseInt($('#inputGroupSelect02').val()) , name, campus, ()=>{
           nextTeam_page(parseInt($('#current-page').val()));
        });
    }
}

function delete_team(page, teamId){
    if(window.confirm('Click em "Ok" para confirmar a exclusão do time.') == true){
        delete_teams(parseInt($('#inputGroupSelect01').val()), parseInt($('#inputGroupSelect02').val()), teamId, ()=>{
            nextTeam_page(parseInt($('#current-page').val()));
        });
    }
}