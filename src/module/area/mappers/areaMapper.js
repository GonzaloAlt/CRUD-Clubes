const Area = require('../entity/area')

class AreaMapper {
    constructor() { }

    modelToEntity(model) {
        //https://sequelize.org/docs/v6/core-concepts/model-instances/#note-logging-instances
        const jsonModel = model.toJSON()
        return new Area(jsonModel);
    }
}

module.exports = AreaMapper;