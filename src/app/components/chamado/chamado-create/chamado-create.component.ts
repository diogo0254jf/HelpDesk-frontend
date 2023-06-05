import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Chamado } from "src/app/models/chamado";
import { Cliente } from "src/app/models/cliente";
import { Tecnico } from "src/app/models/tecnico";
import { ChamadoService } from "src/app/services/chamado-service";
import { Clienteservice } from "src/app/services/cliente.service";
import { TecnicoService } from "src/app/services/tecnico.service";

@Component({
  selector: "app-chamado-create",
  templateUrl: "./chamado-create.component.html",
  styleUrls: ["./chamado-create.component.css"],
})
export class ChamadoCreateComponent implements OnInit {
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

  clientes: Cliente[] = [];
  tecnicos: Tecnico[] = [];

  prioridade: FormControl = new FormControl(null, Validators.required);
  status: FormControl = new FormControl(null, Validators.required);
  titulo: FormControl = new FormControl(null, Validators.required);
  observacoes: FormControl = new FormControl(null, Validators.required);
  tecnico: FormControl = new FormControl(null, Validators.required);
  cliente: FormControl = new FormControl(null, Validators.required);

  constructor(
    private clienteService: Clienteservice,
    private tecnicoService: TecnicoService,
    private service: ChamadoService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.findAllClientes();
    this.findAllTecnicos();
  }

  validaCampos(): boolean {
    return (
      this.titulo.valid &&
      this.status.valid &&
      this.prioridade.valid &&
      this.tecnico.valid &&
      this.cliente.valid &&
      this.observacoes.valid
    );
  }

  findAllClientes(): any {
    this.clienteService.findAll().subscribe((res) => {
      this.clientes = res;
    });
  }

  findAllTecnicos(): any {
    this.tecnicoService.findAll().subscribe((res) => {
      this.tecnicos = res;
    });
  }

  create(): void {
    this.service.create(this.chamado).subscribe(
      (res) => {
        this.toastr.success("Chamado criado com sucesso!", "Sucesso");
        this.router.navigate(["chamados"]);
      },
      (err) => {
        err.error.errors.forEach((element: any) => {
          this.toastr.error(element.message, err.error.message);
        });
      }
    );
  }
}
