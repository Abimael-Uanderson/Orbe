package br.com.orbe.model;

import br.com.orbe.model.enums.TipoAtendimento;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class Aplicacao {

    private Long id;
    private String protocolo;
    private Long agendamentoId;
    private Long usuarioId;
    private Long dependenteId;
    private Long funcionarioId;
    private Long loteId;
    private String dose;
    private LocalDateTime dataAplicacao;
    private TipoAtendimento tipoAtendimento;
    private String viaAdministracao;
    private String localAplicacao;
    private BigDecimal valorPago;
    private String observacoes;
    private LocalDateTime criadoEm;

    public Aplicacao() {
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getProtocolo() { return protocolo; }
    public void setProtocolo(String protocolo) { this.protocolo = protocolo; }
    public Long getAgendamentoId() { return agendamentoId; }
    public void setAgendamentoId(Long agendamentoId) { this.agendamentoId = agendamentoId; }
    public Long getUsuarioId() { return usuarioId; }
    public void setUsuarioId(Long usuarioId) { this.usuarioId = usuarioId; }
    public Long getDependenteId() { return dependenteId; }
    public void setDependenteId(Long dependenteId) { this.dependenteId = dependenteId; }
    public Long getFuncionarioId() { return funcionarioId; }
    public void setFuncionarioId(Long funcionarioId) { this.funcionarioId = funcionarioId; }
    public Long getLoteId() { return loteId; }
    public void setLoteId(Long loteId) { this.loteId = loteId; }
    public String getDose() { return dose; }
    public void setDose(String dose) { this.dose = dose; }
    public LocalDateTime getDataAplicacao() { return dataAplicacao; }
    public void setDataAplicacao(LocalDateTime dataAplicacao) { this.dataAplicacao = dataAplicacao; }
    public TipoAtendimento getTipoAtendimento() { return tipoAtendimento; }
    public void setTipoAtendimento(TipoAtendimento tipoAtendimento) { this.tipoAtendimento = tipoAtendimento; }
    public String getViaAdministracao() { return viaAdministracao; }
    public void setViaAdministracao(String viaAdministracao) { this.viaAdministracao = viaAdministracao; }
    public String getLocalAplicacao() { return localAplicacao; }
    public void setLocalAplicacao(String localAplicacao) { this.localAplicacao = localAplicacao; }
    public BigDecimal getValorPago() { return valorPago; }
    public void setValorPago(BigDecimal valorPago) { this.valorPago = valorPago; }
    public String getObservacoes() { return observacoes; }
    public void setObservacoes(String observacoes) { this.observacoes = observacoes; }
    public LocalDateTime getCriadoEm() { return criadoEm; }
    public void setCriadoEm(LocalDateTime criadoEm) { this.criadoEm = criadoEm; }
}
