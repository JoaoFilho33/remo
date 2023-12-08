import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./styleprateleira.css";

interface Filme {
  id: number;
  nome: string;
  ano: string;
  tipo: string;
  sinopse: string;
}

interface PrateleiraFilme {
  id: number;
  statusFilme: string;
  estrelas: number;
  filme: Filme;
  prateleira: {
    id: number;
    usuario: {
    };
  };
}

const Prateleira: React.FC = () => {
  const [filmes, setFilmes] = useState<PrateleiraFilme[]>([]);
  const [filtroStatus, setFiltroStatus] = useState<string | null>(null);

  useEffect(() => {
    fetchPrateleiraFilme();
  }, []);

  const fetchPrateleiraFilme = async () => {
    try {
      const response = await axios.get('http://localhost:8080/prateleiraFilme');
      console.log('Dados da API:', response.data);
      const filmesDoBanco = response.data;
      const filmesPromises = filmesDoBanco.map(async (filmeBanco: PrateleiraFilme) => {
        const filmeTMDb = await fetchFilmeTMDb(filmeBanco.filme.id);
        return {
          id: filmeBanco.id,
          statusFilme: filmeBanco.statusFilme,
          estrelas: filmeBanco.estrelas,
          filme: {
            nome: filmeTMDb.original_title,
            imagem: filmeTMDb.poster_path,
          },
        };
      });

      const filmesComInformacoesTMDb = await Promise.all(filmesPromises);

      setFilmes(filmesComInformacoesTMDb);
    } catch (error) {
      console.error('Erro ao buscar dados da prateleira de filmes', error);
    }
  };

  const fetchFilmeTMDb = async (filmeId: number) => {
    try {
      const apiKey = '29c1fe0f8cc98e16d427a895f20d1fd9'; // Substitua pela sua chave de API TMDb
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${filmeId}?api_key=${apiKey}&language=pt-BR`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar informações do filme ${filmeId} na API TMDb`, error);
      return {};
    }
  };

  const handleFiltroStatus = (status: string) => {
    setFiltroStatus(status);
  };

  const filmesFiltrados = filtroStatus
    ? filmes.filter(filme => filme.statusFilme === filtroStatus)
    : filmes;

  return (
    <div className="Prateleira">
      <h2>Minha Prateleira</h2>
      <div className="Filtros">
        <button onClick={() => handleFiltroStatus('fila')}>Fila</button>
        <button onClick={() => handleFiltroStatus('vistos')}>Vistos</button>
        <button onClick={() => handleFiltroStatus('pausa')}>Em Pausa</button>
      </div>
      <div className="Listas">
        <div className="Filmes">
          <ul>
            {filmesFiltrados.map((filme) => (
              <li key={filme.id}>
{/*                 <p>{filme.filme.nome}</p>
 */}                <img
                  src={`https://image.tmdb.org/t/p/w500/${filme.filme.imagem}`}
                  alt={filme.filme.nome}
                  />
                  <p>Status: {filme.statusFilme}</p>
                {filme.statusFilme === 'vistos' && <p>Avaliação: {filme.estrelas}</p>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Prateleira;
