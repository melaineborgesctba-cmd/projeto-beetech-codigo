package com.beetech.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.beetech.api.model.Produto;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {
}