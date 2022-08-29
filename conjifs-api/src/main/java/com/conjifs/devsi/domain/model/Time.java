package com.conjifs.devsi.domain.model;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Time {

  private Long id;
  private String campi;
  private Modalidade modalidade;
  private Grupo grupo;
  private List<Partida> partidas;
  private List<Jogador> jogadores;
 
}
