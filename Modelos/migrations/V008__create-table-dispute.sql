CREATE TABLE dispute (
  team_id BIGINT NOT NULL,
  match_id BIGINT NOT NULL,
  points INT NOT NULL DEFAULT 0,
  PRIMARY KEY (team_id, match_id),
  CONSTRAINT fk_dispute_team1
    FOREIGN KEY (team_id)
    REFERENCES team (id),
  CONSTRAINT fk_dispute_match1
    FOREIGN KEY (match_id)
    REFERENCES `match` (id)
);