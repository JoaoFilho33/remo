// import { Link, useNavigate } from "react-router-dom";
import './style.css'
import logo from "../../img/LogoSemFundo.png"
import { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

enum Role {
  USER,
  ADMIN,
  MANAGER
}

interface UsuarioRegister{
  nome: string,
  dataNasc: Date | null,
  email: string,
  senha: string
  role: Role
}

export function Cadastro() {  ;

  const [usuario, setUsuario] = useState<UsuarioRegister>({nome: '', dataNasc: null, email: '', senha:'', role: Role.USER})
  // const navigate = useNavigate();
  const handleCadastro = async () => {
    try {
      // Verifique se os campos estão preenchidos
      if (!usuario.nome || !usuario.email || !usuario.senha) {
        console.error('Por favor, preencha todos os campos.');
        return;
      }

      // Adicione a nova wiki ao backend
      const response = await axios.post(`http://localhost:8080/auth/register`, {
        ...usuario
      });

      const token = response.data.acces_token;
      // const refresh = response.data.refresh_token;

      // Navegue de volta à comunidade após adicionar a wiki
      console.log(token);
            
    } catch (error) {
      console.error('Erro ao adicionar user:', error);
    }
  }

  return (
    <div className="login">
      <div className="logo">
          <img src={logo} alt="logo" />
          <p>REMO</p>
      </div>
      <div className="formulario">
        <form>
          <span>Login</span>
          <div className="form1">
            <label htmlFor="nome">Nome:</label>
            <input 
              type="text"
              id="nome"
              value={usuario.nome}
              onChange={(e)=> setUsuario({...usuario, nome: e.target.value})}
              />

            <label htmlFor="dataNasc">Data de nascimento</label>
            <input 
              type="date"
              name="dataNasc"
              id="dataNasc"
              datatype='date'
              // value={usuario.dataNasc}
              onChange={(e)=> setUsuario({...usuario, dataNasc: e.target.valueAsDate})}
             />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={usuario.email}
              onChange={(e) => setUsuario({...usuario, email: e.target.value})}
              required
            />
            
            <label htmlFor="senha">Senha:</label>
            <input
              type="password"
              id="senha"
              value={usuario.senha}
              onChange={(e) => setUsuario({...usuario, senha: e.target.value})}
              required
              />
          </div>
          <div className="button-container">
            <Link to={"/"}>
              <button type="button" onClick={handleCadastro}>
                Entrar
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;