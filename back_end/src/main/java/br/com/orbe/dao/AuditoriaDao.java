package br.com.orbe.dao;

import br.com.orbe.model.Auditoria;

import java.util.List;

public interface AuditoriaDao extends GenericDao<Auditoria, Long> {

    List<Auditoria> listarPorUsuario(Long usuarioId);
}
