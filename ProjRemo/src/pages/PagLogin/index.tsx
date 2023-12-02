import { Link } from "react-router-dom";
import './login.css'
import logo from "../../img/LogoSemFundo.png"

function Cadastro() {
  // const [email, setEmail] = useState('');
  // const [senha, setSenha] = useState('');
  // const email = "";
  // const senha = "";
  // const handleCadastro = () => {
  //   // Aqui, você pode adicionar a lógica para enviar os dados do formulário para o servidor
  //   console.log('Email:', email);
  //   console.log('Senha:', senha);
  // };

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
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
              required
            />
            
            <label htmlFor="senha">Senha:</label>
            <input
              type="password"
              id="senha"
              // value={senha}
              // onChange={(e) => setSenha(e.target.value)}
              required
              />
          </div>
          <div className="button-container">
            <Link to={"/"}>
            <button type="button">
              Cadastrar
            </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;