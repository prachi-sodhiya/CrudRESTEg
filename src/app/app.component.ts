import { element } from 'protractor';

import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { AlbumService } from './album.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Ialbum } from './album';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Iuser } from './user';
import  jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { image } from 'html2canvas/dist/types/css/types/image';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
 // public album = [] ;
  //const album_data: Ialbum[];
  displayData: boolean;
  user: Iuser[] = [];

  dataSource;
  dataSource1;
   album: Ialbum[] = [];
  displayedColumns: string[] = ['albumId', 'id', 'title', 'url', 'thumbnailUrl', 'updateData'];

  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  

  constructor(private albumService: AlbumService){}

  ngOnInit()
  {
    //this.albumService.getalbum().subscribe(data => this.album = data);
    //console.log;

    
      this.albumService.getalbum()
        .subscribe((album: Ialbum[]) => {
          this.album = album;
          this.dataSource = new MatTableDataSource(album);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;

          this.dataSource1 = new MatTableDataSource(album);
        });

        //this.getAlbumById(5);
    
    
  }
  applyFilter(filterValue: string)
  {
    
  this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  fetchId = 1;

   getUserById()
  {
    this.albumService.getUserByid(this.fetchId).subscribe(data => {
      this.user = data;
     this.displayData=true;
    });
  }
  
  // download()
  // {
  //   var element = document.getElementById('table')
  //   html2canvas(element).then((canvas) => 
  //   {
  //     console.log(canvas)
  //     var imgData = canvas.toDataURL('image/png')
  //     var doc = new jspdf()
  //     var imgHeight = canvas.height * 208 / canvas.width;
  //     doc.addImage(imgData, 0, 0, 208, imgHeight)
  //     doc.save("image.pdf");

  //   })
  // }

 // items = [{ title: 'first' }, { title: 'second' }] // Content of the pages
  // counter: number
  // length: number
  // pdf: jspdf

  // downloadPDF() {
  //   this.pdf = new jspdf('p', 'mm', 'a4') // A4 size page of PDF
  //   this.length = this.dataSource.length
  //   this.counter = 0

  //   this.generatePDF()
  // }

  // generatePDF() {
  //   var data = document.getElementById('pdf' + this.counter)

  //   html2canvas(data, {
  //     scale: 3 // make better quality ouput
  //   }).then((canvas) => {
  //     this.counter++

  //     // Few necessary setting options
  //     var imgWidth = 208
  //     var imgHeight = (canvas.height * imgWidth) / canvas.width

  //     const contentDataURL = canvas.toDataURL('image/png')
  //     var position = 0
  //     this.pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)

  //     // Control if new page needed, else generate the pdf
  //     if (this.counter < this.length) {
  //       this.pdf.addPage()
  //       //this.getLetter()
  //     } else {
  //       this.pdf.save('users.pdf') // Generated PDF
  //       return true
  //     }
  //   })
  // }
  // element = document.getElementById('table')
  generatePdf(dataSource1) {
    html2canvas(dataSource1, { allowTaint: true }).then(canvas => {
     let HTML_Width = canvas.width;
     let HTML_Height = canvas.height;
     let top_left_margin = 15;
     let PDF_Width = HTML_Width + (top_left_margin * 2);
     let PDF_Height = (PDF_Width * 1.5) + (top_left_margin * 2);
     let canvas_image_width = HTML_Width;
     let canvas_image_height = HTML_Height;
     let totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;
     canvas.getContext('2d');
     let imgData = canvas.toDataURL("image/jpeg", 1.0);
     let pdf = new jspdf('p', 'pt', [PDF_Width, PDF_Height]);
     pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);
     for (let i = 1; i <= totalPDFPages; i++) {
       pdf.addPage([PDF_Width, PDF_Height], 'p');
       pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height * i) + (top_left_margin * 4), canvas_image_width, canvas_image_height);
     }
      pdf.save("HTML-Document.pdf");
   });
 }

}
