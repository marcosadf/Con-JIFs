package com.conjifs.devsi.domain.model;

import java.time.OffsetDateTime;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Campeonato {

  private Long id;
  private OffsetDateTime data;
  private String local;
  private List<Cadastrador> cadastradores;
  
}
