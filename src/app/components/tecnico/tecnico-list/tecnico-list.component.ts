import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Tecnico } from "src/app/models/tecnico";
import { TecnicoService } from "src/app/services/tecnico.service";

@Component({
  selector: "app-tecnico-list",
  templateUrl: "./tecnico-list.component.html",
  styleUrls: ["./tecnico-list.component.css"],
})
export class TecnicoListComponent implements OnInit {
  ELEMENT_DATA: Tecnico[] = [];

  displayedColumns: string[] = [
    "position",
    "name",
    "weight",
    "symbol",
    "actions",
  ];

  constructor(private service: TecnicoService) {}

  dataSource = new MatTableDataSource<Tecnico>(this.ELEMENT_DATA);

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
      this.dataSource = new MatTableDataSource<Tecnico>(res);
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
