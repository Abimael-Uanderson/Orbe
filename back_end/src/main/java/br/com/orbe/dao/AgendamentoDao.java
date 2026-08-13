package br.com.orbe.dao;

import br.com.orbe.model.Agendamento;

import java.time.LocalDate;
import java.util.List;

public interface AgendamentoDao extends GenericDao<Agendamento, Long> {

    List<Agendamento> listarPorUsuario(Long usuarioId);

    List<Agendamento> listarPorDependente(Long dependenteId);

    List<Agendamento> listarPorData(LocalDate data);
}
