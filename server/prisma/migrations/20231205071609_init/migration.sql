-- CreateTable
CREATE TABLE "role" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "role_id" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "middle_name" TEXT,
    "last_name" TEXT NOT NULL,
    "remember_token" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "user_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "department" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "course" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "department_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "course_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "department" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "student" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "course_id" INTEGER NOT NULL,
    "student_number" INTEGER NOT NULL,
    "rfid_number" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "middle_name" TEXT,
    "last_name" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "section" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "student_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "term" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "year_start" INTEGER NOT NULL,
    "year_end" INTEGER NOT NULL,
    "number_of_terms" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "term_student" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "student_id" INTEGER NOT NULL,
    "term_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "term_student_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "term_student_term_id_fkey" FOREIGN KEY ("term_id") REFERENCES "Term" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "validation_history" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "student_id" INTEGER NOT NULL,
    "term_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ValidationHistory_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ValidationHistory_term_id_fkey" FOREIGN KEY ("term_id") REFERENCES "term" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "student_student_number_key" ON "student"("student_number");

-- CreateIndex
CREATE UNIQUE INDEX "student_rfid_number_key" ON "student"("rfid_number");

-- CreateTrigger
CREATE TRIGGER role_update AFTER UPDATE ON Role
FOR EACH ROW
BEGIN
    UPDATE Role
    SET updated_at = CURRENT_TIMESTAMP
    WHERE id = NEW.id;
END;

-- CreateTrigger
CREATE TRIGGER user_update AFTER UPDATE ON user
FOR EACH ROW
BEGIN
    UPDATE user
    SET updated_at = CURRENT_TIMESTAMP
    WHERE id = NEW.id;
END;

-- CreateTrigger
CREATE TRIGGER department_update AFTER UPDATE ON department
FOR EACH ROW
BEGIN
    UPDATE department
    SET updated_at = CURRENT_TIMESTAMP
    WHERE id = NEW.id;
END;

-- CreateTrigger
CREATE TRIGGER course_update AFTER UPDATE ON course
FOR EACH ROW
BEGIN
    UPDATE course
    SET updated_at = CURRENT_TIMESTAMP
    WHERE id = NEW.id;
END;

-- CreateTrigger
CREATE TRIGGER student_update AFTER UPDATE ON student
FOR EACH ROW
BEGIN
    UPDATE student
    SET updated_at = CURRENT_TIMESTAMP
    WHERE id = NEW.id;
END;

-- CreateTrigger
CREATE TRIGGER term_update AFTER UPDATE ON term
FOR EACH ROW
BEGIN
    UPDATE term
    SET updated_at = CURRENT_TIMESTAMP
    WHERE id = NEW.id;
END;

-- CreateTrigger
CREATE TRIGGER term_student_update AFTER UPDATE ON term_student
FOR EACH ROW
BEGIN
    UPDATE term_student
    SET updated_at = CURRENT_TIMESTAMP
    WHERE id = NEW.id;
END;
