CREATE TYPE DOMAIN_VISIBILITY_TYPE AS ENUM ('public', 'restricted', 'private');

DROP TABLE IF EXISTS domains;
CREATE TABLE IF NOT EXISTS domains(
    domain_name VARCHAR(50) UNIQUE NOT NULL,
    domain_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    description text,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    domain_visibility DOMAIN_VISIBILITY_TYPE NOT NULL
);

DROP TABLE IF EXISTS posts;
CREATE TABLE IF NOT EXISTS posts (
    post_id BIGINT GENERATED ALWAYS AS IDENTITY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    body TEXT,
    author VARCHAR(60),
    title VARCHAR(255),
    domain_id INT NOT NULL,
    FOREIGN KEY (domain_id) REFERENCES domains(domain_id)
);

