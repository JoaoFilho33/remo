import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styleCriarWiki.css';

interface WikiFormData {
  conteudo: string;
  tema: string;
  titulo: string;
  participante: { id: number };
  comunidade: { id: number };
}

const CriarWiki: React.FC = () => {
  const navigate = useNavigate();
  const { id: idComunidade } = useParams<{ id: string }>();

  const [wikiData, setWikiData] = useState<WikiFormData>({
    conteudo: '',
    tema: '',
    titulo: '',
    participante: { id: 1 },
    comunidade: { id: Number(idComunidade) },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setWikiData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:8080/wiki/comunidade/wiki',
        wikiData
      );

      toast.success('Wiki criada com sucesso!', {
        onClose: () => navigate(`/Comunidade/${idComunidade}`),
      });
    } catch (error) {
      console.error('Erro ao criar Wiki:', error);
      toast.error('Erro ao criar Wiki. Tente novamente.');
    }
  };

  return (
    <div className="Novawiki">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input
            type="text"
            name="titulo"
            value={wikiData.titulo}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Tema:</label>
          <input
            type="text"
            name="tema"
            value={wikiData.tema}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Conteúdo:</label>
          <textarea
            name="conteudo"
            value={wikiData.conteudo}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Criar Wiki</button>
      </form>
    </div>
  );
};

export default CriarWiki;
