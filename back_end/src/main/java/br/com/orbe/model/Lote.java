package br.com.orbe.model;

import br.com.orbe.model.enums.StatusLote;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class Lote {

    private Long id;
    private Long vacinaId;
    private String numeroLote;
    private LocalDate dataValidade;
    private int quantidadeInicial;
    private int quantidadeAtual;
    private String fornecedor;
    private StatusLote status;
    private LocalDateTime criadoEm;

    public Lote() {
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getVacinaId() { return vacinaId; }
    public void setVacinaId(Long vacinaId) { this.vacinaId = vacinaId; }
    public String getNumeroLote() { return numeroLote; }
    public void setNumeroLote(String numeroLote) { this.numeroLote = numeroLote; }
    public LocalDate getDataValidade() { return dataValidade; }
    public void setDataValidade(LocalDate dataValidade) { this.dataValidade = dataValidade; }
    public int getQuantidadeInicial() { return quantidadeInicial; }
    public void setQuantidadeInicial(int quantidadeInicial) { this.quantidadeInicial = quantidadeInicial; }
    public int getQuantidadeAtual() { return quantidadeAtual; }
    public void setQuantidadeAtual(int quantidadeAtual) { this.quantidadeAtual = quantidadeAtual; }
    public String getFornecedor() { return fornecedor; }
    public void setFornecedor(String fornecedor) { this.fornecedor = fornecedor; }
    public StatusLote getStatus() { return status; }
    public void setStatus(StatusLote status) { this.status = status; }
    public LocalDateTime getCriadoEm() { return criadoEm; }
    public void setCriadoEm(LocalDateTime criadoEm) { this.criadoEm = criadoEm; }
}
