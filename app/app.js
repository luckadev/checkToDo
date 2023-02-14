//localStorage...

// let listaTarefas = [];
let listaTarefas = JSON.parse(localStorage.getItem("@listaTarefas")) || [];

let btnAdicionar = document.getElementById("btnAdd");
btnAdicionar.addEventListener('click', addItem);

function color(){
    return 'cor' + Math.floor(Math.random() * 4);
}


function addItem() {

    let valueInput = document.getElementById("inputValue").value

    if (valueInput === null || valueInput === '') {
        let msgInvalid = document.getElementById("msgInvalid");
        msgInvalid.style.visibility = 'visible';
    } else {

        if (document.getElementById("msgInvalid")) {
            let msgInvalid = document.getElementById("msgInvalid");
            msgInvalid.style.visibility = 'hidden';
        }

        listaTarefas.push(valueInput);
        document.getElementById("inputValue").value = "";

        let ul = document.getElementById("lista");
        let li = document.createElement("li");
        ul.appendChild(li);
        li.classList.add("jsLista");

        //test
        li.classList.add(color());

        li.setAttribute("id", "remover");

        let tituloItem = document.createElement("p");
        tituloItem.classList.add("pTitle");
        tituloItem.setAttribute("id", "tituloRemover");
        tituloItem.innerHTML = valueInput;
        li.appendChild(tituloItem);

        let btnExcluirItem = document.createElement("button");
        btnExcluirItem.classList.add("btnExcluirItem");
        btnExcluirItem.setAttribute('id', 'btnRemover');

        btnExcluirItem.addEventListener("click", function excluirItem() {

            let pToFind = tituloItem.innerHTML;
            let index = listaTarefas.indexOf(pToFind);
            // indexOf(element) - if true it returns the currently value of its index, if false it returns -1

            if (index !== -1) {
                listaTarefas.splice(index, 1)
                // console.log(`Found at index ${index}`);
                // splice(startIndex, deleteCount)
            }

            li.remove(li)
        });

        li.appendChild(btnExcluirItem);
        btnExcluirItem.innerHTML = "X";

    }
    salvarDados();
}

function salvarDados(){
    localStorage.setItem("@listaTarefas", JSON.stringify(listaTarefas))
}