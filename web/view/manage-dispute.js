function insert_disputes(disputes){
    var trs = ``;
    for (var i = 0; i < disputes.length; i++) {
        trs += `<tr>
            <th scope="row">
                <input title="Esse campo não pode ser alterado" type="text" readonly="true"
                name="team" id="team-${disputes[i].id}" class="tab-input form-control" value="${disputes[i].team.name}" />
            </th>
            <th scope="row">
                <input title="Dê dois cliques para alterar" type="text" readonly="true" ondblclick="this.readOnly='';" onkeydown = "
                    if (event.keyCode == 13){
                        this.readOnly='true';
                        edit_disputes(${disputes[i].match.bracket.stage.modality.championship.id}, ${disputes[i].match.bracket.stage.modality.id}, ${disputes[i].match.bracket.stage.id}, ${disputes[i].match.bracket.id}, ${disputes[i].match.id}, ${disputes[i].team.id}, ${disputes[i].id}, parseInt($('#points-${disputes[i].id}').val()), ()=>{});
                    }"
                name="points" id="points-${disputes[i].id}" class="tab-input form-control" value="${disputes[i].points}" />
            </th>
        </tr>`;          
    }
    $('#tab-disputes').html(trs);
}