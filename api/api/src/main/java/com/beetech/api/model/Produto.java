package com.beetech.api.model;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "produtos_store")
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String descricao;
    private BigDecimal preco;

    @Column(name = "quantidade_estoque")
    private Integer quantidadeEstoque;

    @Column(name = "foto_produto")
    private String fotoProduto;

    @Column(name = "peso_kg")
    private BigDecimal pesoKg;

    @Column(name = "cep_origem")
    private String cepOrigem;
}