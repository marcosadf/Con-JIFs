function manage_championship(){
    let content = $("#screen");
    content.html(`
     <p class="nome"> Campeonato</p>
     <div class="nav-screen-top">
        <input type="hidden" hidden id="current-page" value="1"/>
        <di></di>
        <div class="dropdown">
            <div class="divBusca">
                <input id="txtBusca" type="text" onkeydown="
                        if (event.keyCode == 13){
                            nextChampionship_page(parseInt($('#current-page').val()));
                        }
                    "
                 class="txtBusca" placeholder="Buscar..." />
                <img src="img/lupa.png" onclick="nextChampionship_page(parseInt($('#current-page').val()));" id="btnBusca" alt="Buscar" />
            </div> 
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
            </thead>
                <tbody id="tab-championships">
                    
                </tbody>
            </table>
            <ul class="pagination" id="pagination">
                
            </ul>
            <nav class="nav-screen">
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
                                <h5 class="modal-title" id="TituloModalCentralizado">Cadastrar Campeonato</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form id="Cadastro" method="post" action="#">
                                    <div class="form-group cadastro" style="width: 20rem">
                                        <label for="name">Nome</label>
                                        <input type="text" class="form-control campo" id="cad-name"
                                            placeholder="Digite nome" required>
                                    </div>
                                    <div class="form-group cadastro" style="width: 20rem">
                                        <label for="groupApprovedNumber">Data</label>
                                        <input type="text" class="form-control campo" id="cad-date"
                                            placeholder="Digite data" required>
                                    </div>                                    
                                    <div class="form-group cadastro" style="width: 20rem">
                                        <label for="groupTeamsNumber">Local</label>
                                        <input type="text" class="form-control campo" id="cad-locale"
                                            placeholder="Digite local" required>
                                    </div>
                               </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" data-dismiss="modal" onclick="save_championship($('#cad-name').val(), $('#cad-date').val(), $('#cad-locale').val())" class="buttonsal">Salvar </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    </div>
    `);
    nextChampionship_page(1);
}
function insert_championships(championships, page){
    if(page == 1 || championships.length / 4 > (page - 1)){
        var trs = ``;
        for (var i = (page - 1) * 4; i < championships.length && i < page * 4; i++) {
            trs += `<tr>
                <th scope="row">
                    <input title="Dê dois cliques para alterar" type="text" readonly="true" ondblclick="this.readOnly='';" onkeydown = "
                        if (event.keyCode == 13){
                            this.readOnly='true';
                            edit_championships( ${championships[i].id}, $('#name-${championships[i].id}').val(), $('#date-${championships[i].id}').val(), $('#locale-${championships[i].id}').val(), ()=>{});
                        }"
                    name="name" id="name-${championships[i].id}" class="tab-input form-control" value="${championships[i].name}" />
                </th>
                <th scope="row">
                    <input title="Dê dois cliques para alterar" type="text" readonly="true" ondblclick="this.readOnly='';" onkeydown = "
                        if (event.keyCode == 13){
                            this.readOnly='true';
                            edit_championships( ${championships[i].id}, $('#name-${championships[i].id}').val(), $('#date-${championships[i].id}').val(), $('#locale-${championships[i].id}').val(), ()=>{});
                        }"
                    name="date" id="date-${championships[i].id}" class="tab-input form-control" value="${formatDate(championships[i].date, false)}" />
                </th>
                <th scope="row">
                    <input title="Dê dois cliques para alterar" type="text" readonly="true" ondblclick="this.readOnly='';" onkeydown = "
                        if (event.keyCode == 13){
                            this.readOnly='true';
                            edit_championships( ${championships[i].id}, $('#name-${championships[i].id}').val(), $('#date-${championships[i].id}').val(), $('#locale-${championships[i].id}').val(), ()=>{});
                        }"
                    name="locale" id="locale-${championships[i].id}" class="tab-input form-control" value="${championships[i].locale}" />
                </th>
                <th scope="row" width="5" rowspan="1">
                    <a title="Clique para excluir os dados dessa linha" onclick="delete_championship(${page}, ${championships[i].id})"">
                        <img style="width: 30px;" src="img/lixo.png">
                    </a>
                </th>
            </tr>`;          
        };
        $('#tab-championships').html(trs);
        var nPages = parseInt(championships.length / 4) + (championships.length % 4 != 0 ? 1: 0);
        var btnPages = page != 1 ? `
            <li class="page-item">
                <a class="page-link" onclick="nextChampionship_page(${page - 1})" aria-label="Anterior">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>` : ``;                    
        for (var i = 1; i <= nPages; i++) {
            btnPages += page != i ? `
                <li class="page-item"><a class="page-link" onclick="nextChampionship_page(${i});">${i}</a></li>
                ` : `
                <li class="page-item"><a class="page-link" href="#" style="background-color: #0AB41E">${i}</a></li>
                `;   
        }
        btnPages += page < nPages ? `
            <li class="page-item">
                <a class="page-link" onclick="nextChampionship_page(${page + 1});" aria-label="Próximo">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>` : ``;
        $('#current-page').val(page);
        $('#pagination').html(btnPages);
    }
}
function nextChampionship_page(page){
    if($('#txtBusca').val() == ""){
        list_championships(function(championships){
            insert_championships(championships, page);
        });
    }else{
        searchName_championships($('#txtBusca').val(), function(championships){
            insert_championships(championships, page);
        })        
    }
}
function edit_championship(championshipId, name, date, locale){
   edit_championships(championshipId, name, date, locale, ()=>{});
}

function save_championship(name, date, locale){
    if(window.confirm('Click em "Ok" para confirmar a adição do campeonato.') == true){
        add_championships(name, date, locale, ()=>{
            list_championships(function(championships){
                insert_championships(championships, parseInt($('#current-page').val()));
            });            
        });
    }
}

function delete_championship(page, championshipId){
    if(window.confirm('Click em "Ok" para confirmar a exclusão da modalidade.') == true){
        delete_championships(championshipId, ()=>{
            list_championships(function(championships){
                insert_championships(championships, page);
            });            
        });
    }
}