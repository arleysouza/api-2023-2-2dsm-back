import AppDataSource from "../data-source";
import { Request, Response } from 'express';
import { Rent } from '../entities/Rent';
import { User } from "../entities/User";

class RentController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { idclient, idowner, date, ownervaluation } = req.body;

    //obtém o usuário na tabela users
    const owner = await AppDataSource.manager.findOneBy(User, { id: idowner });
    if (!owner) {
      return res.status(400).json({ error: "Proprietário desconhecido", props:"owner" });
    }

    //obtém o usuário na tabela users
    const client = await AppDataSource.manager.findOneBy(User, { id: idclient });
    if (!client) {
      return res.status(400).json({ error: "Cliente desconhecido", props:"client" });
    }

    const rent = await AppDataSource.manager.save(Rent, { owner, client, date, ownervaluation });
    return res.json(rent);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id, idclient, idowner, date, ownervaluation } = req.body;

    //obtém o usuário na tabela users
    const owner = await AppDataSource.manager.findOneBy(User, { id: idowner });
    if (!owner) {
      return res.status(400).json({ error: "Proprietário desconhecido", props:"owner" });
    }

    //obtém o usuário na tabela users
    const client = await AppDataSource.manager.findOneBy(User, { id: idclient });
    if (!client) {
      return res.status(400).json({ error: "Cliente desconhecido", props:"client" });
    }

    const rent = await AppDataSource.manager.save(Rent, { id, owner, client, date, ownervaluation });
    return res.json(rent);
  }

  public async list(_: Request, res: Response): Promise<Response> {
    const rents = await AppDataSource.manager.find(Rent, {
      relations:{
        client: true,
        owner: true
      },
      order: {
        date: "DESC"
      }
    });
    return res.json(rents);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.body;
    // o método delete retorna o objeto {"raw": [],"affected": 1}
    // a propriedade affected terá valor 0 se não tiver sido excluído o registro
    const { affected } = await AppDataSource.manager.delete(Rent, { id });
    return res.json({ affected });
  }

}

export default new RentController();