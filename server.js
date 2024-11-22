import express from "express";
import routes from "./src/routes/postsroutes.js";

const posts = [
    {
        id: 1,
        descricao: "Uma foto teste",
        imagem: "https://placecats.com/millie/300/150"
    },
    {
        id: 2,
        descricao: "Paisagem montanhosa",
        imagem: "https://placecats.com/millie/300/150"
    },
    {
        id: 3,
        descricao: "Cachorro brincando",
        imagem: "https://placecats.com/millie/300/150"
    },
    {
        id: 4,
        descricao: "Citação inspiradora",
        imagem: "https://placecats.com/millie/300/150"
    },
    {
        id: 5,
        descricao: "Comida deliciosa",
        imagem: "https://placecats.com/millie/300/150"
    },
    {
        id: 6,
        descricao: "Arte abstrata",
        imagem: "https://placecats.com/millie/300/150"
    }
];
const app = express();
app.use(express.static("uploads"));
routes(app);

app.listen(3000, () => {
    console.log("servidor escutando...");
});

//function buscarPostPorId(id){
//    return posts.findIndex((post) => {
//        return post.id===Number(id);
//    })
//};

