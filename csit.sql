drop database if exists myAppDb;
create database myAppDb;
use myAppDb;

create table SystemUser
(
    userId int auto_increment primary key,
    fullName varchar(100) not null,
    email varchar(100) not null unique,
    password varchar(50) not null
);

create table Admin
(
	adminId	int primary key,
    foreign key (adminId) references SystemUser(userId) on update cascade on delete cascade
);

create table Donee
(
	doneeId	int primary key,
    foreign key (doneeId) references SystemUser(userId) on update cascade on delete cascade
);

create table Fundraiser
(
	fundraiserId int primary key,
    foreign key (fundraiserId) references SystemUser(userId) on update cascade on delete cascade
);

create table Campaign
(
	campaignId int primary key auto_increment,
    title varchar(255) not null,
    category varchar(255) not null,
    description	varchar(255) not null,
    targetAmount decimal(10, 2) not null,
    deadline date not null,
    createdBy int not null,
    foreign key (createdBy) references Fundraiser(fundraiserId) on update cascade on delete cascade,
    CONSTRAINT chkTargetAmount CHECK (targetAmount > 0)
);

create table Donation
(
	donationId int primary key auto_increment,
    donatedBy int not null,
    campaignId int not null,
    donationDate date not null,
    donatedAmount decimal(10, 2) not null,
    foreign key (donatedBy) references Donee(doneeId) on update cascade on delete cascade,
    foreign key (campaignId) references Campaign(campaignId) on update cascade on delete cascade,
    constraint chkAmount check (donatedAmount > 0)
);

INSERT INTO SystemUser(fullName, email, password)
VALUES ('Admin One', 'admin1@gmail.com', 'admin123');

INSERT INTO SystemUser(fullName, email, password)
VALUES ('Admin Two', 'admin2@gmail.com', 'admin123');

INSERT INTO SystemUser(fullName, email, password)
VALUES ('Admin Three', 'admin3@gmail.com', 'admin123');

INSERT INTO SystemUser(fullName, email, password)
VALUES ('Admin Four', 'admin4@gmail.com', 'admin123');

INSERT INTO SystemUser(fullName, email, password)
VALUES ('Admin Five', 'admin5@gmail.com', 'admin123');

INSERT INTO SystemUser(fullName, email, password)
VALUES ('Alice Tan', 'alice@gmail.com', 'alice123');

INSERT INTO SystemUser(fullName, email, password)
VALUES ('Brian Lee', 'brian@gmail.com', 'brian123');

INSERT INTO SystemUser(fullName, email, password)
VALUES ('Catherine Lim', 'catherine@gmail.com', 'cat123');

INSERT INTO SystemUser(fullName, email, password)
VALUES ('Daniel Ong', 'daniel@gmail.com', 'daniel123');

INSERT INTO SystemUser(fullName, email, password)
VALUES ('Emily Wong', 'emily@gmail.com', 'emily123');

INSERT INTO SystemUser(fullName, email, password)
VALUES ('Kevin Lim', 'kevin@gmail.com', 'kevin123');

INSERT INTO SystemUser(fullName, email, password)
VALUES ('Sarah Tan', 'sarah@gmail.com', 'sarah123');

INSERT INTO SystemUser(fullName, email, password)
VALUES ('Jason Koh', 'jason@gmail.com', 'jason123');

INSERT INTO SystemUser(fullName, email, password)
VALUES ('Michelle Lee', 'michelle@gmail.com', 'michelle123');

-- a
INSERT INTO SystemUser(fullName, email, password)
VALUES ('Ryan Ong', 'ryan@gmail.com', 'ryan123');

INSERT INTO Admin VALUES (1);
INSERT INTO Admin VALUES (2);
INSERT INTO Admin VALUES (3);
INSERT INTO Admin VALUES (4);
INSERT INTO Admin VALUES (5);
INSERT INTO Fundraiser VALUES (6);
INSERT INTO Fundraiser VALUES (7);
INSERT INTO Fundraiser VALUES (8);
INSERT INTO Fundraiser VALUES (9);
INSERT INTO Fundraiser VALUES (10);
INSERT INTO Donee VALUES (11);
INSERT INTO Donee VALUES (12);
INSERT INTO Donee VALUES (13);
INSERT INTO Donee VALUES (14);
INSERT INTO Donee VALUES (15);



INSERT INTO Campaign
(title, category, description, targetAmount, deadline, status, createdBy)
VALUES (
'Nepal Relief',
'Disaster',
'Help earthquake victims in Nepal',
50000.00,
'2026-12-31',
6
);

INSERT INTO Campaign
(title, category, description, targetAmount, deadline, status, createdBy)
VALUES (
'Cancer Treatment Fund',
'Medical',
'Support John cancer treatment',
30000.00,
'2026-10-15',
6
);

INSERT INTO Campaign
(title, category, description, targetAmount, deadline, status, createdBy)
VALUES (
'Feed Hungry Children',
'Charity',
'Provide meals for children',
20000.00,
'2026-08-20',
7
);

INSERT INTO Campaign
(title, category, description, targetAmount, deadline, status, createdBy)
VALUES (
'Flood Victim Support',
'Disaster',
'Help flood victims rebuild homes',
45000.00,
'2026-11-01',
7
);

INSERT INTO Campaign
-- a
(title, category, description, targetAmount, deadline, status, createdBy)
VALUES (
'School Scholarship Fund',
'Education',
'Scholarships for poor students',
25000.00,
'2026-09-10',
7
);

-- DONATION
INSERT INTO Donation
(donatedBy, campaignId, donationDate, donatedAmount)
VALUES (
11,
1,
'2026-05-01',
100.00
);

INSERT INTO Donation
(donatedBy, campaignId, donationDate, donatedAmount)
VALUES (
11,
1,
'2026-05-02',
250.00
);

INSERT INTO Donation
(donatedBy, campaignId, donationDate, donatedAmount)
VALUES (
11,
1,
'2026-05-03',
500.00
);

INSERT INTO Donation
(donatedBy, campaignId, donationDate, donatedAmount)
VALUES (
12,
2,
'2026-05-04',
50.00
);

INSERT INTO Donation
(donatedBy, campaignId, donationDate, donatedAmount)
VALUES (
12,
2,
'2026-05-05',
300.00
);