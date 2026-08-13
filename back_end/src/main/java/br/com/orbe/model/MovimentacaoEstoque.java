package br.com.orbe.model;

import br.com.orbe.model.enums.TipoMovimentacao;

import java.time.LocalDateTime;

public class MovimentacaoEstoque {

    private Long id;
    private Long loteId;
    private Long usuarioId;
    private Long aplicacaoId;
    private TipoMovimentacao tipo;
    private int quantidade;
    private int saldoAnterior;
    private int saldoPosterior;
    private String motivo;
    private LocalDateTime criadoEm;

    public MovimentacaoEstoque() {
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getLoteId() { return loteId; }
    public void setLoteId(Long loteId) { this.loteId = loteId; }
    public Long getUsuarioId() { return usuarioId; }
    public void setUsuarioId(Long usuarioId) { this.usuarioId = usuarioId; }
    public Long getAplicacaoId() { return aplicacaoId; }
    public void setAplicacaoId(Long aplicacaoId) { this.aplicacaoId = aplicacaoId; }
    public TipoMovimentacao getTipo() { return tipo; }
    public void setTipo(TipoMovimentacao tipo) { this.tipo = tipo; }
    public int getQuantidade() { return quantidade; }
    public void setQuantidade(int quantidade) { this.quantidade = quantidade; }
    public int getSaldoAnterior() { return saldoAnterior; }
    public void setSaldoAnterior(int saldoAnterior) { this.saldoAnterior = saldoAnterior; }
    public int getSaldoPosterior() { return saldoPosterior; }
    public void setSaldoPosterior(int saldoPosterior) { this.saldoPosterior = saldoPosterior; }
    public String getMotivo() { return motivo; }
    public void setMotivo(String motivo) { this.motivo = motivo; }
    public LocalDateTime getCriadoEm() { return criadoEm; }
    public void setCriadoEm(LocalDateTime criadoEm) { this.criadoEm = criadoEm; }
}
