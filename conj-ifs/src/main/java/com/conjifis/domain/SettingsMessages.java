package com.conjifis.domain;

import java.util.Locale;
import java.util.ResourceBundle;

public class SettingsMessages {

	public static ResourceBundle properties(String language, String country) {
		return ResourceBundle.getBundle("messages", new Locale(language,country));
	}
	public static ResourceBundle defaultProperties() {
		return ResourceBundle.getBundle("messages", new Locale(Locale.getDefault().getLanguage(), Locale.getDefault().getCountry()));
	}
}
