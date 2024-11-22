import {getTodosPosts,criarPost,atualizarPost} from "../models/postModels.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiService.js"

export async function listarPosts (req, res) {
    //res.status(200).send("Boas vindas à imersão!");
    //res.status(200).json(posts);
    const posts = await getTodosPosts();
    res.status(200).json(posts);
}

export async function postarNovoPost(req, res) {
    const novoPost = req.body;
    try{
        const postCriado = await criarPost(novoPost);
        res.status(200).json(postCriado);
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
}

export async function uploadImagem(req, res) {
    const novoPost = {
        descricao: req.file.originalname,
        imgUrl: "",
        alt: ""
    }
    try{
        const postCriado = await criarPost(novoPost);
        const imgAtualizada = `uploads/${postCriado.insertedId}.png`;
        fs.renameSync(req.file.path, imgAtualizada);
        res.status(200).json(postCriado);
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
}

export async function atualizaNovoPost(req, res) {
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/&${id}.png`;
    
    try{
        const imageBuffer = fs.readFileSync(`uploads/${id}.png`)
        const descricao = await gerarDescricaoComGemini(imageBuffer);
        const post = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt
        }
        const postCriado = await atualizarPost(id, post);
        res.status(200).json(postCriado);
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
}