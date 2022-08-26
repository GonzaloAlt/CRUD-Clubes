class Routes{
    /**
     * @param {import('multer')} uploadMiddleware
     * @param {import('../controller/clubController')} clubController
    */
    constructor(uploadMiddleware, clubController ){
        this.uploadMiddleware = uploadMiddleware;
        this.clubController = clubController;
    }

    configRoutes(app){
        app.get('/club', this.clubController.viewAll.bind(this.clubController));
        app.get('/club/form/:id?', this.clubController.create.bind(this.clubController));
        app.get('/club/view/:id', this.clubController.view.bind(this.clubController));
        app.post('/club/save', this.uploadMiddleware.single('crest') , this.clubController.save.bind(this.clubController));
        app.get('/club/delete/:id', this.clubController.delete.bind(this.clubController));
        app.post('/club/update/:id', this.uploadMiddleware.single('crest'), this.clubController.update.bind(this.clubController));
    }
}

module.exports= Routes;