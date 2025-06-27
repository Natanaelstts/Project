document.addEventListener('DOMContentLoaded', function() {
    // Inicialização do Gráfico (Chart.js)
    const ctx = document.getElementById('performanceChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                datasets: [{
                    label: 'Pontuação Média do Aluno',
                    data: [65, 59, 80, 81, 56, 75, 60, 70, 85, 90, 88, 92], // Dados de exemplo
                    borderColor: '#28a745', // Cor verde principal
                    backgroundColor: 'rgba(40, 167, 69, 0.1)', // Fundo suave para a área abaixo da linha
                    borderWidth: 2,
                    pointBackgroundColor: '#28a745',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#28a745',
                    pointHoverBorderColor: '#fff',
                    fill: true, // Preenche a área abaixo da linha
                    tension: 0.4 // Suaviza a linha do gráfico
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false, // Permite que o gráfico use a altura definida pelo CSS
                plugins: {
                    title: {
                        display: true,
                        text: 'Tendência de Desempenho ao Longo do Tempo',
                        font: {
                            size: 16,
                            weight: '600'
                        },
                        color: '#343a40'
                    },
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            color: '#495057'
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false // Remove linhas de grade no eixo X
                        },
                        ticks: {
                            color: '#6c757d'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        max: 100,
                        grid: {
                            color: '#e0e0e0' // Cor suave para linhas de grade no eixo Y
                        },
                        ticks: {
                            color: '#6c757d',
                            callback: function(value) {
                                return value + '%'; // Adiciona '%' aos rótulos do eixo Y
                            }
                        }
                    }
                }
            }
        });
    }

    // Inicialização da Tabela (DataTables)
    // Verifica se jQuery e DataTables estão carregados antes de inicializar
    if (typeof jQuery !== 'undefined' && typeof jQuery.fn.DataTable !== 'undefined') {
        $('#performanceTable').DataTable({
            "language": {
                "url": "//cdn.datatables.net/plug-ins/1.10.21/i18n/Portuguese-Brasil.json"
            },
            "pagingType": "full_numbers", // Botões de paginação completos
            "responsive": true, // Habilita responsividade
            "order": [[ 3, "desc" ]] // Ordena pela coluna de data por padrão (mais recente primeiro)
        });
    } else {
        console.error("jQuery ou DataTables não carregados. Verifique os scripts no HTML.");
    }

    // Lógica para o Modal de Mensagem Customizado
    const customMessageModal = document.getElementById('customMessageModal');
    const modalMessage = document.getElementById('modalMessage');
    const closeButton = document.querySelector('.close-button');
    const modalOkButton = document.getElementById('modalOkButton');

    function showCustomMessage(message) {
        modalMessage.textContent = message;
        customMessageModal.style.display = 'flex'; // Usar flex para centralizar
        customMessageModal.setAttribute('aria-hidden', 'false');
    }

    // Fecha o modal ao clicar no 'x' ou no botão 'Ok'
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            customMessageModal.style.display = 'none';
            customMessageModal.setAttribute('aria-hidden', 'true');
        });
    }
    if (modalOkButton) {
        modalOkButton.addEventListener('click', function() {
            customMessageModal.style.display = 'none';
            customMessageModal.setAttribute('aria-hidden', 'true');
        });
    }

    // Fecha o modal ao clicar fora dele
    window.addEventListener('click', function(event) {
        if (event.target == customMessageModal) {
            customMessageModal.style.display = 'none';
            customMessageModal.setAttribute('aria-hidden', 'true');
        }
    });

    // Event Listeners para os botões de ação
    const downloadReportBtn = document.getElementById('downloadReportBtn');
    const sendFeedbackBtn = document.getElementById('sendFeedbackBtn');

    if (downloadReportBtn) {
        downloadReportBtn.addEventListener('click', function() {
            showCustomMessage('Seu relatório completo foi gerado com sucesso e o download será iniciado em breve!');
            // Lógica para download real aqui (ex: fetch para um endpoint de geração de relatório)
        });
    }

    if (sendFeedbackBtn) {
        sendFeedbackBtn.addEventListener('click', function() {
            showCustomMessage('Seu feedback foi enviado com sucesso! Agradecemos sua contribuição.');
            // Lógica para enviar feedback aqui (ex: fetch para um endpoint de API)
        });
    }

    // Lógica para o FAQ (Accordion)
    const faqToggles = document.querySelectorAll('.faq-toggle');

    faqToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const content = this.nextElementSibling; // Pega o elemento irmão imediato (faq-content)
            const isExpanded = this.getAttribute('aria-expanded') === 'true';

            // Fecha todos os outros itens FAQ abertos, exceto o clicado
            faqToggles.forEach(otherToggle => {
                if (otherToggle !== this && otherToggle.getAttribute('aria-expanded') === 'true') {
                    otherToggle.setAttribute('aria-expanded', 'false');
                    otherToggle.nextElementSibling.classList.remove('show');
                    otherToggle.nextElementSibling.setAttribute('aria-hidden', 'true');
                }
            });

            // Alterna a visibilidade do conteúdo clicado
            if (isExpanded) {
                this.setAttribute('aria-expanded', 'false');
                content.classList.remove('show');
                content.setAttribute('aria-hidden', 'true');
            } else {
                this.setAttribute('aria-expanded', 'true');
                content.classList.add('show');
                content.setAttribute('aria-hidden', 'false');
            }
        });
    });
});
// Lógica para o Formulário de Sugestão
const sugestaoForm = document.getElementById('sugestaoForm');

if (sugestaoForm) {
    sugestaoForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        const textarea = this.querySelector('textarea[name="sugestao"]');
        const sugestao = textarea.value.trim();

        if (sugestao === '') {
            showCustomMessage('Por favor, digite sua sugestão antes de enviar.');
            return;
        }

        // Simulação de envio para um servidor
        // Em um ambiente real, você faria uma requisição 'fetch' para 'enviar_sugestao.php'
        // Exemplo:
        // fetch('enviar_sugestao.php', {
        //     method: 'POST',
        //     body: new FormData(this)
        // })
        // .then(response => response.json()) // Ou response.text() dependendo do que o PHP retorna
        // .then(data => {
        //     if (data.success) { // Supondo que o PHP retorne um JSON { success: true }
        //         showCustomMessage('Obrigado! Sua sugestão foi enviada com sucesso.');
        //         textarea.value = ''; // Limpa o campo
        //     } else {
        //         showCustomMessage('Ocorreu um erro ao enviar sua sugestão. Por favor, tente novamente mais tarde.');
        //     }
        // })
        // .catch(error => {
        //     console.error('Erro ao enviar sugestão:', error);
        //     showCustomMessage('Ocorreu um erro de conexão. Verifique sua internet e tente novamente.');
        // });

        // Simulação de sucesso para demonstração:
        setTimeout(() => {
            showCustomMessage('Obrigado! Sua sugestão foi enviada com sucesso.');
            textarea.value = ''; // Limpa o campo após a simulação
        }, 1000); // Simula um pequeno atraso de rede
    });
}