import { BrowserRouter, Route, Routes, useParams } from "react-router-dom"
import { NavBar } from "./NavBar"
import { PagInicial } from "./pages/PagInicial"
import { Pesquisar } from "./pages/Pesquisar"
import { PerfilUser } from "./pages/PerfilUser"
import { Prateleira } from "./pages/PerfilUser/Prateleira"
import { Wikis } from "./pages/Comunidades/Wikis"
import { Comunidade } from "./pages/Comunidades/Comunidade"
import { Comunidades } from "./pages/Comunidades"
import { CriarWiki } from "./pages/Comunidades/Wikis/CriarWiki"
import Cadastro from "./pages/PagLogin"

export function RoutesApp(){
    return(
        <BrowserRouter>
        
          
            <NavBar/>
           
          
            <Routes>
                <Route path="/" element={<PagInicial/>}/>
                <Route path="/login" element={<Cadastro/>}/>
                <Route path="/Pesquisar" element={<Pesquisar/>}/>
                <Route path="/Perfil" element={<PerfilUser/>}/>
                <Route path="/Perfil/Prateleira/:id" element={<Prateleira/>}/>
                <Route path="/Wiki/:id" element={<Wikis/>}/>
                <Route path="/Perfil/Comunidade/:id" element={<Comunidade /* idComunidade={parseInt(useParams().id || '', 10)} */ />} />           <Route path="/Perfil/Comunidade/:id/NovaWiki" element={<CriarWiki/>}/>
                <Route path="/Perfil/Comunidade/" element={<Comunidades/>}/>

         </Routes>
       
        
        
     
        </BrowserRouter>
        
    )  
}