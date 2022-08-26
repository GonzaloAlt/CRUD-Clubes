class Repository{
    /**
     * 
     * @param {import('fs/promises')} fs 
     * @param {import('uuid')} uuid
     * @param {import('./db/clubs.json')} dbFile 
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
        //   console.log(JSON.parse(content));
          return JSON.parse(content);
        } catch (error) {
          throw new Error(`Error en lectura: ${error.message}`);
        }
      }
      
      async writeDoc(info) {
        try {
          await this.fs.promises.writeFile(this.dbFile, JSON.stringify(info, null, 2));
          console.log(`Escritura exitosa: ${this.dbContent}`);
        } catch (error) {
          throw new Error(`Error en escritura: ${error.message}`);
        }
      }

      async readFile() {
        this.dbContent = await this.readDoc(this.dbFile);
        console.log(typeof this.dbContent);
        return this.dbContent;
      }
    
      async save(club) {
        await this.readFile();
        const newClub = {...club, id: this.uuid()}
        this.dbContent.push(newClub);
        this.writeDoc(this.dbContent);
        return newClub
      }
    
      async getById(id) {
        await this.readFile();
        const club = this.dbContent.find((club) => club.id === id) || null;
        return club;
      }
    
      async getAll() {
        await this.readFile();
    
        return [...this.dbContent];
      }
    
      async deleteById(id) {
        await this.readFile();
        const club = this.dbContent.find((club) => club.id === id);
        this.fs.unlink(process.cwd()+club.crest, (err) => {
          if (err) {
            console.error(err)
          }
        })
        const clubs = this.dbContent.filter((club) => club.id !== id);
        await this.writeDoc(clubs);
        return club
      }
    
      deleteAll() {
        this.dbContent = [];
        return this.writeDoc(this.dbContent);
      }

      async update(id, info){
        await this.readFile();
        const clubIndex = this.dbContent.map((club)=> club.id).indexOf(id);
        if(clubIndex !== -1){
          const club = {id,...info}
            this.dbContent[clubIndex] = club;
            this.writeDoc(this.dbContent);
            return club
        }
      }

    //   async myScript(){
    //     await this.readFile();
    //     this.dbContent= this.dbContent.map((club) =>{
    //         return ({
    //             area: club.area,
    //             id: club.id.toString(),
    //             name: club.name,
    //             shortName: club.shortName,
    //             tla: club.tla,
    //             crest: club.crest,
    //             address: club.address,
    //             website: club.website,
    //             founded: club.founded,
    //             clubColors: club.clubColors,
    //             venue: club.venue,
    //             lastUpdated: club.lastUpdated
    //         })
    //     });
    //     return this.writeDoc(this.dbContent);
    //   }

}

module.exports = Repository;