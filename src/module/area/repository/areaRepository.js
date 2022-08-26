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
        try {
            const content = await this.fs.promises.readFile(this.dbFile, "utf-8");
            console.log("Información obtenida correctamente");
            return JSON.parse(content);
        } catch (error) {
            throw new Error(`Error en lectura: ${error.message}`);
        }
    }

    async writeDoc(info) {
        try {
            await this.fs.promises.writeFile(this.dbFile, JSON.stringify(info, null, 2));
            console.log(`Escritura exitosa`);
        } catch (error) {
            throw new Error(`Error en escritura: ${error.message}`);
        }
    }

    async readFile() {
        this.dbContent = await this.readDoc(this.dbFile);
        console.log(typeof this.dbContent);
        return this.dbContent;
    }

    async save(area) {
        await this.readFile();
        const newArea = {...area, id: this.uuid()}
        this.dbContent.push(newArea);
        this.writeDoc(this.dbContent);
        return newArea
    }

    async getById(id) {
        await this.readFile();
        const area = this.dbContent.find((area) => area.id === id) || null;
        return area;
    }

    async getAll() {
        await this.readFile();
    
        return [...this.dbContent];
    }

    async deleteById(id) {
        await this.readFile();
        const area = this.dbContent.find((area) => area.id === id);
        this.fs.unlink(process.cwd()+area.flag, (err) => {
          if (err) {
            console.error(err)
          }
        })
        const areas = this.dbContent.filter((area) => area.id !== id);
        await this.writeDoc(areas);
        return area;
    }

    async update(id, info){
        await this.readFile();
        const areaIndex = this.dbContent.map((area)=> area.id).indexOf(id);
        if(areaIndex !== -1){
            const area = {id,...info}
            this.dbContent[areaIndex] = area;
            this.writeDoc(this.dbContent);
            return area;
        }
    }
}

module.exports = Repository;