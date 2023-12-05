// PagInicial.tsx
import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import Carousel from "./carrossel/carrossel"; // Altere o caminho conforme necessário
import "./stylePagInicial.css";

interface Filme {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

interface CustomAliceCarouselProps {
  responsive: { [key: number]: { items: number } };
  mouseTracking: boolean;
  disableButtonsControls: boolean;
  slideToIndex: number;
  onSlideChanged: (item: number) => void;
  infinite: boolean;
  autoPlay: boolean;
  autoPlayInterval: number;
  disableDotsControls: boolean;
}

export function PagInicial() {
  const [filmesEmExibicao, setFilmesEmExibicao] = useState<Filme[]>([]);
  const [filmesPopulares, setFilmesPopulares] = useState<Filme[]>([]);
  const [proximosLancamentos, setProximosLancamentos] = useState<Filme[]>([]);
  const [indiceAtualEmExibicao, setIndiceAtualEmExibicao] = useState<number>(0);
  const [indiceAtualMelhoresAvaliados, setIndiceAtualMelhoresAvaliados] = useState<number>(0);
  const [indiceAtualProximosLancamentos, setIndiceAtualProximosLancamentos] = useState<number>(0);

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

  const handleMudancaSlideEmExibicao = (item: number) => {
    setIndiceAtualEmExibicao(item);
  };

  const handleMudancaSlidePopulares = (item: number) => {
    setIndiceAtualMelhoresAvaliados(item);
  };

  const handleMudancaSlideProximosLancamentos = (item: number) => {
    setIndiceAtualProximosLancamentos(item);
  };

  const customCarouselPropsEmExibicao: CustomAliceCarouselProps = {
    responsive: {
      0: { items: 1 },
      600: { items: 3 },
      1024: { items: 4 },
    },
    mouseTracking: true,
    disableButtonsControls: false,
    disableDotsControls: true,
    slideToIndex: indiceAtualEmExibicao,
    onSlideChanged: handleMudancaSlideEmExibicao,
    infinite: true,
    autoPlay: false,
    autoPlayInterval: 300,
  };

  const customCarouselPropsPopulares: CustomAliceCarouselProps = {
    responsive: {
      0: { items: 1 },
      600: { items: 3 },
      1024: { items: 6 },
    },
    mouseTracking: true,
    disableButtonsControls: false,
    disableDotsControls: true,
    slideToIndex: indiceAtualMelhoresAvaliados,
    onSlideChanged: handleMudancaSlidePopulares,
    infinite: true,
    autoPlay: false,
    autoPlayInterval: 300,
  };

  const customCarouselPropsProximos: CustomAliceCarouselProps = {
    responsive: {
      0: { items: 1 },
      600: { items: 3 },
      1024: { items: 4 },
    },
    mouseTracking: true,
    disableButtonsControls: false,
    disableDotsControls: true,
    slideToIndex: indiceAtualProximosLancamentos,
    onSlideChanged: handleMudancaSlideProximosLancamentos,
    infinite: true,
    autoPlay: false,
    autoPlayInterval: 300,
  };

  return (
    <div>
      <div>
        <div className="feed-header">
          <div className="list-feed">
            <h2>Filmes em Exibição</h2>
            <Carousel
              items={filmesEmExibicao}
              customProps={customCarouselPropsEmExibicao}
              linkTo={(filme) => `/filmesCartaz/${filme.id}`}
            />
          </div>
        </div>
      </div>

      <div className="feed-popular-films">
        <h2>Melhores avaliados</h2>
        <Carousel
          items={filmesPopulares}
          customProps={customCarouselPropsPopulares}
          linkTo={(filme) => `/filmesCartaz/${filme.id}`}
        />
      </div>

      <div className="feed-popular-films">
        <h2>Próximos Lançamentos</h2>
        <Carousel
          items={proximosLancamentos}
          customProps={customCarouselPropsProximos}
          linkTo={(filme) => `/filmesCartaz/${filme.id}`}
        />
      </div>
    </div>
  );
}
