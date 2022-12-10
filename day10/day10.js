const file = await Deno.readTextFile("input.txt");
const data = file.split('\n').map((e)=>e.split(" ")).slice(0,-1)
const dx_his = new Array(900).fill(0);

// 1 1 1 4 4 -1
let curr_idx = 0;
for (let i = 0; i < data.length; i++){
  if (data[i][0] == 'noop'){
    curr_idx++; 
  }else if (data[i][0] == 'addx'){
    curr_idx+=2;
    dx_his[curr_idx] += parseInt(data[i][1])
  }
}
let curr_val = 1;
const n = dx_his.map((e)=>{
  if (e != 0){
    curr_val += e;
  } 
  return curr_val
})

console.log(dx_his)
console.log(n)

const ans = [n[19],n[59],n[99],n[139],n[179],n[219]];
const mult = [20,60,100,140,180,220];

console.log(ans)
console.log(ans.reduce((a,c,i)=>a+c*mult[i],0))

let pos = 0
let CRT = Array.from(Array(6),()=>new Array(40));
for (let i = 0; i < 6; i++){
  for (let j = 0; j < 40; j++){
    if (Math.abs(n[pos] - pos%40)<=1){
      CRT[i][j] = "#" 
    }else{
      CRT[i][j] = "." 
    }
    pos++
  }
}
CRT.map((e)=>console.log(e.join("")))
