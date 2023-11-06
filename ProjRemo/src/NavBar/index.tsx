import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons';
import logo from '../img/LogoSemFundo.png';
import "./styleNav.css"
import { Link } from 'react-router-dom';

export function NavBar() {
  // Simulando um estado para o nome do usuário atual
  const [userName] = useState('NomeDoUsuario');

  const handlePesquisa = (termoPesquisa: string) => {
    // Aqui você pode adicionar a lógica para lidar com a pesquisa
    console.log(`Pesquisando por: ${termoPesquisa}`);
  };

  return (
    
    <div className="navbar">
      <Link to={"/"}>
        <img className='logoNav' src={logo} alt="Logo Sem Fundo" />
      </Link>
        <Link to={"/Pesquisar"}>
      <div className='BarraPesquisa'>
          <input
            type="text"
            placeholder="Pesquisar..."
            className="pesquisa"
            onChange={(e) => handlePesquisa(e.target.value)}
          />
          <input type="submit" value={"Pesquisar"} />
      </div>
        </Link>
      <div className="usuario">
        <Link to={"/Perfil"}>
        <FontAwesomeIcon  icon={faUser}  /* style={{color: 'white', fontSize: '2rem'}} *//>
        
          <span>@{userName}</span>
        </Link>
      </div>
    </div>
    

  );
}
