import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-dialog",
  templateUrl: "./dialog.component.html",
  styleUrls: ["./dialog.component.css"],
})
export class DialogComponent {
  constructor(
    private router: Router,
    private tostr: ToastrService,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onButtonClick(response: any): void {
    this.dialogRef.close(response);
  }
}
