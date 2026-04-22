# 🏐 Controle de Grade - Vôlei

Um aplicativo web leve e responsivo para gerenciamento de filas e vagas em jogos de vôlei (estilo "Rei da Quadra"). Desenvolvido com HTML, CSS e JavaScript puros (Vanilla), com interface otimizada para uso rápido na beira da quadra através do celular.

## 🚀 Funcionalidades

* **Gestão de Vagas Individuais:** Controle independente da "Vaga 1" e "Vaga 2" da quadra.
* **Sistema de "Rei da Quadra" (Rotatividade):** Com um clique, quem perde o jogo vai para o final da fila, e o primeiro da fila sobe automaticamente para a vaga na quadra.
* **Reordenação de Fila:** Controles administrativos para subir (⬆️) ou descer (⬇️) a posição de um jogador, facilitando ajustes de última hora.
* **Menu de Ações Compacto (Mobile-First):** Layout limpo que agrupa ações secundárias (fura-fila e remoção) em um menu dropdown (*select*), evitando botões espremidos em telas menores.
* **Trava Anti-Spam (Local):** Impede que um mesmo usuário cadastre múltiplos nomes na fila pelo mesmo dispositivo.
* **Painel de Administrador Seguro:** Funcionalidades críticas ficam ocultas sob uma senha de admin.
* **Salvamento Automático (Offline-first):** Utiliza o `localStorage` do navegador para garantir que a fila não seja perdida se a página for atualizada ou o celular bloqueado.
* **Tema Escuro (Dark Mode):** Interface moderna e otimizada para economizar bateria durante o uso externo em parques e ginásios.

## 🛠️ Tecnologias Utilizadas

* **HTML5:** Estrutura semântica.
* **CSS3:** Estilização responsiva (Flexbox) e Tema Escuro.
* **JavaScript (ES6):** Lógica de rotatividade, controle de estado (`localStorage`) e manipulação do DOM.

## 📱 Como Usar (Para a Galera na Quadra)

1. Acesse o link do aplicativo: `https://grade-volei.netlify.app/` *(substitua pelo seu link real, se necessário)*
2. Na caixa de texto "Adicionar Jogador", digite o seu nome e clique em **Adicionar**.
3. Se a quadra estiver vazia, seu nome entra direto. Se estiver cheia, você vai para o final da fila.
4. Aguarde a sua vez! Apenas o Administrador da rede controla a rotação.

## ⚙️ Como Usar (Para o Administrador)

1. Acesse o aplicativo e clique no botão **Área Admin** no canto superior direito.
2. Insira a senha de administrador.
3. Você terá acesso aos controles avançados:
   * **Na Quadra - Perdeu:** Tira o jogador da vaga, manda para o fim da fila e puxa o 1º da fila para a quadra.
   * **Na Quadra - Sair:** Tira o jogador da vaga e manda para o fim da fila (sem puxar o próximo automaticamente).
   * **Na Fila - Setas (⬆️ / ⬇️):** Sobe ou desce um jogador de posição na fila de espera.
   * **Na Fila - Menu "Ações...":** Um dropdown para escolher colocar o jogador direto na Vaga 1, Vaga 2, ou retirá-lo da fila.
   * **Zerar Grade Completa:** Apaga todos os dados da memória (ideal para começar um novo dia de jogos).

## 💻 Como Rodar Localmente (Desenvolvimento)

Como o projeto não utiliza frameworks complexos ou banco de dados externo, rodá-lo localmente é extremamente simples:

1. Clone este repositório:
   ```bash
   git clone [https://github.com/espertty/grade-volei.git](https://github.com/espertty/grade-volei.git)

## 🔐 Configuração de Senha (Desenvolvedores)

Por padrão, a senha para liberar os botões da Área Admin vem fixada diretamente no código frontend.
* **Senha Padrão de Fábrica:** `volei123`

**Para alterar a senha no seu clone:**
1. Abra o arquivo `script.js`.
2. Role até o final do arquivo, na seção de `// Lógica de Login`.
3. Altere o valor da string `"volei123"` dentro da condição `if (senha === "volei123")` para a sua nova senha desejada.