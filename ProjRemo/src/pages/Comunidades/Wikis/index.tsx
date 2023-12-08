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
    <div className="WikiAllDiv">
    <div className="TextWiki">
      {wiki ? (
        <div className="ExibindoWiki">
          <div className="titulowikiDiv">

          <h1>{wiki.titulo}</h1>
          </div>
          <div className="ConteudoWikiDiv">{wiki.conteudo}</div>

          <div className="GoToComunidade">
           
            {wiki.comunidade && (
              <Link to={`/Perfil/Comunidade/${wiki.comunidade.id}`}>
                @{wiki.comunidade.nome}
              </Link>
            )}
          </div>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
    </div>
  );
}
