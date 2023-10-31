import  { useState } from 'react';
import { Link } from 'react-router-dom';
import "./stylePerfilUser.css";

export function PerfilUser() {
  const [postagens, setPostagens] = useState([
   
    { id: 8, filme: "Viva: a vida é uma festa", like: false },
    { id: 9, filme: "Viva: a vida é uma festa", like: false },
    { id: 10, filme: "Viva: a vida é uma festa", like: false },
    { id: 11, filme: "Viva: a vida é uma festa", like: false },
    { id: 12, filme: "Viva: a vida é uma festa", like: false },
    { id: 13, filme: "Viva: a vida é uma feijoada", like: false },
    { id: 14, filme: "Viva: a vida é uma festa", like: false },
    { id: 15, filme: "Viva: a vida é uma festa", like: false },
    { id: 16, filme: "Viva: a vida é uma festa", like: false },
  ]);
  
  const [wikis, ] = useState([
    { id: 1, titulo: "Wiki 1", conteudo: "Aprender novas habilidades e adquirir conhecimento é essencial para o crescimento pessoal e profissional ao longo da vida." },
    { id: 2, titulo: "Wiki 2", conteudo: "Aprender novas habilidades e adquirir conhecimento é essencial para o crescimento pessoal e profissional ao longo da vida." },
    { id: 3, titulo: "Wiki 2", conteudo: "Aprender novas habilidades e adquirir conhecimento é essencial para o crescimento pessoal e profissional ao longo da vida." },
    { id: 4, titulo: "Wiki 2", conteudo: "Aprender novas habilidades e adquirir conhecimento é essencial para o crescimento pessoal e profissional ao longo da vida." },
    { id: 5, titulo: "Wiki 2", conteudo: "Aprender novas habilidades e adquirir conhecimento é essencial para o crescimento pessoal e profissional ao longo da vida." },
    { id: 6, titulo: "Wiki 2", conteudo: "Aprender novas habilidades e adquirir conhecimento é essencial para o crescimento pessoal e profissional ao longo da vida." },
  ]);

/*  */


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
        <Link className='GoPrateleira' to="/Perfil/Preleira/:id">
          <p>Vistos: 10 | Fila: 3 | Em Pausa: 4</p>
        </Link>
        <div className='comunidade'>
          <Link to={"/Perfil/Comunidade"}>
            <button>Comunidades</button>
          </Link>
        </div>
      </div>
      <h2>Minhas postagens</h2>

      <div className="GrupPostagens">
        <div className="PostagemContainer">
          {postagens.map((postagem) => (
            <div className="Postagem" key={postagem.id}>
              <p>{postagem.filme.length > 50 ? `${postagem.filme.substring(0, 50)}...` : postagem.filme}</p>
              <p>{postagem.like ? "Curtiu" : "Não curtiu"}</p>
              <div className='BtBotoes'>
                <button onClick={() => editarCurtiu(postagem.id, !postagem.like)}>
                  Editar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='CorpoPag'>
        <div className='PostWiki'>
          <h2>Minhas wikis</h2>
          <div className="SimpleTimeline">
            <Link to={"/Wiki/:id"}>
            {wikis.map((wiki) => (
              <div key={wiki.id} className="WikiItem">
                <h3>{wiki.titulo}</h3>
                <p>{wiki.conteudo}</p>
              </div>
            ))}

          </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
