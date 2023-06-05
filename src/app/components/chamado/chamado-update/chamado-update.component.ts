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
  selector: "app-chamado-update",
  templateUrl: "./chamado-update.component.html",
  styleUrls: ["./chamado-update.component.css"],
})
export class ChamadoUpdateComponent implements OnInit {
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
    this.chamado.id = this.route.snapshot.paramMap.get("id")!;
    this.findById(this.chamado.id);
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

  findById(id: String): any {
    this.service.findById(id).subscribe((res) => {
      this.chamado = res;
      this.cliente.setValue(this.chamado.cliente); // Definir o valor padrão do FormControl
      this.tecnico.setValue(this.chamado.tecnico); // Definir o valor padrão do FormControl
    });
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

  update(): void {
    this.service.update(this.chamado).subscribe(
      (res) => {
        this.toastr.success("Chamado foi atualizado com sucesso!", "Sucesso");
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
