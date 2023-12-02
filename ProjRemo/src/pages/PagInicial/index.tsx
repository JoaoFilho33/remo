import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import AliceCarousel, { OnSlideChangedEventHandler } from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
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
  onSlideChanged: OnSlideChangedEventHandler;
  infinite: boolean;
  autoPlay: boolean;
  autoPlayInterval: number;
  disableDotsControls: boolean;
  renderPrevButton?: ({ isDisabled }: { isDisabled: boolean | undefined }) => React.ReactNode;
  renderNextButton?: ({ isDisabled }: { isDisabled: boolean | undefined }) => React.ReactNode;
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

    renderPrevButton: ({ isDisabled }: { isDisabled?: boolean }) => (
      <button
        className={`custom-arrow prev ${isDisabled ? 'disabled' : ''}`}
        onClick={() => handleMudancaSlideEmExibicao(indiceAtualEmExibicao - 1)}
      >
        &#9664;
      </button>
    ),
    renderNextButton: ({ isDisabled }: { isDisabled?: boolean }) => (
      <button
        className={`custom-arrow next ${isDisabled ? 'disabled' : ''}`}
        onClick={() => handleMudancaSlideEmExibicao(indiceAtualEmExibicao + 1)}
      >
        &#9654;
      </button>
    ),
  };

  const customCarouselPropsPopulares: CustomAliceCarouselProps = {
    responsive: {
      0: { items: 1 },
      600: { items: 3 },
      1024: { items: 4 },
    },
    mouseTracking: true,
    disableButtonsControls: false,
    disableDotsControls: true,
    slideToIndex: indiceAtualMelhoresAvaliados,
    onSlideChanged: handleMudancaSlidePopulares,
    infinite: true,
    autoPlay: false,
    autoPlayInterval: 300,

    renderPrevButton: ({ isDisabled }: { isDisabled?: boolean }) => (
      <button
        className={`custom-arrow prev ${isDisabled ? 'disabled' : ''}`}
        onClick={() => handleMudancaSlidePopulares(indiceAtualMelhoresAvaliados - 1)}
      >
        &#9664;
      </button>
    ),
    renderNextButton: ({ isDisabled }: { isDisabled?: boolean }) => (
      <button
        className={`custom-arrow next ${isDisabled ? 'disabled' : ''}`}
        onClick={() => handleMudancaSlidePopulares(indiceAtualMelhoresAvaliados + 1)}
      >
        &#9654;
      </button>
    ),
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
    slideToIndex: indiceAtualMelhoresAvaliados,
    onSlideChanged: handleMudancaSlideProximosLancamentos,
    infinite: true,
    autoPlay: false,
    autoPlayInterval: 300,

    renderPrevButton: ({ isDisabled }: { isDisabled?: boolean }) => (
      <button
        className={`custom-arrow prev ${isDisabled ? 'disabled' : ''}`}
        onClick={() => handleMudancaSlidePopulares(indiceAtualProximosLancamentos - 1)}
      >
        &#9664;
      </button>
    ),
    renderNextButton: ({ isDisabled }: { isDisabled?: boolean }) => (
      <button
        className={`custom-arrow next ${isDisabled ? 'disabled' : ''}`}
        onClick={() => handleMudancaSlidePopulares(indiceAtualProximosLancamentos + 1)}
      >
        &#9654;
      </button>
    ),
  };

  return (
        <h2>Filmes em Exibição</h2>
        );

      {/* 
          <div>

      <div className="feed-header">
        <div className="list-feed">
          <h2>Filmes em Exibição</h2>
          <AliceCarousel {...customCarouselPropsEmExibicao}>
            {filmesEmExibicao.map((filme) => (
              <Link to={`/filmesCartaz/${filme.id}`} key={filme.id} className="list-feed__item-container">
                <div className="list-feed__item">
                  <div className="list-feed__image-wrapper">
                    <div className="list-feed__image-container">
                      <img
                        src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
                        alt={filme.title}
                      />
                    </div>
                  </div>
                  <div className="list-feed__sinopse-container">
                    <p className="list-feed__sinopse">
                      {filme.overview.slice(0, 100)}...
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </AliceCarousel>
        </div>
      </div>


      <div className="feed-popular-films">
        <h2>Melhores avaliados</h2>
        <AliceCarousel {...customCarouselPropsPopulares}>
          {filmesPopulares.map((filme) => (
            <Link to={`/filmesCartaz/${filme.id}`} key={filme.id} className="list-feed__item-container">
              <div className="list-feed__item">
                <div className="list-feed__image-wrapper">
                  <div className="list-feed__image-container">
                    <img
                      src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
                      alt={filme.title}
                    />
                  </div>
                </div>
                <div className="list-feed__sinopse-container">
                  <p className="list-feed__sinopse">
                    {filme.overview.slice(0, 100)}...
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </AliceCarousel>
      </div>


      <div className="feed-popular-films">
        <h2>Próximos Lançamentos</h2>
        <AliceCarousel {...customCarouselPropsProximos}>
          {proximosLancamentos.map((filme) => (
            <Link to={`/filmesCartaz/${filme.id}`} key={filme.id} className="list-feed__item-container">
              <div className="list-feed__item">
                <div className="list-feed__image-wrapper">
                  <div className="list-feed__image-container">
                    <img
                      src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
                      alt={filme.title}
                    />
                  </div>
                </div>
                <div className="list-feed__sinopse-container">
                  <p className="list-feed__sinopse">
                    {filme.overview.slice(0, 100)}...
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </AliceCarousel>
      </div>
    </div>
 */}

}