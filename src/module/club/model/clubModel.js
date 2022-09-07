const { Sequelize, DataTypes, Model } = require('sequelize');

class ClubModel extends Model {
    static setup(connectionInstance) {
        ClubModel.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                unique: true,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING
            },
            shortName: {
                type: DataTypes.STRING
            },
            tla: {
                type: DataTypes.STRING
            },
            crest: {
                type: DataTypes.STRING
            },
            address: {
                type: DataTypes.STRING
            },
            website: {
                type: DataTypes.STRING
            },
            founded: {
                type: DataTypes.STRING
            },
            clubColors: {
                type: DataTypes.STRING
            },
            venue: {
                type: DataTypes.STRING
            },
            updatedAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            },
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            }
        }, {
            sequelize: connectionInstance, // We need to pass the connection instance
            modelName: 'Club', // We need to choose the model name
            tableName: 'clubs',
            timestamps: false
        });
        return ClubModel;
    };

    static setAssociations(AreaModel) {
        ClubModel.belongsTo(AreaModel, { foreignKey: 'fkArea' });
    }

}

module.exports = ClubModel;