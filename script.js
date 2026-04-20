let court = { 1: null, 2: null };
let queue = [];

// Carrega os dados salvos
function loadData() {
    const savedCourt = localStorage.getItem("voleiCourt");
    const savedQueue = localStorage.getItem("voleiQueue");
    if (savedCourt) court = JSON.parse(savedCourt);
    if (savedQueue) queue = JSON.parse(savedQueue);
}

// Salva os dados
function saveData() {
    localStorage.setItem("voleiCourt", JSON.stringify(court));
    localStorage.setItem("voleiQueue", JSON.stringify(queue));
}

const courtList = document.getElementById("courtList");
const queueList = document.getElementById("queueList");
const inputElement = document.getElementById("newPlayer");
const addBtn = document.getElementById("addBtn");
const resetBtn = document.getElementById("resetBtn");
const loginBtn = document.getElementById("loginBtn");

function render() {
    courtList.innerHTML = "";
    queueList.innerHTML = "";

    renderSlot(1);
    renderSlot(2);

    queue.forEach((player, index) => {
        const li = document.createElement("li");
        
        const nameSpan = document.createElement("span");
        nameSpan.innerHTML = `<strong>${index + 1}º</strong> - ${player}`;
        
        const btnGroup = document.createElement("div");
        btnGroup.className = "btn-group";
        
        const btnV1 = document.createElement("button");
        btnV1.className = "btn-slot admin-only"; 
        btnV1.textContent = "Ir p/ V1";
        btnV1.onclick = () => forceEnter(index, 1);

        const btnV2 = document.createElement("button");
        btnV2.className = "btn-slot admin-only";
        btnV2.textContent = "Ir p/ V2";
        btnV2.onclick = () => forceEnter(index, 2);

        const btnRemove = document.createElement("button");
        btnRemove.className = "btn-remove admin-only";
        btnRemove.textContent = "Sair";
        btnRemove.onclick = () => removeManual(index);

        btnGroup.appendChild(btnV1);
        btnGroup.appendChild(btnV2);
        btnGroup.appendChild(btnRemove);

        li.appendChild(nameSpan);
        li.appendChild(btnGroup);
        queueList.appendChild(li);
    });

    saveData(); // Salva toda vez que desenha a tela
}

function renderSlot(slotNumber) {
    const li = document.createElement("li");
    const player = court[slotNumber];

    if (player) {
        li.className = "court-item";
        li.innerHTML = `<span>🏐 <strong>Vaga ${slotNumber}:</strong> ${player}</span>`;
        
        const btn = document.createElement("button");
        btn.className = "btn-action admin-only"; 
        btn.textContent = "Perdeu (Rodar)";
        btn.onclick = () => playerLost(slotNumber);
        
        li.appendChild(btn);
    } else {
        li.className = "slot-empty";
        li.innerHTML = `<span>Vaga ${slotNumber}: Vazia</span>`;
    }
    courtList.appendChild(li);
}

function addPlayer() {
    const name = inputElement.value.trim();
    if (name) {
        if (!court[1]) court[1] = name;
        else if (!court[2]) court[2] = name;
        else queue.push(name);
        
        inputElement.value = "";
        render();
    }
}

function playerLost(slotNumber) {
    if (court[slotNumber]) {
        queue.push(court[slotNumber]); 
        court[slotNumber] = null;      
        
        if (queue.length > 0) {
            court[slotNumber] = queue.shift();
        }
        render();
    }
}

function forceEnter(queueIndex, slotNumber) {
    const player = queue.splice(queueIndex, 1)[0]; 
    if (court[slotNumber]) queue.push(court[slotNumber]);
    court[slotNumber] = player;
    render();
}

function removeManual(index) {
    queue.splice(index, 1);
    render();
}

function resetAll() {
    if (confirm("Tem certeza que deseja apagar todos os nomes da quadra e da fila?")) {
        court = { 1: null, 2: null };
        queue = [];
        localStorage.removeItem("voleiCourt");
        localStorage.removeItem("voleiQueue");
        render();
        alert("Grade zerada!");
    }
}

// Eventos de clique e teclado
addBtn.addEventListener("click", addPlayer);
inputElement.addEventListener("keypress", (event) => {
    if (event.key === "Enter") addPlayer();
});
resetBtn.addEventListener("click", resetAll);

// Lógica de Login
let isAdmin = false;
loginBtn.addEventListener("click", () => {
    if (isAdmin) {
        document.body.classList.remove("is-admin");
        isAdmin = false;
        loginBtn.textContent = "Área Admin";
    } else {
        const senha = prompt("Digite a senha do administrador:");
        if (senha === "volei123") {
            document.body.classList.add("is-admin");
            isAdmin = true;
            loginBtn.textContent = "Sair do Admin";
        } else {
            alert("Senha incorreta!");
        }
    }
});

// Inicia a aplicação
loadData();
render();