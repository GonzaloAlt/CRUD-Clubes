const { object, use, factory, func, default: DIContainer } = require('rsdi');
const { ClubController, ClubService, ClubRepository, ClubRoutes, ClubMapper, ClubModel } = require('../module/club/clubModule');
const { AreaController, AreaService, AreaRepository, AreaRoutes, AreaMapper, AreaModel } = require('../module/area/areaModule');
const fs = require('fs');
const path = require('path')
const multer = require('multer');
const session = require('express-session')
const Database = require('better-sqlite3');
const { Sequelize } = require('sequelize');

function configSession() {
    return session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 60000 }
    })
}

function configMulter() {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, process.env.MIDDLEWARE_PATH)
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
        }
    })

    const upload = multer({ storage: storage })
    return upload;
}

function configDB() {
    const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: process.env.DB_PATH
    });
    return sequelize
    // return new Database(process.env.DB_PATH,{ verbose: console.log })
}

/**
 * 
 * @param {import('../module/club/model/clubModel')} ClubModel
 * @returns 
 */
function configClubModel(container) {
    ClubModel.setup(container.get('sequelize'));
    ClubModel.setAssociations(container.get('AreaModel'));
    return ClubModel
}
function configAreaModel(container) {
    AreaModel.setup(container.get('sequelize'));
    return AreaModel
}

/** 
 * @param {DIContainer} container 
 */

function addCommonDefinitions(container) {
    container.add({
        fs,
        multer: factory(configMulter),
        session: factory(configSession),
        sequelize: factory(configDB),
    })
}

/** 
 * @param {DIContainer} container 
 */
function addClubModuleDefinitions(container) {
    container.add({
        ClubRoutes: object(ClubRoutes).construct(use('multer'), use('ClubController')),
        ClubController: object(ClubController).construct(use('ClubService'), use('AreaService')),
        ClubService: object(ClubService).construct(use('ClubRepository')),
        ClubRepository: object(ClubRepository).construct(use('ClubModel'), use('ClubMapper'), use('fs'), use('AreaModel')),
        ClubMapper: object(ClubMapper),
        ClubModel: factory(configClubModel)
    })
}

/** 
 * @param {DIContainer} container 
 */
function addAreaModuleDefinitions(container) {
    container.add({
        AreaRoutes: object(AreaRoutes).construct(use('multer'), use('AreaController')),
        AreaController: object(AreaController).construct(use('AreaService')),
        AreaService: object(AreaService).construct(use('AreaRepository')),
        AreaRepository: object(AreaRepository).construct(use('AreaModel'), use('AreaMapper'), use('fs')),
        AreaMapper: object(AreaMapper),
        AreaModel: factory(configAreaModel)
    })
}

const configureDI = () => {
    const container = new DIContainer();
    addCommonDefinitions(container);
    addClubModuleDefinitions(container);
    addAreaModuleDefinitions(container)
    return container
}

module.exports = configureDI;