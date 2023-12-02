import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./styleWiki.css";

interface Wiki {
  id: number;
  titulo: string;
  conteudo: string;
  comunidade: {
    id: number;
    nome: string;
  };
}

interface RouteParams {
  id: string;
  [key: string]: string | undefined;
}

export function Wikis() {
  const { id } = useParams<RouteParams>();
  const [wiki, setWiki] = useState<Wiki | null>(null);

  useEffect(() => {
    const carregarWiki = async () => {
      try {
        const response = await axios.get<Wiki>(`http://localhost:8080/wiki/${id}`);
        setWiki(response.data);
      } catch (error) {
        console.error("Erro ao carregar a Wiki:", error);
      }
    };

    carregarWiki();
  }, [id]);

  return (
    <div className="TextWiki">
      {wiki ? (
        <>
          <h1>{wiki.titulo}</h1>
          <p>{wiki.conteudo}</p>

          <div className="GoToComunidade">
            {/* COmo estou com problemas em conseguir mapear a minha comunidade esse botão n funciona */}
            {/* Verifica se wiki.comunidade existe antes de acessar suas propriedades */}
            {wiki.comunidade && (
              <Link to={`/Perfil/Comunidade/${wiki.comunidade.id}`}>
                @{wiki.comunidade.nome}
              </Link>
            )}
          </div>
        </>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
}
