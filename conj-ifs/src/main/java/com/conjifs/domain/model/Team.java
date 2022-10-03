package com.conjifs.domain.model;

import java.util.LinkedHashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
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
public class Team {
	@EqualsAndHashCode.Include
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Valid
	@ConvertGroup(from = Default.class, to = ValidationGroups.ModalityId.class)
	@ManyToOne
	@NotNull
	private Modality modality;
	
	@NotBlank
	private String name;
	
	@NotBlank
	private String campus;
	
	@JsonIgnore
	@OneToMany(mappedBy = "team", cascade = CascadeType.ALL)
	private Set<Compete> competes = new LinkedHashSet<>();
	
	@JsonIgnore
	@OneToMany(mappedBy = "team", cascade = CascadeType.ALL)
	private Set<Dispute> disputes = new LinkedHashSet<>();
}
