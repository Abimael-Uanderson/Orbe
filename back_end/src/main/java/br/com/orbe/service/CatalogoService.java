package br.com.orbe.service;

import br.com.orbe.model.Lote;
import br.com.orbe.model.Vacina;

import java.util.List;

public interface CatalogoService {

    List<Vacina> listarVacinasDisponiveis();

    Vacina salvarVacina(Vacina vacina);

    Lote salvarLote(Lote lote);

    List<Lote> listarLotes(Long vacinaId);
}
