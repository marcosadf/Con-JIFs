package com.conjifis.domain.service;

import java.util.Optional;

import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.conjifis.config.LocaleConfig;
import com.conjifis.data.ManagerDetailsDate;
import com.conjifis.domain.exception.EntityNotFoundException;
import com.conjifis.domain.model.Manager;
import com.conjifis.domain.repository.ManagerRepository;

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
			throw new EntityNotFoundException(messageSource.getMessage("modality.not.found", null, LocaleContextHolder.getLocale()));
		}
		
		return new ManagerDetailsDate(manager);
	}

}
