const urlParams = new URLSearchParams(window.location.search);
const currentLocal = urlParams.get('local'); 

const locaisNames = {
    'ramiro': 'Parque Ramiro Ruediger',
    'artex': 'Artex (Garcia)',
    'itoupavas': 'Parque das Itoupavas',
    'aguaverde': 'Terminal Água Verde'
};

const locaisPasswords = {
    'ramiro': 'ramiro123',
    'artex': 'artex123',
    'itoupavas': 'itoupavas123',
    'aguaverde': 'aguaverde123'
};

let court = { 1: null, 2: null };
let scores = { 1: 0, 2: 0 }; 
let queue = [];
let myPlayerName = null; 
let correctionCount = 0; 

const playerNameDisplay = document.getElementById("playerNameDisplay");
const identifyBtn = document.getElementById("identifyBtn");
const editIdentityBtn = document.getElementById("editIdentityBtn");

function loadData() {
    if (!currentLocal) return; 
    const storageKey = `voleiData_${currentLocal}`; 
    const savedData = localStorage.getItem(storageKey);
    
    const savedMyName = localStorage.getItem(`voleiMyName_${currentLocal}`);
    const savedCorrection = localStorage.getItem(`voleiCorrection_${currentLocal}`);
    
    if (savedCorrection) correctionCount = parseInt(savedCorrection, 10);

    if (savedMyName) {
        myPlayerName = savedMyName;
        playerNameDisplay.textContent = myPlayerName;
        identifyBtn.style.display = "none";
        editIdentityBtn.style.display = "inline-block"; 
    }
    
    if (savedData) {
        const parsed = JSON.parse(savedData);
        court = parsed.court || court;
        scores = parsed.scores || scores;
        queue = parsed.queue || queue;
    }
}

function saveData() {
    if (!currentLocal) return;
    const storageKey = `voleiData_${currentLocal}`;
    const dataToSave = { court, scores, queue };
    localStorage.setItem(storageKey, JSON.stringify(dataToSave)); 
    
    if (myPlayerName) {
        localStorage.setItem(`voleiMyName_${currentLocal}`, myPlayerName);
        localStorage.setItem(`voleiCorrection_${currentLocal}`, correctionCount);
    }
}

const courtList = document.getElementById("courtList");
const queueList = document.getElementById("queueList");
const inputElement = document.getElementById("newPlayer");
const addBtn = document.getElementById("addBtn");
const resetBtn = document.getElementById("resetBtn");
const loginBtn = document.getElementById("loginBtn");
const resetScoreBtn = document.getElementById("resetScoreBtn"); 

function render() {
    courtList.innerHTML = "";
    queueList.innerHTML = "";
    
    if (queue.length > 0 && myPlayerName && queue[0].toLowerCase() === myPlayerName.toLowerCase() && !isAdmin) {
        document.body.classList.add("is-scorekeeper");
    } else {
        document.body.classList.remove("is-scorekeeper");
    }

    renderSlot(1);
    renderSlot(2);

    queue.forEach((player, index) => {
        const li = document.createElement("li");
        const nameSpan = document.createElement("span");
        
        const isMe = (myPlayerName && player.toLowerCase() === myPlayerName.toLowerCase()) ? " (Você)" : "";
        nameSpan.innerHTML = `<strong>${index + 1}º</strong> - ${player}${isMe}`;
        
        const btnGroup = document.createElement("div");
        btnGroup.className = "btn-group";
        
        const btnUp = document.createElement("button");
        btnUp.className = "btn-move admin-only";
        btnUp.innerHTML = "⬆️"; 
        btnUp.onclick = () => moveUp(index);
        if (index === 0) btnUp.style.display = "none"; 

        const btnDown = document.createElement("button");
        btnDown.className = "btn-move admin-only";
        btnDown.innerHTML = "⬇️";
        btnDown.onclick = () => moveDown(index);
        if (index === queue.length - 1) btnDown.style.display = "none"; 

        const actionSelect = document.createElement("select");
        actionSelect.className = "action-select admin-only";
        actionSelect.innerHTML = `
            <option value="" disabled selected>Ações...</option>
            <option value="v1">Ir p/ Vaga 1</option>
            <option value="v2">Ir p/ Vaga 2</option>
            <option value="sair">Sair da Fila</option>
        `;
        
        actionSelect.onchange = (e) => {
            const acaoEscolhida = e.target.value;
            if (acaoEscolhida === "v1") forceEnter(index, 1);
            else if (acaoEscolhida === "v2") forceEnter(index, 2);
            else if (acaoEscolhida === "sair") removeManual(index);
        };

        btnGroup.appendChild(btnUp);
        btnGroup.appendChild(btnDown);
        btnGroup.appendChild(actionSelect); 
        
        li.appendChild(nameSpan);
        li.appendChild(btnGroup);
        queueList.appendChild(li);
    });
    saveData();
}

function renderSlot(slotNumber) {
    const li = document.createElement("li");
    const player = court[slotNumber];
    const currentScore = scores[slotNumber];

    if (player) {
        li.className = "court-item";
        const infoDiv = document.createElement("div");
        
        const isMe = (myPlayerName && player.toLowerCase() === myPlayerName.toLowerCase()) ? " (Você)" : "";
        infoDiv.innerHTML = `<span>🏐 <strong>Vaga ${slotNumber}:</strong> ${player}${isMe}</span>`;
        
        const scoreDiv = document.createElement("div");
        scoreDiv.className = "score-board";
        
        const btnMinus = document.createElement("button");
        btnMinus.className = "btn-score scorekeeper-only";
        btnMinus.textContent = "-";
        btnMinus.onclick = () => updateScore(slotNumber, -1);

        const scoreDisplay = document.createElement("span");
        scoreDisplay.id = `score-display-${slotNumber}`;
        scoreDisplay.className = "score-value";
        scoreDisplay.textContent = currentScore;

        const btnPlus = document.createElement("button");
        btnPlus.className = "btn-score scorekeeper-only";
        btnPlus.textContent = "+";
        btnPlus.onclick = () => updateScore(slotNumber, 1);

        scoreDiv.appendChild(btnMinus);
        scoreDiv.appendChild(scoreDisplay);
        scoreDiv.appendChild(btnPlus);

        const btnGroup = document.createElement("div");
        btnGroup.className = "btn-group";

        const btnLost = document.createElement("button");
        btnLost.className = "btn-action scorekeeper-only"; 
        btnLost.textContent = "Perdeu";
        btnLost.onclick = () => playerLost(slotNumber);

        const btnExit = document.createElement("button");
        btnExit.className = "btn-remove scorekeeper-only"; 
        btnExit.textContent = "Sair";
        btnExit.onclick = () => removeFromSlot(slotNumber);

        btnGroup.appendChild(btnLost);
        btnGroup.appendChild(btnExit);
        
        li.appendChild(infoDiv);
        li.appendChild(scoreDiv);
        li.appendChild(btnGroup);
    } else {
        li.className = "slot-empty";
        li.innerHTML = `<span>Vaga ${slotNumber}: Vazia</span>`;
    }
    courtList.appendChild(li);
}

function updateScore(slot, change) {
    scores[slot] += change;
    if (scores[slot] < 0) scores[slot] = 0;
    if (scores[slot] > 25) scores[slot] = 25;
    document.getElementById(`score-display-${slot}`).textContent = scores[slot];
    saveData();
}

identifyBtn.addEventListener("click", () => {
    const nomeInput = prompt("Qual o seu nome na grade?");
    if (nomeInput && nomeInput.trim() !== "") {
        myPlayerName = nomeInput.trim();
        correctionCount = 0; 
        playerNameDisplay.textContent = myPlayerName;
        identifyBtn.style.display = "none";
        editIdentityBtn.style.display = "inline-block"; 
        saveData();
        render();
    }
});

editIdentityBtn.addEventListener("click", () => {
    if (correctionCount === 0) {
        const novoNome = prompt(`Você tem 1 CORREÇÃO SEM PENALIDADE.\nCorrigir o nome "${myPlayerName}" para qual nome?`);
        
        if (novoNome && novoNome.trim() !== "" && novoNome.trim() !== myPlayerName) {
            const oldName = myPlayerName;
            myPlayerName = novoNome.trim();
            correctionCount++;

            if (court[1] && court[1].toLowerCase() === oldName.toLowerCase()) {
                court[1] = myPlayerName;
            } else if (court[2] && court[2].toLowerCase() === oldName.toLowerCase()) {
                court[2] = myPlayerName;
            } else {
                const qIndex = queue.findIndex(p => p.toLowerCase() === oldName.toLowerCase());
                if (qIndex !== -1) queue[qIndex] = myPlayerName;
            }

            playerNameDisplay.textContent = myPlayerName;
            saveData();
            render();
            alert("Nome corrigido com sucesso! Sua posição foi mantida.");
        }
    } else {
        const confirmacao = confirm(`⚠️ ALERTA DE PENALIDADE ⚠️\nVocê já usou sua correção grátis.\nSe você mudar o nome de novo, será enviado para o FINAL DA FILA automaticamente.\n\nDeseja continuar?`);
        
        if (confirmacao) {
            const novoNome = prompt("Digite o novo nome:");
            if (novoNome && novoNome.trim() !== "" && novoNome.trim() !== myPlayerName) {
                const oldName = myPlayerName;
                myPlayerName = novoNome.trim();
                correctionCount++;

                let wasInCourt = false;

                if (court[1] && court[1].toLowerCase() === oldName.toLowerCase()) {
                    court[1] = null;
                    wasInCourt = true;
                } else if (court[2] && court[2].toLowerCase() === oldName.toLowerCase()) {
                    court[2] = null;
                    wasInCourt = true;
                } else {
                    const qIndex = queue.findIndex(p => p.toLowerCase() === oldName.toLowerCase());
                    if (qIndex !== -1) queue.splice(qIndex, 1); 
                }

                // A MÁGICA AQUI: Conta quantos INOCENTES tem na fila antes de jogar o fraudador lá
                let innocentCount = queue.length;
                queue.push(myPlayerName);

                if (wasInCourt) {
                    scores = { 1: 0, 2: 0 };
                    
                    // Só puxa da fila para a quadra se a pessoa puxada for um inocente
                    if (!court[1] && innocentCount > 0) {
                        court[1] = queue.shift();
                        innocentCount--;
                    }
                    if (!court[2] && innocentCount > 0) {
                        court[2] = queue.shift();
                        innocentCount--;
                    }
                }

                playerNameDisplay.textContent = myPlayerName;
                saveData();
                render();
                alert("Nome alterado. Como penalidade, você foi movido para o final da fila e a vaga ficou para o próximo.");
            }
        }
    }
});

function addPlayer() {
    if (!isAdmin && myPlayerName) {
        alert(`Você já está identificado como "${myPlayerName}". Aguarde sua vez!`);
        return; 
    }

    const name = inputElement.value.trim();
    if (name) {
        if (!court[1]) court[1] = name;
        else if (!court[2]) court[2] = name;
        else queue.push(name);
        
        inputElement.value = "";
        
        if (!isAdmin) {
            myPlayerName = name;
            correctionCount = 0; 
            playerNameDisplay.textContent = myPlayerName;
            identifyBtn.style.display = "none"; 
            editIdentityBtn.style.display = "inline-block";
        }
        
        render();
    }
}

function playerLost(slotNumber) {
    if (court[slotNumber]) {
        queue.push(court[slotNumber]); 
        court[slotNumber] = null;
        scores = { 1: 0, 2: 0 }; 
        if (queue.length > 0) court[slotNumber] = queue.shift();
        render();
    }
}

function removeFromSlot(slotNumber) {
    if (court[slotNumber]) {
        queue.push(court[slotNumber]);
        court[slotNumber] = null;
        scores = { 1: 0, 2: 0 }; 
        render();
    }
}

function forceEnter(queueIndex, slotNumber) {
    const player = queue.splice(queueIndex, 1)[0]; 
    if (court[slotNumber]) queue.push(court[slotNumber]);
    court[slotNumber] = player;
    scores = { 1: 0, 2: 0 }; 
    render();
}

function removeManual(index) {
    queue.splice(index, 1);
    render();
}

function moveUp(index) {
    if (index > 0) {
        const temp = queue[index];
        queue[index] = queue[index - 1];
        queue[index - 1] = temp;
        render();
    }
}

function moveDown(index) {
    if (index < queue.length - 1) {
        const temp = queue[index];
        queue[index] = queue[index + 1];
        queue[index + 1] = temp;
        render();
    }
}

function resetAll() {
    if (confirm("Tem certeza que deseja apagar a grade DESTE PARQUE?")) {
        court = { 1: null, 2: null };
        scores = { 1: 0, 2: 0 };
        queue = [];
        
        myPlayerName = null;
        correctionCount = 0;
        
        localStorage.removeItem(`voleiData_${currentLocal}`);
        localStorage.removeItem(`voleiMyName_${currentLocal}`);
        localStorage.removeItem(`voleiCorrection_${currentLocal}`);
        
        playerNameDisplay.textContent = "Ninguém";
        identifyBtn.style.display = "inline-block";
        editIdentityBtn.style.display = "none";
        
        render();
        alert("Grade zerada e aparelhos desvinculados com sucesso!");
    }
}

addBtn.addEventListener("click", addPlayer);
inputElement.addEventListener("keypress", (e) => { if (e.key === "Enter") addPlayer(); });
resetBtn.addEventListener("click", resetAll);

if (resetScoreBtn) {
    resetScoreBtn.addEventListener("click", () => {
        if (confirm("Zerar o placar de ambas as vagas?")) {
            scores = { 1: 0, 2: 0 };
            render();
        }
    });
}

let isAdmin = false;
loginBtn.addEventListener("click", () => {
    if (isAdmin) {
        document.body.classList.remove("is-admin");
        isAdmin = false;
        loginBtn.textContent = "Área Admin";
        render();
    } else {
        if (!isOnline) {
            alert("Você precisa de internet para acessar o modo Admin.");
            return; 
        }
        const senha = prompt(`Digite a senha do administrador para o ${locaisNames[currentLocal]}:`);
        if (senha === locaisPasswords[currentLocal]) {
            document.body.classList.add("is-admin");
            isAdmin = true;
            loginBtn.textContent = "Sair do Admin";
            render();
        } else {
            alert("Senha incorreta!");
        }
    }
});

function selectLocal(localId) { window.location.href = `?local=${localId}`; }
function backToLobby() { window.location.href = window.location.pathname; }

let isOnline = navigator.onLine; 
const statusIndicator = document.getElementById("connectionStatus");

function updateNetworkStatus() {
    if (isOnline) {
        statusIndicator.textContent = "🟢 Online";
        statusIndicator.style.color = "#2ed573";
        if (isAdmin) document.body.classList.add("is-admin");
        addBtn.disabled = false;
        inputElement.disabled = false;
    } else {
        statusIndicator.textContent = "🔴 Offline";
        statusIndicator.style.color = "#ff4757";
        document.body.classList.remove("is-admin");
        addBtn.disabled = true;
        inputElement.disabled = true;
    }
}

window.addEventListener("online", () => { isOnline = true; updateNetworkStatus(); });
window.addEventListener("offline", () => { isOnline = false; updateNetworkStatus(); });

function initApp() {
    const lobbyContainer = document.getElementById("lobby-container");
    const appContainer = document.getElementById("app-container");
    const parkNameDisplay = document.getElementById("parkNameDisplay");

    if (currentLocal && locaisNames[currentLocal]) {
        lobbyContainer.style.display = "none";
        appContainer.style.display = "block";
        parkNameDisplay.textContent = locaisNames[currentLocal]; 
        loadData();
        updateNetworkStatus();
        render();
    } else {
        lobbyContainer.style.display = "block";
        appContainer.style.display = "none";
    }
}

initApp();