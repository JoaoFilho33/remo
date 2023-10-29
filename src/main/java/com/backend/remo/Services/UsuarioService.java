package com.backend.remo.Services;

import com.backend.remo.models.Comunidade;
import com.backend.remo.models.Usuario;
import com.backend.remo.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    public Object getAllUsuarios() {
        return usuarioRepository.findAll();
    }

    public Usuario getUsuarioById(Long id) {
        return usuarioRepository.findById(id).orElse(null);
    }


    public Usuario createUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public Usuario updateUsuario(Long id, Usuario usuario) {
        if(!usuarioRepository.existsById(id)) {
            return null;
        }

        usuario.setId(id);
        return usuarioRepository.save(usuario);
    }


    public Usuario removeUsuario(Long id) {
        Optional<Usuario> usuarioOptional = usuarioRepository.findById(id);

        if (!usuarioOptional.isPresent()) {
            return null;
        }

        Usuario usuario = usuarioOptional.get();
        usuarioRepository.delete(usuario);
        return usuario;
    }
}
