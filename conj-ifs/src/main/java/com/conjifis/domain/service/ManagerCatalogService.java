package com.conjifis.domain.service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;

import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.conjifis.config.LocaleConfig;
import com.conjifis.domain.exception.BusinessException;
import com.conjifis.domain.model.Manager;
import com.conjifis.domain.repository.ManagerRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class ManagerCatalogService {
	
	private ManagerRepository managerRepository;
	private PasswordEncoder encoder;
	private MessageSource messageSource = new LocaleConfig().messageSource();
	
	@Transactional
	public Manager searchLogin(Manager manager){
		manager = managerRepository.findByLogin(manager.getLogin()).orElseThrow(
			() -> new EntityNotFoundException(messageSource.getMessage("manager.not.found", null, LocaleContextHolder.getLocale()))
		);
		return manager;
	}
	
	@Transactional
	public Set<Manager> listAll(){
		return new HashSet<>(managerRepository.findAll());
	}
	
	@Transactional
	public Manager save(Manager manager) {
		manager.setPassword(encoder.encode(manager.getPassword()));
		boolean loginUsed = managerRepository.findByLogin(manager.getLogin()).isEmpty();
		if(!loginUsed) {
			throw new BusinessException(messageSource.getMessage("login.manager.exist", null, LocaleContextHolder.getLocale()));
		}
		return managerRepository.save(manager);
	}
	
	@Transactional
	public ResponseEntity<Boolean> validateLogin(String login, String password){
		Optional<Manager> manager = managerRepository.findByLogin(login);
		
		if(manager.isEmpty()) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(false);
		}
		
		boolean valid = encoder.matches(password, manager.get().getPassword());
		
		HttpStatus status = (valid) ? HttpStatus.OK : HttpStatus.UNAUTHORIZED; 

		return ResponseEntity.status(status).body(valid);
	}
}
