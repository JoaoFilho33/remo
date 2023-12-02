import { useState, useEffect } from 'react';
import axios from 'axios';
import './styleComunidades.css';

interface Comunidade {
  id: number;
  nome: string;
  descricao: string;
  tipoConteudo: string[]; // Novo campo para rastrear o tipo de conteúdo selecionado
  subcategorias: string[]; // Novo campo para rastrear subcategorias selecionadas
/*   data_criacao: string;
 */}

export function Comunidades() {
  const [comunidades, setComunidades] = useState<Comunidade[]>([]);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [tipoConteudoSelecionado, setTipoConteudoSelecionado] = useState<string[]>([]);
  const [subcategoriasSelecionadas, setSubcategoriasSelecionadas] = useState<string[]>([]);

  useEffect(() => {
    carregarComunidades();
  }, []);

  const carregarComunidades = async () => {
    try {
      const response = await axios.get('http://localhost:8080/comunidade');
      setComunidades(response.data);
    } catch (error) {
      console.error('Erro ao buscar comunidades da API', error);
    }
  };

  const criarComunidade = async () => {
    if (nome && descricao) {
      try {
        const novaComunidade: Comunidade = {
          nome,
          descricao,
          id: -1,
          tipoConteudo: tipoConteudoSelecionado,
          subcategorias: subcategoriasSelecionadas,
/*           data_criacao: new Date().toISOString(), // Adiciona a data atual no formato ISOString
 */        };
  
        const response = await axios.post('http://localhost:8080/comunidade', novaComunidade);
  
        setComunidades([...comunidades, response.data]);
        setNome('');
        setDescricao('');
        setTipoConteudoSelecionado([]);
        setSubcategoriasSelecionadas([]);
        setErro(null);
      } catch (error: any) {
        console.error('Erro ao criar comunidade na API', error.response?.data || error.message);
  
        if (error.response?.data) {
          setErro(`Erro ao criar comunidade: ${error.response.data.message}`);
        } else {
          setErro('Erro ao criar comunidade. Por favor, tente novamente.');
        }
      }
    }
  };
  return (
    <div className='Comunidade'>
      <h1>Espaço comunidade</h1>
      <div className='AllComunidades'>
        <div className='ListaComunidades'>
          <div>
            <h3>Comunidades</h3>
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
                  <div className='TipoConteudo'>
                    <label>Tipo de Conteúdo:</label>
                    <div>
                    <label>
                      <input
                        type='checkbox'
                        value='filme'
                        checked={tipoConteudoSelecionado.includes('filme')}
                        onChange={() =>
                          setTipoConteudoSelecionado((prev) =>
                            prev.includes('filme')
                              ? prev.filter((item) => item !== 'filme')
                              : [...prev, 'filme']
                          )
                        }
                      />
                      Filme
                    </label>
                    <label>
                      <input
                        type='checkbox'
                        value='serie'
                        checked={tipoConteudoSelecionado.includes('serie')}
                        onChange={() =>
                          setTipoConteudoSelecionado((prev) =>
                            prev.includes('serie')
                              ? prev.filter((item) => item !== 'serie')
                              : [...prev, 'serie']
                          )
                        }
                      />
                      Série
                    </label>
                    <label>
                      <input
                        type='checkbox'
                        value='anime'
                        checked={tipoConteudoSelecionado.includes('anime')}
                        onChange={() =>
                          setTipoConteudoSelecionado((prev) =>
                            prev.includes('anime')
                              ? prev.filter((item) => item !== 'anime')
                              : [...prev, 'anime']
                          )
                        }
                      />
                      Anime
                    </label>
                    <label>
                      <input
                        type='checkbox'
                        value='outros'
                        checked={tipoConteudoSelecionado.includes('outros')}
                        onChange={() =>
                          setTipoConteudoSelecionado((prev) =>
                            prev.includes('outros')
                              ? prev.filter((item) => item !== 'outros')
                              : [...prev, 'outros']
                          )
                        }
                      />
                      Outros
                    </label>
                    </div>
                    {/* Adicione mais tipos de conteúdo conforme necessário */}
                  </div>
                  <div className='Subcategorias'>
                    <label>Subcategorias:</label>
                    <div>
                    <label>
                      <input
                        type='checkbox'
                        value='acao'
                        checked={subcategoriasSelecionadas.includes('acao')}
                        onChange={() =>
                          setSubcategoriasSelecionadas((prev) =>
                            prev.includes('acao')
                              ? prev.filter((item) => item !== 'acao')
                              : [...prev, 'acao']
                          )
                        }
                      />
                      Ação
                    </label>
                    <label>
                      <input
                        type='checkbox'
                        value='aventura'
                        checked={subcategoriasSelecionadas.includes('aventura')}
                        onChange={() =>
                          setSubcategoriasSelecionadas((prev) =>
                            prev.includes('aventura')
                              ? prev.filter((item) => item !== 'aventura')
                              : [...prev, 'aventura']
                          )
                        }
                      />
                      Aventura
                    </label>
                    <label>
                      <input
                        type='checkbox'
                        value='aventura'
                        checked={subcategoriasSelecionadas.includes('romance')}
                        onChange={() =>
                          setSubcategoriasSelecionadas((prev) =>
                            prev.includes('romance')
                              ? prev.filter((item) => item !== 'romance')
                              : [...prev, 'romance']
                          )
                        }
                      />
                      Romance
                    </label>
                     <label>
                      <input
                        type='checkbox'
                        value='aventura'
                        checked={subcategoriasSelecionadas.includes('terror')}
                        onChange={() =>
                          setSubcategoriasSelecionadas((prev) =>
                            prev.includes('terror')
                              ? prev.filter((item) => item !== 'terror')
                              : [...prev, 'terror']
                          )
                        }
                      />
                      Terror
                    </label>
                    </div>
                    
                    {/* Adicione mais subcategorias conforme necessário */}
                  </div>
                  <button onClick={criarComunidade}>Criar Comunidade</button>
                  {erro && <p style={{ color: 'red' }}>{erro}</p>} {/* Exibir mensagem de erro, se houver */}
                </div>
              )}
            </div>
          </div>

          {comunidades.length === 0 ? (
            <div className='SemComunidades'>
              <span>Crie uma comunidade para começar a escrever suas wikis</span>
            </div>
          ) : (
            comunidades.map((comunidade, index) => (
              <p key={index}>
                <a href={`/Perfil/Comunidade/${index}`}>{comunidade.nome}</a>
              </p>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
