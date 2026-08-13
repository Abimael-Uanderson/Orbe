package br.com.orbe.model;

import br.com.orbe.model.enums.StatusAgendamento;
import br.com.orbe.model.enums.TipoAtendimento;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class Agendamento {

    private Long id;
    private String protocolo;
    private Long usuarioId;
    private Long dependenteId;
    private Long vacinaId;
    private Long convenioId;
    private LocalDateTime dataAgendamento;
    private String unidade;
    private String sala;
    private String dosePrevista;
    private TipoAtendimento tipoAtendimento;
    private BigDecimal valorEstimado;
    private StatusAgendamento status;
    private String motivoCancelamento;
    private LocalDateTime canceladoEm;
    private LocalDateTime criadoEm;
    private LocalDateTime atualizadoEm;

    public Agendamento() {
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getProtocolo() { return protocolo; }
    public void setProtocolo(String protocolo) { this.protocolo = protocolo; }
    public Long getUsuarioId() { return usuarioId; }
    public void setUsuarioId(Long usuarioId) { this.usuarioId = usuarioId; }
    public Long getDependenteId() { return dependenteId; }
    public void setDependenteId(Long dependenteId) { this.dependenteId = dependenteId; }
    public Long getVacinaId() { return vacinaId; }
    public void setVacinaId(Long vacinaId) { this.vacinaId = vacinaId; }
    public Long getConvenioId() { return convenioId; }
    public void setConvenioId(Long convenioId) { this.convenioId = convenioId; }
    public LocalDateTime getDataAgendamento() { return dataAgendamento; }
    public void setDataAgendamento(LocalDateTime dataAgendamento) { this.dataAgendamento = dataAgendamento; }
    public String getUnidade() { return unidade; }
    public void setUnidade(String unidade) { this.unidade = unidade; }
    public String getSala() { return sala; }
    public void setSala(String sala) { this.sala = sala; }
    public String getDosePrevista() { return dosePrevista; }
    public void setDosePrevista(String dosePrevista) { this.dosePrevista = dosePrevista; }
    public TipoAtendimento getTipoAtendimento() { return tipoAtendimento; }
    public void setTipoAtendimento(TipoAtendimento tipoAtendimento) { this.tipoAtendimento = tipoAtendimento; }
    public BigDecimal getValorEstimado() { return valorEstimado; }
    public void setValorEstimado(BigDecimal valorEstimado) { this.valorEstimado = valorEstimado; }
    public StatusAgendamento getStatus() { return status; }
    public void setStatus(StatusAgendamento status) { this.status = status; }
    public String getMotivoCancelamento() { return motivoCancelamento; }
    public void setMotivoCancelamento(String motivoCancelamento) { this.motivoCancelamento = motivoCancelamento; }
    public LocalDateTime getCanceladoEm() { return canceladoEm; }
    public void setCanceladoEm(LocalDateTime canceladoEm) { this.canceladoEm = canceladoEm; }
    public LocalDateTime getCriadoEm() { return criadoEm; }
    public void setCriadoEm(LocalDateTime criadoEm) { this.criadoEm = criadoEm; }
    public LocalDateTime getAtualizadoEm() { return atualizadoEm; }
    public void setAtualizadoEm(LocalDateTime atualizadoEm) { this.atualizadoEm = atualizadoEm; }
}
