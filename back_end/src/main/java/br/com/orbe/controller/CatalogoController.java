package br.com.orbe.controller;

import br.com.orbe.dto.ApiResponse;
import br.com.orbe.model.Lote;
import br.com.orbe.model.Vacina;
import br.com.orbe.service.CatalogoService;

import java.util.List;

public final class CatalogoController {

    private final CatalogoService service;

    public CatalogoController(CatalogoService service) {
        this.service = service;
    }

    public ApiResponse<List<Vacina>> vacinasDisponiveis() {
        return ApiResponse.ok(service.listarVacinasDisponiveis());
    }

    public ApiResponse<Vacina> salvarVacina(Vacina vacina) {
        return ApiResponse.ok(service.salvarVacina(vacina));
    }

    public ApiResponse<Lote> salvarLote(Lote lote) {
        return ApiResponse.ok(service.salvarLote(lote));
    }
}
