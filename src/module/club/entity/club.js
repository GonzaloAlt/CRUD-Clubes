class Club {
    constructor(
        { id, name, shortName, tla, crest, address, website, founded, clubColors, venue, Area }
    ) {
        this.id = id;
        this.name = name;
        this.shortName = shortName;
        this.tla = tla;
        this.crest = crest;
        this.address = address;
        this.website = website;
        this.founded = founded;
        this.clubColors = clubColors;
        this.venue = venue;
        this.Area = Area;
    }
}

module.exports = Club;