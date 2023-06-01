import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Cliente } from "src/app/models/cliente";
import { Clienteservice } from "src/app/services/cliente.service";

@Component({
  selector: "app-cliente-create",
  templateUrl: "./cliente-create.component.html",
  styleUrls: ["./cliente-create.component.css"],
})
export class ClienteCreateComponent implements OnInit {
  cliente: Cliente = {
    id: "",
    nome: "",
    cpf: "",
    email: "",
    senha: "",
    perfis: [],
    dataCriacao: "",
  };
  nome: FormControl = new FormControl(null, [
    Validators.minLength(3),
    Validators.maxLength(30),
  ]);
  cpf: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, [Validators.email]);
  senha: FormControl = new FormControl(null, [Validators.minLength(3)]);

  constructor(
    private service: Clienteservice,
    private toast: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  create(): void {
    this.service.create(this.cliente).subscribe(
      () => {
        this.toast.success("Técnico cadastrado com sucesso!", "Cadastro");
        this.router.navigate(["Clientes"]);
      },
      (ex) => {
        ex.error.errors.forEach((element: any) => {
          this.toast.error(element.message, ex.error.message);
        });
      }
    );
  }

  addPerfil(perfil: any) {
    if (!this.cliente.perfis.includes(perfil)) {
      this.cliente.perfis?.push(perfil);
    } else {
      this.cliente.perfis?.splice(this.cliente.perfis.indexOf(perfil), 1);
    }
  }

  validaCampos(): boolean {
    return (
      this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid
    );
  }
}
