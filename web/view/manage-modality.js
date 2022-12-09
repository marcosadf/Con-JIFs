function manage_modality(){
    let content = $("#screen");
    content.html(`
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
}