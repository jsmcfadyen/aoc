const input = await  Deno.readTextFile("input.txt");
const data = input.split('\n');

function H (x,y) {
  this.x = x;
  this.y = y;
}
function T (x,y) {
  this.x = x;
  this.y = y;
}

let rope = Array.from(Array (10), () => new H(0,0));
let sets = Array.from(Array (10), () => new Set());

const isTouching = (h,t) =>{
  return Math.abs(h.x - t.x) <= 1 && Math.abs(h.y - t.y) <= 1 
}


const move_closer= (h,t,i) =>{
  if (!isTouching(h,t)){
    if (h.y > t.y){
      t.y++;
    }else if (h.y < t.y){
      t.y--;
    }

    if (h.x > t.x){
      t.x++;
    }else if (h.x < t.x){
      t.x--;
    }
  }
  sets[i].add(JSON.stringify(t))
}

const parse = (ins) =>{
  if (ins[0] == "R"){
    for (let i =0; i < parseInt(ins[1]); i++){
      rope[0].x++;
      for (let j = 1; j < 10; j++){
        move_closer(rope[j-1],rope[j],j);
      }
    }
  }
  if (ins[0] == "L"){
    for (let i =0; i < parseInt(ins[1]); i++){
      rope[0].x--;
      for (let j = 1; j < 10; j++){
        move_closer(rope[j-1],rope[j],j);
      }
    }
  }
  if (ins[0] == "U"){
    for (let i =0; i < parseInt(ins[1]); i++){
      rope[0].y++;
      for (let j = 1; j < 10; j++){
        move_closer(rope[j-1],rope[j],j);
      }
    }
  }
  if (ins[0] == "D"){
    for (let i =0; i < parseInt(ins[1]); i++){
      rope[0].y--;
      for (let j = 1; j < 10; j++){
        move_closer(rope[j-1],rope[j],j);
      }
    }
  }
}

data.map((i)=>{
  parse(i.split(' '))
})
// console.log(sets[9].size)
console.log(sets[9])


