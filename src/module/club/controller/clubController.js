class ClubController {
    /**
     * 
     * @param {import('../service/clubService')} clubService 
     * @param {*} session 
     * @param {import('multer').Multer} multer 
     */
    constructor(clubService, session, multer){
        this.clubService = clubService;
        this.session = session;
        this.multer = multer;
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
            throw new Error(error)
        }
    }
    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    async viewAll(req,res){
        try {
            const clubs = await this.clubService.getAll()
            res.render('club/views/index.html', {clubs})
        } catch (error) {
            throw new Error(error)
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
            throw new Error(error)
        }
    }
    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    async save(req, res){
        try {
            const body = req.body;
            const clubSaved = await this.clubService.save(body)
            res.redirect('/club/')
        } catch (error) {
            throw new Error(error);
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
            const clubUpdated = await this.clubService.update(id, body);
            res.redirect('/club/')
        } catch (error) {
            throw new Error(error);
        }
    }
    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    async delete(req, res){
        try {
            const {id} = req.params;
            const clubs = await this.clubService.deleteById(id);
            res.redirect('/club/')
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = ClubController;