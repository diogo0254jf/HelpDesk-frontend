import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Tecnico } from "src/app/models/tecnico";
import { TecnicoService } from "src/app/services/tecnico.service";

@Component({
  selector: "app-tecnico-update",
  templateUrl: "./tecnico-update.component.html",
  styleUrls: ["./tecnico-update.component.css"],
})
export class TecnicoUpdateComponent implements OnInit {
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
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.tecnico.id = this.route.snapshot.paramMap.get("id")!;
    this.findById(this.tecnico.id);
  }

  update(): void {
    console.log(this.tecnico);
    this.service.update(this.tecnico).subscribe(
      () => {
        this.toast.success("Técnico atualizado com sucesso!", "Sucesso!");
      },
      (ex) => {
        this.toast.error(ex.error.message, ex.error.error);
        console.log(ex.error);
      }
    );
  }

  addPerfil(perfil: any) {
    if (!this.tecnico.perfis.includes(perfil)) {
      this.tecnico.perfis?.push(perfil);
    } else {
      this.tecnico.perfis?.splice(this.tecnico.perfis.indexOf(perfil), 1);
    }
  }

  validaCampos(): boolean {
    return (
      this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid
    );
  }

  findById(id: any): void {
    this.service.findById(id).subscribe((res) => {
      this.tecnico = res;
    });
  }
}
