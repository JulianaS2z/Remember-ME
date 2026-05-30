import React, { useState, useEffect } from 'react';

export default function Agendamentos() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Carrega os agendamentos
    setLoading(false);
  }, []);

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="agendamentos-container">
      <h1>Agendamentos</h1>
      {/* Conteúdo da página de agendamentos */}
    </div>
  );
}
