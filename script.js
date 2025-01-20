document.addEventListener('DOMContentLoaded', () => {
   
    const nomeInput = document.getElementById('nomeProduto');
    const valorInput = document.getElementById('valorProduto');
    const fotoInput = document.getElementById('fotoProduto');
    const adicionarBtn = document.getElementById('adicionarProduto');
    
    const listaDeProdutos = document.querySelector('.listaDeProdutos');

        function criarProduto(nome, valor, fotoURL) {
        console.log("Produto Criado:", nome, valor, fotoURL);
    
        const li = document.createElement('li');
        li.className = 'produto';
     
        const img = document.createElement('img');
        img.src = fotoURL;
        img.alt = `Imagem de ${nome}`;
        img.style.width = '174px';
        img.style.height = '176px';

        const nomeElemento = document.createElement('h3');
        nomeElemento.textContent = nome;

        const valorELixeira = document.createElement('div');
        valorELixeira.className = 'valorELixeira';

        const valorElemento = document.createElement('p');
        valorElemento.textContent = `R$ ${parseFloat(valor).toFixed(2)}`;
  
        const botaoExcluir = document.createElement('button');
        botaoExcluir.className= 'botaoExcluir';
        const imagemLixeira = document.createElement('img');
        imagemLixeira.src = './assets/lixeira.png'; 
        
        imagemLixeira.style.width = '20px'; 
        imagemLixeira.style.height = '20px';
         
        botaoExcluir.appendChild(imagemLixeira);
        
        botaoExcluir.onclick = () => {
            li.remove();
            nomeInput.value = '';
            valorInput.value = '';
            fotoInput.value = '';
        };

        valorELixeira.appendChild(valorElemento);
        valorELixeira.appendChild(botaoExcluir);

      
        li.appendChild(img);
        li.appendChild(nomeElemento);
        li.appendChild(valorELixeira);

        return li;
    }

    adicionarBtn.addEventListener('click', () => {
        const nome = nomeInput.value;
        const valor = valorInput.value;
        const foto = fotoInput.files[0];

        if (nome && valor && foto) {
            const fotoURL = URL.createObjectURL(foto); 
            const novoProduto = criarProduto(nome, valor, fotoURL);
            listaDeProdutos.appendChild(novoProduto);
            
            nomeInput.value = '';
            valorInput.value = '';
            fotoInput.value = '';
           
            fotoInput.classList.remove('uploadPronto'); 
            fotoInput.style.backgroundColor = ''; 
            fotoInput.style.color = ''; 
            fotoInput.setAttribute('placeholder', 'Imagem');
            

            const botaoUploadImagem = document.querySelector('.botaoUploadImagem');
            botaoUploadImagem.textContent = 'Imagem...'; // Resetando o texto
            botaoUploadImagem.style.backgroundColor = '#ffffff'; // Resetando fundo para branco
            botaoUploadImagem.style.color = '#03318c'; // Resetando a cor para o padrão azul
        } else {
            alert('Por favor, preencha todos os campos e envie a imagem!');
        }
    });

    fotoInput.addEventListener('change', () => {
        if (fotoInput.files.length > 0) {
           
            fotoInput.classList.add('uploadPronto'); 
            fotoInput.style.backgroundColor = '#e6ffe6';
            fotoInput.style.color = 'green';
            fotoInput.setAttribute('placeholder', 'Imagem Carregada'); 
        } else {
           
            fotoInput.classList.remove('uploadPronto'); 
            fotoInput.style.backgroundColor = '';
            fotoInput.style.color = ''; 
            fotoInput.setAttribute('placeholder', 'Imagem'); 
        }
    });
});

adicionarBtn.addEventListener('click', () => {
    const nome = nomeInput.value.trim();
    const valor = valorInput.value.trim();
    const foto = fotoInput.files[0]; 

    console.log("Valores:", nome, valor, foto);

    if (nome && valor && foto) {
        const reader = new FileReader();

        reader.onload = function(e) {
            const fotoURL = e.target.result; 
            console.log("URL da Imagem:", fotoURL); 
            const novoProduto = criarProduto(nome, valor, fotoURL);
            listaDeProdutos.appendChild(novoProduto);

            nomeInput.value = '';
            valorInput.value = '';
            fotoInput.value = '';
        };

        reader.readAsDataURL(foto);
    } else {
        alert('Por favor, preencha todos os campos.');
    }
});

function atualizarBotaoImagem() {
    const arquivoInput = document.getElementById('fotoProduto');
    const botaoUploadImagem = document.querySelector('.botaoUploadImagem');
    
    if (arquivoInput.files && arquivoInput.files[0]) {
        botaoUploadImagem.textContent = 'Imagem carregada!'; 
        botaoUploadImagem.classList.add('uploadPronto'); 
    } else {
        botaoUploadImagem.textContent = 'Imagem...';
        botaoUploadImagem.classList.remove('uploadPronto'); 
    }
}

