class ClubController {
    /**
     * 
     * @param {import('../service/clubService')} clubService 
     */
    constructor(clubService){
        this.clubService = clubService;
    }

    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    async create(req, res){
        try {
            const {id} = req.params;
            if(id){
                const club = await this.clubService.getById(id)
                res.render('club/views/clubForm.html', {club,id})
            }else{
                res.render('club/views/clubForm.html') ;  
            }
        } catch (error) {
            req.session.errors = [error]
        }
    }
    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    async viewAll(req,res){
        if(req.session.messages=== undefined) req.session.messages = []
        if(req.session.errors=== undefined) req.session.errors = []

        try {
            const clubs = await this.clubService.getAll()
            res.render('club/views/index.html', {clubs, messages:req.session.messages, errors: req.session.errors})
            req.session.messages = []
            req.session.errors = []
        } catch (error) {
            req.session.errors = [error]
        }
    }
    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    async view(req, res){
        try {
            const {id} = req.params;
            const club = await this.clubService.getById(id)
            res.render('club/views/clubOverview.html', {club})
        } catch (error) {
            req.session.errors = [error]
        }
    }
    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    async save(req, res){
        try {
            if(req.file){
                const {path} = req.file;
                const body = req.body;
                body.crest = `/${path.replace("\\\\", "http://").replace(/\\/g, "/")}`;
                const clubSaved = await this.clubService.save(body);
                req.session.messages = [`Se creó el club con id: ${clubSaved.id}`]
            }
            res.redirect('/club/')
        } catch (error) {
            req.session.errors = [error]
        }
    }
    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    async update(req, res){
        try {
            const {id} = req.params;
            const body = req.body;
            if(req.file){
                const {path} = req.file;
                const club = body;
                club.crest = `/${path.replace("\\\\", "http://").replace(/\\/g, "/")}`;
                const clubUpdated = await this.clubService.update(id, club);
                req.session.messages = [`Se actualizó el club con id: ${clubUpdated.id}`]
            }else{
                const clubUpdated = await this.clubService.update(id, body);
                req.session.messages = [`Se actualizó el club con id: ${clubUpdated.id}`]
            }
            res.redirect('/club/')
        } catch (error) {
            req.session.errors = [error]
        }
    }
    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    async delete(req, res){
        try {
            const {id} = req.params;
            const clubDeleted = await this.clubService.deleteById(id);
            req.session.messages = [`Se eliminó el club con id: ${clubDeleted.id}`]
            res.redirect('/club/')
        } catch (error) {
            req.session.errors = [error]
        }
    }
}

module.exports = ClubController;