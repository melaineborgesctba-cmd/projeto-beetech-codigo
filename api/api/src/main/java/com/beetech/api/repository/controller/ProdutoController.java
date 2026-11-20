package com.beetech.api.repository.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.beetech.api.model.Produto;
import com.beetech.api.repository.ProdutoRepository;

@RestController
@RequestMapping("/api/produtos")
@CrossOrigin(origins = "*") // Permite que o aplicativo React Native aceda à API sem erros de CORS
public class ProdutoController {

    private final ProdutoRepository produtoRepository;

    public ProdutoController(ProdutoRepository produtoRepository) {
        this.produtoRepository = produtoRepository;
    }

    @GetMapping
    public List<Produto> listarTodos() {
        return produtoRepository.findAll();
    }
}