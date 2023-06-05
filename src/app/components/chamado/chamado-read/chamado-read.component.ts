import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Chamado } from "src/app/models/chamado";
import { ChamadoService } from "src/app/services/chamado-service";

@Component({
  selector: "app-chamado-read",
  templateUrl: "./chamado-read.component.html",
  styleUrls: ["./chamado-read.component.css"],
})
export class ChamadoReadComponent implements OnInit {
  chamado: Chamado = {
    prioridade: "",
    status: "",
    titulo: "",
    observacoes: "",
    tecnico: "",
    cliente: "",
    nomeTecnico: "",
    nomeCliente: "",
  };

  constructor(private service: ChamadoService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.chamado.id = this.route.snapshot.paramMap.get("id")!;
    this.findById(this.chamado.id);
  }

  findById(id: String): any {
    this.service.findById(id).subscribe((res) => {
      this.chamado = res;
    });
  }

  retornaStatus(status: any) {
    switch (status) {
      case 0:
        return "ABERTO";
      case 1:
        return "EM ANDAMENTO";
      default:
        return "ENCERRADO";
    }
  }

  retornaPrioridade(prioridade: any) {
    switch (prioridade) {
      case 0:
        return "BAIXA";
      case 1:
        return "MEDIA";
      default:
        return "ALTA";
    }
  }
}
