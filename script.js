function onOff(){
    document    
        .querySelector("#modal")
        .classList
        .toggle("hide")

    document
        .querySelector("body")
        .classList
        .toggle("hide-scroll")

}


function checkFields(event){
    const valuesToCheck= [
        "title",
        "image",
        "category",
        "description",
        "link"

    ]
    
    const isEmpity = valuesToCheck.find(function(value){
        const checkIfIsString= typeof event.target[value].value== "string"
        const checkIfIsEmpty= !event.target[value].value.trim()

        if(checkIfIsString && checkIfIsEmpty){
            return true
        }
    })

    if(isEmpity){
        event.preventDefault()
        alert("Preencha todos os campos")
    }
    for(let value of valuesToCheck){
        event.target[value].value
    }
    
}


