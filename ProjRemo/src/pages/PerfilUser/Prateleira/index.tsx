import { useState } from 'react';
import "./styleprateleira.css";
import testeimgfilme from "./testeimgfilme.jpeg";

export function Prateleira() {

  const ImgTeste = testeimgfilme;

  const [activeCategory, setActiveCategory] = useState<'vistos' | 'fila' | 'pausa'>('vistos');

  const renderFilmes = () => {
    switch (activeCategory) {
      case 'vistos':
        return filmesVistos;
      case 'fila':
        return filmesFila;
      case 'pausa':
        return filmesPausa;
      default:
        return [];
    }
  };

  const [filmesVistos] = useState<Array<{ id: number; nome: string; avaliacao: number; img?: {} }>>([
    { id: 1, nome: 'Fi1', avaliacao: 4, img: ImgTeste },
    { id: 2, nome: 'Fi2', avaliacao: 5, img: ImgTeste },
    { id: 3, nome: 'Fi3', avaliacao: 5, img: ImgTeste },
    { id: 4, nome: 'Fi4', avaliacao: 1, img: ImgTeste },
  ]);

  const [filmesFila] = useState<Array<{ id: number; nome: string; avaliacao: number; img?: {} }>>([
    { id: 1, nome: 'Filme A', avaliacao: 0, img: ImgTeste },
  ]);

  const [filmesPausa] = useState<Array<{ id: number; nome: string; avaliacao: number; img?: {} }>>([
    { id: 1, nome: 'Filme X', avaliacao: 0, img: ImgTeste },
  ]);

  return (
    <div className="Prateleira">
      <h2>Minha Prateleira</h2>

      <div className='BtCategory'>
        <button onClick={() => setActiveCategory('vistos')}>Vistos</button>
        <button onClick={() => setActiveCategory('fila')}>Na Fila</button>
        <button onClick={() => setActiveCategory('pausa')}>Pausa</button>
      </div>

      <div className='Listas'>
        <div className='Filmes'>
          <h3>{activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}</h3>
          <ul>
            {renderFilmes().map((filme) => (
              <li key={filme.id}>
                <p>{filme.nome}</p>
                {filme.img && <img src={filme.img as string} alt={filme.nome} />}
                {activeCategory === 'vistos' && <p>Avaliação: {filme.avaliacao}</p>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}




//API-------------------------------------------------------------

/* 
import { useState, useEffect } from 'react';
import "./styleprateleira.css";

export function Prateleira() {
  const [filmes, setFilmes] = useState<Array<{ id: number; nome: string; avaliacao: number; img?: string }>>([]);
  const [categoriaAtiva, setCategoriaAtiva] = useState<'vistos' | 'fila' | 'pausa'>('vistos');
  const [posicoesCarrossel, setPosicoesCarrossel] = useState({
    vistos: 0,
    fila: 0,
    pausa: 0,
  });

  useEffect(() => {
    // Buscar filmes da API
    const buscarFilmes = async () => {
      try {
        const resposta = await fetch('seu_endpoint_da_api_aqui');
        const dados = await resposta.json();
        setFilmes(dados);
      } catch (erro) {
        console.error('Erro ao buscar filmes:', erro);
      }
    };

    buscarFilmes();
  }, []);

  // O restante do seu componente permanece o mesmo...

  return (
    <div className="Prateleira">
      <div className='Listas'>
        <div>
          <h3>{categoriaAtiva.charAt(0).toUpperCase() + categoriaAtiva.slice(1)}</h3>
          <ul>
            {filmes
              .slice(posicoesCarrossel[categoriaAtiva], posicoesCarrossel[categoriaAtiva] + postsPerPage)
              .map((filme) => (
                <li key={filme.id}>
                  {filme.img && <img src={filme.img} alt={filme.nome} />}
                  <p>{filme.nome}</p>
                  {categoriaAtiva === 'vistos' && <p>Avaliação: {filme.avaliacao} estrelas</p>}
                </li>
              ))}
          </ul>
          <div className='BtCarrossel'>
            <button onClick={prevSlide}>&lt;</button>
            <button onClick={nextSlide}>&gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
} */
