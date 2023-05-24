import Sequelize from 'sequelize'
import orders from './order.js'
import dotenv from 'dotenv'
dotenv.config()

const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.USER,
    null, {
    host: process.env.HOST,
    dialect: process.env.DIALECT
})

const db = {}
db.orders = orders(sequelize, Sequelize)
db.Sequelize = Sequelize
db.sequelize = sequelize

export default db