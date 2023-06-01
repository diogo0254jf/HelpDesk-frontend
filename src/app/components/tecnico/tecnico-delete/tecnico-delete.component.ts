import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Tecnico } from "src/app/models/tecnico";
import { TecnicoService } from "src/app/services/tecnico.service";
import { DialogComponent } from "../../dialog/dialog.component";

@Component({
  selector: "app-tecnico-delete",
  templateUrl: "./tecnico-delete.component.html",
  styleUrls: ["./tecnico-delete.component.css"],
})
export class TecnicoDeleteComponent implements OnInit {
  tecnico: Tecnico = {
    id: "",
    nome: "",
    cpf: "",
    email: "",
    senha: "",
    perfis: [],
    dataCriacao: "",
  };

  constructor(
    private service: TecnicoService,
    private toast: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.tecnico.id = this.route.snapshot.paramMap.get("id")!;
    this.findById(this.tecnico.id);
  }

  findById(id: any): void {
    this.service.findById(id).subscribe((res) => {
      res.perfis = [];
      this.tecnico = res;
    });
  }

  delete(): void {
    this.service.delete(this.tecnico.id).subscribe(
      () => {
        this.toast.success("Técnico excluido com sucesso!", "Sucesso!");
        this.router.navigate(["tecnicos"]);
      },
      (ex) => {
        this.toast.error(ex.error.message, ex.error.error);
      }
    );
  }

  openDialog(): void {
    const dialogRef: MatDialogRef<DialogComponent> = this.dialog.open(
      DialogComponent,
      {
        width: "500px",
        data: {
          title: "Deseja realmente excluir o técnico?",
          description:
            "Depois de excluído, não será possível recuperar.",
          btnText: "Excluir",
          btnCancel: "Cancelar",
        },
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.delete();
        return;
      }
      this.toast.info("Operação cancelada!", "Cancelado");
      this.router.navigate(["tecnicos"]);
    });
  }
}
