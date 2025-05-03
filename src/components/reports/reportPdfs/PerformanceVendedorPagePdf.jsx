// src/components/reports/reportPdfs/PerformanceVendedorPagePdf.jsx
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

/**
 * Componente para geração de PDF do relatório de Performance de Vendedor
 * @param {Object} props
 * @param {Array} props.performanceData - Dados de performance dos departamentos
 * @param {String} props.periodoReferencia - Período de referência do relatório
 * @param {String} props.vendedorNome - Nome do vendedor selecionado (opcional)
 * @param {Function} props.formatCurrency - Função para formatar valores monetários
 * @param {Function} props.formatPercentage - Função para formatar percentuais
 * @param {Object} props.totals - Totais calculados (opcional)
 * @returns {Function} Função que gera e faz download do PDF
 */
const PerformanceVendedorPagePdf = {
  generate: ({
    performanceData = [],
    periodoReferencia = "Atual",
    vendedorNome = "Todos",
    formatCurrency = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value),
    formatPercentage = (value) => {
      // Correção para garantir que valores zero ou undefined sejam tratados corretamente
      if (value === null || value === undefined || value === "") {
        return "0,00%";
      }
      const numValue = Number(value);
      return isNaN(numValue) ? "0,00%" : `${numValue.toFixed(2).replace('.', ',')}%`;
    },
    totals = null
  }) => {
    // Cria um novo documento PDF em orientação paisagem
    const doc = new jsPDF({ orientation: 'landscape' });
    
    // Adiciona o cabeçalho do documento
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('PAINEL DE PERFORMANCE - RCA', 14, 15);
    
    // Adiciona informações do período e vendedor
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Referente ao período: ${periodoReferencia}`, 14, 22);
    doc.text(`Vendedor: ${vendedorNome}`, 14, 27);
    doc.text(`Data de emissão: ${new Date().toLocaleDateString('pt-BR')}`, 14, 32);
    
    // Define as colunas da tabela
    const tableColumn = [
      'Cod.Depto',
      'Departamento',
      'Meta Financeira',
      'Realizado Bimestre',
      '% Meta Bim',
      'Realizado Mês 1',
      'Realizado Mês 2',
      'A Faturar',
      'Meta Positivação',
      '% Positivação',
      'Posit. Mês 1',
      'Posit. Mês 2',
      'Qtd Mix',
      'Venda Mix',
      'SKU PDV'
    ];
    
    // Converte os dados para o formato da tabela
    const tableRows = performanceData.map(item => {
      // Calcular a positivação bimestral se não estiver definida
      // Normalmente seria a média entre os dois meses
      const positivacaoBimestral = item.positivacaoBimestral || 
        ((Number(item.positivacaoMes1 || 0) + Number(item.positivacaoMes2 || 0)) / 2);
      
      return [
        item.codDepto,
        item.departamento,
        formatCurrency(item.metaFinanceira),
        formatCurrency(item.realizadoBimestre),
        formatPercentage(item.metaBimestralPercentual),
        formatCurrency(item.realizadoMes1),
        formatCurrency(item.realizadoMes2),
        formatCurrency(item.aFaturar),
        formatPercentage(item.metaMediaPositivacao),
        formatPercentage(positivacaoBimestral),
        formatPercentage(item.positivacaoMes1),
        formatPercentage(item.positivacaoMes2),
        item.quantidadeMix,
        item.vendaMix,
        item.skuPDV
      ];
    });
    
    // Adiciona os totais, se disponíveis
    if (totals) {
      const totalPercentual = totals.metaFinanceira > 0 
        ? (totals.realizadoBimestre / totals.metaFinanceira) * 100 
        : 0;
        
      tableRows.push([
        '-',
        'TOTAL',
        formatCurrency(totals.metaFinanceira),
        formatCurrency(totals.realizadoBimestre),
        formatPercentage(totalPercentual),
        formatCurrency(totals.realizadoMes1),
        formatCurrency(totals.realizadoMes2),
        formatCurrency(totals.aFaturar),
        '-',
        '-', // Célula vazia para % Positivação
        '-', // Célula vazia para Posit. Mês 1
        '-', // Célula vazia para Posit. Mês 2
        totals.quantidadeMix || 0,
        totals.vendaMix || 0,
        totals.skuPDV || 0
      ]);
    }
    
    // Adiciona a tabela ao documento
    autoTable(doc, {
      startY: 37,
      head: [tableColumn],
      body: tableRows,
      styles: { fontSize: 8 },
      headStyles: { 
        fillColor: [79, 70, 229], // Indigo-600
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      columnStyles: {
        0: { cellWidth: 15 }, // Cod.Depto
        1: { cellWidth: 30 }, // Departamento
      },
      // Adiciona cores condicionais baseadas nos percentuais
      didDrawCell: (data) => {
        if (data.section === 'body' && data.column.index === 4) {
          // Coluna de % Meta Bimestral
          const cell = data.cell;
          // Extrai o valor numérico do texto removendo o símbolo %
          const cellText = cell.text[0] || "0%";
          const value = parseFloat(cellText.replace('%', '').replace(',', '.'));
          
          if (!isNaN(value)) {
            // Definir cores baseadas nos valores percentuais
            if (value >= 100) {
              doc.setFillColor(240, 253, 244); // Green-50
              doc.rect(cell.x, cell.y, cell.width, cell.height, 'F');
              doc.setTextColor(22, 101, 52); // Green-800
            } else if (value >= 90) {
              doc.setFillColor(254, 252, 232); // Yellow-50
              doc.rect(cell.x, cell.y, cell.width, cell.height, 'F');
              doc.setTextColor(133, 77, 14); // Yellow-800
            } else {
              doc.setFillColor(254, 242, 242); // Red-50
              doc.rect(cell.x, cell.y, cell.width, cell.height, 'F');
              doc.setTextColor(153, 27, 27); // Red-800
            }
            
            // Redefinir a cor do texto para as próximas células
            doc.setTextColor(0, 0, 0);
          }
        }
        
        if (data.section === 'body' && data.column.index === 9) {
          // Coluna de % Positivação
          const cell = data.cell;
          const row = data.row.index;
          
          // Verificar se é uma linha de dados (não a linha de totais)
          if (row < performanceData.length) {
            const item = performanceData[row];
            
            if (item) {
              // Calcular a positivação bimestral se não estiver definida
              let value = Number(item.positivacaoBimestral);
              if (isNaN(value)) {
                value = ((Number(item.positivacaoMes1 || 0) + Number(item.positivacaoMes2 || 0)) / 2);
              }
              
              const target = Number(item.metaMediaPositivacao) || 0;
              
              if (target > 0) { // Evitar divisão por zero
                if (value >= target) {
                  doc.setFillColor(240, 253, 244); // Green-50
                  doc.rect(cell.x, cell.y, cell.width, cell.height, 'F');
                  doc.setTextColor(22, 101, 52); // Green-800
                } else if (value >= target * 0.9) {
                  doc.setFillColor(254, 252, 232); // Yellow-50
                  doc.rect(cell.x, cell.y, cell.width, cell.height, 'F');
                  doc.setTextColor(133, 77, 14); // Yellow-800
                } else {
                  doc.setFillColor(254, 242, 242); // Red-50
                  doc.rect(cell.x, cell.y, cell.width, cell.height, 'F');
                  doc.setTextColor(153, 27, 27); // Red-800
                }
                
                // Redefinir a cor do texto para as próximas células
                doc.setTextColor(0, 0, 0);
              }
            }
          }
        }
      }
    });
    
    // Adiciona legenda
    const legendaY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('Legenda:', 14, legendaY);
    doc.setFont('helvetica', 'normal');
    
    // Quadrados coloridos para a legenda
    doc.setFillColor(240, 253, 244); // Green-50
    doc.rect(14, legendaY + 5, 5, 5, 'F');
    doc.setFillColor(254, 252, 232); // Yellow-50
    doc.rect(64, legendaY + 5, 5, 5, 'F');
    doc.setFillColor(254, 242, 242); // Red-50
    doc.rect(134, legendaY + 5, 5, 5, 'F');
    
    // Textos da legenda
    doc.text('Meta atingida', 22, legendaY + 9);
    doc.text('Meta parcial (90%+)', 72, legendaY + 9);
    doc.text('Abaixo da meta', 142, legendaY + 9);
    
    // Adicionar rodapé com números de página
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.text(`Página ${i} de ${pageCount}`, 14, doc.internal.pageSize.height - 10);
      doc.text(`Emitido em: ${new Date().toLocaleString('pt-BR')}`, doc.internal.pageSize.width - 80, doc.internal.pageSize.height - 10);
    }
    
    // Salva o PDF
    doc.save('performance_vendedor.pdf');
  }
};

export default PerformanceVendedorPagePdf;