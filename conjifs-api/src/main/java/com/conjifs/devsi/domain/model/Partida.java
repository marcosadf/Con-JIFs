package com.conjifs.devsi.domain.model;

import java.math.BigInteger;
import java.time.OffsetDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Partida {

  private Long id;
  private Grupo grupo;
  private String local;
  private OffsetDateTime dataHora;
  private BigInteger resultadosPartida;
  
}
