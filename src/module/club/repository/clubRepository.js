class Repository{
    /**
     * @param {import('better-sqlite3').Database} db
     * @param {import('../mappers/clubMapper')} clubMapper
     * @param {import('fs')} fs
     */
    constructor(db, clubMapper, fs){
      this.db = db; 
      this.clubMapper = clubMapper;
      this.fs = fs;
    }

      async save(club) {
        console.log(club)
        const {name, shortName, tla, crest, address, website, founded, clubColors, venue, area} = club;
        const insert = this.db.prepare(`INSERT INTO clubs (name, short_name, tla, crest, address, website, founded, club_colors, venue, fk_area) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
        const newClub = insert.run(name, shortName, tla, crest, address, website, founded, clubColors, venue, area);
        return {...club, id:newClub.lastInsertRowid}
      }
    
      async getById(id) {
        const club = this.db.prepare(`SELECT id, name, short_name, tla, crest, address, website, founded, club_colors, venue, fk_area FROM clubs WHERE id= ?`).get(id);
        const clubFounded =  this.clubMapper.dbDataToEntity(club)
        return clubFounded;
      }
    
      async getAll() {
        const clubs = this.db.prepare(`SELECT id, name, short_name, tla, crest, address, website, founded, club_colors, venue, fk_area FROM clubs`).all();
        const clubsFounded = clubs.map(club =>  this.clubMapper.dbDataToEntity(club));
        return clubsFounded;
      }
    
      async deleteById(id) {
        const {crest} = await this.getById(id)
        this.fs.unlink(process.cwd()+crest, (err) => {
          if (err) {
            console.error(err)
          }
        })
        const clubDeleted = this.db.prepare(`DELETE FROM clubs WHERE id=?`);
        clubDeleted.run(id)
        return true;
      }
    
      async update(id, info){
        if (info.crest){
          const {name, shortName, tla, crest, address, website, founded, clubColors, venue, area} = info;
          const update = this.db.prepare(`UPDATE clubs SET name = ?, short_name = ?, tla = ?, crest = ?, address = ?, website = ?, founded = ?, club_colors = ?, venue = ?, fk_area = ? WHERE id = ?`);
          const club = update.run(name, shortName, tla, crest, address, website, founded, clubColors, venue, area, id);
          return {...info, id}
        }else{
          const {name, shortName, tla, address, website, founded, clubColors, venue, area} = info;
          const update = this.db.prepare(`UPDATE clubs SET name = ?, short_name = ?, tla = ?, address = ?, website = ?, founded = ?, club_colors = ?, venue = ?, fk_area = ? WHERE id = ?`);
          const club = update.run(name, shortName, tla, address, website, founded, clubColors, venue, area, id);
          return {...info, id}
        }
      }
}

module.exports = Repository;