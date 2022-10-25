CREATE TABLE compete (
  id BIGINT NOT NULL AUTO_INCREMENT,
  team_id BIGINT NULL,
  bracket_id BIGINT NULL,
  points INT NOT NULL DEFAULT 0,
  result ENUM('APPROVED', 'DISAPPROVED') NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_compete_team1
    FOREIGN KEY (team_id)
    REFERENCES team (id),
  CONSTRAINT fk_compete_championship_key1
    FOREIGN KEY (bracket_id)
    REFERENCES bracket (id)
);