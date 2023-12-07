// VerTudoPage.tsx
import React, { useEffect, useState } from "react";
import api from "../../../services/api";
import "./style.css"
import { LayoutFilms } from "../layoutFilmes"

export const MelhoresAvaliados: React.FC = () => {
  const [todosOsFilmes, setTodosOsFilmes] = useState<any[]>([]);
  const totalPages = 3;

  useEffect(() => {
    async function carregarTodosOsFilmes() {
      try {
        const promises = [];

        for (let page = 1; page <= totalPages; page++) {
          const resposta = api.get("movie/top_rated", {
            params: {
              api_key: "6dbc3d5fef3a8a2a7f319cfb155da5b0",
              language: "pt-BR",
              page,
            },
          });

          promises.push(resposta);
        }

        const resultados = await Promise.all(promises);

        // Combina os resultados de todas as páginas
        const filmes = resultados.flatMap((result) => result.data.results);

        setTodosOsFilmes(filmes);
      } catch (erro) {
        console.error("Erro ao buscar todos os filmes:", erro);
      }
    }

    carregarTodosOsFilmes();
  }, []);

  return (
    <div className="page-melhores-avaliados">
      <h2>Melhores Avaliados</h2>
      <LayoutFilms items={todosOsFilmes} linkTo={(filme) => `/filmeExibicao/${filme.id}`} />
    </div>
  );
};