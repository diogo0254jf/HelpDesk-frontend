import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Cliente } from "src/app/models/cliente";
import { Clienteservice } from "src/app/services/cliente.service";
import { DialogComponent } from "../../dialog/dialog.component";

@Component({
  selector: "app-cliente-delete",
  templateUrl: "./cliente-delete.component.html",
  styleUrls: ["./cliente-delete.component.css"],
})
export class ClienteDeleteComponent implements OnInit {
  cliente: Cliente = {
    id: "",
    nome: "",
    cpf: "",
    email: "",
    senha: "",
    perfis: [],
    dataCriacao: "",
  };

  constructor(
    private service: Clienteservice,
    private toast: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cliente.id = this.route.snapshot.paramMap.get("id")!;
    this.findById(this.cliente.id);
  }

  findById(id: any): void {
    this.service.findById(id).subscribe((res) => {
      res.perfis = [];
      this.cliente = res;
    });
  }

  delete(): void {
    this.service.delete(this.cliente.id).subscribe(
      () => {
        this.toast.success("Técnico excluido com sucesso!", "Sucesso!");
        this.router.navigate(["Clientes"]);
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
          description: "Depois de excluído, não será possível recuperar.",
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
      this.router.navigate(["Clientes"]);
    });
  }
}
