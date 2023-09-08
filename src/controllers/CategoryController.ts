import AppDataSource from "../data-source";
import { Request, Response } from 'express';
import { Category } from '../entities/Category';

class CategoryController {
  public async create(req: Request, res: Response): Promise<Response> {
    let { name } = req.body;
    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "Nome obrigatório", props:"name" });
    }
    name = name.trim();
    const category = await AppDataSource.manager.save(Category, { name }).catch(e => {
      // testa se o name é repetido
      if (/(name)[\s\S]+(already exists)/.test(e.detail)) {
        return { error: 'Categoria já existe', props:"name" };
      }
      return { error: e.message };
    });
    return res.json(category);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    let { id, name } = req.body;
    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "Nome obrigatório", props:"name" });
    }
    name = name.trim();
    const category = await AppDataSource.manager.save(Category, { id, name }).catch(e => {
      // testa se o name é repetido
      if (/(name)[\s\S]+(already exists)/.test(e.detail)) {
        return { error: 'Categoria já existe', props:"name" };
      }
      return { error: e.message };
    });
    return res.json(category);
  }

  public async list(_: Request, res: Response): Promise<Response> {
    const categories = await AppDataSource.manager.find(Category, {
      order: {
        name: "ASC"
      }
    });
    return res.json(categories);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.body;
    // o método delete retorna o objeto {"raw": [],"affected": 1}
    // a propriedade affected terá valor 0 se não tiver sido excluído o registro
    const { affected } = await AppDataSource.manager.delete(Category, { id });
    return res.json({ affected });
  }

}

export default new CategoryController();