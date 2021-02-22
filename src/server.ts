import express, { response } from 'express'

const app = express();

//GET => BUSCA
//POST => SALVAR
//PUT => ALTERAR
//DELETE => DELETAR
//PATCH => ALTERAÇÃO ESPECÍFICA

//http://localhost:3333/
app.get("/", (req, res) => {
    return res.json({message: "Hello World - NLW#04"});
})


//1 param => Rota(Recurso API)
//2 param => request, response
app.post("/", (req, res) => {
    //Recebeu os dados para salvar
    return res.json({message: "Os dados foram salvos com sucesso"})
})

app.listen(3333, ()=> console.log("Server is running!!"));