const Area = require('../entity/area')

class AreaMapper{
    constructor(){}

    dbDataToEntity(area){
        const {id, name, code, flag} = area;
        return new Area(id, name, code, flag)
    }
    entityToDbData(area){
        const {id, name, code, flag} = area;
        return new Area(id, name, code, flag)
    }
}

module.exports = AreaMapper;