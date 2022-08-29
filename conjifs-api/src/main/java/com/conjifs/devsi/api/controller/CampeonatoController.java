package com.conjifs.devsi.api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/campeonato")
public class CampeonatoController {
	
	@GetMapping
	public void listar() {
		
	}

}
