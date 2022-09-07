class Service {
    /**
     * 
     * @param {import('../repository/clubRepository')} clubRepository 
     */
    constructor(clubRepository) {
        this.clubRepository = clubRepository;
    }

    async save(club) {
        try {
            return this.clubRepository.save(club)
        } catch (error) {
            throw Error(error)
        }
    }
    async getById(id) {
        try {
            return this.clubRepository.getById(id)
        } catch (error) {
            throw Error(error)
        }
    }
    async getAll() {
        try {
            return this.clubRepository.getAll()
        } catch (error) {
            throw Error(error)
        }
    }

    async deleteById(id) {
        try {
            return this.clubRepository.deleteById(id)
        } catch (error) {
            throw Error(error)
        }
    }

    async deleteAll() {
        try {
            return this.clubRepository.deleteAll()
        } catch (error) {
            throw Error(error)
        }
    }

    async update(id, info) {
        try {
            return this.clubRepository.update(id, info)
        } catch (error) {
            throw Error(error)
        }
    }
}

module.exports = Service;