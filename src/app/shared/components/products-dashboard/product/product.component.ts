import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { Iproduct } from 'src/app/shared/models/product';
import { ProductsService } from 'src/app/shared/services/products.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { GetConfirmComponent } from './get-confirm/get-confirm.component';
import { config } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  productId !: string
  productObj !: Iproduct
  constructor(
    private _route: ActivatedRoute,
    private _productService: ProductsService,
    private _router: Router,
    private _snackBar: SnackBarService,
    private _matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getProduct()
  }

  getProduct() {
    this._route.params.subscribe((param: Params )=> {
      this.productId = param['id']
         if (this.productId) {
      this._productService.fetchProductById(this.productId)
        .subscribe({
          next: res => {
            this.productObj = res
          },
          error: err => {
            console.log(err);
          }
        })
      }   
    })
  }

  onRemove() {
    let config = new MatDialogConfig()
    config.width = '350px'
    config.disableClose = true
    config.data = `Are you sure, you want to remove the product with id ${this.productId} ?`
   let matR = this._matDialog.open(GetConfirmComponent, config)
   matR.afterClosed().subscribe(confirm => {
    if(confirm){
      this._productService.onRemove(this.productId)
    .subscribe({
      next: res => {
        this._snackBar.openSnackBar(res.msg)
        this._router.navigate(['products'])
      },
      error: err => {
        this._snackBar.openSnackBar(err.msg)
      }
    })
    }
   })
  }

  redirectToEdit(){
    this._router.navigate(['edit'], {
      queryParamsHandling : 'preserve',
      relativeTo : this._route
    })
  }

}



