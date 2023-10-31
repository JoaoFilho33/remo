import { Link } from "react-router-dom";
import "./stylePagInicial.css"

function WikisPopulares() {
    return (
        <div className="WikiStyle">
          <Link to={"/Wiki/:id"}>
          <h3>Nome da wiki</h3>
            </Link> 
            <Link className= "GoToPerfil" to={"/Perfil/Comunidade/:id"}>@Comunidade</Link>
            <p>""Explorar o desconhecido, desafiar limites, criar conexões. Na jornada da vida, cada dia é uma oportunidade.""</p>
            
            <div className="BtLikeDislike">
                <button>Like</button>
                <button>Dislike</button>
            </div>
        </div>
    );
}

function ConteudosAvaliados() {
    return (
        <div className="ContAvaliado">
            <p>Nome do filme</p>
            <p>Avaliação da pessoa</p>
            <div>
                <button>Like</button>
                <button>Dislike</button>
            </div>
        </div>
    );
}

export function PagInicial() {
    return (
        <div>
                <h2>Wikis populares:</h2>
            <div className="WikisPopulares">
                <div className="WikiPopular">

                {[...Array(1)].map((_, index) => (
                    <WikisPopulares key={index} />
                ))}
                </div>              
                 <div className="WikiPopular">

                {[...Array(1)].map((_, index) => (
                    <WikisPopulares key={index} />
                ))}
                </div> <div className="WikiPopular">

                {[...Array(1)].map((_, index) => (
                    <WikisPopulares key={index} />
                ))}
                </div> <div className="WikiPopular">

                {[...Array(1)].map((_, index) => (
                    <WikisPopulares key={index} />
                ))}
                </div> <div className="WikiPopular">

                {[...Array(1)].map((_, index) => (
                    <WikisPopulares key={index} />
                ))}
                </div> 
            </div>

            <div className="WikisDaComunidade">
                <h2>Wikis das Comunidades:</h2>
                {[...Array(1)].map((_, index) => (
                    <WikisPopulares key={index} />
                ))}
            </div>

            <div className="AvaliacoesDeSeguidos">
                <h2>Avaliações de perfis que você segue:</h2>
                {[...Array(1)].map((_, index) => (
                    <ConteudosAvaliados key={index} />
                ))}
            </div>
        </div>
    );
}


/* 

WIKI -> COLUNM
CARROSSEL -> AVALIAÇÃO


*/