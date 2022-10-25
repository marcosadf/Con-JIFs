package com.conjifs.domain.model;

import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
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
public class Bracket {
	@EqualsAndHashCode.Include
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@JsonIgnore
	@ManyToOne
	@NotNull
	private Stage stage;
	
	@NotBlank
	@Size(max = 45)
	private String name;
	
	@Valid
	@ManyToOne
	@JoinColumn(name = "parent_bracket_id")
	@ConvertGroup(from = Default.class, to = ValidationGroups.BracketId.class)
	@JsonIgnore
	private Bracket parentBracket;
	
	@OneToMany(mappedBy = "bracket", cascade = CascadeType.ALL)
	private Set<Match> matchs = new LinkedHashSet<>();
	
	@JsonIgnore
	@OneToMany(mappedBy = "bracket", cascade = CascadeType.ALL)
	private Set<Compete> competes = new HashSet<>();
}
