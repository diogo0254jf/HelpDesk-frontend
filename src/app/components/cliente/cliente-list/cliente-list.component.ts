import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Cliente } from "src/app/models/cliente";
import { Clienteservice } from "src/app/services/cliente.service";

@Component({
  selector: "app-cliente-list",
  templateUrl: "./cliente-list.component.html",
  styleUrls: ["./cliente-list.component.css"],
})
export class ClienteListComponent implements OnInit {
  ELEMENT_DATA: Cliente[] = [];

  displayedColumns: string[] = [
    "position",
    "name",
    "weight",
    "symbol",
    "actions",
  ];

  constructor(private service: Clienteservice) {}

  dataSource = new MatTableDataSource<Cliente>(this.ELEMENT_DATA);

  ngOnInit(): void {
    this.findAll();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  findAll() {
    this.service.findAll().subscribe((res) => {
      this.ELEMENT_DATA = res;
      this.dataSource = new MatTableDataSource<Cliente>(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.filter = "";
      this.dataSource.paginator._intl.itemsPerPageLabel = "Itens por página";
      this.dataSource.paginator._intl.firstPageLabel = "Primeira página";
      this.dataSource.paginator._intl.lastPageLabel = "Última página";
      this.dataSource.paginator._intl.nextPageLabel = "Próxima página";
      this.dataSource.paginator._intl.previousPageLabel = "Página anterior";
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
