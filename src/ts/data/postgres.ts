import { DataTypes, Model, Sequelize, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import config from '../config.js'

const sequelize = new Sequelize(config.get('connectionString'))

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>
  declare name: string
  declare preferredName: string | null
  declare address: string
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
}

User.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: new DataTypes.STRING(128),
    allowNull: false
  },
  preferredName: {
    type: new DataTypes.STRING(128),
    allowNull: true
  },
  address: {
    type: new DataTypes.STRING(255),
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
},
{
  tableName: 'users',
  sequelize // passing the `sequelize` instance is required
})

async function init (): Promise<void> {
  await sequelize.sync({ force: true })
  await seedUsers()
}

async function seedUsers (): Promise<void> {
  await User.bulkCreate([
    { name: 'John', preferredName: 'Johnny', address: '123 Main St' },
    { name: 'Jayne', address: '456 Park Ave' },
  ])
}

async function getUsers (): Promise<User[]> {
  return User.findAll()
}

export { init, getUsers, User }
