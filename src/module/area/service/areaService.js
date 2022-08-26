class Service{
    /**
     * 
     * @param {import('../repository/areaRepository')} areaRepository 
     */
    constructor(areaRepository){
        this.areaRepository = areaRepository;
    }

    async save(area){
        try {
            return this.areaRepository.save(area)
        } catch (error) {
            throw Error(error)
        }
    }
    async getById(id){
        try {
            return this.areaRepository.getById(id)
        } catch (error) {
            throw Error(error)
        }
    }
    async getAll(){
        try {
            return this.areaRepository.getAll()
        } catch (error) {
            throw Error(error)
        }
    }

    async deleteById(id){
        try {
            return this.areaRepository.deleteById(id)
        } catch (error) {
            throw Error(error)
        }
    }

    async deleteAll(){
        try {
            return this.areaRepository.deleteAll()
        } catch (error) {
            throw Error(error)
        }
    }

    async update(id, info){
        try {
            return this.areaRepository.update(id, info)
        } catch (error) {
            throw Error(error)
        }
    }
}

module.exports = Service;