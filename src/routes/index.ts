import { Router, Request, Response } from "express";
import brand from './brand';
import category from './category';
import user from './user';
import bike from './bike';
import rent from './rent';
import photo from './photo';

const routes = Router();

routes.use("/bike", bike);
routes.use("/categoria", category);
routes.use("/foto", photo);
routes.use("/locacao", rent);
routes.use("/marca", brand);
routes.use("/usuario", user);

//aceita qualquer método HTTP ou URL
routes.use( (_:Request,res:Response) => res.json({error:"Requisição desconhecida"}) );

export default routes;
