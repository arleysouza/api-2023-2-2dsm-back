import express, { Router, Request, Response } from "express";
import controller from "../controllers/PhotoController";
import multer from "multer";
import path from "path";

// para mais detalhes acesse: https://www.youtube.com/watch?v=FFWNVPysy5I
const storage = multer.diskStorage({
    // seta o caminho para a pasta que receberá as fotos
    destination: path.resolve(__dirname, process.env.FOLDERPHOTOS),
    filename: (req, file, callback) => {
        //gera um nome para o arquivo usando a data e horário atual + um número aleatório + extensão do arquivo
        const filename = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        callback(null, filename);
    }
});
const upload = multer({ storage });

const routes = Router();

// o multer funciona como um middleware
routes.post('/', upload.single('file'), controller.create);
routes.get('/', controller.list);
routes.delete('/', controller.delete);
// rota para a pasta public/photos
routes.use("/public", express.static('public/photos'));

//aceita qualquer método HTTP ou URL
routes.use( (_:Request,res:Response) => res.json({error:"Requisição desconhecida"}) );

export default routes;