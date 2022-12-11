package com.conjifs.domain.model;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.LinkedHashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.groups.ConvertGroup;
import javax.validation.groups.Default;

import com.conjifs.domain.ValidationGroups;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Getter
@Setter
@Entity
@Table(name = "_match")
public class Match {
	@EqualsAndHashCode.Include
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotBlank
	private String locale;
	
	@NotNull
	@Column(name = "date_time")
	private Date dateTime;
	
	@JsonIgnore
	@OneToMany(mappedBy = "match", cascade = CascadeType.ALL)
	private Set<Dispute> disputes = new LinkedHashSet<>();
	
	@Valid
	@ManyToOne
	@JoinColumn(name = "bracket_id")
	@ConvertGroup(from = Default.class, to = ValidationGroups.BracketId.class)
	private Bracket bracket;

	public void setDateTime(String datetime) {
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm");
		Date dateFormat = null;
		try {
			dateFormat = sdf.parse(datetime);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		this.dateTime = dateFormat;
	}
	
}
