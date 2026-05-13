document.addEventListener("DOMContentLoaded", () => {
    startMenu();
    startButtons();
    startLogin();
    startRegister();
    startScrollSpy();
});

/* MENU */

function startMenu() {
    const links = document.querySelectorAll(".menu a");

    links.forEach((link) => {
        const href = link.getAttribute("href");

        if (href.startsWith("#")) {
            link.addEventListener("click", (event) => {
                event.preventDefault();

                const section = document.querySelector(href);

                if (section) {
                    section.scrollIntoView({
                        behavior: "smooth"
                    });
                }
            });
        }
    });
}

/* BOTÕES */

function startButtons() {
    const contractButton = document.getElementById("btnContratar");
    const cardButtons = document.querySelectorAll(".card button");

    if (contractButton) {
        contractButton.addEventListener("click", goToLogin);
    }

    cardButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const card = button.closest(".card");
            const title = card.querySelector("h3").textContent;

            alert(`Você selecionou: ${title}`);
        });
    });
}

/* LOGIN */

function startLogin() {
    const form = document.getElementById("loginForm");

    if (!form) return;

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;

        validateLogin(email, senha);
    });
}

function validateLogin(email, senha) {
    const emailPadrao = "admin@email.com";
    const senhaPadrao = "123";

    if (email === emailPadrao && senha === senhaPadrao) {
        alert("Login realizado com sucesso!");
        clearLoginForm();
        return;
    }

    alert("Email ou senha inválidos.");
}

function clearLoginForm() {
    document.getElementById("email").value = "";
    document.getElementById("senha").value = "";
}

/* CADASTRO */

function startRegister() {
    const form = document.getElementById("registerForm");

    if (!form) return;

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const nome = document.getElementById("nome").value;
        const email = document.getElementById("registerEmail").value;
        const senha = document.getElementById("registerSenha").value;

        if (nome && email && senha) {
            alert("Conta criada com sucesso!");

            clearRegisterForm();

            window.location.href = "login.html";
        }
    });
}

function clearRegisterForm() {
    document.getElementById("nome").value = "";
    document.getElementById("registerEmail").value = "";
    document.getElementById("registerSenha").value = "";
}

/* SCROLL */

function startScrollSpy() {
    const sections = document.querySelectorAll("section");
    const links = document.querySelectorAll(".menu a");

    window.addEventListener("scroll", () => {
        let currentSection = "";

        sections.forEach((section) => {
            const top = section.offsetTop - 150;
            const height = section.offsetHeight;

            if (window.scrollY >= top && window.scrollY < top + height) {
                currentSection = section.id;
            }
        });

        links.forEach((link) => {
            link.classList.remove("active");

            if (link.getAttribute("href") === `#${currentSection}`) {
                link.classList.add("active");
            }
        });
    });
}

/* AUXILIARES */

function goToLogin() {
    window.location.href = "login.html";
}
/* Função para carregar estrelas */
function loadStars() {
    const starsContainers = document.querySelectorAll(".stars");

    starsContainers.forEach((container) => {
        const rating = parseFloat(container.getAttribute("data-rating"));
        const stars = container.querySelectorAll(".star");

        stars.forEach((star, index) => {
            const starNumber = index + 1;

            if (starNumber <= rating) {
                star.classList.add("filled");
            } else if (starNumber - 0.5 <= rating) {
                star.classList.add("half");
            }
        });
    });
}

// Chama a função
loadStars();
/* Função para agendamento */
function startAgendamento() {
    const btnAgendar = document.getElementById("btnAgendar");
    
    if (!btnAgendar) return;

    btnAgendar.addEventListener("click", () => {
        const servico = document.getElementById("servico").value;
        const data = document.getElementById("data").value;
        const horario = document.getElementById("horario").value;
        const msg = document.getElementById("msgAgendamento");

        // Validação
        if (!servico || !data || !horario) {
            msg.textContent = "Preencha todos os campos!";
            msg.className = "msg-erro";
            return;
        }

        // Verifica se a data é futura
        const dataSelecionada = new Date(data + "T" + horario);
        const hoje = new Date();

        if (dataSelecionada <= hoje) {
            msg.textContent = "Escolha uma data e horário futuros!";
            msg.className = "msg-erro";
            return;
        }

        // Salva agendamento
        const agendamento = {
            servico: servico,
            data: data,
            horario: horario
        };

        let agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];
        agendamentos.push(agendamento);
        localStorage.setItem("agendamentos", JSON.stringify(agendamentos));

        msg.textContent = "Agendamento realizado com sucesso!";
        msg.className = "msg-sucesso";

        // Limpa campos
        document.getElementById("servico").value = "";
        document.getElementById("data").value = "";
        document.getElementById("horario").value = "";
    });
}
/* CADASTRO - ATUALIZADO */
function startRegister() {
    const form = document.getElementById("registerForm");
    const tipoBtns = document.querySelectorAll(".tipo-btn");
    const prestadorFields = document.getElementById("prestadorFields");
    let tipoCadastro = "cliente";

    // Seletor de tipo
    if (tipoBtns.length > 0) {
        tipoBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
                tipoBtns.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                
                tipoCadastro = btn.getAttribute("data-tipo");

                if (tipoCadastro === "prestador") {
                    prestadorFields.classList.add("show");
                } else {
                    prestadorFields.classList.remove("show");
                }
            });
        });
    }

    if (!form) return;

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const nome = document.getElementById("nome").value;
        const email = document.getElementById("registerEmail").value;
        const senha = document.getElementById("registerSenha").value;

        if (!nome || !email || !senha) {
            alert("Preencha todos os campos obrigatórios!");
            return;
        }

        if (senha.length < 6) {
            alert("A senha deve ter no mínimo 6 caracteres!");
            return;
        }

        // Dados do cadastro
        const usuario = {
            nome: nome,
            email: email,
            senha: senha,
            tipo: tipoCadastro
        };

        // Se for prestador, adiciona especialidade
        if (tipoCadastro === "prestador") {
            const especialidade = document.getElementById("especialidade").value;
            const descricao = document.getElementById("descricao").value;

            if (!especialidade) {
                alert("Selecione sua especialidade!");
                return;
            }

            usuario.especialidade = especialidade;
            usuario.descricao = descricao;
        }

        // Salva no localStorage
        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        usuarios.push(usuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        alert("Conta criada com sucesso!");
        window.location.href = "login.html";
    });
}