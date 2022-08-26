class Routes{
    /**
     * @param {import('../controller/areaController')} areaController
     * @param {import('multer')} uploadMiddleware
     */
    constructor(uploadMiddleware,areaController){
        this.uploadMiddleware = uploadMiddleware;
        this.areaController = areaController;
    }

    configRoutes(app){
        app.get('/area', this.areaController.viewAll.bind(this.areaController));
        app.get('/area/form/:id?', this.areaController.create.bind(this.areaController));
        app.get('/area/view/:id', this.areaController.view.bind(this.areaController));
        app.post('/area/save', this.uploadMiddleware.single('flag') , this.areaController.save.bind(this.areaController));
        app.get('/area/delete/:id', this.areaController.delete.bind(this.areaController));
        app.post('/area/update/:id', this.uploadMiddleware.single('flag'), this.areaController.update.bind(this.areaController));
    }
}

module.exports = Routes;