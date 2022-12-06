CREATE TABLE dispute (
  id BIGINT NOT NULL AUTO_INCREMENT,
  team_id BIGINT NULL,
  match_id BIGINT NULL,
  points INT NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  CONSTRAINT fk_dispute_team1
    FOREIGN KEY (team_id)
    REFERENCES team (id),
  CONSTRAINT fk_dispute_match1
    FOREIGN KEY (match_id)
    REFERENCES `_match` (id)
);