const Club = require('../entity/club')

class ClubMapper{
    constructor(){}

    dbDataToEntity(club){
        const {id, name, 'short_name': shortName, tla, crest, address, website, founded, 'club_colors': clubColors, venue, 'fk_area':area} = club;
        return new Club(id, name, shortName, tla, crest, address, website, founded, clubColors, venue, area)
    }
    entityToDbData(club){
        const {id, name, shortName: short_name, tla, crest, address, website, founded, clubColors: club_colors, venue, area:fk_area} = club;
        return new Club(id, name, short_name, tla, crest, address, website, founded, club_colors, venue, fk_area)
    }
}

module.exports = ClubMapper;