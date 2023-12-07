import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../services/api';
import './style.css';

interface Person {
  id: number;
  name: string;
  job: string;
  profile_path: string;
}

interface Genre {
  id: number;
  name: string;
}

interface Filme {
  id: number;
  title: string;
  backdrop_path: string;
  overview: string;
  vote_average: number;

  cast?: Array<Person>;
  director?: Person;
  genres?: Array<Genre>;
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
            append_to_response: 'credits,genres',
          },
        });

        setFilme({
          ...response.data,
          cast: response.data.credits.cast.slice(0, 10),
          director: response.data.credits.crew.find(
            (person: Person) => person.job === 'Director'
          ) as Person,
          genres: response.data.genres,
        });
        setLoading(false);
      } catch (error) {
        console.error('Filme não encontrado', error);
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
      <div className='filme-header'>
        <div className='filme-image'>
          <img
            src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}
          />
        </div>
        <div className='header_wrapper'>
          <div className='filme-titulo'>
            <h1>{filme.title}</h1>
          </div>
          <div className='filme-sinopse_conteiner'>
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
          </div>
          <div className='genero-container'>
            <h3>Gêneros</h3>
            <span>
              {filme.genres &&
                filme.genres.map((genre: Genre) => genre.name).join(', ')}
            </span>
          </div>
          <div className='avaliacao-conteiner'>
            <strong>Avaliação: {filme.vote_average.toFixed(1)} / 10</strong>
          </div>
          <div className="button">
            <button>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.youtube.com/results?search_query=${filme.title} trailer`}
              >
                Trailer
              </a>
            </button>
          </div>
        </div>


      </div>

      {/* Elenco */}
      <div className='info-elenco'>
        <div className='elenco-titulo'>
          <h2>Elenco Principal</h2>
        </div>
        <div className='people-elenco'>
          <ul>
            {filme.cast &&
              filme.cast.map((person: Person) => (
                <li key={person.id} className='people-card'>
                  {person.profile_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
                      alt={person.name}
                    />
                  )}
                  <div className='people-name'>
                    <p>{person.name}</p>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>

      {/* Diretor */}
      <div className='info-diretor'>
        <div className='diretor-titulo'>
          <h2>Diretor</h2>
        </div>
        <div className='diretor-card'>
          {filme.director?.profile_path && (
            <img
              src={`https://image.tmdb.org/t/p/w185${filme.director?.profile_path}`}
              alt={filme.director?.name}
            />
          )}
          <div className='diretor-name'>
            <p>{filme.director?.name}</p>
          </div>
        </div>
      </div>

    </div>
  );
}
