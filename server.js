//configurei o server
const express = require("express")
const server =  express()



const ideas = [
    {
        img :"https://image.flaticon.com/icons/svg/2729/2729007.svg",
        tittle: "Curso de Programação",
        category: "Estudo",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        url : "https://rocketseat.com.br"
    },

    {
        img :"https://image.flaticon.com/icons/svg/2729/2729005.svg",
        tittle: "Exercícios",
        category:"Saúde",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        url: "https://rocketseat.com.br"
    },

    {
        img :"https://image.flaticon.com/icons/svg/2729/2729027.svg",
        tittle: "Meditação",
        category: "Mentalidade",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        url: "https://rocketseat.com.br"
    },

    {
        img :"https://image.flaticon.com/icons/svg/2729/2729032.svg",
        tittle: "Karaokê",
        category: "Diversão e família",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        url: "https://rocketseat.com.br"
    },
]

//configurar os arquivos estaticos(css, scripts,imagens)
server.use(express.static("public"))


//configuração do nunjucks
const nunjucks= require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true
})

//criei uma requisião
//capturo a requisição do cliente para responder
server.get("/", function(req, res){

    const reversedIdea= [...ideas].reverse()
    let lastIdeas= []
    for (let idea of reversedIdea){
        if(lastIdeas.length < 3){
            lastIdeas.push(idea)
        }
    } 



    return res.render("index.html", { ideas: lastIdeas })
})

server.get("/ideias", function(req, res){

    const reversedIdea= [...ideas].reverse()
    return res.render("ideias.html", {ideas: reversedIdea})
})

//server ligado na por
server.listen(3000)