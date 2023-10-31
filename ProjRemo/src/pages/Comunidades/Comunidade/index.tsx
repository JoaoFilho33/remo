import  { useState } from 'react';
import "./StyleComunidade.css"
export function Comunidade() {
  // Estado para rastrear as wikis da comunidade
  const [wikis, setWikis] = useState([
    { id: 1, titulo: 'Wiki 1', conteudo: 'Conteúdo da Wiki 1', curtidas: 0 },
    { id: 2, titulo: 'Wiki 2', conteudo: 'Conteúdo da Wiki 2', curtidas: 0 },
  ]);

  // Estado para rastrear o novo wiki que os integrantes podem adicionar
  const [novoWiki, setNovoWiki] = useState({ titulo: '', conteudo: '' });

  // Função para adicionar um novo wiki à comunidade
  const adicionarWiki = () => {
    if (novoWiki.titulo && novoWiki.conteudo) {
      setWikis([
        ...wikis,
        { id: wikis.length + 1, ...novoWiki, curtidas: 0 },
      ]);
      setNovoWiki({ titulo: '', conteudo: '' });
    }
  };

  // Função para curtir uma wiki
  const curtirWiki = (id: number) => {
    const novasWikis = wikis.map((wiki) =>
      wiki.id === id ? { ...wiki, curtidas: wiki.curtidas + 1 } : wiki
    );
    setWikis(novasWikis);
  }

  return (
    <div>
      <h2>Perfil da Comunidade</h2>

      <h3>Wikis na Comunidade</h3>
      <div className='WikiComunidade'>
        {wikis.map((wiki) => (
          <div  key={wiki.id}>
            <div className='WikiInComunidade'>
            <h3>{wiki.titulo}</h3>
            <p>{wiki.conteudo}</p>
            <p>Curtidas: {wiki.curtidas}</p>
            <button onClick={() => curtirWiki(wiki.id)}>Curtir</button>
            </div>
          </div>
        ))}
      </div>

      <h3>Adicionar Nova Wiki</h3>
      <div className='AddWiki' >
        <input
          type="text"
          placeholder="Título da Wiki"
          value={novoWiki.titulo}
          onChange={(e) => setNovoWiki({ ...novoWiki, titulo: e.target.value })}
        />
        <textarea
          placeholder="Conteúdo da Wiki"
          value={novoWiki.conteudo}
          onChange={(e) => setNovoWiki({ ...novoWiki, conteudo: e.target.value })}
        />
        <button onClick={adicionarWiki}>Adicionar Wiki</button>
      </div>

     {/*  <h3>Participantes da Comunidade</h3>*/}
    
    </div> 
  );
}
