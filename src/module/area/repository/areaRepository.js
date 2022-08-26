class Repository{
    /**
     * @param {import('fs/promises')} fs 
     * @param {import('uuid')} uuid
     * @param {import('./db/areas.json')} dbFile 
     */
    constructor(fs, uuid, dbFile ){
        this.fs = fs;
        this.uuid = uuid;
        this.dbFile = dbFile;
        this.dbContent = [];
    }

    async readDoc () {

    }

    async writeDoc(info) {

    }

    async readFile() {

    }

    async save(area) {

    }

    async getById(id) {

    }

    async getAll() {

    }

    async deleteById(id) {

    }
    
    deleteAll() {

    }

    async update(id, info){

    }
}

module.exports = Repository;