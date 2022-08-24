class Routes{
    /**
     * @param {import('../controller/clubController')} clubController
    */
    constructor(clubController){
        this.clubController = clubController;
    }

    configRoutes(app){
        app.get('/club', this.clubController.viewAll.bind(this.clubController));
        app.get('/club/form/:id?', this.clubController.create.bind(this.clubController));
        app.get('/club/view/:id', this.clubController.view.bind(this.clubController));
        app.post('/club/save', this.clubController.save.bind(this.clubController));
        app.delete('/club/:id', this.clubController.delete.bind(this.clubController));
        app.post('/club/:id', this.clubController.update.bind(this.clubController));
    }
}

module.exports= Routes;