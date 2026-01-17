CREATE DATABASE events_platform;
USE events_platform;

CREATE TABLE utilisateur(
    idU INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(15) UNIQUE NOT NULL,
    profile_image VARCHAR(255) NULL,
    full_name VARCHAR(255) NOT NULL,
    gmailU VARCHAR(255) NOT NULL,
    passwordU VARCHAR(255) NOT NULL,
    roleU ENUM('admin','organizer','user') DEFAULT 'user'
);
ALTER TABLE utilisateur ADD location VARCHAR(100) DEFAULT 'Maroc';
select * from utilisateur;

CREATE TABLE organizer_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  message TEXT,
  status ENUM('pending','approved','rejected') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES utilisateur(idU)
);

CREATE TABLE evenement(
    idE INT PRIMARY KEY AUTO_INCREMENT,
    event_name VARCHAR(255) NOT NULL,
    capaciteE INT NOT NULL,
    num_participant INT DEFAULT 0,
    dateE DATE NOT NULL,
    placeE VARCHAR(100),
    descriptionE TEXT,
    etat ENUM('ouvert','complet','annule','termine') DEFAULT 'ouvert',
    creator_id INT,
    FOREIGN KEY(creator_id) REFERENCES utilisateur(idU)
);
select * from evenement;
INSERT INTO utilisateur (full_name, username, gmailU, passwordU, roleU, location)
VALUES
('Yassine El Amrani', 'yassine_dev', 'yassine@gmail.com', '123456', 'organizer', 'Rabat'),
('Sara Benali', 'sara_design', 'sara@gmail.com', '123456', 'organizer', 'Casablanca'),
('Omar Khatib', 'omar_mobile', 'omar@gmail.com', '123456', 'organizer', 'Marrakech');
INSERT INTO evenement 
(event_name, capaciteE, num_participant, dateE, placeE, descriptionE, etat, creator_id)
VALUES
('ev',2,2,'2026-01-29','Marrakech','Atelier pratique pour créer une application mobile avec React Native.','complet',4),
('Web Development Bootcamp',40,18,'2026-02-15','Rabat','Bootcamp intensif pour apprendre le développement web moderne (HTML, CSS, JS, React).','ouvert',1),
('AI & Data Science Meetup',80,80,'2026-01-08','Casablanca','Rencontre autour de l’intelligence artificielle et de la data science avec des experts du domaine.','complet',2),
('Mobile App Workshop',25,10,'2025-12-10','Marrakech','Atelier pratique pour créer une application mobile avec React Native.','termine',3);


CREATE TABLE participations(
    idP INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    event_id INT,
    statut ENUM('active','annulee') DEFAULT 'active',
    FOREIGN KEY(user_id) REFERENCES utilisateur(idU),
    FOREIGN KEY(event_id) REFERENCES evenement(idE)
);

ALTER TABLE participations
ADD UNIQUE KEY unique_participation (user_id, event_id);

CREATE TABLE evaluations(
    ide INT AUTO_INCREMENT PRIMARY KEY,
    note INT CHECK (note BETWEEN 1 AND 5),
    comments TEXT,
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    date_eval DATETIME DEFAULT NOW(),
    FOREIGN KEY(user_id) REFERENCES utilisateur(idU),
    FOREIGN KEY(event_id) REFERENCES evenement(idE)
);

CREATE TABLE logs_actions(
    idL INT AUTO_INCREMENT PRIMARY KEY,
    action VARCHAR(200),
    user_id INT,
    event_id INT,
    date_action DATETIME DEFAULT NOW()
);

CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255),
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- FUNCTIONS
DELIMITER $$
CREATE FUNCTION Moyenne_ev(p_event INT)
RETURNS DECIMAL(3,2)
DETERMINISTIC
BEGIN
    DECLARE avg_note DECIMAL(3,2);
    SELECT AVG(note) INTO avg_note FROM evaluations WHERE event_id = p_event;
    RETURN avg_note;
END $$

DROP FUNCTION IF EXISTS Event_complet;
DELIMITER $$

CREATE FUNCTION Event_complet(p_event INT)
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
    DECLARE total INT;
    SELECT COUNT(*) INTO total
    FROM participations
    WHERE event_id = p_event AND statut = 'active';
    RETURN total >= (
        SELECT capaciteE FROM evenement WHERE idE = p_event
    );
END$$
DELIMITER ;


DROP FUNCTION IF EXISTS Places_restantes;
DELIMITER $$

CREATE FUNCTION Places_restantes(p_event INT)
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE cap INT;
    DECLARE total INT;

    SELECT capaciteE INTO cap
    FROM evenement WHERE idE = p_event;

    SELECT COUNT(*) INTO total
    FROM participations
    WHERE event_id = p_event AND statut = 'active';

    RETURN GREATEST(cap - total, 0);
END$$
DELIMITER ;



-- PROCEDURES 
DROP PROCEDURE IF EXISTS Inscrire_utilisateur;
DELIMITER $$

CREATE PROCEDURE Inscrire_utilisateur(IN p_user INT, IN p_event INT)
BEGIN
    DECLARE exist INT;

    IF Event_complet(p_event) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Evenement plein';
    END IF;

    SELECT COUNT(*) INTO exist
    FROM participations
    WHERE user_id = p_user AND event_id = p_event;

    IF exist > 0 THEN
        UPDATE participations
        SET statut = 'active'
        WHERE user_id = p_user AND event_id = p_event;
    ELSE
        INSERT INTO participations(user_id, event_id)
        VALUES(p_user, p_event);
    END IF;
END$$
DELIMITER ;



DELIMITER $$
CREATE PROCEDURE Annuler_participation(IN p_user INT, IN p_event INT)
BEGIN
    UPDATE participations
    SET statut='annulee'
    WHERE user_id=p_user AND event_id=p_event;
END;

CREATE PROCEDURE Creer_event(
		IN p_name VARCHAR(255),
		IN p_date DATE,
		IN p_cap INT,
		IN p_creator INT
)
BEGIN
    INSERT INTO evenement(event_name,dateE,capaciteE,creator_id)
    VALUES(p_name,p_date,p_cap,p_creator);
END $$
DELIMITER ;		

-- CURSORS
DELIMITER $$
CREATE PROCEDURE Archiver()
BEGIN
    DECLARE done INT DEFAULT 0;
    DECLARE v_id INT;
    DECLARE cur CURSOR FOR
        SELECT idE FROM evenement
        WHERE dateE < NOW() AND etat <> 'archive';
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done=1;
    OPEN cur;
    loop_arch: LOOP
        FETCH cur INTO v_id;
        IF done THEN LEAVE loop_arch; END IF;
        UPDATE evenement SET etat='archive'
        WHERE idE=v_id;
        INSERT INTO logs_actions(action,event_id)
        VALUES('archiver',v_id);
    END LOOP;
    CLOSE cur;
END $$


CREATE PROCEDURE Calculer_statistiques()
BEGIN
    DECLARE done INT DEFAULT 0;
    DECLARE v_event INT;
    DECLARE v_part INT;
    DECLARE v_ann INT;
    DECLARE v_moy DECIMAL(3,2);
    DECLARE cur CURSOR FOR SELECT idE FROM evenement;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done=1;
    OPEN cur;
    loop_stats: LOOP
        FETCH cur INTO v_event;
        IF done THEN LEAVE loop_stats; END IF;
        SELECT COUNT(*) INTO v_part
        FROM participations
        WHERE event_id=v_event AND statut='active';
        SELECT COUNT(*) INTO v_ann
        FROM participations
        WHERE event_id=v_event AND statut='annulee';
        SET v_moy = Moyenne_ev(v_event);
        INSERT INTO logs_actions(action,event_id)
        VALUES(CONCAT('stats => participants:',v_part,
                      ', annules:',v_ann,
                      ', moyenne:',v_moy),
               v_event);
    END LOOP;
    CLOSE cur;
END $$

CREATE PROCEDURE Etat()
BEGIN
    DECLARE done INT DEFAULT 0;
    DECLARE v_event INT;
    DECLARE cur CURSOR FOR SELECT idE FROM evenement;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done=1;
    OPEN cur;
    loop_state: LOOP
        FETCH cur INTO v_event;
        IF done THEN LEAVE loop_state; END IF;
        UPDATE evenement
        SET etat='termine'
        WHERE idE=v_event AND dateE < NOW() AND etat='ouvert';
        UPDATE evenement
        SET etat='complet'
        WHERE idE=v_event AND num_participant >= capaciteE;
        INSERT INTO logs_actions(action,event_id)
        VALUES('etat_mis_a_jour',v_event);
    END LOOP;
    CLOSE cur;
END $$
DELIMITER ;


-- TRIGGERS
DELIMITER $$
CREATE TRIGGER Before_participation
BEFORE INSERT ON participations
FOR EACH ROW
BEGIN
IF Event_complet(NEW.event_id) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT='capacites max';
    END IF;
END $$


DROP TRIGGER IF EXISTS After_participation_insert;
DELIMITER $$
CREATE TRIGGER After_participation_insert
AFTER INSERT ON participations
FOR EACH ROW
BEGIN
    IF NEW.statut = 'active' THEN
        UPDATE evenement
        SET num_participant = num_participant + 1
        WHERE idE = NEW.event_id;
    END IF;
END$$
DELIMITER ;


CREATE TRIGGER After_participation_update
AFTER UPDATE ON participations
FOR EACH ROW
BEGIN
    -- annulee → active
    IF OLD.statut = 'annulee' AND NEW.statut = 'active' THEN
        UPDATE evenement
        SET num_participant = num_participant + 1
        WHERE idE = NEW.event_id;
    END IF;
    -- active → annulee
    IF OLD.statut = 'active' AND NEW.statut = 'annulee' THEN
        UPDATE evenement
        SET num_participant = num_participant - 1
        WHERE idE = NEW.event_id;
    END IF;
END$$
DELIMITER ;


CREATE TRIGGER After_evaluation
AFTER INSERT ON evaluations
FOR EACH ROW
BEGIN
    UPDATE evenement
    SET descriptionE = CONCAT(
        COALESCE(descriptionE,''), '\nMoyenne: ',
        Moyenne_ev(NEW.event_id)
    )
    WHERE idE = NEW.event_id;
END $$



CREATE TRIGGER Log_event_creation
AFTER INSERT ON evenement
FOR EACH ROW
BEGIN
    INSERT INTO logs_actions(action,user_id,event_id)
    VALUES('creation_event',NEW.creator_id,NEW.idE);
END $$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER before_event_insert
BEFORE INSERT ON evenement
FOR EACH ROW
BEGIN
    IF NEW.dateE < CURDATE() THEN
        SET NEW.etat = 'termine';
    ELSEIF NEW.num_participant >= NEW.capaciteE THEN
        SET NEW.etat = 'complet';
    ELSE
        SET NEW.etat = 'ouvert';
    END IF;
END$$

DELIMITER ;
DELIMITER $$
CREATE TRIGGER before_event_update
BEFORE UPDATE ON evenement
FOR EACH ROW
BEGIN
    IF NEW.dateE < CURDATE() THEN
        SET NEW.etat = 'termine';
    ELSEIF NEW.num_participant >= NEW.capaciteE THEN
        SET NEW.etat = 'complet';
    ELSE
        SET NEW.etat = 'ouvert';
    END IF;
END$$
DELIMITER ;

