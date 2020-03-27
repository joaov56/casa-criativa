//configurei o server
const express = require("express")
const server =  express()


const db= require("./db")



//configurar os arquivos estaticos(css, scripts,imagens)
server.use(express.static("public"))

//habilitar uso do req.body

server.use(express.urlencoded({extended: true}))


//configuração do nunjucks
const nunjucks= require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true
})

//criei uma requisião
//capturo a requisição do cliente para responder
server.get("/", function(req, res){

    db.all(`SELECT * FROM ideas`, function(err, rows){
        if(err){
            console.log(err)
            return res.send("DB ERROR CONTACT DEVELOPER")
        }
    
        const reversedIdea= [...rows].reverse()


        let lastIdeas= []
        for (let idea of reversedIdea){
            if(lastIdeas.length < 3){
                lastIdeas.push(idea)
            }
    } 
      


    return res.render("index.html", { ideas: lastIdeas })
    })

    
})

server.get("/ideias", function(req, res){

    req.query 

    db.all(`SELECT * FROM ideas`, function(err, rows){
        if(err){
            console.log(err)
            return res.send("DB ERROR CONTACT DEVELOPER")
        }

        const reversedIdea= [...rows].reverse()
        return res.render("ideias.html", {ideas: reversedIdea})
    })


})

server.post("/", function(req,res){
    const query= `
    INSERT INTO ideas(
        image,
        title,
        category,
        description,
        link
    ) VALUES (?,?,?,?,?);   
    `
    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link
    ]
    db.run(query, values, function(err){
        if(err){
            console.log(err)
            return res.send("DB ERROR CONTACT DEVELOPER")
        }

        return(res.redirect("/ideias"))
    })
})

//server ligado na por
server.listen(3000)