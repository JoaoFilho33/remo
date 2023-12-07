// PagInicial.tsx
import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import ListFeed from "./listFeed";
import FeedFilms from "./feedFilms";
import "./stylePagInicial.css";

interface Filme {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

export function PagInicial() {
  const [filmesEmExibicao, setFilmesEmExibicao] = useState<Filme[]>([]);
  const [filmesPopulares, setFilmesPopulares] = useState<Filme[]>([]);
  const [proximosLancamentos, setProximosLancamentos] = useState<Filme[]>([]);

  useEffect(() => {
    async function carregarFilmesEmExibicao() {
      try {
        const resposta = await api.get("movie/now_playing", {
          params: {
            api_key: "6dbc3d5fef3a8a2a7f319cfb155da5b0",
            language: "pt-BR",
            page: 1,
          },
        });

        setFilmesEmExibicao(resposta.data.results.slice(0, 13));
      } catch (erro) {
        console.error("Erro ao buscar filmes em exibição:", erro);
      }
    }

    async function carregarMelhoresAvaliados() {
      try {
        const resposta = await api.get("movie/top_rated", {
          params: {
            api_key: "6dbc3d5fef3a8a2a7f319cfb155da5b0",
            language: "pt-BR",
            page: 1,
          },
        });

        setFilmesPopulares(resposta.data.results.slice(0, 20));
      } catch (erro) {
        console.error("Erro ao buscar filmes populares:", erro);
      }
    }

    async function carregarProximosLancamentos() {
      try {
        const resposta = await api.get("movie/upcoming", {
          params: {
            api_key: "6dbc3d5fef3a8a2a7f319cfb155da5b0",
            language: "pt-BR",
            page: 1,
          },
        });

        setProximosLancamentos(resposta.data.results.slice(0, 10));
      } catch (erro) {
        console.error("Erro ao buscar próximos lançamentos:", erro);
      }
    }

    carregarFilmesEmExibicao();
    carregarMelhoresAvaliados();
    carregarProximosLancamentos();
  }, []);

  return (
    <div className="HomePage">
      <div className="feed-header">
        <ListFeed items={filmesEmExibicao} linkTo={(filme) => `/filmeExibicao/${filme.id}`} />
      </div>

      <div className="feed_films">
        <div className="feed-section_heading">
          <h2>Melhores avaliados</h2>
          <Link to="/melhores-avaliados" className="ver-tudo-link">
            Ver Tudo &#9662;
          </Link>
        </div>
        <FeedFilms items={filmesPopulares} linkTo={(filme) => `/filmeExibicao/${filme.id}`} />
      </div>

      <div className="feed_films">
        <div className="feed-section_heading">
          <h2>Próximos Lançamentos</h2>
          <Link to="/proximos-lancamentos" className="ver-tudo-link">
            Ver Tudo &#9662;
          </Link>
        </div>
        <FeedFilms items={proximosLancamentos} linkTo={(filme) => `/filmeExibicao/${filme.id}`} />
      </div>
    </div >
  );
}