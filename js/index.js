let body = document.body;
let UlItens = document.querySelector(".listaProdutos");
let contador = 0;
let somaSubtracao = 0;
let procura = [];

let button = document
  .querySelector(".btnPesquisar")
  .addEventListener("click", function () {
    let input = document.querySelector("#pesquisar").value.toLowerCase();
    for (let i = 0; i < data.length; i++) {
      if (data[i].nameItem.toLowerCase().includes(input)) {
        procura.push(data[i]);
        listarProdutos(procura);
      }
    }

    if (input.length == 0 && procura.length > 0) {
      procura = [];
      listarProdutos(data);
    }
    if (procura.length == 0) {
      listarProdutos(data);
    }
  });

function listarProdutosNavMenu() {
  let buttonNav = document.querySelectorAll(".botoesMenu");

  for (let i = 0; i < buttonNav.length; i++) {
    buttonNav[i].addEventListener("click", function (event) {
      let produtosFiltrados = procuraProdutoNav(event.target.innerText);
      listarProdutos(produtosFiltrados);
    });
  }
}
listarProdutosNavMenu();

function listarProdutos(valor) {
  UlItens.innerHTML = "";
  for (let i = 0; i < valor.length; i++) {
    let li = document.createElement("li");
    let img = document.createElement("img");
    let button = document.createElement("button");
    let h3 = document.createElement("h3");
    let p = document.createElement("p");
    let p2 = document.createElement("p");
    let button2 = document.createElement("button");
    li.classList.add("produtos");
    img.classList.add("imgCard");
    button.classList.add("tag");
    p2.classList.add("preco");
    button2.classList.add("adcpreco");
    button2.setAttribute("id", valor[i].id);

    img.src = valor[i].img;
    img.alt = valor[i].nameItem;
    button.innerHTML = valor[i].tag;
    h3.innerHTML = valor[i].nameItem;
    p.innerHTML = valor[i].description;
    p2.innerHTML = `R$ ${valor[i].value},00`;
    button2.innerHTML = valor[i].addCart;

    button2.addEventListener("click", function () {
      adicionarCarrinho(valor[i].id);
    });

    UlItens.appendChild(li);
    li.appendChild(img);
    li.appendChild(button);
    li.appendChild(h3);
    li.appendChild(p);
    li.appendChild(p2);
    li.appendChild(p2);
    li.appendChild(button2);
  }
}
listarProdutos(data);

function adicionarCarrinho(id) {
  let produto = procuraProduto(id);

  carrinhoDeCompras(produto);
}

function procuraProduto(id) {
  for (let j = 0; j < data.length; j++) {
    let produto = data[j];
    if (produto.id == id) {
      return produto;
    }
  }
  return false;
}

function procuraProdutoNav(tag) {
  if (tag === "Todos") {
    return data;
  }

  let produtofiltrado = [];

  for (let j = 0; j < data.length; j++) {
    let produto = data[j];

    if (produto.tag[0] === tag) {
      produtofiltrado.push(produto);
    }
  }
  return produtofiltrado;
}

function carrinhoDeCompras(produto) {
  let ul = document.querySelector(".ul");
  let li = document.createElement("li");
  let img = document.createElement("img");
  let div = document.createElement("div");
  let h3 = document.createElement("h3");
  let p = document.createElement("p");
  let button = document.createElement("button");
  ul.classList.add("comProduto");
  li.classList.add("produtoAside");
  div.classList.add("itensProduto");
  h3.classList.add("itemAside");
  p.classList.add("valorAside");
  button.classList.add("removerItem");

  img.src = produto.img;
  img.alt = produto.nameItem;
  h3.innerHTML = produto.nameItem;
  p.innerHTML = ` R$ ${produto.value},00`;
  calculadora("soma", produto.value);
  button.innerHTML = "Remover produto";

  button.addEventListener("click", function (event) {
    let li = event.path[2];
    li.remove();
    contador--;
    calculadora("subtracao", produto.value);
    quantidadeSoma(contador);
  });

  li.appendChild(img);
  li.appendChild(div);
  div.appendChild(h3);
  div.appendChild(p);
  div.appendChild(button);

  ul.appendChild(li);
  contador++;
  quantidadeSoma(contador);
}

function quantidadeSoma(contador) {
  if (contador > 0) {
    let aside = document.querySelector(".carrinhoCompras");
    let div = document.querySelector(".div");
    let p = document.querySelector(".qtd");
    let p1 = document.querySelector(".numqtd");
    let div2 = document.querySelector(".div2");
    let p2 = document.querySelector(".totall");
    let p3 = document.querySelector(".totallnum");
    let div3 = document.querySelector(".div3");
    let h3 = document.querySelector(".carrinho");
    let p4 = document.querySelector(".adc");
    div.classList.add("quantidade");
    div2.classList.add("total");
    div3.classList.remove("semProduto");

    h3.innerHTML = "";
    p4.innerHTML = "";
    p.innerHTML = "Quantidade:";
    p1.innerHTML = contador;
    p2.innerHTML = "Total:";
    p3.innerHTML = `R$ ${somaSubtracao},00`;

    div.appendChild(p);
    div.appendChild(p1);
    div2.appendChild(p2);
    div2.appendChild(p3);

    aside.appendChild(div);
    aside.appendChild(div2);
  }
  if (contador == 0) {
    let aside = document.querySelector(".carrinhoCompras");
    let div3 = document.querySelector(".div3");
    let h3 = document.querySelector(".carrinho");
    let p4 = document.querySelector(".adc");
    div3.classList.add("semProduto");
    let div = document.querySelector(".div");
    let p = document.querySelector(".qtd");
    let p1 = document.querySelector(".numqtd");
    let div2 = document.querySelector(".div2");
    let p2 = document.querySelector(".totall");
    let p3 = document.querySelector(".totallnum");
    let ul = document.querySelector(".ul");
    div.classList.remove("quantidade");
    div2.classList.remove("total");
    ul.classList.remove("comProduto");

    p.innerHTML = "";
    p1.innerHTML = "";
    p2.innerHTML = "";
    p3.innerHTML = "";
    h3.innerHTML = "Carrinho vazio";
    p4.innerHTML = "Adicione Itens";

    div3.appendChild(h3);
    div3.appendChild(p4);

    aside.appendChild(div3);
  }
}
quantidadeSoma(contador);

function calculadora(conta, valor) {
  let total = 0;
  if (conta == "soma") {
    total = valor + somaSubtracao;

    return (somaSubtracao = total);
  }
  if (conta == "subtracao") {
    total = somaSubtracao - valor;

    return (somaSubtracao = total);
  }
}
