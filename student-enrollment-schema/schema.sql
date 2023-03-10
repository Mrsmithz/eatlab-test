CREATE TABLE Students (
    Id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `Name` varchar(200),
    Email varchar(200)
);

CREATE TABLE Courses (
    Id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `Name` varchar(200),
    `Description` LONGTEXT
);

CREATE TABLE Enrollments (
    Id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    StudentId int NOT NULL,
    CourseId int NOT NULL,
    EnrollmentDate DATE DEFAULT curdate(),
    FOREIGN KEY(StudentId) REFERENCES Students(Id),
    FOREIGN KEY(CourseId) REFERENCES Courses(Id)
)