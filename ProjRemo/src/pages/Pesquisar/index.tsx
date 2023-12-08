import React, { useState } from 'react';
import axios from 'axios';
import "./stylePesquisar.css"

export function Pesquisar() {
  const [query, setQuery] = useState('');
  const [resultados, setResultados] = useState([]);

  const apiKey = '29c1fe0f8cc98e16d427a895f20d1fd9'; // Substitua com a sua chave da API do TMDb

  const handlePesquisa = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
        params: {
          api_key: apiKey,
          query: query,
          language: 'pt-BR', // Adicione o idioma desejado
        },
      });

      const filmesComImagens = await Promise.all(
        response.data.results.map(async (filme) => {
          const imagensResponse = await axios.get(
            `https://api.themoviedb.org/3/movie/${filme.id}/images`,
            {
              params: {
                api_key: apiKey,
              },
            }
          );

          return {
            ...filme,
            imagens: imagensResponse.data.posters, // Aqui você pode escolher o tipo de imagem que deseja exibir
          };
        })
      );

      setResultados(filmesComImagens);
    } catch (error) {
      console.error('Erro ao pesquisar filmes:', error);
    }
  };

  return (
    <div className='PesquisarFilmesdiv'>
      <h1>Pesquisar Filmes</h1>
      <div className='BarraPesquisa'>
          <button onClick={handlePesquisa}>Pesquisar</button>
        <input
          type="text"
          placeholder="Digite o nome do filme"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {resultados.length > 0 && (
        <div className='Pesquisar'>
          <h2>Resultados:</h2>
          <ul>
            {resultados.map((filme) => (
              <li key={filme.id}>
                <h3>{filme.title}</h3>
                <div className='imgConteudo'>
                {filme.imagens && filme.imagens.length > 0 && (
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${filme.imagens[0].file_path}`}
                    alt={`Imagem de ${filme.title}`}
                  />
                )}
                <p>{filme.overview}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
