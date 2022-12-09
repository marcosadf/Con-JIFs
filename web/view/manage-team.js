function manage_team(){
    let content = $("#screen");
    content.html(`
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
   `);
}
