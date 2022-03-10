function edit_acerca(texto,entrada){
    document.getElementById(String(entrada)).style.display="block";

    let text = document.getElementById(texto).innerText;
    console.log(text);
}

function f(valor){
    document.getElementById("texto-acerca").innerText=valor;    
}

let textarea=document.getElementById("input-acerca");
textarea.addEventListener('keyup',(e)=>{
    logMessage(`Key "${e.Key}" released [event: Keyup]`);
    if(e.key=="Enter"){
        document.getElementById("input-acerca").style.display="none"
        
    }
});

function logMessage(msj){
    console.log(msj + "<br>");
}