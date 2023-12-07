package com.backend.remo.controllers;

import com.backend.remo.Services.UsuarioService;
import com.backend.remo.models.usuario.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/usuario")
@CrossOrigin(origins = "http://localhost:5173")

public class UsuarioController{
    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public ResponseEntity<List<Usuario>> getUsuarios() {
        return ResponseEntity.ok((List<Usuario>) usuarioService.getAllUsuarios());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> getUsuarioById(@PathVariable(value = "id") Long id) {
        Usuario usuario = usuarioService.getUsuarioById(id);

        if (usuario == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Usuário não encontrada!"
            );
        }

        return ResponseEntity.ok().body(usuario);
    }

    @PostMapping
    public Usuario saveUsuario(@Validated @RequestBody Usuario usuario) {
        return usuarioService.createUsuario(usuario);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Usuario> putUsuario(@Validated @PathVariable(value = "id") Long id, @RequestBody Usuario usuario) {
        Usuario newUsuario = usuarioService.updateUsuario(id, usuario);
        if(newUsuario == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Usuário não encontrada!"
            );
        }

        return ResponseEntity.ok().body(newUsuario);
    }

    @DeleteMapping("/{id}")
    public Usuario deleteUsuario(@PathVariable(value = "id") Long id) {
        Usuario byeUsuario = usuarioService.removeUsuario(id);
        if(byeUsuario == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Usuário não encontrado"
            );
        }

        return byeUsuario;
    }
}
