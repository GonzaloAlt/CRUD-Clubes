class Repository {
  /**
   * @param {import('better-sqlite3').Database} db
   * @param {typeof import('../model/areaModel')} areaModel
   * @param {import('../mappers/areaMapper')} areaMapper
   * @param {import('fs')} fs
   */
  constructor(areaModel, areaMapper, fs) {
    this.areaModel = areaModel;
    this.areaMapper = areaMapper;
    this.fs = fs;
  }

  async save(area) {
    const newArea = await this.areaModel.create(area)
    return this.areaMapper.modelToEntity(newArea)
  }

  async getById(id) {
    const area = await this.areaModel.findOne({ where: { id } });
    const areaFounded = this.areaMapper.modelToEntity(area)
    return areaFounded;
  }

  async getAll() {
    const areas = await this.areaModel.findAll();
    const areasFounded = areas.map(area => this.areaMapper.modelToEntity(area));
    return areasFounded;
  }

  async deleteById(id) {
    const { flag } = await this.getById(id)
    this.fs.unlink(process.cwd() + flag, (err) => {
      if (err) {
        console.error(err)
      }
    })
    const deletedArea = await this.areaModel.destroy({ where: { id } })
    return true;
  }

  async update(id, info) {
    await this.areaModel.update({ ...info }, {
      where: {
        id
      }
    });
    const savedArea = await this.getById(id)
    return savedArea;
  }
}

module.exports = Repository;