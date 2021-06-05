const menu = [
    {
        tipo: "X-Salada",
        preco: 4.5,
        quantidade: 0,
    },
    {
        tipo: "X-Bacon",
        preco: 5.0,
        quantidade: 0,
    },
    {
        tipo: "Cachorro-Quente",
        preco: 4.0,
        quantidade: 0,
    },
    {
        tipo: "Torrada",
        preco: 2.0,
        quantidade: 0,
    },
    {
        tipo: "Refrigerante",
        preco: 1.5,
        quantidade: 0,
    }
]

function elementos_body() {
    document.getElementById('title').innerHTML = `Bem vindo à l'ANAchonete`
    document.getElementById('comprar').innerHTML = `COMPRAR`
    document.getElementById('comprar').setAttribute('onclick', "nota_fiscal()")
    document.getElementById('conteiner').innerHTML = ' '
    for (let indice = 0; indice < menu.length; indice++)
    {
        menu[indice]['quantidade'] = 0;
        document.getElementById('conteiner').innerHTML += `
        <div class="lanche">
            <img class="foto" src="_img/lanche${indice}.jpg" />

            <div class="info">
                <h2 class="nome">${menu[indice]["tipo"]}</h2>
                <p class="preco">Preço Unitário: R$${menu[indice]["preco"].toFixed(2)}</p>
                <p class="quantidade">
                Quantidade: 
                    <input id="quantidade${indice}" class="value" type="text" step="1" min="0" start="0" value="0" readonly />
                    <span class="botao" onclick="quantidade(-1, ${indice})">-</span>
                    <span class="botao" onclick="quantidade(1, ${indice})">+</span>
                </p>
                <p>
                Subtotal:
                    <input id="subtotal${indice}" class="value" type="text" step="1" min="0" start="0" value="R$0,00" readonly />
                </p>
            </div>
        </div>`;
    }
}     

function quantidade (qtd, i) {
    if (qtd == -1 && menu[i]["quantidade"] == 0){
        menu[i]["quantidade"] = 0;
    }
    else
    {
        menu[i]["quantidade"] += qtd;
        console.log(menu[i]["quantidade"]);
        subtotal();
        document.getElementById(`quantidade${i}`).value = `${menu[i]["quantidade"]}`;
    }
}

function subtotal() {
    for (let indice = 0; indice < menu.length; indice++)
    {
        let subtotal = menu[indice]["quantidade"] * menu[indice]["preco"];
        menu[indice]["subtotal"] = subtotal;
        console.log("subtotal", subtotal);
        document.getElementById(`subtotal${indice}`).value = `R$${subtotal.toFixed(2)}`;
    }
}

function nota_fiscal () {
    let total = 0;
    let produtoNaoEscolhido = 0;
    document.getElementById('comprar').innerHTML = `VOLTAR`;
    document.getElementById('comprar').setAttribute('onclick', "elementos_body()");
    document.getElementById('title').innerHTML = 'Volte sempre!';
    document.getElementById('conteiner').innerHTML = `
    <table id="nf">
    <tr>
        <th class="titulo celula nome">Produto</th>
        <th class="titulo celula qtd">Quantidade</th>
        <th class="titulo celula preco">Preço Unit.</th>
        <th class="titulo celula">Subtotal</th>
    </tr>
    </table>`;
    for (let indice = 0; indice < menu.length; indice++)
    {
        if (menu[indice]["quantidade"] > 0)
        {
            document.getElementById('nf').innerHTML += `
            <tr>
                <td class="nome celula">${menu[indice]['tipo']}</td>
                <td class="center celula">${menu[indice]["quantidade"]}</td>
                <td class="center celula">R$${menu[indice]["preco"].toFixed(2)}</td>
                <td class="sub celula">R$${menu[indice]["subtotal"].toFixed(2)}</td>
            </tr>`;

            total += menu[indice]["subtotal"];
            console.log('total', total);
        }
        else{
            produtoNaoEscolhido += 1;
        }
    }

    document.getElementById('nf').innerHTML += `
    <tfoot id="tablefoot">
        <tr>
            <td class="titulo celula" colspan="3">Total</td>
            <td class="titulo sub celula">R$${total.toFixed(2)}</td>
        </tr>
    </tfoot>`;

    if (produtoNaoEscolhido == 5)
    {
        alert("Escolha algum produto para continuar!");
        elementos_body();
    }

}
