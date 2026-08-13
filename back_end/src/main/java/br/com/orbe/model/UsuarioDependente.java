package br.com.orbe.model;

import java.time.LocalDateTime;

public class UsuarioDependente {

    private Long id;
    private Long usuarioId;
    private Long dependenteId;
    private String parentesco;
    private boolean responsavelLegal;
    private boolean podeAgendar;
    private boolean podeVisualizarCarteira;
    private LocalDateTime criadoEm;

    public UsuarioDependente() {
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getUsuarioId() { return usuarioId; }
    public void setUsuarioId(Long usuarioId) { this.usuarioId = usuarioId; }
    public Long getDependenteId() { return dependenteId; }
    public void setDependenteId(Long dependenteId) { this.dependenteId = dependenteId; }
    public String getParentesco() { return parentesco; }
    public void setParentesco(String parentesco) { this.parentesco = parentesco; }
    public boolean isResponsavelLegal() { return responsavelLegal; }
    public void setResponsavelLegal(boolean responsavelLegal) { this.responsavelLegal = responsavelLegal; }
    public boolean isPodeAgendar() { return podeAgendar; }
    public void setPodeAgendar(boolean podeAgendar) { this.podeAgendar = podeAgendar; }
    public boolean isPodeVisualizarCarteira() { return podeVisualizarCarteira; }
    public void setPodeVisualizarCarteira(boolean podeVisualizarCarteira) { this.podeVisualizarCarteira = podeVisualizarCarteira; }
    public LocalDateTime getCriadoEm() { return criadoEm; }
    public void setCriadoEm(LocalDateTime criadoEm) { this.criadoEm = criadoEm; }
}
