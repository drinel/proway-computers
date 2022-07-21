import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarrinhoService } from 'src/app/carrinho.service';
import { NotificacaoService } from 'src/app/notificacao.service';
import { ProdutosService } from 'src/app/produtos.service';
import { IProduto, IProdutoCarrinho } from '../produtos';

@Component({
  selector: 'app-detalhes-produto',
  templateUrl: './detalhes-produto.component.html',
  styleUrls: ['./detalhes-produto.component.css']
})
export class DetalhesProdutoComponent implements OnInit {

  constructor(private produtosService: ProdutosService, private route: ActivatedRoute, private notificacao: NotificacaoService, private carrinho: CarrinhoService) { }

  produto: IProduto | undefined;
  quantidade = 1;

  ngOnInit(): void {
    const routeParamps = this.route.snapshot.paramMap.get("id");
    const produtoId = Number(routeParamps);
    this.produto = this.produtosService.getOne(produtoId);
  }


  adicionarAoCarrinho(){
    this.notificacao.notificar("O produto foi adicionado ao carrinho");
    const produto: IProdutoCarrinho = {
      ...this.produto!,
      quantidade: this.quantidade
    }
    this.carrinho.adicionarAoCarrinho(produto);
  }
}
