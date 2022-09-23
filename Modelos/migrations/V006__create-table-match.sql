CREATE TABLE `match` (
  id BIGINT NOT NULL AUTO_INCREMENT,
  bracket_id BIGINT NULL,
  locale VARCHAR(150) NOT NULL,
  date_time DATETIME NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_match_championship_key1
    FOREIGN KEY (bracket_id)
    REFERENCES bracket (id)
);
