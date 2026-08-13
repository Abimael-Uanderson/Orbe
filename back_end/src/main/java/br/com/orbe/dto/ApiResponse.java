package br.com.orbe.dto;

public record ApiResponse<T>(
        boolean sucesso,
        String mensagem,
        T dados
) {

    public static <T> ApiResponse<T> ok(T dados) {
        return new ApiResponse<>(true, null, dados);
    }

    public static <T> ApiResponse<T> criado(String mensagem, T dados) {
        return new ApiResponse<>(true, mensagem, dados);
    }
}
