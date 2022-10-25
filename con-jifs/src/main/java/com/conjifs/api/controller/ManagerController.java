package com.conjifs.api.controller;

import java.util.Set;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.conjifs.domain.model.Manager;
import com.conjifs.domain.service.ManagerCatalogService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/managers")
public class ManagerController {
	private ManagerCatalogService managerCatalogService;
	
	@GetMapping
	public Set<Manager> listAll(){
		return managerCatalogService.listAll();
	}
	
	@PostMapping
	public Manager save(@Valid @RequestBody Manager manager) {
		return managerCatalogService.save(manager);
	}
	
	@GetMapping("/validateLogin")
	public ResponseEntity<Boolean> validateLogin(@RequestParam String login, @RequestParam String password) {
		return managerCatalogService.validateLogin(login, password);
	}
	
}
