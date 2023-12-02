import  { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styleCriarWiki.css';

interface NovaWiki {
  titulo: string;
  conteudo: string;
  
}

export function CriarWiki() {
  const { id } = useParams(); // Obtenha o ID da comunidade da URL
  const navigate = useNavigate();

  const [novoWiki, setNovoWiki] = useState<NovaWiki>({ titulo: '', conteudo: '' });

  const adicionarWiki = async () => {
    try {
      // Verifique se os campos estão preenchidos
      if (!novoWiki.titulo || !novoWiki.conteudo) {
        console.error('Por favor, preencha todos os campos da Wiki.');
        return;
      }

      // Adicione a nova wiki ao backend
      await axios.post(`http://localhost:8080/wiki`, {
        ...novoWiki,
        participante: { id: Number(id) }, // Certifique-se de ajustar a estrutura de dados conforme necessário
      });

      // Navegue de volta à comunidade após adicionar a wiki
      navigate(`/Perfil/Comunidade/${id}`);
    } catch (error) {
      console.error('Erro ao adicionar Wiki:', error);
    }
  };

  return (
    <div className="AddNewWiki">
      <h2>Criar Nova Wiki para a Comunidade {id}</h2>
      <div className="SpaceAddWiki">
        <label>Título da Wiki:</label>
        <input
          type="text"
          placeholder="Título da Wiki"
          value={novoWiki.titulo}
          onChange={(e) => setNovoWiki({ ...novoWiki, titulo: e.target.value })}
        />

        <label>Conteúdo da Wiki:</label>
        <textarea
          placeholder="Conteúdo da Wiki"
          value={novoWiki.conteudo}
          onChange={(e) => setNovoWiki({ ...novoWiki, conteudo: e.target.value })}
        />

        <button onClick={adicionarWiki}>Adicionar Wiki</button>
      </div>
    </div>
  );
}

