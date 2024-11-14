// variáveis para armazenar os itens selecionados e o botão de finalizar pedido
let pratoSelecionado = null;
let bebidaSelecionada = null;
let sobremesaSelecionada = null;
const checkoutButton = document.getElementById('checkoutButton');
const modal = document.getElementById('modal');
const pedidoDetalhes = document.getElementById('pedidoDetalhes');
const totalPedido = document.getElementById('totalPedido');

//  overlay
const overlay = document.getElementById('overlay');

//  botão desabilitado ao carregar a página
checkoutButton.disabled = true;
checkoutButton.innerHTML = "Selecione os 3 itens <br> para fechar o pedido"; 
checkoutButton.classList.remove('botaoAtivado');
checkoutButton.classList.add('botaoDesativado'); 

// função para marcar os itens como selecionados
function marcarItem(item) {
    const categoria = item.dataset.categoria;
    
    // desmarcar o item selecionado na mesma categoria
    document.querySelectorAll(`.item[data-categoria="${categoria}"]`).forEach(i => {
        i.classList.remove('selecionado');
    });
    
    // classe que marca o item atual
    item.classList.add('selecionado');
    
    // salvando a seleção
    if (categoria === 'prato') pratoSelecionado = item;
    if (categoria === 'bebida') bebidaSelecionada = item;
    if (categoria === 'sobremesa') sobremesaSelecionada = item;
    
    // habilitar e desabilitar o botão de finalizar pedido
    if (pratoSelecionado && bebidaSelecionada && sobremesaSelecionada) {
        checkoutButton.disabled = false;
        checkoutButton.innerHTML = "Fechar Pedido"; 
        checkoutButton.classList.remove('botaoDesativado');
        checkoutButton.classList.add('botaoAtivado'); 
    } else {
        checkoutButton.disabled = true;
        checkoutButton.innerHTML = "Selecione os 3 itens <br> para fechar o pedido"; 
        checkoutButton.classList.remove('botaoAtivado');
        checkoutButton.classList.add('botaoDesativado'); 
    }
}

// função para mostrar o modal de confirmação de pedido
function mostrarModal() {
    const prato = pratoSelecionado.querySelector('h3').innerText;
    const bebida = bebidaSelecionada.querySelector('h3').innerText;
    const sobremesa = sobremesaSelecionada.querySelector('h3').innerText;
    
    const precoPrato = parseFloat(pratoSelecionado.dataset.preco);
    const precoBebida = parseFloat(bebidaSelecionada.dataset.preco);
    const precoSobremesa = parseFloat(sobremesaSelecionada.dataset.preco);
    
    const total = precoPrato + precoBebida + precoSobremesa;
    
    
    pedidoDetalhes.innerHTML = `        
        <p>- Prato: ${prato} - R$ ${precoPrato.toFixed(2)}</p>
        <p>- Bebida: ${bebida} - R$ ${precoBebida.toFixed(2)}</p>
        <p>- Sobremesa: ${sobremesa} - R$ ${precoSobremesa.toFixed(2)}</p>
    `;
    totalPedido.innerHTML = `<strong>TOTAL: R$ ${total.toFixed(2)}</strong>`; /* 2 casas decimais */
    
    // modal visível
    modal.style.opacity = 1;
    modal.style.display = 'flex';  
    modal.style.zIndex = 1000;
    modal.style.transition = 'opacity 0.3s ease';
    
    //  overlay visível
    overlay.style.display = 'block';
    overlay.style.opacity = 0.6;
}

// função para cancelar o pedido
document.getElementById('cancelarPedido').addEventListener('click', function() {
    modal.style.opacity = 0;
    modal.style.display = 'none';
    
    // esconde o overlay
    overlay.style.display = 'none';
});

// finalizar o pedido e enviar para o whats
document.getElementById('finalizarPedido').addEventListener('click', function() {
    // cria a mensagem a ser enviada
    const mensagem = `
        Olá, gostaria de fazer o pedido:
        - Prato: ${pratoSelecionado.querySelector('h3').innerText}
        - Bebida: ${bebidaSelecionada.querySelector('h3').innerText}
        - Sobremesa: ${sobremesaSelecionada.querySelector('h3').innerText}
        Total: ${parseFloat(pratoSelecionado.dataset.preco) + parseFloat(bebidaSelecionada.dataset.preco) + parseFloat(sobremesaSelecionada.dataset.preco)}
    `;
    
    
    const url = `https://wa.me/5561981241970?text=${encodeURIComponent(mensagem)}`;

    
    // redireciona  para o whats
    window.location.href = url;
});

// finalizar pedido
checkoutButton.addEventListener('click', mostrarModal);


document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', () => marcarItem(item));
});
