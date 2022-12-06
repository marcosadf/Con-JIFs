CREATE TABLE _match (
  id BIGINT NOT NULL AUTO_INCREMENT,
  locale VARCHAR(150) NOT NULL,
  date_time DATETIME NOT NULL,
  bracket_id BIGINT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_match_championship_key1
    FOREIGN KEY (bracket_id)
    REFERENCES bracket (id)
);