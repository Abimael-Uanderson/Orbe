package br.com.orbe.dao;

import br.com.orbe.model.Convenio;

import java.util.List;

public interface ConvenioDao extends GenericDao<Convenio, Long> {

    List<Convenio> listarPorUsuario(Long usuarioId);
}
