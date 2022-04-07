function login(){
    //completar
}

function escrituraContinua(valor,lugar){
    document.getElementById(lugar).innerText=valor;
}

//AGREGAMOS EVENTOS
//presentacion
document.getElementById("inputPerfil").addEventListener('keyup',(e)=>{
    if(e.key=="Enter"){
        document.getElementById("inputPerfil").style.display="none";
    }
});
//acerca
document.getElementById("inputAcerca").addEventListener('keyup',(e)=>{
    if(e.key=="Enter"){
        document.getElementById("inputAcerca").style.display="none"
    }
});

//input Experiencia
document.getElementById("inputExperiencia").addEventListener('keyup',(e)=>{
    if(e.key=="Enter"){
        document.getElementById("inputExperiencia").style.display="none"
    }
});

//input Educacion
document.getElementById("inputEducacion").addEventListener('keyup',(e)=>{
    if(e.key=="Enter"){
        document.getElementById("inputEducacion").style.display="none"
    }
});

//input Skill
document.getElementById("inputHabilidades").addEventListener('keyup',(e)=>{
    if(e.key=="Enter"){
        document.getElementById("inputHabilidades").style.display="none"
    }
});
//input Proyecto
document.getElementById("inputProyecto").addEventListener('keyup',(e)=>{
    if(e.key=="Enter"){
        document.getElementById("inputProyecto").style.display="none"
    }
});

//Funciones menubar
function login(){
    console.log("login");
}

//FUNCIONES sobre cartas
function editPerfil(){
    document.getElementById("inputPerfil").style.display="block";
}

function editAcerca(){
    document.getElementById("inputAcerca").style.display="block";
}

function agregaExperiencia(){
    document.getElementById("inputExperiencia").style.display="block";
}

function editExperiencia(){
    console.log("editExperiencia");
}

function borraExperiencia(){
    console.log("borraExperiencia");
}

function agregaEducacion(){
    document.getElementById("inputEducacion").style.display="block";
}

function editEducacion(){
    console.log("editEducacion");
}

function borraEducacion(){
    console.log("borraEducacion");
}

function agregaSkill(){
    document.getElementById("inputHabilidades").style.display="block";
}

function editHabilidad(){
    console.log("edita Habilidad");
}

function borraHabilidad(){
    console.log("borra habilidad");
}

function agregaProyecto(){
    document.getElementById("inputProyecto").style.display="block";
}

function editProyecto(){
    console.log("editProyecto");
}

function borraProyecto(){
    console.log("borraProyecto");
}