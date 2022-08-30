const path = require("path");
const sqlite = require("better-sqlite3");

const db = sqlite(path.resolve(__dirname, '../../db/clubs.db'), {
  verbose: console.log,
});

// db.exec("CREATE TABLE IF NOT EXISTS areas(id INTEGER PRIMARY KEY AUTOINCREMENT,`name` TEXT NOT NULL,code TEXT NOT NULL, flag TEXT NOT NULL, created_at DATE DEFAULT (datetime('now', 'localtime')) NOT NULL,  updated_at DATE DEFAULT (datetime('now', 'localtime')) NOT NULL)");
// db.exec("CREATE TABLE IF NOT EXISTS clubs(id INTEGER PRIMARY KEY AUTOINCREMENT,`name` TEXT NOT NULL,short_name TEXT NOT NULL,tla TEXT NOT NULL, crest TEXT NOT NULL,`address` TEXT NOT NULL, website TEXT NOT NULL,founded TEXT NOT NULL,club_colors TEXT NOT NULL,venue TEXT NOT NULL, area TEXT NOT NULL,created_at DATE DEFAULT (datetime('now', 'localtime')) NOT NULL,updated_at DATE DEFAULT (datetime('now', 'localtime')) NOT NULL)");

db.exec("CREATE TABLE IF NOT EXISTS areas(id INTEGER PRIMARY KEY AUTOINCREMENT,`name` TEXT NOT NULL,code TEXT NOT NULL, flag TEXT NOT NULL, created_at DATE DEFAULT (datetime('now', 'localtime')) NOT NULL,  updated_at DATE DEFAULT (datetime('now', 'localtime')) NOT NULL)");
db.exec("CREATE TABLE IF NOT EXISTS clubs(id INTEGER PRIMARY KEY AUTOINCREMENT,`name` TEXT NOT NULL,short_name TEXT NOT NULL,tla TEXT NOT NULL, crest TEXT NOT NULL,`address` TEXT NOT NULL, website TEXT NOT NULL,founded TEXT NOT NULL,club_colors TEXT NOT NULL,venue TEXT NOT NULL, fk_area TEXT NOT NULL,created_at DATE DEFAULT (datetime('now', 'localtime')) NOT NULL,updated_at DATE DEFAULT (datetime('now', 'localtime')) NOT NULL, FOREIGN KEY (fk_area) REFERENCES areas(id))");