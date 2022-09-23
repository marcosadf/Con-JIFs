CREATE TABLE compete (
  team_id BIGINT NOT NULL,
  bracket_id BIGINT NOT NULL,
  points INT NOT NULL DEFAULT 0,
  result ENUM('APPROVED', 'DISAPPROVED') NULL,
  PRIMARY KEY (team_id, bracket_id),
  CONSTRAINT fk_compete_team1
    FOREIGN KEY (team_id)
    REFERENCES team (id),
  CONSTRAINT fk_compete_championship_key1
    FOREIGN KEY (bracket_id)
    REFERENCES bracket (id)
);