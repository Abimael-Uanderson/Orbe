package br.com.orbe.dao;

import br.com.orbe.model.MovimentacaoEstoque;

import java.util.List;

public interface MovimentacaoEstoqueDao extends GenericDao<MovimentacaoEstoque, Long> {

    List<MovimentacaoEstoque> listarPorLote(Long loteId);
}
