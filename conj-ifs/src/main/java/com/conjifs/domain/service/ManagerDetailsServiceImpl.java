package com.conjifs.domain.service;

import java.util.Optional;

import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.conjifs.config.LocaleConfig;
import com.conjifs.data.ManagerDetailsDate;
import com.conjifs.domain.exception.EntityNotFoundException;
import com.conjifs.domain.model.Manager;
import com.conjifs.domain.repository.ManagerRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Component
public class ManagerDetailsServiceImpl implements UserDetailsService {
	
	private final ManagerRepository managerRepository;
	private MessageSource messageSource = new LocaleConfig().messageSource();
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<Manager> manager = managerRepository.findByLogin(username);
		if(manager.isEmpty()) {
			throw new EntityNotFoundException(messageSource.getMessage("manger.not.found", null, LocaleContextHolder.getLocale()));
		}
		
		return new ManagerDetailsDate(manager);
	}

}
