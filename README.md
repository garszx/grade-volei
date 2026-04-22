# 🏐 Controle de Grade - Vôlei

Um aplicativo web leve e responsivo para gerenciamento de filas e vagas em jogos de vôlei (estilo "Rei da Quadra"). Desenvolvido com HTML, CSS e JavaScript puros (Vanilla), com interface otimizada para uso rápido na beira da quadra através do celular.

## 🚀 Funcionalidades

* **Gestão de Vagas Individuais:** Controle independente da "Vaga 1" e "Vaga 2" da quadra.
* **Placar de Jogo Integrado (0-25):** Controle manual de pontuação com botões +/- ultra responsivos e reset automático (0x0) sempre que a rotação da quadra gira.
* **Sistema de "Rei da Quadra" (Rotatividade):** Com um clique, quem perde o jogo vai para o final da fila, e o primeiro da fila sobe automaticamente para a vaga na quadra.
* **Reordenação de Fila:** Controles administrativos para subir (⬆️) ou descer (⬇️) a posição de um jogador, facilitando ajustes de última hora.
* **Menu de Ações Compacto (Mobile-First):** Layout limpo que agrupa ações secundárias (fura-fila e remoção) em um menu dropdown (*select*), evitando botões espremidos em telas menores.
* **Sistema Híbrido (Offline-First):** O aplicativo detecta quedas de internet e entra em modo "Apenas Leitura", bloqueando edições para evitar conflitos de dados.
* **Trava Anti-Spam (Local):** Impede que um mesmo usuário cadastre múltiplos nomes na fila pelo mesmo dispositivo.
* **Painel de Administrador Seguro:** Funcionalidades críticas ficam ocultas sob uma senha de admin.
* **Salvamento Automático (Local):** Utiliza o `localStorage` do navegador para garantir que a fila não seja perdida se a página for atualizada ou o celular bloqueado.

## 🛠️ Tecnologias Utilizadas

* **HTML5:** Estrutura semântica.
* **CSS3:** Estilização responsiva (Flexbox) e Tema Escuro.
* **JavaScript (ES6):** Lógica de rotatividade, controle de estado (`localStorage`), manipulação de DOM otimizada e detecção de Eventos de Rede (`navigator.onLine`).

## 📱 Como Usar (Para a Galera na Quadra)

1. Acesse o link do aplicativo: `https://grade-volei.netlify.app/`
2. Verifique o status da rede no topo da tela (Precisa estar "🟢 Online").
3. Na caixa de texto "Adicionar Jogador", digite o seu nome e clique em **Adicionar**.
4. Aguarde a sua vez! Apenas o Administrador da rede controla a rotação e o placar.

## ⚙️ Como Usar (Para o Administrador)

1. Acesse o aplicativo e clique no botão **Área Admin** no canto superior direito.
2. Insira a senha de administrador.
3. Você terá acesso aos controles avançados:
   * **Placar:** Aumente ou diminua pontos com `+` e `-`. Use o "Zerar Placar" geral se necessário.
   * **Na Quadra - Perdeu:** Tira o jogador da vaga, manda para o fim da fila, zera ambos os placares e puxa o 1º da fila para a quadra.
   * **Na Quadra - Sair:** Tira o jogador da vaga e manda para o fim da fila (sem puxar o próximo automaticamente). Zera placares.
   * **Na Fila - Setas (⬆️ / ⬇️):** Sobe ou desce um jogador de posição na fila de espera.
   * **Na Fila - Menu "Ações...":** Um dropdown para colocar o jogador direto na Vaga 1, Vaga 2, ou retirá-lo da fila.
   * **Zerar Grade Completa:** Apaga todos os dados da memória (ideal para começar um novo dia de jogos).

## 💻 Como Rodar Localmente (Desenvolvimento)

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