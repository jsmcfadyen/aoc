import {
  chunk,
  intersection,
  min
} from "https://deno.land/x/lodash@4.17.15-es/lodash.js";
const text = await Deno.readTextFile("./input.txt");

// true if a within x
const whollyWithin = (a,b,x,y)=>{
  return a >= x && b <= y;
}


const overlap = (a,b,x,y)=>{
  if (min([a,x]) == a){
    return b >= x;
  }else if (min([a,x]) == x){
    return a <= y;
  }
}


const data = chunk(text.split('\n').map((e) => e.split(',').map((e)=>e.split('-')).flat()).flat().map((e)=>parseInt(e)),4)


console.log(data.reduce((a,c)=>{
    if (whollyWithin(c[0],c[1],c[2],c[3]) || whollyWithin(c[2],c[3],c[0],c[1]) ){
      return a + 1;
    }else{
      return a
    }
  },0))


console.log(data.reduce((a,c)=>{
    if (whollyWithin(c[0],c[1],c[2],c[3]) || whollyWithin(c[2],c[3],c[0],c[1]) || overlap(c[0],c[1],c[2],c[3])){
      return a + 1;
    }else{
      return a
    }
  },0))
 
