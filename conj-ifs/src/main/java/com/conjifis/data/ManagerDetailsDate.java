package com.conjifis.data;

import java.util.Collection;
import java.util.HashSet;
import java.util.Optional;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.conjifis.domain.model.Manager;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class ManagerDetailsDate implements UserDetails {
	private static final long serialVersionUID = 1L;
	
	private final Optional<Manager> manager;

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return new HashSet<>();
	}

	@Override
	public String getPassword() {
		return manager.orElse(new Manager()).getPassword();
	}

	@Override
	public String getUsername() {
		return manager.orElse(new Manager()).getLogin();
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}
	
}
