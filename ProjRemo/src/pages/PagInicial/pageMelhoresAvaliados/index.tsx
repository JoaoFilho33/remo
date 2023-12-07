// VerTudoPage.tsx
import React, { useEffect, useState } from "react";
import api from "../../../services/api";
import { LayoutFilms } from "../layoutFilmes"

export const MelhoresAvaliados: React.FC = () => {
  const [todosOsFilmes, setTodosOsFilmes] = useState<any[]>([]);

  useEffect(() => {
    async function carregarTodosOsFilmes() {
      try {
        const resposta = await api.get("movie/top_rated", {
          params: {
            api_key: "6dbc3d5fef3a8a2a7f319cfb155da5b0",
            language: "pt-BR",
            page: 1,
          },
        });

        setTodosOsFilmes(resposta.data.results);
      } catch (erro) {
        console.error("Erro ao buscar todos os filmes:", erro);
      }
    }

    carregarTodosOsFilmes();
  }, []);

  return (
    <div>
      <h2>Melhores Avaliados</h2>
      <LayoutFilms items={todosOsFilmes} linkTo={(filme) => `/filmesCartaz/${filme.id}`} />
    </div>
  );
};