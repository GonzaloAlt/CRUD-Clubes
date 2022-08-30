class Repository{
    /**
     * @param {import('better-sqlite3').Database} db
     * @param {import('../mappers/areaMapper')} areaMapper
     * @param {import('fs')} fs
     */
    constructor(db, areaMapper, fs ){
        this.db = db;
        this.areaMapper = areaMapper;
        this.fs = fs;
    }

    async save(area) {
        const insert = this.db.prepare(`INSERT INTO areas (name, code, flag) VALUES(?, ?, ?)`);
        const {name, code, flag} = area;
        const newArea = insert.run(name, code, flag);
        return {...area, id:newArea.lastInsertRowid}
    }

    async getById(id) {
        const area = this.db.prepare(`SELECT id, name, code, flag FROM areas WHERE id= ?`).get(id);
        const areaFounded =  this.areaMapper.dbDataToEntity(area)
        return areaFounded;
    }

    async getAll() {
        const areas = this.db.prepare(`SELECT id, name, code, flag FROM areas`).all();
        const areasFounded = areas.map(area =>  this.areaMapper.dbDataToEntity(area));
        return areasFounded;
    }

    async deleteById(id) {
        const {flag} = await this.getById(id)
        this.fs.unlink(process.cwd()+flag, (err) => {
          if (err) {
            console.error(err)
          }
        })
        const areaDeleted = this.db.prepare(`DELETE FROM areas WHERE id=?`);
        areaDeleted.run(id)
        return true;
    }

    async update(id, info){
        if (info.flag){
            const {name, code, flag} = info;
            const update = this.db.prepare(`UPDATE areas SET name = ?, code = ?, flag = ? WHERE id = ?`);
            const area = update.run(name, code, flag, id);
            return {...info, id}
          }else{
            const {name, code} = info;
            const update = this.db.prepare(`UPDATE areas SET name = ?, code = ? WHERE id = ?`);
            const area = update.run(name, code, id);
            return {...info, id}
          }
    }
}

module.exports = Repository;