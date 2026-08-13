package br.com.orbe.dao;

import br.com.orbe.model.RecomendacaoVacinal;

import java.util.List;

public interface RecomendacaoVacinalDao extends GenericDao<RecomendacaoVacinal, Long> {

    List<RecomendacaoVacinal> listarPorUsuario(Long usuarioId);

    List<RecomendacaoVacinal> listarPorDependente(Long dependenteId);
}
