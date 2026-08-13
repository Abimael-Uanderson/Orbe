package br.com.orbe.config;

public record DatabaseConfig(String url, String usuario, String senha) {

    public static DatabaseConfig fromEnvironment() {
        return new DatabaseConfig(
                value(
                        "ORBE_DB_URL",
                        "jdbc:mysql://localhost:3306/orbe?useSSL=false&serverTimezone=America/Sao_Paulo"
                ),
                value("ORBE_DB_USER", "root"),
                value("ORBE_DB_PASSWORD", "")
        );
    }

    private static String value(String name, String fallback) {
        String value = System.getenv(name);
        return value == null || value.isBlank() ? fallback : value;
    }
}
