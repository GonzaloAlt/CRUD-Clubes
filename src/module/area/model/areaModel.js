const { Sequelize, DataTypes, Model } = require('sequelize');

class AreaModel extends Model {
    static setup(connectionInstance) {
        AreaModel.init({
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
            code: {
                type: DataTypes.STRING
            },
            flag: {
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
            modelName: 'Area', // We need to choose the model name
            tableName: 'areas',
            timestamps: false
        });
        return AreaModel;
    };


}

module.exports = AreaModel;