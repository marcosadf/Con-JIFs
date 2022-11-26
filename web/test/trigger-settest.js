function trigger_setTeste() {
	create_stages(1,1, (data) =>{create_brackets(1,1, (data) =>{create_competes(1,1, (data) =>{create_matches(1,1, (data) =>{console.log(data);});});});});
	create_stages(1,2, (data) =>{create_brackets(1,2, (data) =>{create_competes(1,2, (data) =>{create_matches(1,2, (data) =>{console.log(data);});});});});
}
trigger_setTeste();