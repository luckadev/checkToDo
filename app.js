function carregaDados() {
    let item = JSON.parse(localStorage.getItem('id')) || [];
    return item;
}

function novoItem() {
    let item = carregaDados() //recupera a lista atualizada do localStorage
    let input = document.getElementById('inputValue').value
    let aviso = document.getElementById('msgInvalid');

    if(input == '') {
        aviso.style.visibility = 'visible'
    } else {
        aviso.style.visibility = 'hidden'
        item.push(input)
        document.getElementById('inputValue').value = ''
        localStorage.setItem('id', JSON.stringify(item)) //atualiza o localStorage
        montarDados();
    }
}

function montarDados() {
    let item = carregaDados()
    
    let ulElement = document.getElementById('lista');
    ulElement.innerHTML = '';

    item.map((v, i) => {
        let liElement = document.createElement('li');
        let itemTitle = document.createElement('p');
        let btnExcluir = document.createElement('button');

        itemTitle.innerHTML = v
        btnExcluir.innerHTML = 'X'

        liElement.className = corAleatoria();
        liElement.classList.add('jsLista');
        btnExcluir.classList.add('btnExcluirItem');
        btnExcluir.id = 'btnExcluir';
        btnExcluir.addEventListener('click', () => excluirItem(i));

        liElement.appendChild(itemTitle);
        liElement.appendChild(btnExcluir);
        ulElement.appendChild(liElement);
    });

    let footer = document.getElementById('footer');
    let btnFooter = document.getElementById('btnFooter')
    btnFooter.addEventListener('click', excluirTudo);

    if (ulElement.childElementCount > 0) {
        footer.classList.add('footer-active');
    } else {
        footer.classList.remove('footer-active');
    }

    function excluirItem(index) {
        let item = carregaDados(); // recupera a lista atualizada
        item.splice(index, 1); // remove o item do array pelo indice
        localStorage.setItem('id', JSON.stringify(item));
        montarDados();
    }

    function excluirTudo() {
        localStorage.removeItem('id');
        ulElement.innerHTML = ''
        footer.classList.remove('footer-active');
    }

}

montarDados();

function corAleatoria() {
    return `cor${Math.floor(Math.random() * 4)}`
}