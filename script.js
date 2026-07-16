document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active'); // Animate hamburger
            mobileMenu.classList.toggle('active'); // Show/hide menu

            // Prevent body scroll when menu is open
            if (mobileMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }

    // Close mobile menu when clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ===== Pillar Tab Switching =====
    const pillarTabs = document.querySelectorAll('.pillar-tab');
    const pillarContents = document.querySelectorAll('.pillar-content');

    // ===== Modal Logic (Hoisted) =====
    const modal = document.getElementById('conectarModal');
    const openModalBtns = document.querySelectorAll('.open-modal-btn');
    const closeModalBtn = document.querySelector('.modal-close');
    const conectarForm = modal ? modal.querySelector('form') : document.getElementById('conectarForm');

    function openConectarModal() {
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeConectarModal() {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (modal) {
        openModalBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                openConectarModal();
            });
        });

        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', closeConectarModal);
        }

        // Close on click outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeConectarModal();
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) closeConectarModal();
        });

        // Close on "Cancelar" button
        const cancelBtn = modal.querySelector('.modal-close-btn-action');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', closeConectarModal);
        }

        if (conectarForm) {
            conectarForm.addEventListener('submit', (e) => {
                e.preventDefault();

                const interest = document.getElementById('interest').value;
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const whatsapp = document.getElementById('whatsapp').value;
                const company = document.getElementById('company').value;

                const subject = `Nuevo Contacto Web: ${interest}`;
                const body = `Hola MPULSA,\n\nMe gustaría conectar con ustedes. Aquí están mis datos:\n\nInterés: ${interest}\nNombre: ${name}\nCorreo: ${email}\nWhatsApp: +54 ${whatsapp}\nEmpresa: ${company}\n\nEspero su respuesta.`;

                const mailtoLink = `mailto:impulsa@mpl.com.ar?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

                window.location.href = mailtoLink;

                // Close modal after sending
                setTimeout(closeConectarModal, 1000);
            });
        }

        // Check for openModal query param
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('openModal') === 'true') {
            openConectarModal();
            const newUrl = window.location.pathname;
            window.history.replaceState({}, document.title, newUrl);
        }
    }

    pillarTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetPillar = tab.dataset.pillar;

            // Update active tab
            pillarTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Show matching pillar content
            pillarContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `pillar-${targetPillar}`) {
                    content.classList.add('active');
                }
            });
        });
    });

    // ===== Accordion Toggle =====
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const body = header.nextElementSibling;
            const isActive = header.classList.contains('active');

            // Toggle current accordion
            header.classList.toggle('active');
            body.classList.toggle('active');
        });
    });

    // Smooth Scroll (Optional as CSS scroll-behavior: smooth handles most)
    // Adding it for older browsers or more control if needed
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');

            if (href === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }

            try {
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            } catch (error) {
                console.warn('Invalid selector:', href);
            }
        });
    });

    // ===== Scroll Reveal Animation System =====
    const revealStyle = document.createElement('style');
    revealStyle.innerHTML = `
        .reveal {
            opacity: 0;
            transform: translateY(40px);
            transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
                        transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .reveal.revealed {
            opacity: 1;
            transform: translateY(0);
        }
        .reveal-delay-1 { transition-delay: 0.1s; }
        .reveal-delay-2 { transition-delay: 0.2s; }
        .reveal-delay-3 { transition-delay: 0.3s; }
        .reveal-delay-4 { transition-delay: 0.4s; }
        .reveal-delay-5 { transition-delay: 0.5s; }
        .reveal-delay-6 { transition-delay: 0.6s; }
        .reveal-left {
            opacity: 0;
            transform: translateX(-40px);
            transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
                        transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .reveal-left.revealed {
            opacity: 1;
            transform: translateX(0);
        }
        .reveal-right {
            opacity: 0;
            transform: translateX(40px);
            transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
                        transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .reveal-right.revealed {
            opacity: 1;
            transform: translateX(0);
        }
        .reveal-scale {
            opacity: 0;
            transform: scale(0.9);
            transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
                        transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .reveal-scale.revealed {
            opacity: 1;
            transform: scale(1);
        }
    `;
    document.head.appendChild(revealStyle);

    // Tag elements for reveal
    function setupReveals() {
        // Section headers
        document.querySelectorAll('.section-header').forEach(el => {
            el.classList.add('reveal');
        });

        // Cards with stagger
        document.querySelectorAll('.grid-features, .benefits-grid, .services-grid').forEach(grid => {
            grid.querySelectorAll('.card, .benefit-card, .service-card').forEach((card, i) => {
                card.classList.add('reveal');
                card.classList.add(`reveal-delay-${Math.min(i + 1, 6)}`);
            });
        });

        // Process steps with stagger
        document.querySelectorAll('.process-step').forEach((step, i) => {
            step.classList.add('reveal');
            step.classList.add(`reveal-delay-${Math.min(i + 1, 6)}`);
        });

        // Mission/Vision cards
        document.querySelectorAll('.vision-card').forEach((card, i) => {
            card.classList.add(i === 0 ? 'reveal-left' : 'reveal-right');
            card.classList.add(`reveal-delay-${i + 1}`);
        });

        // Pillar tabs and content
        document.querySelectorAll('.pillar-tabs').forEach(el => {
            el.classList.add('reveal');
            el.classList.add('reveal-delay-1');
        });

        // Intro text blocks
        document.querySelectorAll('.intro-text').forEach(el => {
            el.classList.add('reveal');
        });

        // Footer sections
        document.querySelectorAll('.footer-grid').forEach(el => {
            el.classList.add('reveal');
        });

        // Hero content
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.classList.add('reveal-left');
        }
        const heroVisual = document.querySelector('.hero-visual');
        if (heroVisual) {
            heroVisual.classList.add('reveal-right');
            heroVisual.classList.add('reveal-delay-2');
        }
    }

    setupReveals();

    // Observer with generous threshold
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -60px 0px'
    });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
        revealObserver.observe(el);
    });
    // Chatbot Logic
    const chatToggleBtn = document.querySelector('.chat-toggle-btn');
    const chatCloseBtn = document.querySelector('.chat-close-btn');
    const chatWindow = document.querySelector('.chat-window');
    const chatForm = document.querySelector('#chat-form');
    const chatInput = document.querySelector('#chat-input');
    const chatMessages = document.querySelector('#chat-messages');

    if (chatToggleBtn && chatWindow) {
        // Toggle Chat
        function toggleChat() {
            chatWindow.classList.toggle('active');
            if (chatWindow.classList.contains('active')) {
                chatInput.focus();
            }
        }

        chatToggleBtn.addEventListener('click', toggleChat);
        chatCloseBtn.addEventListener('click', toggleChat);

        // Send Message
        function addMessage(text, sender) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message', `${sender}-message`);

            const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            messageDiv.innerHTML = `
                <div class="message-content">${text}</div>
                <div class="message-time">${time}</div>
            `;

            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight; // Auto scroll
        }

        // Bot Response Logic - Updated with MPULSA information
        function getBotResponse(userText) {
            const text = userText.toLowerCase();

            // Saludos
            if (text.includes('hola') || text.includes('buenos') || text.includes('buenas')) {
                return "¡Hola! 👋 Soy el asistente virtual de MPULSA. Estoy aquí para ayudarte a conocer cómo transformamos desafíos en oportunidades de crecimiento. ¿Qué te gustaría saber?";
            }

            // Servicios generales
            if (text.includes('servicio') || text.includes('qué hacen') || text.includes('que hacen') || text.includes('ofrecen')) {
                return "En MPULSA potenciamos tu negocio a través de 3 pilares estratégicos:\n\n1️⃣ Consultoría de Gestión: Estrategia, Personas, Finanzas y Operaciones.\n2️⃣ Agencia de Marketing: Growth, Brand, SEO, Social Media, Eventos, CRM.\n3️⃣ Servicios de Tecnología: IA, Cloud, Ciberseguridad, Desarrollo, Diseño UX/UI.\n\n¿Sobre cuál te gustaría saber más?";
            }

            // Consultoría de Gestión
            if (text.includes('consultoría') || text.includes('consultoria') || text.includes('gestión') || text.includes('gestion') || text.includes('estrategia') || text.includes('finanza') || text.includes('operacion') || text.includes('persona')) {
                return "📊 Consultoría de Gestión:\n\nAcompañamos a tu organización en cada decisión estratégica. Áreas clave:\n• Estratégica: Planificación, Innovación, Transformación Digital.\n• Personas: HR, Diseño Organizacional, Gestión del Cambio.\n• Financiera: CFO Consulting, M&A, Precios.\n• Operaciones: Mejora de Rendimiento, Cadena de Suministro, Sostenibilidad.";
            }

            // Agencia de Marketing
            if (text.includes('marketing') || text.includes('agencia') || text.includes('digital') || text.includes('seo') || text.includes('social') || text.includes('publicidad') || text.includes('marca')) {
                return "🚀 Agencia de Marketing:\n\nEstrategias basadas en datos para impulsar el crecimiento. Incluye:\n• Marketing Digital y Performance\n• Growth Marketing\n• Brand Marketing\n• SEO y Marketing de Contenidos\n• Social Media y Email\n• CRM y Revenue Operations";
            }

            // Servicios de Tecnología
            if (text.includes('tecnología') || text.includes('tecnologia') || text.includes('tech') || text.includes('it') || text.includes('software') || text.includes('app') || text.includes('ia') || text.includes('cloud')) {
                return "💻 Servicios de Tecnología:\n\nSoluciones de vanguardia para escalar tu negocio:\n• Inteligencia Artificial y Data\n• Cloud y DevOps\n• Ciberseguridad\n• Desarrollo de Software y Apps\n• Diseño y UX/UI\n• QA y Automatización";
            }

            // Proceso de implementación
            if (text.includes('cómo funciona') || text.includes('como funciona') || text.includes('implementación') || text.includes('implementacion') || text.includes('pasos') || text.includes('proceso')) {
                return "📋 Nuestro Proceso de 4 Pasos:\n\n1️⃣ Descubrir: Entendemos tus desafíos y objetivos.\n2️⃣ Definir: Alineamos requerimientos con tus metas estratégicas.\n3️⃣ Desarrollar: Creamos el cronograma y los primeros entregables.\n4️⃣ Implementar: Ejecutamos asegurando calidad y resultados.\n\n¡Es simple y eficiente! ¿Quieres comenzar?";
            }

            // Pricing / Precios / Planes
            if (text.includes('precio') || text.includes('costo') || text.includes('valor') ||
                text.includes('plan') || text.includes('planes') || text.includes('presupuesto') ||
                text.includes('pricing') || text.includes('honorario') || text.includes('tarifa') ||
                text.includes('cuanto sale') || text.includes('cuánto sale') || text.includes('cuánto cuesta') ||
                text.includes('cuanto cuesta') || text.includes('esencial') || text.includes('profesional') ||
                text.includes('mensual') || text.includes('horas')) {
                return "💼 <b>Nuestros Planes Mensuales:</b><br><br>" +
                    "🌱 <b>Plan Esencial</b> — 4 hs/mes<br>" +
                    "&nbsp;&nbsp;&nbsp;$ 600.000 / mes<br><br>" +
                    "🚀 <b>Plan Profesional</b> — 8 hs/mes<br>" +
                    "&nbsp;&nbsp;&nbsp;$ 1.080.000 / mes<br><br>" +
                    "🏢 <b>Plan Empresa</b> — 16 hs/mes<br>" +
                    "&nbsp;&nbsp;&nbsp;$ 1.920.000 / mes<br><br>" +
                    "Todos los planes incluyen acceso a nuestra red de contactos y asesoría estratégica personalizada. Los planes más avanzados suman reuniones de seguimiento, informes de KPIs y equipo dedicado.<br><br>" +
                    "¿Te gustaría conocer más detalles o agendar una reunión? Haz clic en 'Conectar' o escríbenos a <b>impulsa@mpl.com.ar</b>";
            }

            // Misión y Visión
            if (text.includes('misión') || text.includes('mision') || text.includes('visión') || text.includes('vision') || text.includes('quiénes son') || text.includes('quienes son') || text.includes('empresa') || text.includes('nosotros')) {
                return "🏢 Sobre MPULSA:\n\nSomos una consultora de nueva generación.\n\n📜 Misión: Transformar los desafíos de individuos, emprendedores y empresas en oportunidades de crecimiento.\n👁️ Visión: Ser el socio estratégico de referencia en Latinoamérica, reconocidos por convertir obstáculos en motores de crecimiento sostenible.";
            }

            // Agendar / Reunión
            if (text.includes('agendar') || text.includes('reunión') || text.includes('reunion') || text.includes('cita') || text.includes('demo')) {
                return "📅 ¡Excelente! Para agendar una reunión, te abriré el formulario ahora mismo. Si no aparece, haz clic en el botón 'Conectar'.";
            }

            // Default
            return "No estoy seguro de entender tu consulta. Por favor, pincha el botón 'Conectar' o escríbenos a impulsa@mpl.com.ar para atención personalizada.";
        }

        function handleUserMessage(text) {
            addMessage(text, 'user');

            // Detect booking intent and open modal
            if (text.toLowerCase().includes('agendar') || text.toLowerCase().includes('reunión') || text.toLowerCase().includes('cita')) {
                setTimeout(() => {
                    if (typeof openConectarModal === 'function') {
                        openConectarModal();
                    }
                }, 1500);
            }

            // Typing indicator simulation could go here

            setTimeout(() => {
                const botResponse = getBotResponse(text);
                addMessage(botResponse, 'bot');
            }, 1000);
        }

        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = chatInput.value.trim();
            if (text) {
                handleUserMessage(text);
                chatInput.value = '';
            }
        });

        // Make sendSuggestion available globally
        window.sendSuggestion = function (text) {
            handleUserMessage(text);
        }
    }
});


