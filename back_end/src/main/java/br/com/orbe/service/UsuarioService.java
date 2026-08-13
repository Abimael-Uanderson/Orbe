package br.com.orbe.service;

import br.com.orbe.model.Usuario;
import br.com.orbe.model.UsuarioPerfil;

import java.util.List;

public interface UsuarioService {

    Usuario cadastrar(Usuario usuario, UsuarioPerfil perfil);

    Usuario buscar(Long id);

    List<Usuario> listar();

    Usuario atualizar(Long id, Usuario usuario);
}
