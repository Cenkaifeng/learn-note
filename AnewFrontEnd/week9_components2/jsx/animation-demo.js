import { Timeline, Animation } from "./animation.js";

let tl = new Timeline();

tl.start();

tl.add(new Animation(document.querySelector("#el").style, "transform", 0, 100, 1000, function(){
  
}))