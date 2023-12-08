/* import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './stylePerfilUser.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
 import axios from 'axios';
 

export function PerfilUser() {
  const [postagens, setPostagens] = useState([
    { id: 8, filme: "Viva: a vida é uma festa1", like: false ,nomeUser: "maria"},
    { id: 9, filme: "Viva: a vida é uma festa2", like: false ,nomeUser: "joao"},
    { id: 10, filme: "Viva: a vida é uma festa3", like: false ,nomeUser: "kaka"},
  
  ]);

  const [wikis, ] = useState([
    { id: 1, titulo: "Wiki 1", conteudo: "Aprender novas habilidades e adquirir conhecimento é essencial para o crescimento pessoal e profissional ao longo da vida." },
    { id: 2, titulo: "Wiki 2", conteudo: "Aprender novas habilidades e adquirir conhecimento é essencial para o crescimento pessoal e profissional ao longo da vida." },
    { id: 3, titulo: "Wiki 3", conteudo: "Aprender novas habilidades e adquirir conhecimento é essencial para o crescimento pessoal e profissional ao longo da vida." } ,
     { id: 4, titulo: "Wiki 4", conteudo: "Aprender novas habilidades e adquirir conhecimento é essencial para o crescimento pessoal e profissional ao longo da vida." },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const postsPerPage = window.innerWidth <= 570 ? 2 : 4;   

  
  
  useEffect(() => {
    const handleResize = () => {
      setCurrentIndex(0); 
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const handleNext = () => {
    if (currentIndex + postsPerPage < postagens.length) {
      setCurrentIndex(currentIndex + postsPerPage);
    }
  };

  const handlePrevious = () => {
    if (currentIndex - postsPerPage >= 0) {
      setCurrentIndex(currentIndex - postsPerPage);
    }
  };
  const [showPrateleiraInfo, setShowPrateleiraInfo] = useState(false);

  const editarCurtiu = (postId: number, novoLike: boolean) => {
    const novasPostagens = postagens.map(postagem => {
      if (postagem.id === postId) {
        return { ...postagem, like: novoLike };
      }
      return postagem;
    });
    setPostagens(novasPostagens);
  };

   
  return (
    <div className="ContainerPerfil">
      <div className='divPrateleira'>
        
        <div
          className="Prateleira"
          onMouseEnter={() => setShowPrateleiraInfo(true)}
          onMouseLeave={() => setShowPrateleiraInfo(false)}
        >
          <Link className='GoOutraPag' to="/Perfil/Prateleira/:id">
            <p>Prateleira</p>
            </Link>
          {showPrateleiraInfo && (
            <div className="PrateleiraInfoContent">
            
              <p>Filmes Vistos: X</p>
              <p>Em Pausa: Y</p>
              <p>Na Fila: Z</p>
      
            </div>
            
            )}
        </div>
        <Link className='GoOutraPag' to="/Perfil/Comunidade">
          <p>Comunidades</p>
        </Link>
      </div>
      <h2>Minhas postagens</h2>
      <div className='linha'></div>

      <div className="GrupPostagens">
        <div className="PostagemContainer">
          {postagens.slice(currentIndex, currentIndex + postsPerPage).map((postagem) => (
            <div className="Postagem" key={postagem.id}>
              <span>@{postagem.nomeUser}</span>
              <p>{postagem.filme.length > 25 ? `${postagem.filme.substring(0, 25)}...` : postagem.filme}</p>
              <p>{postagem.like ? "Curtiu" : "Não curtiu"}</p>
              <div className='BtBotoes'>
                <button onClick={() => editarCurtiu(postagem.id, !postagem.like)}>
                <FontAwesomeIcon icon={faThumbsUp} />                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="ControlesCarrossel">
          <button onClick={handlePrevious}>Anterior</button>
          <button onClick={handleNext}>Próximo</button>
        </div>
      </div>

      <div className='CorpoPag'>
        <div className='PostWiki'>
          <h2>Minhas wikis</h2>
          <div className="SimpleTimeline">
            {wikis.map((wiki) => (
              <Link to={`/Wiki/${wiki.id}`} key={wiki.id} className="WikiItem">
                <h3>{wiki.titulo}</h3>
                <p>{wiki.conteudo}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}



 */

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './stylePerfilUser.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

interface Postagem {
  id: number;
  filme: string;
  like: boolean;
  nomeUser: string;
}

interface PrateleiraFilme {
  id: number;
  status_filme: 'visto' | 'pausa' | 'fila';
}

interface Wiki {
  id: number;
  titulo: string;
  conteudo: string;
  participante: {
    id: number;
    data_saida: null;
  };
}

export function PerfilUser() {

  /* const [postagens, setPostagens] = useState([
    { id: 8, filme: "Viva: a vida é uma festa1", like: false ,nomeUser: "maria"},
    { id: 9, filme: "Viva: a vida é uma festa2", like: false ,nomeUser: "joao"},
    { id: 10, filme: "Viva: a vida é uma festa3", like: false ,nomeUser: "kaka"},
    { id: 12, filme: "Viva: a vida é uma festa3", like: false ,nomeUser: "kaka"},
    { id: 13, filme: "Viva: a vida é uma festa3", like: false ,nomeUser: "kaka"},
    { id: 122, filme: "Viva: a vida é uma festa3", like: false ,nomeUser: "kaka"},
  
  ]); */

/*   const [postagens, setPostagens] = useState<Postagem[]>([]);
 */  const [wikis, setWikis] = useState<Wiki[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const postsPerPage = window.innerWidth <= 570 ? 2 : 4;
  const [showPrateleiraInfo, setShowPrateleiraInfo] = useState(false);

 /*  
    // Função para obter postagens da API (substitua pela sua lógica real)
    const fetchPostagens = async () => {
      try {
        // Substitua a URL pela sua API de postagens
        const response = await axios.get<Postagem[]>('http://localhost:8080/postagens');
        setPostagens(response.data);
      } catch (error) {
        console.error('Erro ao obter dados de postagens da API', error);
      }
    }; */

    // Função para obter wikis da API (substitua pela sua lógica real)
    useEffect(() => {
    const fetchWikis = async () => {
      try {
        // Substitua a URL pela sua API de wikis
        const response = await axios.get<Wiki[]>('http://localhost:8080/wiki');
        setWikis(response.data);
      } catch (error) {
        console.error('Erro ao obter dados de wikis da API', error);
      }
    };

  /*   fetchPostagens(); */
    fetchWikis();
  }, []);

 /*  const handleNext = () => {
    if (currentIndex + postsPerPage < postagens.length) {
      setCurrentIndex(currentIndex + postsPerPage);
    }
  };

  const handlePrevious = () => {
    if (currentIndex - postsPerPage >= 0) {
      setCurrentIndex(currentIndex - postsPerPage);
    }
  };
 */
 /*  const editarCurtiu = (postId: number, novoLike: boolean) => {
    const novasPostagens = postagens.map(postagem => {
      if (postagem.id === postId) {
        return { ...postagem, like: novoLike };
      }
      return postagem;
    });
    setPostagens(novasPostagens);
  }; */

  const [prateleiraFilmes, setPrateleiraFilmes] = useState<PrateleiraFilme[]>([]);

  useEffect(() => {
    const fetchPrateleiraFilmes = async () => {
      try {
        const response = await axios.get<PrateleiraFilme[]>('http://localhost:8080/prateleiraFilme/1');
        setPrateleiraFilmes(response.data);
      } catch (error) {
        console.error('Erro ao obter dados de prateleiraFilmes da API', error);
      }
    };

    fetchPrateleiraFilmes();
  }, []);

  /* const filmesVistos = prateleiraFilmes.filter(filme => filme.status_filme   === 'visto').length;
  const filmesEmPausa = prateleiraFilmes.filter(filme => filme.status_filme === 'pausa').length;
  const filmesNaFila = prateleiraFilmes.filter(filme => filme.status_filme === 'fila').length;

 */

  return (
    <div className="ContainerPerfil">
      <div className='divPrateleira'>
      <div
          className="Prateleira"
         /*  onMouseEnter={() => setShowPrateleiraInfo(true)}
          onMouseLeave={() => setShowPrateleiraInfo(false)} */
        >
          <Link className='GoOutraPag' to="/Perfil/Prateleira/:id">
            <p>Prateleira</p>
          </Link>
      {/*     {showPrateleiraInfo && (
            <div className="PrateleiraInfoContent">
              <p>Filmes Vistos: {filmesVistos}</p>
              <p>Em Pausa: {filmesEmPausa}</p>
              <p>Na Fila: {filmesNaFila}</p>
            </div>
          )} */}
        </div>
        <Link className='GoOutraPag' to="/Perfil/Comunidade">
          <p>Comunidades</p>
        </Link>
      </div>

      <div className='CorpoPag'>
        <div className='PostWiki'>
          <div className='detalhe'>

          <div className='linhah2'></div>
          <h2>Minhas wikis</h2>
          </div>

         
          <div className="SimpleTimeline">
            {wikis.map((wiki) => (
              <Link to={`/Wiki/${wiki.id}`} key={wiki.id} className="WikiItem">
                <h3>{wiki.titulo}</h3>
                <p>{wiki.conteudo.slice(0, 30)}...</p>              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
