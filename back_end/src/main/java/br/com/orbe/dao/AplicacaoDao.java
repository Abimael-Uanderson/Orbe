package br.com.orbe.dao;

import br.com.orbe.model.Aplicacao;

import java.util.List;

public interface AplicacaoDao extends GenericDao<Aplicacao, Long> {

    List<Aplicacao> listarPorUsuario(Long usuarioId);

    List<Aplicacao> listarPorDependente(Long dependenteId);
}
