const { object, use, factory, func, default: DIContainer } = require('rsdi');
const {ClubController, ClubService, ClubRepository, ClubRoutes} = require('../module/club/clubModule');
const fs = require('fs');
const { v4: uuid } = require('uuid');
const path = require('path')
const multer = require('multer');
const session = require('express-session')

function configSession(){
    return session ({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 60000 }
      })
}

function configMulter(){
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, process.env.MIDDLEWARE_PATH)
        },
        filename: function (req, file, cb) {
          cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname))
        }
      })
       
      const upload = multer({ storage: storage })
      return upload;
}

function configUuid(){
    return uuid
}

function configDB(){
    return process.env.DB_PATH;
}

/** 
 * @param {DIContainer} container 
 */

function addCommonDefinitions(container){
    container.add({
        fs,
        uuid: factory(configUuid),
        multer: factory(configMulter),
        session: factory(configSession),
        db: factory(configDB),
    })
}

/** 
 * @param {DIContainer} container 
 */
function addClubModuleDefinitions(container){
    container.add({
        ClubRoutes: object(ClubRoutes).construct(use('multer'), use('ClubController')),
        ClubController: object(ClubController).construct(use('ClubService'), use('session')),
        ClubService: object(ClubService).construct(use('ClubRepository')),
        ClubRepository: object(ClubRepository).construct(use('fs'), use('uuid'), use('db')),
    })
}

const configureDI = ()=>{
    const container = new DIContainer();
    addCommonDefinitions(container);
    addClubModuleDefinitions(container);
    return container
}

module.exports = configureDI;