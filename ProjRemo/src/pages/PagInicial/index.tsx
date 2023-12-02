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

interface FeedProps {
  title: string;
  filmes: Filme[];
  customCarouselProps: CustomAliceCarouselProps;
  handleMudancaSlide: (item: number) => void;
}

const FeedCarousel: React.FC<FeedProps> = ({ title, filmes, customCarouselProps, handleMudancaSlide }) => {
  return (
    <div className="feed-popular-films">
      <h2>{title}</h2>
      <AliceCarousel {...customCarouselProps} >
        {filmes.map((filme) => (
          <Link to={`/filmesCartaz/${filme.id}`} key={filme.id} className="list-feed__item-container">
            <div className="list-feed__item">
              <div className="list-feed__image-wrapper">
                <div className="list-feed__image-container">
                  <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
                </div>
              </div>
              <div className="list-feed__sinopse-container">
                <p className="list-feed__sinopse">{filme.overview.slice(0, 100)}...</p>
              </div>
            </div>
          </Link>
        ))}
      </AliceCarousel>
    </div>
  );
};

export function PagInicial() {
  const [filmesEmExibicao, setFilmesEmExibicao] = useState<Filme[]>([]);
  const [filmesPopulares, setFilmesPopulares] = useState<Filme[]>([]);
  const [proximosLancamentos, setProximosLancamentos] = useState<Filme[]>([]);
  const [indiceAtualEmExibicao, setIndiceAtualEmExibicao] = useState<number>(0);
  const [indiceAtualMelhoresAvaliados, setIndiceAtualMelhoresAvaliados] = useState<number>(0);
  const [indiceAtualProximosLancamentos, setIndiceAtualProximosLancamentos] = useState<number>(0);

  useEffect(() => {
    async function carregarFilmes(categoria: string, setFilmes: React.Dispatch<React.SetStateAction<Filme[]>>) {
      try {
        const resposta = await api.get(`movie/${categoria}`, {
          params: {
            api_key: "6dbc3d5fef3a8a2a7f319cfb155da5b0",
            language: "pt-BR",
            page: 1,
          },
        });

        setFilmes(resposta.data.results.slice(0, 10));
      } catch (erro) {
        console.error(`Erro ao buscar filmes ${categoria}:`, erro);
      }
    }

    carregarFilmes("now_playing", setFilmesEmExibicao);
    carregarFilmes("top_rated", setFilmesPopulares);
    carregarFilmes("upcoming", setProximosLancamentos);
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
    responsive: { 0: { items: 1 }, 600: { items: 3 }, 1024: { items: 4 } },
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
        className={`custom-arrow prev ${isDisabled ? "disabled" : ""}`}
        onClick={() => handleMudancaSlideEmExibicao(indiceAtualEmExibicao - 1)}
      >
        &#9664;
      </button>
    ),
    renderNextButton: ({ isDisabled }: { isDisabled?: boolean }) => (
      <button
        className={`custom-arrow next ${isDisabled ? "disabled" : ""}`}
        onClick={() => handleMudancaSlideEmExibicao(indiceAtualEmExibicao + 1)}
      >
        &#9654;
      </button>
    ),
  };

  const customCarouselPropsPopulares: CustomAliceCarouselProps = {
    responsive: { 0: { items: 1 }, 600: { items: 3 }, 1024: { items: 4 } },
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
        className={`custom-arrow prev ${isDisabled ? "disabled" : ""}`}
        onClick={() => handleMudancaSlidePopulares(indiceAtualMelhoresAvaliados - 1)}
      >
        &#9664;
      </button>
    ),
    renderNextButton: ({ isDisabled }: { isDisabled?: boolean }) => (
      <button
        className={`custom-arrow next ${isDisabled ? "disabled" : ""}`}
        onClick={() => handleMudancaSlidePopulares(indiceAtualMelhoresAvaliados + 1)}
      >
        &#9654;
      </button>
    ),
  };

  const customCarouselPropsProximos: CustomAliceCarouselProps = {
    responsive: { 0: { items: 1 }, 600: { items: 3 }, 1024: { items: 4 } },
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
        className={`custom-arrow prev ${isDisabled ? "disabled" : ""}`}
        onClick={() => handleMudancaSlideProximosLancamentos(indiceAtualProximosLancamentos - 1)}
      >
        &#9664;
      </button>
    ),
    renderNextButton: ({ isDisabled }: { isDisabled?: boolean }) => (
      <button
        className={`custom-arrow next ${isDisabled ? "disabled" : ""}`}
        onClick={() => handleMudancaSlideProximosLancamentos(indiceAtualProximosLancamentos + 1)}
      >
        &#9654;
      </button>
    ),
  };

  return (
    <div>
      <FeedCarousel
        title="Filmes em Exibição"
        filmes={filmesEmExibicao}
        customCarouselProps={customCarouselPropsEmExibicao}
        handleMudancaSlide={handleMudancaSlideEmExibicao}
      />

      <FeedCarousel
        title="Melhores Avaliados"
        filmes={filmesPopulares}
        customCarouselProps={customCarouselPropsPopulares}
        handleMudancaSlide={handleMudancaSlidePopulares}
      />

      <FeedCarousel
        title="Próximos Lançamentos"
        filmes={proximosLancamentos}
        customCarouselProps={customCarouselPropsProximos}
        handleMudancaSlide={handleMudancaSlideProximosLancamentos}
      />
    </div>
  );
}
