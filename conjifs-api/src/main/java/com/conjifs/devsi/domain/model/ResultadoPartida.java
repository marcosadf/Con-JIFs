package com.conjifs.devsi.domain.model;

import java.math.BigInteger;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResultadoPartida {

  private BigInteger pontuacao;
  private Time time;
  private Partida partida;
 
}
