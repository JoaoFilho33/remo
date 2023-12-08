import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import "./StyleComunidade.css";

interface Comunidade {
  id: number;
  nome: string;
  descricao: string;
}

interface Wiki {
  id: number;
  titulo: string;
  conteudo: string;
  curtidas: number;
  curtidaUsuario: boolean;
  comunidade: Comunidade;
}

export function Comunidade() {
  const [comunidade, setComunidade] = useState<Comunidade | null>(null);
  const [wikis, setWikis] = useState<Wiki[]>([]);
  const { id: comunidadeId } = useParams<{ id: string }>();

  if (!comunidadeId) {
    return <div>Comunidade não encontrada.</div>;
  }

  const parsedComunidadeId = parseInt(comunidadeId, 10);

  useEffect(() => {
    const carregarComunidade = async () => {
      try {
        const response = await axios.get<Comunidade>(`http://localhost:8080/comunidade/${comunidadeId}`);
        setComunidade(response.data);
      } catch (error) {
        console.error('Erro ao carregar dados da API da Comunidade:', error);
      }
    };

    const carregarWikis = async () => {
      try {
        const response = await axios.get<Wiki[]>(`http://localhost:8080/wiki/comunidade/${comunidadeId}`);
        setWikis(response.data);
      } catch (error) {
        console.error('Erro ao carregar dados da API:', error);
      }
    };

    carregarComunidade();
    carregarWikis();
  }, [parsedComunidadeId]);

  const curtirWiki = async (id: number) => {
    try {
      const response = await axios.post<{ curtidas: number }>(`http://localhost:8080/wiki/${id}/curtir`);
      const novasWikis = wikis.map((wiki) =>
        wiki.id === id ? { ...wiki, curtidas: response.data.curtidas, curtidaUsuario: !wiki.curtidaUsuario } : wiki
      );
      setWikis(novasWikis);
    } catch (error) {
      console.error('Erro ao curtir Wiki:', error);
    }
  };

  return (
    <div className='ComunidadeContainer'>
      <h2>{comunidade ? comunidade.nome : 'Carregando...'}</h2>
      <div className='Descricao'>
        <p>Descrição: {comunidade ? comunidade.descricao : 'Carregando...'}</p>
      </div>
      <div className='SpaceADDWikis'>
        <Link to={`/Perfil/Comunidade/${parsedComunidadeId}/NovaWiki`}>
          Adicionar Wiki
        </Link>
      </div>

      <div className='ComunidadeeADD'>
        <div className='WikiComunidade'>
          {wikis.map((wiki) => (
            <div key={wiki.id}>
              <div className='WikiInComunidade'>
                <h3>{wiki.titulo}</h3>
                <p>{wiki.conteudo.length > 50 ? `${wiki.conteudo.substring(0, 50)}...` : wiki.conteudo}</p>
                <p>Curtidas: {wiki.curtidas}</p>
                <button onClick={() => curtirWiki(wiki.id)}>
                  {wiki.curtidaUsuario ? 'Descurtir' : 'Curtir'}
                </button>
                <Link to={`/Wiki/${wiki.id}`} key={wiki.id}>
                  Ver Wiki Completa
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
