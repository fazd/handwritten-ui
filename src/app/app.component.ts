import { Component } from '@angular/core';
import { RequestService } from './request.service'; 
import axios from 'axios';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hand-written-ui';
  public rs : RequestService;

  public canvas:any;
  public card: any;
  public ctx:any;
  public flag = false;
  public prevX = 0;
  public currX = 0;
  public prevY = 0;
  public currY = 0;
  public dot_flag = false;
  public widthLine = 0;
  public width = 0;
  public height = 0;
  public selected= 8;
  public guessed = 0;
  public probability = 0;
  
  constructor(){

  }

  ngOnInit() {
    this.canvas = document.getElementById('mycanvas');  
    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.width;
    this.height = this.canvas.height;
  }
  
  getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}

  mouseMove(event ){
    
    this.findxy('move', event);
  }
   
  mouseDown(event){
    this.findxy('down', event);
  }

  mouseUp(event){
    this.findxy('up', event);
  }

  mouseLeave(event){
    this.findxy('out', event);
  }


  draw() {
      this.ctx.beginPath();
      this.ctx.moveTo(this.prevX, this.prevY);
      this.ctx.arc(this.currX,this.currY,this.selected,0,2*Math.PI,false);
      //this.ctx.lineTo(this.currX, this.currY);
      this.ctx.fillStyle = '#ffffff';
      //this.ctx.strokeStyle = '#ffffff';
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.closePath();
  }
    
  erase() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    
  }

  findxy(res, e) {
    //console.log('(',e.clientX,',',e.clientY,')');
    //console.log('(',this.canvas.offsetLeft,',',this.canvas.offsetTop,')');
    if (res == 'down') {
        this.prevX = this.currX;
        this.prevY = this.currY;
        const a = this.getMousePos(this.canvas,e);
        this.currX = a.x;
        this.currY = a.y;
        console.log('(',this.currX,',',this.currY,')');
        this.flag = true;
        this.dot_flag = true;
        if (this.dot_flag) {
          this.ctx.beginPath();
          this.ctx.arc(this.currX,this.currY,this.selected,0,2*Math.PI,false);
          // this.ctx.lineTo(this.currX, this.currY);
          this.ctx.fillStyle = '#ffffff';
          this.ctx.strokeStyle = '#ffffff';
          this.ctx.fill();
          //this.ctx.stroke();
          this.ctx.closePath();
          this.dot_flag = false;
        }
    }
    if (res == 'up' || res == "out") {
      this.flag = false;
    }
    if (res == 'move') {
      if (this.flag) {
        this.prevX = this.currX;
        this.prevY = this.currY;
        const a = this.getMousePos(this.canvas,e);
        this.currX = a.x;
        this.currY = a.y;
        this.draw();
      }
    }
  }

  create(){
    const data = this.canvas.toDataURL("image/jpeg");
    console.log(data);
    const body = {
      image : data
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*'},
    }
    axios.post('https://digits-recognition-ml.herokuapp.com/predict-digit',body, config).then((response) => {
    console.log(response);
      this.guessed = response.data.prediction;
      this.probability = response.data.probability;
    }, (error) => {
      console.log(error);
    });


  }


}
