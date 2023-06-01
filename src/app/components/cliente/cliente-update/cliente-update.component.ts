import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Cliente } from "src/app/models/cliente";
import { Clienteservice } from "src/app/services/cliente.service";

@Component({
  selector: "app-cliente-update",
  templateUrl: "./cliente-update.component.html",
  styleUrls: ["./cliente-update.component.css"],
})
export class ClienteUpdateComponent implements OnInit {
  cliente: Cliente = {
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
    private service: Clienteservice,
    private toast: ToastrService,
    private route: ActivatedRoute,
    private router: Router
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

  update(): void {
    this.service.update(this.cliente).subscribe(
      () => {
        this.toast.success("Técnico atualizado com sucesso!", "Sucesso!");
        this.router.navigate(["Clientes"]);
      },
      (ex) => {
        this.toast.error(ex.error.message, ex.error.error);
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
