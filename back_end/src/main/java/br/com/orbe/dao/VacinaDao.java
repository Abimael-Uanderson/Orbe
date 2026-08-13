package br.com.orbe.dao;

import br.com.orbe.model.Vacina;

import java.util.List;

public interface VacinaDao extends GenericDao<Vacina, Long> {

    List<Vacina> listarDisponiveis();
}
