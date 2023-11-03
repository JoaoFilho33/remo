import { useState } from 'react';
import { Link } from 'react-router-dom';
import './stylePerfilUser.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';


export function PerfilUser() {
  const [postagens, setPostagens] = useState([
    { id: 8, filme: "Viva: a vida é uma festa1", like: false ,nomeUser: "maria"},
    { id: 9, filme: "Viva: a vida é uma festa2", like: false ,nomeUser: "joao"},
    { id: 10, filme: "Viva: a vida é uma festa3", like: false ,nomeUser: "kaka"},
    { id: 11, filme: "Viva: a vida é uma festa4", like: false ,nomeUser: "mavi"},
    { id: 12, filme: "Viva: a vida é uma festa5", like: false ,nomeUser: "joao"},
    { id: 13, filme: "Viva: a vida é uma feijoada", like: false, nomeUser:"maria" },
    { id: 14, filme: "Viva: a vida é uma festa6", like: false ,nomeUser: "joao"},
    { id: 15, filme: "Viva: a vida é uma festa7", like: false ,nomeUser: "joao"},
    { id: 16, filme: "Viva: a vida é uma festa8", like: false ,nomeUser: "maria"},
  ]);

  const [wikis, ] = useState([
    { id: 1, titulo: "Wiki 1", conteudo: "Aprender novas habilidades e adquirir conhecimento é essencial para o crescimento pessoal e profissional ao longo da vida." },
    { id: 2, titulo: "Wiki 2", conteudo: "Aprender novas habilidades e adquirir conhecimento é essencial para o crescimento pessoal e profissional ao longo da vida." },
    { id: 3, titulo: "Wiki 3", conteudo: "Aprender novas habilidades e adquirir conhecimento é essencial para o crescimento pessoal e profissional ao longo da vida." },
    { id: 4, titulo: "Wiki 4", conteudo: "Aprender novas habilidades e adquirir conhecimento é essencial para o crescimento pessoal e profissional ao longo da vida." },
    { id: 5, titulo: "Wiki 5", conteudo: "Aprender novas habilidades e adquirir conhecimento é essencial para o crescimento pessoal e profissional ao longo da vida." },
    { id: 6, titulo: "Wiki 6", conteudo: "Aprender novas habilidades e adquirir conhecimento é essencial para o crescimento pessoal e profissional ao longo da vida." },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const postsPerPage = 4;

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
        {/* Adicione o evento onMouseEnter para mostrar informações quando o mouse passar sobre "Prateleira" */}
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
              <p>{postagem.filme.length > 50 ? `${postagem.filme.substring(0, 50)}...` : postagem.filme}</p>
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
