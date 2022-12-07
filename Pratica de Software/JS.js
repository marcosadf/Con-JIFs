function tabelaModalidade(){
    let conteudo = $("#tela");
    conteudo.html(`
    <p class="nome"> Modalidade</p>
    <div>
       
        <select class="custom-select btn-verde" id="inputGroupSelect01">
          <option selected >Campeonato</option>
          <option value="1"></option>
          <option value="2"></option>
          <option value="3"></option>
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
                     Nº de grupos aprovados
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
                <tbody>
                    <tr>
                        <th scope="row"><input type="text" name="mood1.1" id="mod1.1" class="form-control" /></th>
                        <th scope="row"><input type="text" name="mood1.2" id="mod1.2" class="form-control" /></th>
                        <th scope="row"><input type="text" name="mood1.3" id="mod1.3" class="form-control" /></th>
                        <th scope="row"><input type="text" name="mood1.4" id="mod1.4" class="form-control" /></th>
                        <th scope="row" width="5" rowspan="1">
                            <img style="width: 30px;" src="img/lixo.png">
                    </tr>
                    </tr>
                    <tr>
                        <th scope="row"><input type="text" name="mood2.1" id="mod2.1" class="form-control" /></th>
                        <th scope="row"><input type="text" name="mood2.2" id="mod2.2" class="form-control" /></th>
                        <th scope="row"><input type="text" name="mood2.3" id="mod2.1" class="form-control" /></th>
                        <th scope="row"><input type="text" name="mood2.4" id="mod2.2" class="form-control" /></th>
                        <th scope="row" rowspan="1">
                            <img style="width: 30px;" src="img/lixo.png">
                    </tr>
                    </tr>
                    <tr>
                        <th scope="row"><input type="text" name="mood3.1" id="mod3.1" class="form-control" /></th>
                        <th scope="row"><input type="text" name="mood3.2" id="mod3.2" class="form-control" /></th>
                        <th scope="row"><input type="text" name="mood3.3" id="mod3.3" class="form-control" /></th>
                        <th scope="row"><input type="text" name="mood3.4" id="mod3.4" class="form-control" /></th>
                        <th scope="row" width="5" rowspan="1">
                            <img style="width: 30px;" src="img/lixo.png">
                    </tr>
                    </tr>
                    <tr>
                        <th scope="row"><input type="text" name="mood4.1" id="mod4.1" class="form-control" /></th>
                        <th scope="row"><input type="text" name="mood4.2" id="mod4.2" class="form-control" /></th>
                        <th scope="row"><input type="text" name="mood4.3" id="mod4.3" class="form-control" /></th>
                        <th scope="row"><input type="text" name="mood4.4" id="mod4.4" class="form-control" /></th>
                        <th scope="row" rowspan="1">
                            <img style="width: 30px;" src="img/lixo.png">
                    </tr>
                    </tr>
                    <tr>
                        <th scope="row" width="320"><input type="text" name="mood5.1" id="mod5.1" class="form-control" /></th>
                        <th scope="row" width="320"><input type="text" name="mod5.2" id="mod5.2" class="form-control" /></th>
                        <th scope="row" width="20"><input type="text" name="mood5.1" id="mod5.1" class="form-control" /></th>
                        <th scope="row" width="20"><input type="text" name="mod5.2" id="mod5.2" class="form-control" /></th>
                        <th scope="row" width="10" rowspan="1">
                            <img style="width: 30px;" src="img/lixo.png">
                    </tr>
                    </tr>

                </tbody>
            </table>
            <nav aria-label="Navegação de página exemplo">
                <ul class="pagination">
                    <li class="page-item">
                        <a class="page-link" href="#" aria-label="Anterior">
                            <span aria-hidden="true">&laquo;</span>
                            <span class="sr-only">Anterior</span>
                        </a>
                    </li>
                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                    <li class="page-item">
                        <a class="page-link" href="#" aria-label="Próximo">
                            <span aria-hidden="true">&raquo;</span>
                            <span class="sr-only">Próximo</span>
                        </a>
                    </li>

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
                                    <form id="Cadastro" method="post" action="login.php">

                                    <div class="form-group cadastro" style="width: 20rem">
                                    <label for="mailUsuario">Nome</label>
                                    <input type="Nome" class="form-control campo" id="NomeCam"
                                        placeholder="Digite nome " required>
                                </div>
                                <div class="form-group cadastro" style="width: 20rem">
                                            <label for="mailUsuario">Tipo</label>
                                            <input type="Campusmo" class="form-control campo" id="NomeCam"
                                                placeholder="Digite tipo" required>
                                        </div>
                                        <div class="form-group cadastro" style="width: 20rem">
                                            <label for="mailUsuario">Nº de grupos aprovados</label>
                                            <input type="Campusmo" class="form-control campo" id="NomeCam"
                                                placeholder="Digite nº de grupos aprovados" required>
                                        </div>
                                        <div class="form-group cadastro" style="width: 20rem">
                                            <label for="mailUsuario">Nº de times aprovados</label>
                                            <input type="Campusmo" class="form-control campo" id="NomeCam"
                                                placeholder="Digite nº de times aprovados" required>
                                        </div>                                    
                                   </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="buttonsal">Salvar </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </ul>
            </nav>
        </div>
    </div>

    `);
};

function tabelaPartida(){
    let conteudo = $("#tela");
    conteudo.html(`
    <p class="nome"> Partida</p>
    <div>
        <select class="custom-select btn-verde" id="inputGroupSelect01">
            <option selected >Campeonato</option>
            <option value="1"></option>
            <option value="2"></option>
            <option value="3"></option>
          </select>
          <select class="custom-select btn-verde" id="inputGroupSelect01">
            <option selected >Modalidade</option>
            <option value="1"></option>
            <option value="2"></option>
            <option value="3"></option>
          </select>
          <select class="custom-select btn-verde" id="inputGroupSelect01">
            <option selected >Fase</option>
            <option value="1"></option>
            <option value="2"></option>
            <option value="3"></option>
          </select>
          <select class="custom-select btn-verde" id="inputGroupSelect01">
            <option selected >Grupo</option>
            <option value="1"></option>
            <option value="2"></option>
            <option value="3"></option>
          </select>
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
                     Grupo/Chave
                    </button>
                </div>
                </th>
                <th scope="row">
                    <div class="aliamento">
                    <button class="btn  dropdown-toggle " type="button" id="dropdownMenuButton" aria-expanded="false">
                     Data
                    </button>
                </div>
                </th>
                <th scope="row">
                    <div class="aliamento">
                    <button class="btn  dropdown-toggle " type="button" id="dropdownMenuButton" aria-expanded="false">
                     Local
                    </button>
                </div>
                </th>
                <th scope="row">
                    <div class="aliamento">
                    <button class="btn  dropdown-toggle " type="button" id="dropdownMenuButton" aria-expanded="false">
                     Disputa
                    </button>
                </div>
                </th>
            </thead>
            <tbody>
                <tr>
                    <th scope="row"><input type="text" name="mood4.1" id="mod4.1" class="form-control" /></th>
                    <th scope="row"><input type="text" name="mood4.2" id="mod4.2" class="form-control" /></th>
                    <th scope="row"><input type="text" name="mood4.3" id="mod4.3" class="form-control" /></th>
                    <th scope="row"><input type="text" name="mood4.4" id="mod4.4" class="form-control" /></th>
                    <th scope="row" rowspan="1">
                        <img style="width: 30px;" src="img/lixo.png">
                </tr>
                <tr>
                    <th scope="row"><input type="text" name="mood4.1" id="mod4.1" class="form-control" /></th>
                    <th scope="row"><input type="text" name="mood4.2" id="mod4.2" class="form-control" /></th>
                    <th scope="row"><input type="text" name="mood4.3" id="mod4.3" class="form-control" /></th>
                    <th scope="row"><input type="text" name="mood4.4" id="mod4.4" class="form-control" /></th>
                    <th scope="row" rowspan="1">
                        <img style="width: 30px;" src="img/lixo.png">
                </tr>
                <tr>
                    <th scope="row"><input type="text" name="mood4.1" id="mod4.1" class="form-control" /></th>
                    <th scope="row"><input type="text" name="mood4.2" id="mod4.2" class="form-control" /></th>
                    <th scope="row"><input type="text" name="mood4.3" id="mod4.3" class="form-control" /></th>
                    <th scope="row"><input type="text" name="mood4.4" id="mod4.4" class="form-control" /></th>
                    <th scope="row" rowspan="1">
                        <img style="width: 30px;" src="img/lixo.png">
                </tr>
                <tr>
                    <th scope="row"><input type="text" name="mood4.1" id="mod4.1" class="form-control" /></th>
                    <th scope="row"><input type="text" name="mood4.2" id="mod4.2" class="form-control" /></th>
                    <th scope="row"><input type="text" name="mood4.3" id="mod4.3" class="form-control" /></th>
                    <th scope="row"><input type="text" name="mood4.4" id="mod4.4" class="form-control" /></th>
                    <th scope="row" rowspan="1">
                        <img style="width: 30px;" src="img/lixo.png">
                </tr>
                <tr>
                    <th scope="row" width="240"><input type="text" name="mood4.1" id="mod4.1" class="form-control" /></th>
                    <th scope="row" width="180"><input type="text" name="mood4.1" id="mod4.1" class="form-control" /></th>
                    <th scope="row" width="180"><input type="text" name="mood4.1" id="mod4.1" class="form-control" /></th>
                    <th scope="row" width="120"><input type="text" name="mood4.1" id="mod4.1" class="form-control" /></th>
                    <th scope="row" width="10" rowspan="1">
                        <img style="width: 30px;" src="img/lixo.png">
                </tr>
                </tr>

            </tbody>
        </table>
        <nav aria-label="Navegação de página exemplo">
            <ul class="pagination">
                <li class="page-item">
                    <a class="page-link" href="#" aria-label="Anterior">
                        <span aria-hidden="true">&laquo;</span>
                        <span class="sr-only">Anterior</span>
                    </a>
                </li>
                <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item">
                    <a class="page-link" href="#" aria-label="Próximo">
                        <span aria-hidden="true">&raquo;</span>
                        <span class="sr-only">Próximo</span>
                    </a>
                </li>

                <button type="button" class="button" data-toggle="modal" data-target="#ExemploModalCentralizado">
                    <img style="width: 40px; height: 32px;" src="img/mais.png" height="80" width="100" />
                    Criar
                </button>

                <!-- Modal -->
                <div class="modal fade" id="ExemploModalCentralizado" tabindex="-1" role="dialog"
                    aria-labelledby="TituloModalCentralizado" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="TituloModalCentralizado">Cadastrar Partida</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form id="Cadastro" method="post" action="login.php">

                                    <div class="form-group cadastro" style="width: 20rem">
                                        <label for="mailUsuario">Nome do Grupo/Chave</label>
                                        <input type="GrupoPartida" class="form-control campo" id="GrupoPartida"
                                            placeholder="Digite nome do Grupo/Chave" required>
                                    </div>
                                    <div class="form-group cadastro" style="width: 20rem">
                                        <label for="DataPartida">Data</label>
                                        <input type="DataPartida" class="form-control campo" id="DataPartida"
                                            placeholder="Digite a data" required>
                                    </div>
                                    <div class="form-group cadastro" style="width: 20rem">
                                    <label for="LocalPartida">Local</label>
                                    <input type="LocalPartida" class="form-control campo" id="LocalPartida"
                                        placeholder="Digite o local" required>
                                </div>
                                <div class="form-group cadastro" style="width: 20rem">
                                <label for="DisputaPartida">Disputa</label>
                                <input type="DisputaPartida" class="form-control campo" id="DisputaPartida"
                                    placeholder="Digite a disputa" required>
                            </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="buttonsal">Salvar </button>
                            </div>
                        </div>
                    </div>
                </div>
            </ul>
        </nav>
    </div>
    </div>

    `) 
};

function tabelaGrupos(){
    let conteudo = $("#tela");
    conteudo.html(`
    <p class="nome"> Grupo / Chave</p>
    <div>
       
        <select class="custom-select btn-verde" id="inputGroupSelect01">
            <option selected >Campeonato</option>
            <option value="1"></option>
            <option value="2">>/option>
            <option value="3"></option>
          </select>
          <select class="custom-select btn-verde" id="inputGroupSelect01">
            <option selected >Modalidade</option>
            <option value="1"></option>
            <option value="2"></option>
            <option value="3"></option>
          </select>
          <select class="custom-select btn-verde" id="inputGroupSelect01">
            <option selected >Fase</option>
            <option value="1"></option>
            <option value="2"></option>
            <option value="3"></option>
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
                         Competição
                        </button>
                    </div>
                    </th>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row"><input type="text" name="mood2.1" id="mod2.1" class="form-control" /></th>
                        <th scope="row"><input type="text" name="mood2.1" id="mod2.1" class="form-control" /></th>
                        <th scope="row" width="5" rowspan="1">
                            <img style="width: 30px;" src="img/lixo.png">
                    </tr>
                    </tr>
                    <tr>
                        <th scope="row"><input type="text" name="mood2.1" id="mod2.1" class="form-control" /></th>
                        <th scope="row"><input type="text" name="mood2.1" id="mod2.1" class="form-control" /></th>
                        <th scope="row" rowspan="1">
                            <img style="width: 30px;" src="img/lixo.png">
                    </tr>
                    </tr>
                    <tr>
                        <th scope="row"><input type="text" name="mood2.1" id="mod2.1" class="form-control" /></th>
                        <th scope="row"><input type="text" name="mood2.1" id="mod2.1" class="form-control" /></th>
                        <th scope="row" width="5" rowspan="1">
                            <img style="width: 30px;" src="img/lixo.png">
                    </tr>
                    </tr>
                    <tr>
                        <th scope="row"><input type="text" name="mood2.1" id="mod2.1" class="form-control" /></th>
                        <th scope="row"><input type="text" name="mood2.1" id="mod2.1" class="form-control" /></th>
                        <th scope="row" rowspan="1">
                            <img style="width: 30px;" src="img/lixo.png">
                    </tr>
                    </tr>
                    <tr>
                        <th scope="row" width="300"><input type="text" name="mood2.1" id="mod2.1" class="form-control" /></th>
                        <th scope="row" width="200"><input type="text" name="mood2.1" id="mod2.1" class="form-control" /></th>
                        <th scope="row" width="10" rowspan="1">
                            <img style="width: 30px;" src="img/lixo.png">
                    </tr>
                    </tr>

                </tbody>
            </table>
            <nav aria-label="Navegação de página exemplo">
                <ul class="pagination">
                    <li class="page-item">
                        <a class="page-link" href="#" aria-label="Anterior">
                            <span aria-hidden="true">&laquo;</span>
                            <span class="sr-only">Anterior</span>
                        </a>
                    </li>
                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                    <li class="page-item">
                        <a class="page-link" href="#" aria-label="Próximo">
                            <span aria-hidden="true">&raquo;</span>
                            <span class="sr-only">Próximo</span>
                        </a>
                    </li>

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
                                    <h5 class="modal-title" id="TituloModalCentralizado">Cadastrar Grupo</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <form id="Cadastro" method="post" action="login.php">

                                        <div class="form-group cadastro" style="width: 20rem">
                                            <label for="NomeGrupo">Nome</label>
                                            <input type="NomeGrupo" class="form-control campo" id="NomeGrupo"
                                                placeholder="Digite o nome" required>
                                        </div>  
                                        <div class="form-group cadastro" style="width: 20rem">
                                            <label for="CompGrupo">Competição</label>
                                            <input type="CompGrupo" class="form-control campo" id="CompGrupo"
                                                placeholder="Digite a competição" required>
                                        </div>                                    
                                   </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="buttonsal">Salvar </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </ul>
            </nav>
        </div>
    </div>
    `)
};
 
function tabelaCompeticao(){
    let conteudo = $("#tela");
    conteudo.html(`
    <p class="nome"> Competição</p>
    <div>
        <select class="custom-select btn-verde" id="inputGroupSelect01">
            <option selected >Campeonato</option>
            <option value="1"></option>
            <option value="2"></option>
            <option value="3"></option>
          </select>
          <select class="custom-select btn-verde" id="inputGroupSelect01">
            <option selected >Modalidade</option>
            <option value="1"></option>
            <option value="2"></option>
            <option value="3"></option>
          </select>
          <select class="custom-select btn-verde" id="inputGroupSelect01">
            <option selected >Fase</option>
            <option value="1"></option>
            <option value="2"></option>
            <option value="3"></option>
          </select>
          <select class="custom-select btn-verde" id="inputGroupSelect01">
            <option selected >Grupo/Chaves</option>
            <option value="1"></option>
            <option value="2"></option>
            <option value="3"></option>
          </select>
        </div>
        <div class="dropdown">
            <div class="divBusca">
                <input type="text" class="txtBusca" placeholder="Buscar..." />
                <img style="width: 30px;" src="img/lupa.png" id="btnBusca" alt="Buscar" />
            </div> 

        </div>
      
    
        
        <table class="table-striped table">
           <thead>
            <tr style="border: 0;">
                <th scope="row">
                    <div class="aliamento">
                    <button class="btn  dropdown-toggle " type="button" id="dropdownMenuButton" aria-expanded="false">
                     Time
                    </button>
                </div>
                </th>
                <th scope="row">
                    <div class="aliamento">
                    <button class="btn  dropdown-toggle " type="button" id="dropdownMenuButton" aria-expanded="false">
                     Grupo/Chave
                    </button>
                </div>
                </th>
                        <th scope="row">
                            <div class="aliamento">
                            <button class="btn  dropdown-toggle " type="button" id="dropdownMenuButton" aria-expanded="false">
                             Aprovação
                            </button>
                        </div>
                        </th>
                        <th scope="row">
                            <div class="aliamento">
                            <button class="btn  dropdown-toggle " type="button" id="dropdownMenuButton" aria-expanded="false">
                             Pontos
                            </button>
                        </div>
                        </th>
                            <th></th>
           </thead> 
            <tbody>
                <tr>
                    <th scope="row"><input type="text" name="mood4.1" id="mod4.1" class="form-control" /></th>
                    <th scope="row"><input type="text" name="mood4.2" id="mod4.2" class="form-control" /></th>
                    <th scope="row"><input type="text" name="mood4.3" id="mod4.3" class="form-control" /></th>
                    <th scope="row"><input type="text" name="mood4.4" id="mod4.4" class="form-control" /></th>
                    <th scope="row" rowspan="1">
                        <img style="width: 30px;" src="img/lixo.png">
                </tr>
                <tr>
                    <th scope="row"><input type="text" name="mood4.1" id="mod4.1" class="form-control" /></th>
                    <th scope="row"><input type="text" name="mood4.2" id="mod4.2" class="form-control" /></th>
                    <th scope="row"><input type="text" name="mood4.3" id="mod4.3" class="form-control" /></th>
                    <th scope="row"><input type="text" name="mood4.4" id="mod4.4" class="form-control" /></th>
                    <th scope="row" rowspan="1">
                        <img style="width: 30px;" src="img/lixo.png">
                </tr>
                <tr>
                    <th scope="row"><input type="text" name="mood4.1" id="mod4.1" class="form-control" /></th>
                    <th scope="row"><input type="text" name="mood4.2" id="mod4.2" class="form-control" /></th>
                    <th scope="row"><input type="text" name="mood4.3" id="mod4.3" class="form-control" /></th>
                    <th scope="row"><input type="text" name="mood4.4" id="mod4.4" class="form-control" /></th>
                    <th scope="row" rowspan="1">
                        <img style="width: 30px;" src="img/lixo.png">
                </tr>
                <tr>
                    <th scope="row"><input type="text" name="mood4.1" id="mod4.1" class="form-control" /></th>
                    <th scope="row"><input type="text" name="mood4.2" id="mod4.2" class="form-control" /></th>
                    <th scope="row"><input type="text" name="mood4.3" id="mod4.3" class="form-control" /></th>
                    <th scope="row"><input type="text" name="mood4.4" id="mod4.4" class="form-control" /></th>
                    <th scope="row" rowspan="1">
                        <img style="width: 30px;" src="img/lixo.png">
                </tr>
                   
                <tr>
                    <th scope="row" width="240"><input type="text" name="mood4.1" id="mod4.1" class="form-control" /></th>
                    <th scope="row" width="180"><input type="text" name="mood4.1" id="mod4.1" class="form-control" /></th>
                    <th scope="row" width="180"><input type="text" name="mood4.1" id="mod4.1" class="form-control" /></th>
                    <th scope="row" width="120"><input type="text" name="mood4.1" id="mod4.1" class="form-control" /></th>
                    <th scope="row" width="10" rowspan="1">
                        <img style="width: 30px;" src="img/lixo.png">
                </tr>
                </tr>

            </tbody>
        </table>
        <nav aria-label="Navegação de página exemplo">
            <ul class="pagination">
                <li class="page-item">
                    <a class="page-link" href="#" aria-label="Anterior">
                        <span aria-hidden="true">&laquo;</span>
                        <span class="sr-only">Anterior</span>
                    </a>
                </li>
                <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item">
                    <a class="page-link" href="#" aria-label="Próximo">
                        <span aria-hidden="true">&raquo;</span>
                        <span class="sr-only">Próximo</span>
                    </a>
                </li>

                <button type="button" class="button" data-toggle="modal" data-target="#ExemploModalCentralizado">
                    <img style="width: 40px; height: 32px;" src="img/mais.png" height="80" width="100" />
                    Criar
                </button>

                <!-- Modal -->
                <div class="modal fade" id="ExemploModalCentralizado" tabindex="-1" role="dialog"
                    aria-labelledby="TituloModalCentralizado" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="TituloModalCentralizado">Cadastrar Competição</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form id="Cadastro" method="post" action="login.php">

                                    <div class="form-group cadastro" style="width: 20rem">
                                        <label for="mailUsuario">Nome do Time</label>
                                        <input type="TimeComp" class="form-control campo" id="TimeComp"
                                            placeholder="Digite nome do time" required>
                                    </div>
                                    <div class="form-group cadastro" style="width: 20rem">
                                        <label for="DataCam">Grupo/Chave</label>
                                        <input type="GrupoComp" class="form-control campo" id="GrupoComp"
                                            placeholder="Digite o Grupo/Chaves" required>
                                    </div>
                                    <div class="form-group cadastro" style="width: 20rem">
                                    <label for="DataCam">Nº da Arovação</label>
                                    <input type="AprovacaoComp" class="form-control campo" id="AprovacaoComp"
                                        placeholder="Digite o nº da Aprovação" required>
                                </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="buttonsal">Salvar </button>
                            </div>
                        </div>
                    </div>
                </div>
            </ul>
        </nav>
    </div>
    </div>

`)
};

function tabelaDisputa(){
    let conteudo = $("#tela");
    conteudo.html(`
    <p class="nome"> Disputa</p> </br>

    <div>
        <select class="custom-select btn-verde" id="inputGroupSelect01">
            <option selected >Campeonato</option>
            <option value="1"></option>
            <option value="2"></option>
            <option value="3"></option>
          </select>
          <select class="custom-select btn-verde" id="inputGroupSelect01">
            <option selected >Modalidade</option>
            <option value="1"></option>
            <option value="2"></option>
            <option value="3"></option>
          </select>
          <select class="custom-select btn-verde" id="inputGroupSelect01">
            <option selected >Fase</option>
            <option value="1"></option>
            <option value="2"></option>
            <option value="3"></option>
          </select>
          <select class="custom-select btn-verde" id="inputGroupSelect01">
            <option selected >Grupo</option>
            <option value="1"></option>
            <option value="2"></option>
            <option value="3"></option>
          </select>       
        <select class="custom-select btn-verde" id="inputGroupSelect01">
          <option selected >Partida</option>
          <option value="1"></option>
          <option value="2"></option>
          <option value="3"></option>
        </select>
        </br> </br> 
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
                         Time
                        </button>
                    </div>
                        <th scope="row">
                            <div class="aliamento">
                            <button class="btn  dropdown-toggle " type="button" id="dropdownMenuButton" aria-expanded="false">
                             Pontos
                            </button>
                        </div>
                        </th>
                    </th>
                </thead>
                <tbody>
                    <tr>
                      
                        <th scope="row"><input type="text" name="mood1.3" id="mod1.3" class="form-control" /></th>
                        <th scope="row"><input type="text" name="mood1.4" id="mod1.4" class="form-control" /></th>
                        <th scope="row" width="5" rowspan="1">
                            <img style="width: 30px;" src="img/lixo.png">
                    </tr>
                    </tr>
                  
                    <tr>
                        <th scope="row" width="190"><input type="text" name="mood5.1" id="mod5.1" class="form-control" /></th>
                        <th scope="row" width="190"><input type="text" name="mod5.2" id="mod5.2" class="form-control" /></th>
                        <th scope="row" width="10" rowspan="1">
                            <img style="width: 30px;" src="img/lixo.png">
                    </tr>
                    </tr>

                </tbody>
            </table>
           </br> </br>
                    
                   
                </ul>
            </nav>
        </div>
    </div>

    `)
};

function tabelaTime(){
    let conteudo = $("#tela");
    conteudo.html(`
    <p class="nome"> Time</p>
    <div>
        <select class="custom-select btn-verde" id="inputGroupSelect01">
            <option selected >Campeonato</option>
            <option value="1"></option>
            <option value="2"></option>
            <option value="3"></option>
          </select>
          <select class="custom-select btn-verde" id="inputGroupSelect01">
            <option selected >Modalidade</option>
            <option value="1"></option>
            <option value="2"></option>
            <option value="3"></option>
          </select>
          <select class="custom-select btn-verde" id="inputGroupSelect01">
            <option selected >Grupo</option>
            <option value="1"></option>
            <option value="2"></option>
            <option value="3"></option>
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
            <tbody>
                <tr>
                    <th scope="row"><input type="text" name="mood2.1" id="mod2.1" class="form-control" /></th>
                    <th scope="row"><input type="text" name="mood2.1" id="mod2.1" class="form-control" /></th>
                    <th scope="row" width="5" rowspan="1">
                        <img style="width: 30px;" src="img/lixo.png">
                </tr>
                </tr>
                <tr>
                    <th scope="row"><input type="text" name="mood2.1" id="mod2.1" class="form-control" /></th>
                    <th scope="row"><input type="text" name="mood2.1" id="mod2.1" class="form-control" /></th>
                    <th scope="row" rowspan="1">
                        <img style="width: 30px;" src="img/lixo.png">
                </tr>
                </tr>
                <tr>
                    <th scope="row"><input type="text" name="mood2.1" id="mod2.1" class="form-control" /></th>
                    <th scope="row"><input type="text" name="mood2.1" id="mod2.1" class="form-control" /></th>
                    <th scope="row" width="5" rowspan="1">
                        <img style="width: 30px;" src="img/lixo.png">
                </tr>
                </tr>
                <tr>
                    <th scope="row"><input type="text" name="mood2.1" id="mod2.1" class="form-control" /></th>
                    <th scope="row"><input type="text" name="mood2.1" id="mod2.1" class="form-control" /></th>
                    <th scope="row" rowspan="1">
                        <img style="width: 30px;" src="img/lixo.png">
                </tr>
                </tr>
                <tr>
                    <th scope="row" width="300"><input type="text" name="mood2.1" id="mod2.1" class="form-control" /></th>
                    <th scope="row" width="200"><input type="text" name="mood2.1" id="mod2.1" class="form-control" /></th>
                    <th scope="row" width="10" rowspan="1">
                        <img style="width: 30px;" src="img/lixo.png">
                </tr>
                </tr>

            </tbody>
        </table>
        <nav aria-label="Navegação de página exemplo">
            <ul class="pagination">
                <li class="page-item">
                    <a class="page-link" href="#" aria-label="Anterior">
                        <span aria-hidden="true">&laquo;</span>
                        <span class="sr-only">Anterior</span>
                    </a>
                </li>
                <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item">
                    <a class="page-link" href="#" aria-label="Próximo">
                        <span aria-hidden="true">&raquo;</span>
                        <span class="sr-only">Próximo</span>
                    </a>
                </li>

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
                                <form id="Cadastro" method="post" action="login.php">

                                    <div class="form-group cadastro" style="width: 20rem">
                                        <label for="CampusTime">Nome do Campus:</label>
                                        <input type="CampusTime" class="form-control campo" id="NomeCam"
                                            placeholder="Digite nome do campus" required>
                                    </div>
                                    <div class="form-group cadastro" style="width: 20rem">
                                        <label for="NomeTime">Nome do time:</label>
                                        <input type="NomeTime" class="form-control campo" id="DataCam"
                                            placeholder="Digite o nome do time" required>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="buttonsal">Salvar </button>
                            </div>
                        </div>
                    </div>
                </div>
            </ul>
        </nav>
    </div>
    </div>

   `)
};

function tabelaCampeonato(){
    let conteudo = $("#tela");
    conteudo.html(`
    <p class="nome"> Campeonato</p>
            <div class="dropdown">
                <div class="divBusca">
                    <input type="text" class="txtBusca" placeholder="Buscar..." />
                    <img style="width: 30px;" src="img/lupa.png" id="btnBusca" alt="Buscar" />
                </div> </br>
                
               
              
            </div>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="row">
                        <div class="aliamento">
                        <button class="btn  dropdown-toggle " type="button" id="dropdownMenuButton" aria-expanded="false">
                         Nome
                        </button>
                    </div>
                    <th scope="row">
                        <div class="aliamento">
                        <button class="btn  dropdown-toggle " type="button" id="dropdownMenuButton" aria-expanded="false">
                         Data
                        </button>
                    </div>
                    <th scope="row">
                        <div class="aliamento">
                        <button class="btn  dropdown-toggle " type="button" id="dropdownMenuButton" aria-expanded="false">
                         Local
                        </button>
                    </div>
                    </th>
                    <th scope="row">

                    </th>

                </tr>
            </thead>
                <tbody>
                    <tr>
                        <th scope="row"><input type="text" name="mood3.2" id="mod3.2" class="form-control" /></th>
                        <th scope="row"><input type="text" name="mood3.3" id="mod3.3" class="form-control" /></th>
                        <th scope="row"><input type="text" name="mood3.4" id="mod3.4" class="form-control" /></th>
                        <th scope="row" width="5" rowspan="1">
                            <img style="width: 30px;" src="img/lixo.png">
                    </tr>
                    <tr>
                        <th scope="row"><input type="text" name="mood3.2" id="mod3.2" class="form-control" /></th>
                        <th scope="row"><input type="text" name="mood3.3" id="mod3.3" class="form-control" /></th>
                        <th scope="row"><input type="text" name="mood3.4" id="mod3.4" class="form-control" /></th>
                        <th scope="row" width="5" rowspan="1">
                            <img style="width: 30px;" src="img/lixo.png">
                    </tr>
                    <tr>
                        <th scope="row"><input type="text" name="mood3.2" id="mod3.2" class="form-control" /></th>
                        <th scope="row"><input type="text" name="mood3.3" id="mod3.3" class="form-control" /></th>
                        <th scope="row"><input type="text" name="mood3.4" id="mod3.4" class="form-control" /></th>
                        <th scope="row" width="5" rowspan="1">
                            <img style="width: 30px;" src="img/lixo.png">
                    </tr>
                    <tr>
                        <th scope="row"><input type="text" name="mood3.2" id="mod3.2" class="form-control" /></th>
                        <th scope="row"><input type="text" name="mood3.3" id="mod3.3" class="form-control" /></th>
                        <th scope="row"><input type="text" name="mood3.4" id="mod3.4" class="form-control" /></th>
                        <th scope="row" width="5" rowspan="1">
                            <img style="width: 30px;" src="img/lixo.png">
                    </tr>
                  <tr>
                    <th scope="row" width="150" height="20"><input type="text" name="mood3.2" id="mod3.2" class="form-control" /></th>
                    <th scope="row" width="90"><input type="text" name="mood3.2" id="mod3.2" class="form-control" /></th>
                    <th scope="row" width="120"><input type="text" name="mood3.2" id="mod3.2" class="form-control" /></th>
                    <th scope="row" width="10" rowspan="1">
                        <img style="width: 30px;" src="img/lixo.png" ></tr>
                  </tr>
                 
                </tbody>
              </table>
            <nav aria-label="Navegação de página exemplo">
                <ul class="pagination">
                    <li class="page-item">
                        <a class="page-link" href="#" aria-label="Anterior">
                            <span aria-hidden="true">&laquo;</span>
                            <span class="sr-only">Anterior</span>
                        </a>
                    </li>
                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                    <li class="page-item">
                        <a class="page-link" href="#" aria-label="Próximo">
                            <span aria-hidden="true">&raquo;</span>
                            <span class="sr-only">Próximo</span>
                        </a>
                    </li>
                
                    <button type="button" class="button" data-toggle="modal" data-target="#ExemploModalCentralizado">
                        <img style="width: 40px; height: 32px;" src="img/mais.png" height="80" width="100" />
                        Adicionar
                      </button>
                      
                      <!-- Modal -->
                      <div class="modal fade" id="ExemploModalCentralizado" tabindex="-1" role="dialog" aria-labelledby="TituloModalCentralizado" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 class="modal-title" id="TituloModalCentralizado">Cadastrar Campeonato</h5>
                              <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div class="modal-body">
                                <form id="Cadastro" method="post" action="login.php">

                                    <div class="form-group cadastro" style="width: 20rem" >
                                        <label for="mailUsuario">Nome do Campeonato</label>
                                        <input type="NomeCam" class="form-control campo" id="NomeCam"
                                            placeholder="Digite nome do Campeonato" required> 
                                    </div>
                                    <div class="form-group cadastro" style="width: 20rem" >
                                        <label for="DataCam">Data</label>
                                        <input type="DataCam" class="form-control campo" id="DataCam"
                                            placeholder="Digite a data" required>
                                    </div>
                                    <div class="form-group cadastro" style="width: 20rem" >
                                        <label for="LocalCam">Local</label>
                                        <input type="LocalCam" class="form-control campo" id="LocalCam"
                                            placeholder="Digite o local" required>
                                    </div>
                                    
                                </form>
                            </div>
                            <div class="modal-footer">
                              <button type="button" class="buttonsal">Salvar </button>
                            </div>
                          </div>
                        </div>
                      </div>
                </ul>
            </nav>
        </div>
    </div> 
    `)
};


