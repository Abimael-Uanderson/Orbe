package br.com.orbe.dao;

import java.util.List;
import java.util.Optional;

public interface GenericDao<T, ID> {

    T salvar(T entidade);

    T atualizar(T entidade);

    Optional<T> buscarPorId(ID id);

    List<T> listarTodos();

    boolean excluir(ID id);
}
