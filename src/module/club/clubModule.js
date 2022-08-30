const ClubRoutes = require('./routes/clubRoutes');
const ClubController = require('./controller/clubController');
const ClubService = require('./service/clubService');
const ClubRepository = require('./repository/clubRepository');
const ClubMapper = require('./mappers/clubMapper')

/**
 * 
 * @param {import('rsdi').IDIContainer} container
 */
function initClub(app, container){
    /**
     * @param {import('./routes/clubRoutes')} clubRoutes
     */
    const clubRoutes = container.get('ClubRoutes');
    clubRoutes.configRoutes(app);
}

module.exports = {
    initClub,
    ClubRoutes,
    ClubController,
    ClubService,
    ClubRepository,
    ClubMapper
}