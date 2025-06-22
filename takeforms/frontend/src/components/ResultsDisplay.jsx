// frontend/src/components/ResultsDisplay.jsx
import React from 'react';

function ResultsDisplay({ data, type, onSelect }) {
  if (!data || data.length === 0) {
    return <div>Nenhum resultado encontrado.</div>;
  }

  // Define colunas e renderização por tipo
  const columnsByType = {
    persons: [
      { label: 'Nome', key: 'nome' },
      { label: 'CPF', key: 'cpf' },
      { label: 'Cidade', key: 'cidade' },
      { label: 'Estado', key: 'estado' },
    ],
    companies: [
      { label: 'Razão Social', key: 'razaoSocial' },
      { label: 'CNPJ', key: 'cnpj' },
      { label: 'Cidade', key: 'cidade' },
      { label: 'Estado', key: 'estado' },
    ],
  };

  const columns = columnsByType[type] || [];

  return (
    <table className="results-table">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key}>{col.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, idx) => (
          <tr
            key={idx}
            className="result-row"
            onClick={() => onSelect && onSelect(item)}
            style={{ cursor: onSelect ? 'pointer' : 'default' }}
          >
            {columns.map((col) => (
              <td key={col.key}>{item[col.key] || '-'}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ResultsDisplay;
