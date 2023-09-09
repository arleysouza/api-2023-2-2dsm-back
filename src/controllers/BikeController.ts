import AppDataSource from "../data-source";
import { Request, Response } from 'express';
import { User } from '../entities/User';
import { Bike } from '../entities/Bike';
import { Brand } from "../entities/Brand";
import { Category } from "../entities/Category";

class BikeController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { iduser, idcategory, idbrand, color, size, material, gender, speedkit, rim, suspension, description, hourlyvalue, dailyvalue, latitude, longitude } = req.body;

    //obtém o usuário na tabela users
    const user = await AppDataSource.manager.findOneBy(User, { id: iduser });
    if (!user) {
      return res.status(400).json({ error: "Usuário desconhecido", props:"user" });
    }

    //obtém a marca na tabela brands
    const brand = await AppDataSource.manager.findOneBy(Brand, { id: idbrand });
    if (!brand) {
      return res.status(400).json({ error: "Marca desconhecida", props:"brand" });
    }

    //obtém a categoria na tabela categories
    const category = await AppDataSource.manager.findOneBy(Category, { id: idcategory });
    if (!category) {
      return res.status(400).json({ error: "Categoria desconhecida", props:"category" });
    }

    const bike = await AppDataSource.manager.save(Bike, { user, brand, category, color, size, material, gender, speedkit, rim, suspension, description, hourlyvalue, dailyvalue, latitude, longitude });
    return res.json(bike);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id, iduser, idcategory, idbrand, color, size, material, gender, speedkit, rim, suspension, description, hourlyvalue, dailyvalue, latitude, longitude } = req.body;

    //obtém o usuário na tabela users
    const user = await AppDataSource.manager.findOneBy(User, { id: iduser });
    if (!user) {
      return res.status(400).json({ error: "Usuário desconhecido", props:"user" });
    }

    //obtém a marca na tabela brands
    const brand = await AppDataSource.manager.findOneBy(Brand, { id: idbrand });
    if (!brand) {
      return res.status(400).json({ error: "Marca desconhecida", props:"brand" });
    }

    //obtém a categoria na tabela categories
    const category = await AppDataSource.manager.findOneBy(Category, { id: idcategory });
    if (!category) {
      return res.status(400).json({ error: "Categoria desconhecida", props:"category" });
    }

    const bike = await AppDataSource.manager.save(Bike, { id, user, brand, category, color, size, material, gender, speedkit, rim, suspension, description, hourlyvalue, dailyvalue, latitude, longitude });
    return res.json(bike);
  }

  public async list(_: Request, res: Response): Promise<Response> {
    const bikes = await AppDataSource.manager.find(Bike, {
      relations: {
        user: true,
        brand: true,
        category: true,
        photos: true
      }
    });
    return res.json(bikes);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.body;
    // o método delete retorna o objeto {"raw": [],"affected": 1}
    // a propriedade affected terá valor 0 se não tiver sido excluído o registro
    const { affected } = await AppDataSource.manager.delete(Bike, { id });
    return res.json({ affected });
  }

}

export default new BikeController();