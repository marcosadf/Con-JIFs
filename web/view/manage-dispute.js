function manage_dispute(){
    let content = $("#screen");
    content.html(`
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
    `);
}