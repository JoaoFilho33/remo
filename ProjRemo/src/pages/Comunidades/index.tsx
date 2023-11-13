import { useState } from 'react';
import './styleComunidades.css';

interface Comunidade {
  nome: string;
  descricao: string;
}

export function Comunidades() {
  const [comunidades, setComunidades] = useState<Comunidade[]>([]);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const criarComunidade = () => {
    if (nome && descricao) {
      const novaComunidade: Comunidade = {
        nome,
        descricao,
      };
      setComunidades([...comunidades, novaComunidade]);
      setNome('');
      setDescricao('');
    }
  };

  return (
    <div className='Comunidade'>
      <h1>Nova comunidade</h1>
      <div className='AllComunidades'>
        <div className='AddComunidades'>
          <button onClick={() => setMostrarFormulario(!mostrarFormulario)}>
            {mostrarFormulario ? 'Cancelar' : 'Adicionar'}
          </button>

          {mostrarFormulario && (
            <div className='Cadastro'>
              <input
                type='text'
                placeholder='Nome da Comunidade'
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              <input
                type='text'
                placeholder='Descrição da Comunidade'
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
              <button onClick={criarComunidade}>Criar Comunidade</button>
            </div>
          )}
        </div>

        <div className='ListaComunidades'>
          <p>Comunidades</p>
          {comunidades.map((comunidade, index) => (
            <p key={index}>
              <a href={`/Perfil/Comunidade/${index}`}>{comunidade.nome}</a>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
