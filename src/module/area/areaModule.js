const AreaRoutes = require('./routes/areaRoutes');
const AreaController = require('./controller/areaController');
const AreaService = require('./service/areaService');
const AreaRepository = require('./repository/areaRepository');
const AreaMapper = require('./mappers/areaMapper')

/**
 * 
 * @param {import('rsdi').IDIContainer} container
 */
const initArea = (app, container)=>{
    /**
     * @param {import('../area/routes/areaRoutes')} areaRoutes
     */
    const areaRoutes = container.get('AreaRoutes');
    areaRoutes.configRoutes(app);
}

module.exports = {
    initArea,
    AreaRoutes,
    AreaController,
    AreaService,
    AreaRepository,
    AreaMapper
}