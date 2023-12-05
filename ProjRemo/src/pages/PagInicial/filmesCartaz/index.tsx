import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../services/api';
import './style.css';


interface Filme {
  id: number;
  title: string;
  backdrop_path: string;
  overview: string;
  vote_average: number;
}

export function Filme() {
  const { id } = useParams<{ id: string }>();
  const [filme, setFilme] = useState<Filme | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilme() {
      try {
        const response = await api.get(`/movie/${id}`, {
          params: {
            api_key: '6dbc3d5fef3a8a2a7f319cfb155da5b0',
            language: 'pt-BR',
          },
        });

        setFilme(response.data);
        setLoading(false);
      } catch (error) {
        console.log('Filme não encontrado', error);
        setLoading(false);
        setFilme(null);
      }
    }

    loadFilme();
  }, [id]);


  if (loading || !filme) {
    return (
      <div className="filme-info">
        <h1>Carregando detalhes...</h1>
      </div>
    );
  }

  return (
    <div className="filme-info">
      <h1>{filme.title}</h1>
      <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
      <h3>Sinopse</h3>
      <span>{filme.overview}</span>
      <strong>Avaliação: {filme.vote_average.toFixed(1)} / 10 </strong>

      <div className="buttons">
        <button>
          <a target="_blank" rel="noopener noreferrer" href={`https://www.youtube.com/results?search_query=${filme.title} trailer`}>
            Trailer
          </a>
        </button>
      </div>
    </div>
  );
}