function manage_championship(){
    let content = $("#screen");
    content.html(`
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
    `);
}