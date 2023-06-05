import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Chamado } from "src/app/models/chamado";
import { ChamadoService } from "src/app/services/chamado-service";

@Component({
  selector: "app-chamado-list",
  templateUrl: "./chamado-list.component.html",
  styleUrls: ["./chamado-list.component.css"],
})
export class ChamadoListComponent implements OnInit {
  ELEMENT_DATA: Chamado[] = [];
  ELEMENT_DATAFILTRADO: Chamado[] = [];

  displayedColumns: string[] = [
    "position",
    "titulo",
    "cliente",
    "tecnico",
    "dataAbertura",
    "prioridade",
    "status",
    "actions",
  ];

  constructor(private service: ChamadoService) {}

  dataSource = new MatTableDataSource<Chamado>(this.ELEMENT_DATA);

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.service.findAll().subscribe((resposta) => {
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<Chamado>(this.ELEMENT_DATA);
    });
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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

  findByStatus(status: any) {
    this.ELEMENT_DATAFILTRADO = [];
    this.service.findAll().subscribe((resposta) => {
      resposta.forEach((chamado) => {
        if (chamado.status == status) {
          this.ELEMENT_DATAFILTRADO.push(chamado);
        }
      });
      this.dataSource = new MatTableDataSource<Chamado>(
        this.ELEMENT_DATAFILTRADO
      );
    });
  }

  findByPrioridade(prioridade: any) {
    this.ELEMENT_DATAFILTRADO = [];
    this.service.findAll().subscribe((resposta) => {
      resposta.forEach((chamado) => {
        if (chamado.prioridade == prioridade) {
          this.ELEMENT_DATAFILTRADO.push(chamado);
        }
      });
      this.dataSource = new MatTableDataSource<Chamado>(
        this.ELEMENT_DATAFILTRADO
      );
    });
  }

  cleanFilter() {
    this.findAll();
  }
}
