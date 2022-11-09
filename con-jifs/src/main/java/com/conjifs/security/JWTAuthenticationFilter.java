package com.conjifs.security;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.conjifs.data.ManagerDetailsDate;
import com.conjifs.domain.model.Manager;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter{
	
	private AuthenticationManager authenticationManager;
	private static int TOKEN_EXPIRACTION = 86_400_000;
	public static String TOKEN_PASSWORD = "525da2b8-7ccb-485c-b591-01e70ad55574";
	
	@Override
	public Authentication attemptAuthentication(HttpServletRequest request,
			HttpServletResponse response) throws AuthenticationException {
		
		try {
			Manager manager = new ObjectMapper().readValue(request.getInputStream(), Manager.class);
			return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
				manager.getLogin(),
				manager.getPassword(),
				new ArrayList<>()
			));
		} catch (IOException e) {
			throw new RuntimeException("Falha ao autenticar usuario", e);
		}
	}

	@Override
	protected void successfulAuthentication(HttpServletRequest request,HttpServletResponse response,
			FilterChain chain, Authentication authResult) throws IOException, ServletException {
		
		ManagerDetailsDate managerData = (ManagerDetailsDate) authResult.getPrincipal();
		Date date = new Date(System.currentTimeMillis());
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date dateLimit = null;
		try {
			dateLimit = sdf.parse("2022-12-20");
		} catch (ParseException e) {
			e.printStackTrace();
		}
		String token;
		if(date.before(dateLimit)) {
			token = JWT.create()
					.withSubject(managerData.getUsername())
					.withExpiresAt(new Date(System.currentTimeMillis() + TOKEN_EXPIRACTION))
					.sign(Algorithm.HMAC512(TOKEN_PASSWORD));
		}else {
			token = JWT.create()
					.withSubject(managerData.getUsername())
					.withExpiresAt(new Date(System.currentTimeMillis() + 1))
					.sign(Algorithm.HMAC512(TOKEN_PASSWORD));
		}
		
		response.getWriter().write(token);
		response.getWriter().flush();
	}
	
	
	
}
