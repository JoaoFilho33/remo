import { BrowserRouter, Route, Routes } from "react-router-dom"
import { NavBar } from "./NavBar"
import { PagInicial } from "./pages/PagInicial"
import { Pesquisar } from "./pages/Pesquisar"
import { PerfilUser } from "./pages/PerfilUser"
import { Prateleira } from "./pages/PerfilUser/Prateleira"
import { Wikis } from "./pages/Comunidades/Wikis"
import { Comunidade } from "./pages/Comunidades/Comunidade"
import { Comunidades } from "./pages/Comunidades"
import { Filme } from "./pages/PagInicial/pageFilmeExibicao"
import { MelhoresAvaliados } from "./pages/PagInicial/pageMelhoresAvaliados"
import { ProxLancamentos } from "./pages/PagInicial/pageProxLancamentos"


export function RoutesApp(){
    return(
        <BrowserRouter>
        
          
            <NavBar/>
           
          
            <Routes>
                <Route path="/" element={<PagInicial/>}/>
                <Route path="/Pesquisar" element={<Pesquisar/>}/>
                <Route path="/Perfil" element={<PerfilUser/>}/>
                <Route path="/Perfil/Prateleira/:id" element={<Prateleira/>}/>
                <Route path="/Wiki/:id" element={<Wikis/>}/>
                <Route path="/Perfil/Comunidade/:id" element={<Comunidade/>}/>
                <Route path="/Perfil/Comunidade/" element={<Comunidades/>}/>
                <Route path="/filmeExibicao/:id" element={ <Filme/> }/> 
                <Route path="/melhores-avaliados" element={<MelhoresAvaliados />} />
                <Route path="/proximos-lancamentos" element={<ProxLancamentos />} />

         </Routes>
       
        
        
     
        </BrowserRouter>
        
    )  
}