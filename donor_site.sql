create database donor_site;
--Very minimal db for accounts but same concept will apply later for campaign creation etc.
create table accounts
(
    --TODO: Add more variables as needed, need to conform to 3NF/BCNF or not idk
	name VARCHAR(100) NOT NULL,
    id integer PRIMARY KEY
);

--Placeholders
insert into accounts (name, id) values
    ("Bryan", 9071416),
    ("Bobby", 1234567);