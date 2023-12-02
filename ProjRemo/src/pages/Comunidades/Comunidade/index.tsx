 import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import "./StyleComunidade.css";

interface Wiki {
  id: number;
  titulo: string;
  conteudo: string;
  curtidas: number;
  curtidaUsuario: boolean;
}




export function Comunidade() {
  const [wikis, setWikis] = useState<Wiki[]>([]);
/*   const [novoWiki, setNovoWiki] = useState<Wiki>({ id: 0, titulo: '', conteudo: '', curtidas: 0, curtidaUsuario: false });
 */
  // Use useParams para obter o ID da comunidade da URL
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const carregarWikis = async () => {
      try {
        const response = await axios.get<Wiki[]>(`http://localhost:8080/wiki`);
        setWikis(response.data);
      } catch (error) {
        console.error('Erro ao carregar dados da API:', error);
      }
    };

    carregarWikis();
  }, []);

/*   const adicionarWiki = async () => {
    if (novoWiki.titulo && novoWiki.conteudo) {
      try {
        const response = await axios.post<Wiki>(`http://localhost:8080/wiki`, novoWiki);
        setWikis([...wikis, response.data]);
        setNovoWiki({ id: 0, titulo: '', conteudo: '', curtidas: 0, curtidaUsuario: false });
      } catch (error) {
        console.error('Erro ao adicionar Wiki:', error);
      }
    }
  }; */

  const curtirWiki = async (id: number) => {
    try {
      const response = await axios.post<{ curtidas: number }>(`http://localhost:8080/wiki/${id  }/curtir`);
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
      <h2>Espaço Comunidade:</h2>
      <h3>Comunidade: {}</h3>
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
      <div className='SpaceADDWikis'>
        <Link to={`/Perfil/Comunidade/${id}/NovaWiki`}>
          Adicionar Wiki
        </Link>
      </div>
      </div>
    </div>
  );
}




























































 
 




/* 
 import  { useState, useEffect } from 'react';
 import { Link } from 'react-router-dom';
import axios, { AxiosError } from 'axios';

interface Wiki {
  id: number;
  titulo: string;
  conteudo: string;
  // Adicione mais propriedades conforme necessário
}

interface ComunidadeWikisProps {
  idComunidade: number;
}

export const Comunidade: React.FC<ComunidadeWikisProps> = ({ idComunidade }) => {
  const [wikis, setWikis] = useState<Wiki[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWikis = async () => {
      try {
        const response = await axios.get<Wiki[]>(`http://localhost:8080/participante/${idComunidade}/wikis`);
        setWikis(response.data);
      } catch (error) {
        handleFetchError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchWikis();
  }, [idComunidade]);

  const handleFetchError = (error: any) => {
    console.error('Erro ao buscar wikis da comunidade', error);
  
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<Wiki>; // Corrigir aqui
      setError(`Erro ao carregar wikis da comunidade: ${axiosError.message}`);
    } else {
      setError('Erro desconhecido ao carregar wikis da comunidade');
    }
  };

  return (
    <div>
      <h2>Wikis da Comunidade</h2>
      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && (
        <ul>
          {wikis.map((wiki) => (
            <li key={wiki.id}>
              <h3>{wiki.titulo}</h3>
              <p>{wiki.conteudo}</p>
              </li>
              ))}
              </ul>
              )}
      <Link to={`/Perfil/Comunidade/${idComunidade}/NovaWiki`}>
        <button>Adicionar Nova Wiki</button>
      </Link>
    </div>
  );
};
*/


/* ta no rumo
import axios from "axios";
import { useEffect, useState } from "react";

interface Wiki {
  id: number;
  titulo: string;
  conteudo: string;
  participante: {
    id: number;
    data_saida: null;
  }
}

export function Comunidade() {
  const [wikis, setWikis] = useState<Wiki[]>([]);

  const fetchData = async () => {
    try {
      const response = await axios.get<Wiki[]>('http://localhost:8080/wiki');

      setWikis(response.data);
    } catch (error) {
      console.error('Erro ao obter dados da API', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Wikis da Comunidade:</h1>
      <ul>
        {wikis.map(item => (
          <li key={item.id}>{item.conteudo}</li>
        ))}
      </ul>
    </div>
  );
};


 */