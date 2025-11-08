document.addEventListener('DOMContentLoaded', () => {

    const loginModal = document.getElementById('login-modal');
    const appContainer = document.getElementById('app-container');
    const welcomeView = document.getElementById('welcome-view');
    const heroDetailsView = document.getElementById('hero-details-view');
    
    const loginForm = document.getElementById('login-form');
    const loginError = document.getElementById('login-error');
    const logoutButton = document.getElementById('logout-button');
    const userDetails = document.getElementById('user-details');
    const heroList = document.getElementById('hero-list');
    
    const editHeroForm = document.getElementById('edit-hero-form');
    const heroIdHidden = document.getElementById('hero-id-hidden');
    const saveHeroButton = document.getElementById('save-hero-button');
    const editHeroError = document.getElementById('edit-hero-error');
    const editHeroSuccess = document.getElementById('edit-hero-success');

    const heroNameTitle = document.getElementById('hero-name-title');
    
    const heroImageDisplay = document.getElementById('hero-image-display');
    
    const inputs = {
        nome_heroi: document.getElementById('nome_heroi'),
        identidade_secreta: document.getElementById('identidade_secreta'),
        principal_vilao: document.getElementById('principal_vilao'),
        organizacao: document.getElementById('organizacao'),
        poderes: document.getElementById('poderes'),
        referencias: document.getElementById('referencias'),
        outros_viloes: document.getElementById('outros_viloes'),
        trajes: document.getElementById('trajes'),
        feito_notavel: document.getElementById('feito_notavel')
    };

    let currentUser = null;
    let currentHeroId = null;

    function init() {
        const storedUser = sessionStorage.getItem('currentUser');
        const token = sessionStorage.getItem('authToken');

        if (storedUser && token) {
            currentUser = JSON.parse(storedUser);
            showApp();
        } else {
            showLogin();
        }

        loginForm.addEventListener('submit', handleLogin);
        logoutButton.addEventListener('click', handleLogout);
        heroList.addEventListener('click', handleHeroListClick);
        editHeroForm.addEventListener('submit', handleUpdateHero);
    }

    async function handleLogin(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const senha = document.getElementById('password').value;
        loginError.textContent = '';

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, senha })
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Erro de login');

            currentUser = data.usuario;
            sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
            sessionStorage.setItem('authToken', data.token); 
            
            showApp();

        } catch (error) {
            loginError.textContent = `Falha no login: ${error.message}`;
            console.error('Erro no login:', error);
        }
    }

    function handleLogout() {
        currentUser = null;
        currentHeroId = null;
        sessionStorage.removeItem('currentUser');
        sessionStorage.removeItem('authToken'); 
        showLogin();
    }

    function showApp() {
        loginModal.classList.add('hidden');
        appContainer.classList.remove('hidden');
        userDetails.textContent = `Bem-vindo, ${currentUser.username} (${currentUser.grupo})`;
        fetchHeroes(); 
        switchView(welcomeView);
    }

    function showLogin() {
        loginModal.classList.remove('hidden');
        appContainer.classList.add('hidden');
    }

    function switchView(viewToShow) {
        welcomeView.classList.add('hidden');
        heroDetailsView.classList.add('hidden');
        
        if (viewToShow) {
            viewToShow.classList.remove('hidden');
        }
        clearMessages();
    }
    
    function clearMessages() {
        loginError.textContent = '';
        editHeroError.textContent = '';
        editHeroSuccess.textContent = '';
    }

    async function fetchHeroes() {
        try {
            const token = sessionStorage.getItem('authToken');
            const response = await fetch('/api/herois', {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) throw new Error('Falha ao carregar heróis');
            
            const heroes = await response.json();
            renderHeroList(heroes);
            
            if (currentHeroId) {
                const li = heroList.querySelector(`[data-id="${currentHeroId}"]`);
                if (li) li.classList.add('active');
            }
            
        } catch (error) {
            console.error('Erro ao buscar heróis:', error);
            heroList.innerHTML = '<li>Falha ao carregar heróis.</li>';
        }
    }

    function renderHeroList(heroes) {
        heroList.innerHTML = '';
        if (heroes.length === 0) {
            heroList.innerHTML = '<li>Nenhum herói cadastrado.</li>';
            return;
        }

        heroes.forEach(hero => {
            const li = document.createElement('li');
            li.dataset.id = hero.id_heroi;
            
            li.innerHTML = `
                <span class="hero-name">${hero.nome_heroi}</span>
                <span class="hero-affiliation">
                    ${hero.organizacao || 'Sem Organização'}
                </span>
            `;
            heroList.appendChild(li);
        });
    }

    function handleHeroListClick(e) {
        const li = e.target.closest('li');
        if (!li || !li.dataset.id) return;

        const id = li.dataset.id;
        currentHeroId = id; 
        clearActiveHero();
        li.classList.add('active');
        fetchHeroDetails(id);
    }
    
    function clearActiveHero() {
        heroList.querySelectorAll('li').forEach(item => item.classList.remove('active'));
    }

    async function fetchHeroDetails(id) {
        try {
            switchView(heroDetailsView);
            const token = sessionStorage.getItem('authToken');
            
            const response = await fetch(`/api/herois/${id}`, {
                 headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) throw new Error('Herói não encontrado');
            
            const hero = await response.json();
            renderHeroDetails(hero);
            
        } catch (error) {
            console.error('Erro ao buscar detalhes do herói:', error);
            switchView(welcomeView); 
            alert(`Erro: ${error.message}`);
        }
    }

    function renderHeroDetails(hero) {
        clearMessages();
        heroIdHidden.value = hero.id_heroi;
        heroNameTitle.textContent = hero.nome_heroi;
 
        heroImageDisplay.src = hero.imagem_url;
        heroImageDisplay.alt = `Imagem de ${hero.nome_heroi}`;

        inputs.nome_heroi.value = hero.nome_heroi || '';
        inputs.identidade_secreta.value = hero.identidade_secreta || '';
        inputs.principal_vilao.value = hero.principal_vilao || '';
        inputs.organizacao.value = hero.organizacao || '';
        inputs.poderes.value = hero.poderes || '';
        inputs.referencias.value = hero.referencias || '';
        inputs.outros_viloes.value = hero.outros_viloes || '';
        inputs.trajes.value = hero.trajes || '';
        inputs.feito_notavel.value = hero.feito_notavel || '';

        const isEditor = currentUser.grupo === 'admin' || currentUser.grupo === 'editor';

        for (const key in inputs) {
            inputs[key].disabled = !isEditor;
        }
        
        if (isEditor) {
            saveHeroButton.classList.remove('hidden');
        } else {
            saveHeroButton.classList.add('hidden');
        }
    }

    async function handleUpdateHero(e) {
        e.preventDefault();
        clearMessages();
        
        const id = heroIdHidden.value;
        const token = sessionStorage.getItem('authToken');

        const heroData = {};
        for (const key in inputs) {
            heroData[key] = inputs[key].value;
        }

        try {
            const response = await fetch(`/api/herois/${id}`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify(heroData)
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            
            editHeroSuccess.textContent = data.message;
            fetchHeroes(); 

        } catch (error) {
            editHeroError.textContent = `Erro: ${error.message}`;
            console.error('Erro ao atualizar herói:', error);
        }
    }
    init();
});