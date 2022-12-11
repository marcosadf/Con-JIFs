package com.conjifs.domain.model;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.LinkedHashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Getter
@Setter
@Entity
public class Championship {
	@EqualsAndHashCode.Include
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotBlank
	@Size(max = 255)
	private String name;
	
	@NotNull
	private Date date;
	
	@NotBlank
	@Size(max = 150)
	private String locale;
	
	@JsonIgnore
	@OneToMany(mappedBy = "championship", cascade = CascadeType.ALL)
	private Set<Modality> modalities = new LinkedHashSet<>();
	
	public void setDate(String date) {
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
		Date dateFormat = null;
		try {
			dateFormat = sdf.parse(date);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		this.date = dateFormat;
	}
}
