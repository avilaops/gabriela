// Landing Page Profissional
import { Header } from '../components/header.js';

export class LandingPage {
    async render() {
        return `
            ${Header.render(true)}
            
            <!-- Hero Section -->
            <section style="
                background: linear-gradient(135deg, rgba(212, 165, 116, 0.95) 0%, rgba(184, 145, 95, 0.95) 100%),
                            url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 1200 600%22><rect fill=%22%23D4A574%22 width=%221200%22 height=%22600%22/></svg>');
                background-size: cover;
                background-position: center;
                color: white;
                padding: 120px 24px;
                text-align: center;
            ">
                <div class="container">
                    <h1 style="font-size: 3.5rem; margin-bottom: 24px; font-weight: 700;">
                        Realce Sua Beleza Natural
                    </h1>
                    <p style="font-size: 1.5rem; margin-bottom: 40px; opacity: 0.95;">
                        Design de sobrancelhas com técnica, precisão e elegância
                    </p>
                    <div class="flex flex-center gap-md" style="flex-wrap: wrap;">
                        <a href="https://wa.me/5517996820993?text=Olá! Gostaria de agendar um horário" 
                           class="btn btn-lg" 
                           style="background: white; color: var(--primary); font-weight: 600;"
                           target="_blank">
                            📱 Agende pelo WhatsApp
                        </a>
                        <a href="#servicos" class="btn btn-lg btn-outline" style="border-color: white; color: white;">
                            Ver Serviços
                        </a>
                    </div>
                </div>
            </section>

            <!-- Benefícios -->
            <section style="padding: 80px 24px; background: white;">
                <div class="container">
                    <h2 class="text-center mb-lg">Por Que Escolher Nosso Estúdio?</h2>
                    <div class="grid grid-3">
                        <div class="card text-center">
                            <div style="font-size: 3rem; margin-bottom: 16px;">✨</div>
                            <h3 style="margin-bottom: 16px;">Técnica Profissional</h3>
                            <p class="text-secondary">
                                Anos de experiência com as melhores técnicas de design de sobrancelhas
                            </p>
                        </div>
                        <div class="card text-center">
                            <div style="font-size: 3rem; margin-bottom: 16px;">🎯</div>
                            <h3 style="margin-bottom: 16px;">Resultado Personalizado</h3>
                            <p class="text-secondary">
                                Cada rosto é único. Criamos o design perfeito para você
                            </p>
                        </div>
                        <div class="card text-center">
                            <div style="font-size: 3rem; margin-bottom: 16px;">💎</div>
                            <h3 style="margin-bottom: 16px;">Ambiente Premium</h3>
                            <p class="text-secondary">
                                Espaço exclusivo, aconchegante e pensado para seu conforto
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Serviços -->
            <section id="servicos" style="padding: 80px 24px; background: var(--background);">
                <div class="container">
                    <h2 class="text-center mb-lg">Nossos Serviços</h2>
                    <div class="grid grid-2">
                        ${this.renderServico(
                            'Design de Sobrancelhas',
                            'Técnica exclusiva que valoriza seu olhar e harmoniza com seu rosto',
                            'A partir de R$ 80',
                            ['Análise facial completa', 'Design personalizado', 'Técnica avançada', 'Duração: 40min']
                        )}
                        ${this.renderServico(
                            'Micropigmentação',
                            'Sobrancelhas perfeitas 24 horas por dia com resultado natural',
                            'A partir de R$ 600',
                            ['Técnica fio a fio', 'Pigmentos premium', 'Resultado duradouro', 'Retoque incluso']
                        )}
                        ${this.renderServico(
                            'Henna',
                            'Cor intensa e natural que dura até 15 dias',
                            'A partir de R$ 60',
                            ['100% natural', 'Diversas tonalidades', 'Sem contraindicações', 'Efeito imediato']
                        )}
                        ${this.renderServico(
                            'Lifting de Cílios',
                            'Cílios mais longos, curvados e volumosos naturalmente',
                            'A partir de R$ 120',
                            ['Efeito máscara', 'Duração de 2 meses', 'Realça o olhar', 'Baixa manutenção']
                        )}
                    </div>
                </div>
            </section>

            <!-- Depoimentos -->
            <section id="depoimentos" style="padding: 80px 24px; background: white;">
                <div class="container">
                    <h2 class="text-center mb-lg">O Que Nossas Clientes Dizem</h2>
                    <div class="grid grid-3">
                        ${this.renderDepoimento(
                            'Mariana Silva',
                            'Amei o resultado! Profissional super atenciosa e o design ficou perfeito para meu rosto. Super recomendo!',
                            5
                        )}
                        ${this.renderDepoimento(
                            'Juliana Costa',
                            'Melhor lugar para fazer sobrancelha! Ambiente lindo e a Gabriela é muito talentosa. Não troco por nada!',
                            5
                        )}
                        ${this.renderDepoimento(
                            'Fernanda Oliveira',
                            'Fiz a micropigmentação e estou apaixonada! Acordar com as sobrancelhas prontas não tem preço.',
                            5
                        )}
                    </div>
                </div>
            </section>

            <!-- Processo -->
            <section style="padding: 80px 24px; background: var(--background);">
                <div class="container">
                    <h2 class="text-center mb-lg">Como Funciona</h2>
                    <div class="grid grid-4">
                        <div class="text-center">
                            <div class="badge badge-success" style="font-size: 1.5rem; padding: 16px; margin-bottom: 16px;">1</div>
                            <h4>Agendamento</h4>
                            <p class="text-secondary">Entre em contato pelo WhatsApp e escolha seu horário</p>
                        </div>
                        <div class="text-center">
                            <div class="badge badge-success" style="font-size: 1.5rem; padding: 16px; margin-bottom: 16px;">2</div>
                            <h4>Análise</h4>
                            <p class="text-secondary">Estudamos seu rosto e desenhamos o design ideal</p>
                        </div>
                        <div class="text-center">
                            <div class="badge badge-success" style="font-size: 1.5rem; padding: 16px; margin-bottom: 16px;">3</div>
                            <h4>Execução</h4>
                            <p class="text-secondary">Realizamos o procedimento com técnica e cuidado</p>
                        </div>
                        <div class="text-center">
                            <div class="badge badge-success" style="font-size: 1.5rem; padding: 16px; margin-bottom: 16px;">4</div>
                            <h4>Resultado</h4>
                            <p class="text-secondary">Você sai linda e confiante para arrasar!</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- CTA Final -->
            <section style="
                background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
                color: white;
                padding: 80px 24px;
                text-align: center;
            ">
                <div class="container">
                    <h2 style="margin-bottom: 24px; font-size: 2.5rem;">Pronta Para Transformar Seu Olhar?</h2>
                    <p style="font-size: 1.2rem; margin-bottom: 40px; opacity: 0.95;">
                        Agende agora mesmo e descubra o poder de sobrancelhas perfeitas
                    </p>
                    <a href="https://wa.me/5517996820993?text=Olá! Gostaria de agendar um horário" 
                       class="btn btn-lg" 
                       style="background: white; color: var(--primary); font-weight: 600;"
                       target="_blank">
                        📱 Agendar Agora pelo WhatsApp
                    </a>
                </div>
            </section>

            <!-- Footer -->
            <footer style="background: var(--secondary); color: white; padding: 40px 24px; text-align: center;">
                <div class="container">
                    <h3 style="font-family: var(--font-display); margin-bottom: 24px; color: var(--primary);">Gabriela</h3>
                    <p style="margin-bottom: 16px;">Design de Sobrancelhas</p>
                    <div class="flex flex-center gap-md mb-md">
                        <a href="https://instagram.com/gabriela.sobrancelhas" target="_blank" style="color: white;">
                            📷 Instagram
                        </a>
                        <a href="https://wa.me/5517996820993" target="_blank" style="color: white;">
                            📱 WhatsApp
                        </a>
                        <a href="mailto:gabrielacasari@hotmail.com" style="color: white;">
                            ✉️ Email
                        </a>
                    </div>
                    <p style="opacity: 0.7; font-size: 0.9rem;">
                        © ${new Date().getFullYear()} Gabriela - Todos os direitos reservados
                    </p>
                </div>
            </footer>
        `;
    }

    renderServico(titulo, descricao, preco, itens) {
        return `
            <div class="card">
                <h3 style="color: var(--primary); margin-bottom: 16px;">${titulo}</h3>
                <p class="text-secondary mb-md">${descricao}</p>
                <div style="font-size: 1.8rem; font-weight: 700; color: var(--primary); margin-bottom: 24px;">
                    ${preco}
                </div>
                <ul style="list-style: none; padding: 0;">
                    ${itens.map(item => `
                        <li style="padding: 8px 0; border-bottom: 1px solid var(--background);">
                            ✓ ${item}
                        </li>
                    `).join('')}
                </ul>
                <a href="https://wa.me/5517996820993?text=Olá! Gostaria de saber mais sobre ${encodeURIComponent(titulo)}" 
                   class="btn btn-primary mt-md" 
                   style="width: 100%;"
                   target="_blank">
                    Agendar
                </a>
            </div>
        `;
    }

    renderDepoimento(nome, texto, estrelas) {
        return `
            <div class="card">
                <div style="color: var(--primary); font-size: 1.5rem; margin-bottom: 16px;">
                    ${'★'.repeat(estrelas)}
                </div>
                <p style="font-style: italic; margin-bottom: 16px; color: var(--text-secondary);">
                    "${texto}"
                </p>
                <strong style="color: var(--primary);">${nome}</strong>
            </div>
        `;
    }

    init() {
        // Smooth scroll para âncoras
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }
}
