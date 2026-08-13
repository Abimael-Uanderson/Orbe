package br.com.orbe.dao;

import br.com.orbe.model.UsuarioDependente;

import java.util.List;

public interface UsuarioDependenteDao extends GenericDao<UsuarioDependente, Long> {

    List<UsuarioDependente> listarPorUsuario(Long usuarioId);
}
