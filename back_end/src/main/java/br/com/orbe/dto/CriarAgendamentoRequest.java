package br.com.orbe.dto;

import br.com.orbe.model.enums.TipoAtendimento;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record CriarAgendamentoRequest(
        Long usuarioId,
        Long dependenteId,
        Long vacinaId,
        Long convenioId,
        LocalDateTime dataAgendamento,
        String unidade,
        String sala,
        String dosePrevista,
        TipoAtendimento tipoAtendimento,
        BigDecimal valorEstimado
) {
}
