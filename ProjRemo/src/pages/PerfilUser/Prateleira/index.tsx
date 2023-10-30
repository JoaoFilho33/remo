import { useState } from 'react';
import { Link } from 'react-router-dom';
import "./styleprateleira.css"

export function Prateleira() {
  const [filmesVistos, setFilmesVistos] = useState([
    { id: 1, nome: 'Filme 1', avaliacao: 4 },
    { id: 2, nome: 'Filme 2', avaliacao: 3 },
    // Outros filmes vistos
  ]);

  const [filmesFila, setFilmesFila] = useState([
    { id: 1, nome: 'Filme A', avaliacao: 0 },
    { id: 2, nome: 'Filme B', avaliacao: 0 },
    // Outros filmes em fila
  ]);

  const [filmesPausa, setFilmesPausa] = useState([
    { id: 1, nome: 'Filme X', avaliacao: 0 },
    { id: 2, nome: 'Filme Y', avaliacao: 0 },
    // Outros filmes em pausa
  ]);

  // Estado para rastrear o novo filme
  const [novoFilme, setNovoFilme] = useState({
    nome: '',
    categoria: 'vistos',
    avaliacao: 0,
  });

  const adicionarFilme = () => {
    if (novoFilme.nome) {
      switch (novoFilme.categoria) {
        case 'vistos':
          setFilmesVistos([...filmesVistos, { id: filmesVistos.length + 1, ...novoFilme }]);
          break;
        case 'fila':
          setFilmesFila([...filmesFila, { id: filmesFila.length + 1, ...novoFilme }]);
          break;
        case 'pausa':
          setFilmesPausa([...filmesPausa, { id: filmesPausa.length + 1, ...novoFilme }]);
          break;
        default:
          break;
      }
      // Limpe o estado do novo filme
      setNovoFilme({
        nome: '',
        categoria: 'vistos',
        avaliacao: 0,
      });
    }
  };

  return (
    <div className="Prateleira">
      <h2>Minha Prateleira</h2>
      
      <h3>Adicionar Filme à Prateleira</h3>
      <div className='AddPrateleira'>
        <input
          type="text"
          placeholder="Nome do Filme"
          value={novoFilme.nome}
          onChange={(e) => setNovoFilme({ ...novoFilme, nome: e.target.value })}
        />
        <select
          value={novoFilme.categoria}
          onChange={(e) => setNovoFilme({ ...novoFilme, categoria: e.target.value })}
        >
          <option value="vistos">Vistos</option>
          <option value="fila">Em Fila</option>
          <option value="pausa">Em Pausa</option>
        </select>
        {novoFilme.categoria === 'vistos' && (
          <>
            <label>Avaliação: </label>
            <input
              type="number"
              min="0"
              max="5"
              value={novoFilme.avaliacao}
              onChange={(e) =>
                setNovoFilme({ ...novoFilme, avaliacao: parseInt(e.target.value) })
              }
            />
          </>
        )}
        <button onClick={adicionarFilme}>Adicionar Filme</button>
      </div>

      {/* Exibir todas as seções de prateleira, independentemente da avaliação */}
      <div>
        <h3>Vistos</h3>
        <ul>
          {filmesVistos.map((filme) => (
            <li key={filme.id}>
              {filme.nome} (Avaliação: {filme.avaliacao} estrelas)
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Em Fila</h3>
        <ul>
          {filmesFila.map((filme) => (
            <li key={filme.id}>
              {filme.nome}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Em Pausa</h3>
        <ul>
          {filmesPausa.map((filme) => (
            <li key={filme.id}>
              {filme.nome} 
            </li>
          ))}
        </ul>
      </div>

      <Link to="/perfil">Voltar para o Perfil</Link>
    </div>
  );
}
