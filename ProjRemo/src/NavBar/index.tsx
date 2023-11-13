import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faSearch } from '@fortawesome/free-solid-svg-icons';  // Adicionei o ícone de pesquisa
import logo from '../img/LogoSemFundo.png';
import "./styleNav.css"
import { Link } from 'react-router-dom';

export function NavBar() {
  // Simulando um estado para o nome do usuário atual
  const [userName] = useState('NomeDoUsuario');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handlePesquisa = (termoPesquisa: string) => {
    // Aqui você pode adicionar a lógica para lidar com a pesquisa
    console.log(`Pesquisando por: ${termoPesquisa}`);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isMobile = windowWidth <= 570;

  return (
    <div className="navbar">
      <Link to={"/"}>
        <img className='logoNav' src={logo} alt="Logo Sem Fundo" />
      </Link>
      <Link to={"/Pesquisar"}>
        <div className={`BarraPesquisa ${isMobile ? 'mobile' : ''}`}>
          <input
            type="text"
            placeholder="Pesquisar..."
            className="pesquisa"
            onChange={(e) => handlePesquisa(e.target.value)}
          />
          {isMobile ? (
            <button className="pesquisa-mobile">
              <FontAwesomeIcon icon={faSearch}  />
            </button>
          ) : (
            <input type="submit" value={"Pesquisar"} />
          )}
        </div>
      </Link>
      <div className="usuario">
        <Link to={"/Perfil"}>
          <FontAwesomeIcon icon={faUser} />
          <span>@{userName}</span>
        </Link>
      </div>
    </div>
  );
}
