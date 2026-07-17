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
    // Chatbot Logic - AI Sales Assistant
    const chatToggleBtn = document.querySelector('.chat-toggle-btn');
    const chatCloseBtn = document.querySelector('.chat-close-btn');
    const chatWindow = document.querySelector('.chat-window');
    const chatForm = document.querySelector('#chat-form');
    const chatInput = document.querySelector('#chat-input');
    const chatMessages = document.querySelector('#chat-messages');

    if (chatToggleBtn && chatWindow) {
        // Chat history storage for the conversation session
        const messages = [
            { role: 'assistant', content: '¡Hola! Soy Neo, el asistente de ventas inteligente de MPULSA. Estoy aquí para ayudarte a conocer nuestros servicios y planes, o para coordinar una reunión de diagnóstico gratuito para tu negocio. ¿En qué te puedo asesorar hoy?' }
        ];

        // Determine API URL based on environment (local vs production)
        const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        const API_URL = isLocal ? 'http://localhost:3000/api/chat' : 'https://clientportal.mpl.com.ar/api/chat';

        // Toggle Chat
        function toggleChat() {
            chatWindow.classList.toggle('active');
            if (chatWindow.classList.contains('active')) {
                chatInput.focus();
            }
        }

        chatToggleBtn.addEventListener('click', toggleChat);
        chatCloseBtn.addEventListener('click', toggleChat);

        // Helper to format bot text (basic markdown to html)
        function formatMessage(text) {
            return text
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                .replace(/\n/g, '<br>');
        }

        // Add Message element to DOM
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
            return messageDiv;
        }

        // Send Message to backend and handle stream
        async function handleUserMessage(text) {
            // 1. Add user message to UI and history
            addMessage(text, 'user');
            messages.push({ role: 'user', content: text });

            // Remove suggestion chips if any exist
            const chips = chatMessages.querySelector('.suggestion-chips');
            if (chips) {
                chips.remove();
            }

            // 2. Create bot message with typing indicator
            const botMessageDiv = addMessage('', 'bot');
            const botContentDiv = botMessageDiv.querySelector('.message-content');
            botContentDiv.innerHTML = '<span class="typing-dots"><span></span><span></span><span></span></span>';

            try {
                // 3. Make fetch request to Next.js API
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ messages }),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                // 4. Stream the text response
                const reader = response.body.getReader();
                const decoder = new TextDecoder();
                let botResponseText = '';
                let isFirstChunk = true;

                while (true) {
                    const { value, done } = await reader.read();
                    if (done) {
                        if (isFirstChunk) {
                            botContentDiv.innerHTML = 'Lo siento, el asistente inteligente no está disponible temporalmente. Por favor, intenta de nuevo más tarde o contáctanos a <a href="mailto:impulsa@mpl.com.ar">impulsa@mpl.com.ar</a>.';
                        }
                        break;
                    }
                    const chunk = decoder.decode(value, { stream: true });
                    
                    if (isFirstChunk) {
                        botContentDiv.innerHTML = '';
                        isFirstChunk = false;
                    }
                    
                    botResponseText += chunk;
                    botContentDiv.innerHTML = formatMessage(botResponseText);
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }

                // 5. Save assistant response to conversation history (only if we received text)
                if (botResponseText) {
                    messages.push({ role: 'assistant', content: botResponseText });
                }

                // 6. Proactive check: if user wants to schedule / book, auto open modal after a short delay
                const botLower = botResponseText.toLowerCase();
                if (botLower.includes('guardar_lead') || botLower.includes('he registrado tus datos') || botLower.includes('formulario de contacto')) {
                    setTimeout(() => {
                        if (typeof openConectarModal === 'function') {
                            openConectarModal();
                        }
                    }, 2000);
                }

            } catch (error) {
                console.error('Error fetching bot response:', error);
                botContentDiv.innerHTML = 'Lo siento, ha ocurrido un error al conectar con el asistente de ventas. Por favor, intenta de nuevo más tarde o contáctanos directamente a <a href="mailto:impulsa@mpl.com.ar">impulsa@mpl.com.ar</a>.';
            }
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


