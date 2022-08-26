class AreaController{
    /**
     * 
     * @param {import('../service/areaService')} areaService 
     */
    constructor(areaService){
        this.areaService = areaService;
    }

    /**
    * @param {import('express').Request} req
    * @param {import('express').Response} res
    */
    async create(req, res){
        try {
            const {id} = req.params;
            if(id){
                const area = await this.areaService.getById(id)
                res.render('area/views/areaForm.html', {area,id})
            }else{
                res.render('area/views/areaForm.html') ;  
            }
        } catch (error) {
            req.session.errors = [error]
        }
    }
    /**
    * @param {import('express').Request} req
    * @param {import('express').Response} res
    */
    async viewAll(req, res){
        if(req.session.messages=== undefined) req.session.messages = []
        if(req.session.errors=== undefined) req.session.errors = []

        try {
            const areas = await this.areaService.getAll();
            res.render('area/views/areaList.html', {areas, messages:req.session.messages, errors: req.session.errors})
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
            const area = await this.areaService.getById(id)
            res.render('area/views/areaOverview.html', {area})
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
                body.flag = `/${path.replace("\\\\", "http://").replace(/\\/g, "/")}`;
                const areaSaved = await this.areaService.save(body);
                req.session.messages = [`Se creó el área con id: ${areaSaved.id}`]
            }
            res.redirect('/area/')
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
                const area = body;
                area.flag = `/${path.replace("\\\\", "http://").replace(/\\/g, "/")}`;
                const areaUpdated = await this.areaService.update(id, area);
                req.session.messages = [`Se actualizó el área con id: ${areaUpdated.id}`]
            }else{
                const areaUpdated = await this.areaService.update(id, body);
                req.session.messages = [`Se actualizó el área con id: ${areaUpdated.id}`]
            }
            res.redirect('/area/')
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
            const areaDeleted = await this.areaService.deleteById(id);
            req.session.messages = [`Se eliminó el área con id: ${areaDeleted.id}`]
            res.redirect('/area/')
        } catch (error) {
            req.session.errors = [error]
        }
    }
}

module.exports = AreaController;