package br.com.orbe.model;

import br.com.orbe.model.enums.StatusRecomendacao;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class RecomendacaoVacinal {

    private Long id;
    private Long usuarioId;
    private Long dependenteId;
    private Long vacinaId;
    private String doseRecomendada;
    private LocalDate dataPrevista;
    private String motivo;
    private StatusRecomendacao status;
    private Long agendamentoId;
    private LocalDateTime criadoEm;
    private LocalDateTime atualizadoEm;

    public RecomendacaoVacinal() {
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getUsuarioId() { return usuarioId; }
    public void setUsuarioId(Long usuarioId) { this.usuarioId = usuarioId; }
    public Long getDependenteId() { return dependenteId; }
    public void setDependenteId(Long dependenteId) { this.dependenteId = dependenteId; }
    public Long getVacinaId() { return vacinaId; }
    public void setVacinaId(Long vacinaId) { this.vacinaId = vacinaId; }
    public String getDoseRecomendada() { return doseRecomendada; }
    public void setDoseRecomendada(String doseRecomendada) { this.doseRecomendada = doseRecomendada; }
    public LocalDate getDataPrevista() { return dataPrevista; }
    public void setDataPrevista(LocalDate dataPrevista) { this.dataPrevista = dataPrevista; }
    public String getMotivo() { return motivo; }
    public void setMotivo(String motivo) { this.motivo = motivo; }
    public StatusRecomendacao getStatus() { return status; }
    public void setStatus(StatusRecomendacao status) { this.status = status; }
    public Long getAgendamentoId() { return agendamentoId; }
    public void setAgendamentoId(Long agendamentoId) { this.agendamentoId = agendamentoId; }
    public LocalDateTime getCriadoEm() { return criadoEm; }
    public void setCriadoEm(LocalDateTime criadoEm) { this.criadoEm = criadoEm; }
    public LocalDateTime getAtualizadoEm() { return atualizadoEm; }
    public void setAtualizadoEm(LocalDateTime atualizadoEm) { this.atualizadoEm = atualizadoEm; }
}
