import { useState } from 'react';
import { Comunidades } from "../Comunidades";
import { Link } from 'react-router-dom';
import "./stylePerfilUser.css"

export function PerfilUser() {
  const [postagens, setPostagens] = useState([
    { id: 1, filme: "Viva: a vida é uma festa", like: true },
    { id: 2, filme: "Viva: a vida é uma festa ", like: false },
    // Outras postagens
  ]);

  const [wikis, setWikis] = useState([
    { id: 1, titulo: "Wiki 1", conteudo: "Aprender novas habilidades e adquirir conhecimento é essencial para o crescimento pessoal e profissional ao longo da vida." },
    { id: 2, titulo: "Wiki 2", conteudo: "Aprender novas habilidades e adquirir conhecimento é essencial para o crescimento pessoal e profissional ao longo da vida."},
    // Outras wikis
  ]);

  const [novaPostagem, setNovaPostagem] = useState({ filme: '', like: false });
  const [novaWiki, setNovaWiki] = useState({ titulo: '', conteudo: '' });
  const [editandoWiki, setEditandoWiki] = useState<number | null>(null);

  const adicionarPostagem = () => {
    setPostagens([...postagens, { id: postagens.length + 1, ...novaPostagem }]);
    setNovaPostagem({ filme: '', like: false });
  };

  const editarCurtiu = (postId: number, novoLike: boolean) => {
    const novasPostagens = postagens.map(postagem => {
      if (postagem.id === postId) {
        return { ...postagem, like: novoLike };
      }
      return postagem;
    });
    setPostagens(novasPostagens);
  };

  const excluirPostagem = (postId: number) => {
    const novasPostagens = postagens.filter(postagem => postagem.id !== postId);
    setPostagens(novasPostagens);
  };

  const adicionarWiki = () => {
    setWikis([...wikis, { id: wikis.length + 1, ...novaWiki }]);
    setNovaWiki({ titulo: '', conteudo: '' });
  };

  const editarWiki = (wikiId: number, novaWikiData: { titulo: string, conteudo: string }) => {
    const novasWikis = wikis.map(wiki => {
      if (wiki.id === wikiId) {
        return { ...wiki, ...novaWikiData };
      }
      return wiki;
    });
    setWikis(novasWikis);
    setEditandoWiki(null); // Parar de editar
  };

  const excluirWiki = (wikiId: number) => {
    const novasWikis = wikis.filter(wiki => wiki.id !== wikiId);
    setWikis(novasWikis);
  };

  const [mostrarAddPostagem, setMostrarAddPostagem] = useState(false);
  const [mostrarAddWiki, setMostrarAddWiki] = useState(false);

  return (
    <div className="ContainerPerfil">
      <div className='divPrateleira'>
       <Link className='GoPrateleira' to="/Perfil/Preleira/:id">
            <p>Vistos: 10 | Fila: 3 | Em Pausa: 4</p>
       </Link>
      </div>
      <h2>Minhas postagens</h2>
   {/*    <div className="TituloMinhasPostagens">
        <div className='MostrarAdd'>
        <button onClick={() => setMostrarAddPostagem(!mostrarAddPostagem)}>+</button>
        </div>
      </div>
      {mostrarAddPostagem && (
        <div className="AddPostagem">
          <input className='nome'
            type="text"
            placeholder="Nome do Filme"
            value={novaPostagem.filme}
            onChange={(e) => setNovaPostagem({ ...novaPostagem, filme: e.target.value })}
          />
          <label>
            Curtiu
            <input
              type="checkbox"
              checked={novaPostagem.like}
              onChange={(e) => setNovaPostagem({ ...novaPostagem, like: e.target.checked })}
            />
          </label>
          <button onClick={adicionarPostagem}>Adicionar Postagem</button>
      )}
        </div> */}
      <div className="GrupPostagens">
        {postagens.map((postagem) => (
          <div className="Postagem" key={postagem.id}>
            <p>{postagem.filme.length > 50 ? `${postagem.filme.substring(0, 50)}...` : postagem.filme}</p>
            <p>{postagem.like ? "Curtiu" : "Não curtiu"}</p>
            <div className='BtBotoes'>
            {/*   <button onClick={() => excluirPostagem(postagem.id)}>
               Excluir
              </button> */}
              <button onClick={() => editarCurtiu(postagem.id, !postagem.like)}>
                Editar
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="TituloMinhasWikis">
      <div className='MostrarAdd'>
        <h2>Minhas wikis</h2>
        <button onClick={() => setMostrarAddWiki(!mostrarAddWiki)}>+</button>
        </div>
      </div>
      {mostrarAddWiki && (
        <div className="AddWiki">
          <input
            type="text"
            placeholder="Título da Wiki"
            value={novaWiki.titulo}
            onChange={(e) => setNovaWiki({ ...novaWiki, titulo: e.target.value })}
          />
          <textarea
            placeholder="Conteúdo da Wiki"
            value={novaWiki.conteudo}
            onChange={(e) => setNovaWiki({ ...novaWiki, conteudo: e.target.value })}
          />
          <button onClick={adicionarWiki}>Adicionar Wiki</button>
        </div>
      )}
      <div className="GroupWikis">
        {wikis.map((wiki) => (
          <div className='wikiteste'>
          <div className="WikiStyle" key={wiki.id}>
            {editandoWiki === wiki.id ? (
              <div className="EditandoWiki">
                <input
                  type="text"
                  value={novaWiki.titulo}
                  onChange={(e) => setNovaWiki({ ...novaWiki, titulo: e.target.value })}
                />
                <textarea
                  value={novaWiki.conteudo}
                  onChange={(e) => setNovaWiki({ ...novaWiki, conteudo: e.target.value })}
                />
                <button onClick={() => editarWiki(wiki.id, novaWiki)}>Salvar</button>
              </div>
            ) : (
              <div className="VisualizarWiki">
                <h3>{wiki.titulo}</h3>
                <p>{wiki.conteudo}</p>
                <div className='BtBotoes'>
                  <button onClick={() => excluirWiki(wiki.id)}>Excluir</button>
                  <button onClick={() => setEditandoWiki(wiki.id)}>Editar</button>
                </div>
              </div>
            )}
          </div>
          </div>
        ))}
      </div>
     
   
      <div>
        <Comunidades />
      </div>
    </div>
  );
}
