/* 
function Cadastro() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleCadastro = () => {
    // Aqui, você pode adicionar a lógica para enviar os dados do formulário para o servidor
    console.log('Email:', email);
    console.log('Senha:', senha);
  };

  return (
    <div>
      <h1>Cadastro</h1>
      <form>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="senha">Senha:</label>
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="button" onClick={handleCadastro}>
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Cadastro;
 */