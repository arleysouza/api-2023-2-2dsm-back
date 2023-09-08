import AppDataSource from "../data-source";
import { Request, Response } from 'express';
import { Photo } from '../entities/Photo';
import { Bike } from '../entities/Bike';
import { Brand } from '../entities/Brand';

class PhotoController {
  public async create(req: Request, res: Response): Promise<Response> {
    let { idbike} = req.body;
    console.log()
    if (!req.file) {
      return res.status(400).send({error:'Foto não enviada', props:"photo"});
    }

    //obtém a bike na tabela bikes
    const bike = await AppDataSource.manager.findOneBy(Bike, { id: idbike });
    if (!bike) {
      return res.status(400).json({ error: "Bicicleta desconhecida", props:"bike" });
    }

    const photo = await AppDataSource.manager.save(Photo, { bike, filename:req.file.filename });
    return res.json(photo);
  }

  public async list(_: Request, res: Response): Promise<Response> {
    const photos = await AppDataSource.manager.find(Photo);
    return res.json(photos);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.body;
    // o método delete retorna o objeto {"raw": [],"affected": 1}
    // a propriedade affected terá valor 0 se não tiver sido excluído o registro
    const { affected } = await AppDataSource.manager.delete(Photo, { id });
    return res.json({ affected });
  }

}

export default new PhotoController();