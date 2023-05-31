import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
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

  nome: FormControl = new FormControl(null, Validators.minLength(3));
  cpf: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(3));

  constructor(
    private service: TecnicoService,
    private toast: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.tecnico.id = this.route.snapshot.paramMap.get("id")!;
  }

  delete(): void {
    this.service.delete(this.tecnico.id).subscribe(
      () => {
        this.toast.success("Técnico atualizado com sucesso!", "Sucesso!");
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
        width: "450px",
        data: {
          title: "Deseja realmente excluir o técnico?",
          description:
            "Caso o técnico seja excluído, não será possível recuperá-lo.",
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
