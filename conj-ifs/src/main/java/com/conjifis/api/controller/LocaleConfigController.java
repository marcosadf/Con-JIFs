package com.conjifis.api.controller;

import java.util.Locale;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.LocaleResolver;

import com.conjifis.config.LocaleConfig;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/locale")
public class LocaleConfigController {
	private MessageSource messageSource = new LocaleConfig().messageSource();
	
	@PostMapping
	public String helloWorldInternationalized(@RequestHeader(name="Accept-Language", required=false) Locale locale, HttpSession session){  
		session.setAttribute("locale", locale);
		System.out.println(messageSource.getMessage("entity.not.found", null, LocaleContextHolder.getLocale()));
		System.out.println(locale.toString());
		return messageSource.getMessage("entity.not.found", null, LocaleContextHolder.getLocale());  
	}
	
	@GetMapping
	public String he(){
		return messageSource.getMessage("entity.not.found", null, LocaleContextHolder.getLocale());
	} 
	
}
