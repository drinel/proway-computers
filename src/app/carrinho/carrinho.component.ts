import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarrinhoService } from '../carrinho.service';
import { IProdutoCarrinho } from '../produtos/produtos';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {

    itensCarrinho: IProdutoCarrinho[] = [];
    total = 0;

  constructor(public carrinho: CarrinhoService, private router: Router) { }

  ngOnInit(): void {
    this.itensCarrinho = this.carrinho.obtemCarrinho();
    this.calcularTotal();

  }

  calcularTotal(){
      this.total = this.itensCarrinho.reduce((prev, curr) => prev + (curr.preco * curr.quantidade), 0);
  }

  removerProduto(produtoId: number){
    this.itensCarrinho = this.itensCarrinho.filter(item => item.id !== produtoId);
    this.carrinho.removerProdutoCarrinho(produtoId);
    this.calcularTotal();
  }

  comprar(){
    alert("Compra finalizada com sucesso.");
    this.carrinho.limparCarrinho();
    this.router.navigate(["produtos"]);

  }

}
