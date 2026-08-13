package br.com.orbe.dao;

import br.com.orbe.model.Lote;

import java.util.List;

public interface LoteDao extends GenericDao<Lote, Long> {

    List<Lote> listarValidosPorVacina(Long vacinaId);

    boolean atualizarSaldo(Long loteId, int saldoEsperado, int novoSaldo);
}
