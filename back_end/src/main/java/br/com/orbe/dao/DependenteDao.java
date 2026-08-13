package br.com.orbe.dao;

import br.com.orbe.model.Dependente;

import java.util.List;

public interface DependenteDao extends GenericDao<Dependente, Long> {

    List<Dependente> listarPorResponsavel(Long usuarioId);
}
