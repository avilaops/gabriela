// Componente de Gráficos usando Canvas
export class Chart {
    constructor(canvasId, options = {}) {
        this.canvasId = canvasId;
        this.type = options.type || 'bar';
        this.data = options.data || [];
        this.labels = options.labels || [];
        this.colors = options.colors || ['#D4A574', '#B8915F', '#E8D4BA', '#5EAC7B', '#F5A623'];
    }

    render() {
        const canvas = document.getElementById(this.canvasId);
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        // Limpar canvas
        ctx.clearRect(0, 0, width, height);

        if (this.type === 'bar') {
            this.renderBarChart(ctx, width, height);
        } else if (this.type === 'line') {
            this.renderLineChart(ctx, width, height);
        } else if (this.type === 'pie') {
            this.renderPieChart(ctx, width, height);
        }
    }

    renderBarChart(ctx, width, height) {
        const padding = 40;
        const chartWidth = width - padding * 2;
        const chartHeight = height - padding * 2;
        const barWidth = chartWidth / this.data.length;
        const maxValue = Math.max(...this.data) || 1;

        // Desenhar eixos
        ctx.strokeStyle = '#E0E0E0';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, height - padding);
        ctx.lineTo(width - padding, height - padding);
        ctx.stroke();

        // Desenhar barras
        this.data.forEach((value, index) => {
            const barHeight = (value / maxValue) * chartHeight;
            const x = padding + (index * barWidth) + barWidth * 0.1;
            const y = height - padding - barHeight;
            const w = barWidth * 0.8;

            ctx.fillStyle = this.colors[index % this.colors.length];
            ctx.fillRect(x, y, w, barHeight);

            // Labels
            ctx.fillStyle = '#6C6C6C';
            ctx.font = '12px Montserrat';
            ctx.textAlign = 'center';
            ctx.fillText(this.labels[index] || '', x + w / 2, height - padding + 20);

            // Valores
            ctx.fillText(value.toFixed(0), x + w / 2, y - 5);
        });
    }

    renderLineChart(ctx, width, height) {
        const padding = 40;
        const chartWidth = width - padding * 2;
        const chartHeight = height - padding * 2;
        const maxValue = Math.max(...this.data) || 1;
        const stepX = chartWidth / (this.data.length - 1 || 1);

        // Desenhar eixos
        ctx.strokeStyle = '#E0E0E0';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, height - padding);
        ctx.lineTo(width - padding, height - padding);
        ctx.stroke();

        // Desenhar linha
        ctx.strokeStyle = this.colors[0];
        ctx.lineWidth = 3;
        ctx.beginPath();

        this.data.forEach((value, index) => {
            const x = padding + (index * stepX);
            const y = height - padding - (value / maxValue * chartHeight);

            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }

            // Pontos
            ctx.fillStyle = this.colors[0];
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fill();
        });

        ctx.stroke();

        // Labels
        ctx.fillStyle = '#6C6C6C';
        ctx.font = '12px Montserrat';
        ctx.textAlign = 'center';
        this.labels.forEach((label, index) => {
            const x = padding + (index * stepX);
            ctx.fillText(label, x, height - padding + 20);
        });
    }

    renderPieChart(ctx, width, height) {
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) / 2 - 40;
        const total = this.data.reduce((sum, val) => sum + val, 0) || 1;

        let currentAngle = -Math.PI / 2;

        this.data.forEach((value, index) => {
            const sliceAngle = (value / total) * Math.PI * 2;

            // Desenhar fatia
            ctx.fillStyle = this.colors[index % this.colors.length];
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
            ctx.closePath();
            ctx.fill();

            // Label
            const labelAngle = currentAngle + sliceAngle / 2;
            const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7);
            const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7);

            ctx.fillStyle = 'white';
            ctx.font = 'bold 14px Montserrat';
            ctx.textAlign = 'center';
            ctx.fillText(`${((value / total) * 100).toFixed(0)}%`, labelX, labelY);

            currentAngle += sliceAngle;
        });

        // Legenda
        const legendY = height - 20;
        let legendX = 20;
        this.labels.forEach((label, index) => {
            ctx.fillStyle = this.colors[index % this.colors.length];
            ctx.fillRect(legendX, legendY, 15, 15);

            ctx.fillStyle = '#6C6C6C';
            ctx.font = '12px Montserrat';
            ctx.textAlign = 'left';
            ctx.fillText(label, legendX + 20, legendY + 12);

            legendX += 120;
        });
    }

    static createCanvas(id, width = 400, height = 300) {
        return `<canvas id="${id}" width="${width}" height="${height}"></canvas>`;
    }
}
