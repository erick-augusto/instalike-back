import express from "express";
import multer from "multer";
import cors from "cors";
import { listarPosts,postarNovoPost,uploadImagem,atualizaNovoPost } from "../controllers/postController.js";

const corsOpt = {origin:"http://localhost:8000",optionsSuccessStatus:200}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ dest: "./uploads" , storage})

const routes = (app) =>{
    app.use(express.json());
    app.use(cors(corsOpt));

    app.get("/posts", listarPosts);

    app.post("/posts", postarNovoPost);

    app.post("/upload", upload.single("imagem"), uploadImagem);

    app.put("/upload/:id", atualizaNovoPost);
    
    //app.get("/posts/:id", (req, res) => {
    //    const index = buscarPostPorId(req.params.id);
    //    res.status(200).json(posts[index]);
    //});
    
}

export default routes;