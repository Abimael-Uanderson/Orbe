package br.com.orbe.service;

import br.com.orbe.dto.CriarAgendamentoRequest;
import br.com.orbe.model.Agendamento;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface AgendamentoService {

    Agendamento criar(CriarAgendamentoRequest request);

    Agendamento cancelar(Long id, String motivo);

    Agendamento reagendar(Long id, LocalDateTime novaData);

    List<Agendamento> listarAgenda(LocalDate data);
}
