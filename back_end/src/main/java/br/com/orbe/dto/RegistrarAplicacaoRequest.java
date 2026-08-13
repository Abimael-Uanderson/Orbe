package br.com.orbe.dto;

import br.com.orbe.model.enums.TipoAtendimento;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record RegistrarAplicacaoRequest(
        Long agendamentoId,
        Long usuarioId,
        Long dependenteId,
        Long funcionarioId,
        Long loteId,
        String dose,
        LocalDateTime dataAplicacao,
        TipoAtendimento tipoAtendimento,
        String viaAdministracao,
        String localAplicacao,
        BigDecimal valorPago,
        String observacoes
) {
}
