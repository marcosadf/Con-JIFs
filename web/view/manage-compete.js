function manage_compete(){
    let content = $("#screen");
    content.html(`
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
    `);
}
