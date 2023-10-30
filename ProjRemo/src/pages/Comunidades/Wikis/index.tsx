import { Link } from "react-router-dom"
import "./styleWiki.css"
export function Wikis(){
    return(
        <div className="TextWiki">
            <h1>Titulo da wiki</h1>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                Fugiat iusto ad amet eum iure odio provident et. Commodi quia, quod
                 earum magni voluptas voluptatum voluptatibus veniam, aut, ipsa fugit provident?      
            </p>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                Fugiat iusto ad amet eum iure odio provident et. Commodi quia, quod
                 earum magni voluptas voluptatum voluptatibus veniam, aut, ipsa fugit provident?      
            </p>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                Fugiat iusto ad amet eum iure odio provident et. Commodi quia, quod
                 earum magni voluptas voluptatum voluptatibus veniam, aut, ipsa fugit provident?      
            </p>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                Fugiat iusto ad amet eum iure odio provident et. Commodi quia, quod
                 earum magni voluptas voluptatum voluptatibus veniam, aut, ipsa fugit provident?      
            </p>
            <div className="GoToComunidade">

            < Link to={"/Perfil/Comunidade/:id"}>@Comunidade</Link>
            </div>
            
      </div>
    )
}