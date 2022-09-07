const Club = require('../entity/club')

class ClubMapper {
    constructor() { }

    modelToEntity(model) {
        //https://sequelize.org/docs/v6/core-concepts/model-instances/#note-logging-instances
        const jsonModel = model.toJSON()
        return new Club(jsonModel);
    }
}

module.exports = ClubMapper;