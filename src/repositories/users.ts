import { IUsersRepository } from '../controllers/interfaces';
import { NewUser, User } from '../controllers/models';
import { UsersModel } from '../db/models/Users'
import { v4 } from 'uuid'

export class UsersRepository implements IUsersRepository {
  // Fiz a implementação dessas 2 linhas:
  update(id: string, User: NewUser): Promise<void> {
    throw new Error('Method not implemented.');
  }
  public async create(newUser: NewUser): Promise<User> {
    const id = v4()
    const user = await UsersModel.create({id, ...newUser})
    return user.dataValues
  }
  
  public async getById(id: string): Promise<User | undefined> {
    const user = await UsersModel.findOne({ where: { id } })
    if(!user)
      return undefined

    return user.dataValues
  }

  public async getByEmail(email: string): Promise<User | undefined> {
    const user = await UsersModel.findOne({ where: { email } })
    if(!user)
      return undefined

    return user.dataValues
  }

  public async list(): Promise<User[]> {
    const users = await UsersModel.findAll()

    return users.map(user => ({
      id: user.dataValues.id,
      name: user.dataValues.name,
      email: user.dataValues.email      
    }))
  }
}