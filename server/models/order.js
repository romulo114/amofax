'use strict';
import { Model } from 'sequelize'

const order = (sequelize, DataTypes) => {
    class Order extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Order.init({
        orderNumber: DataTypes.STRING,
        orderDate: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'Order',
    });
    return Order;
}

export default order