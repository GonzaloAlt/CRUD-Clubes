class Repository {
  /**
   * @param {typeof import('../model/clubModel')} clubModel
   * @param {import('../mappers/clubMapper')} clubMapper
   * @param {import('fs')} fs
   * @param {typeof import('../../area/model/areaModel')} areaModel
   */
  constructor(clubModel, clubMapper, fs, areaModel) {
    this.clubModel = clubModel;
    this.clubMapper = clubMapper;
    this.fs = fs;
    this.areaModel = areaModel;
  }

  async save(club) {
    let newClub = this.clubModel.build({ ...club }, { include: this.areaModel })
    newClub.setDataValue('fkArea', club.area);
    newClub = await newClub.save();
    return this.clubMapper.modelToEntity(newClub)
  }

  async getById(id) {
    const club = await this.clubModel.findOne({ where: { id }, include: this.areaModel });
    // console.log(club.toJSON())
    const clubFounded = this.clubMapper.modelToEntity(club)
    console.log(clubFounded)
    return clubFounded;

  }

  async getAll() {
    const clubs = await this.clubModel.findAll();
    const clubsFounded = clubs.map(club => this.clubMapper.modelToEntity(club));
    return clubsFounded;
  }

  async deleteById(id) {
    const { crest } = await this.getById(id)
    this.fs.unlink(process.cwd() + crest, (err) => {
      if (err) {
        console.error(err)
      }
    })
    const deletedClub = await this.clubModel.destroy({ where: { id } })
    return true;
  }

  async update(id, info) {
    await this.clubModel.update({ ...info }, {
      where: {
        id
      }
    });
    const savedClub = await this.getById(id)
    return savedClub;

  }
}

module.exports = Repository;