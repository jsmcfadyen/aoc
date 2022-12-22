const file = await Deno.readTextFile('input.txt');
import _ from 'https://deno.land/x/lodash@4.17.15-es/lodash.js';

const max_x = 800;
const max_y = 800;

// printing functions
const print = () => {
  for (let i = 0; i <= g_floor;i++){
    let curr = "";
    for (let j = g_min_x-70; j <= g_max_x+70;j++){
      if(i == 0 && j == 500){
        curr += 'S'
      }else{
        curr += grid[j][i]
      }
    }
    console.log(curr)
  }
}

const draw = (x1,y1,x2,y2)=>{
  const min_x = Math.min(x1,x2);
  const min_y = Math.min(y1,y2);
  const max_x = Math.max(x1,x2);
  const max_y = Math.max(y1,y2);
  if (x1 == x2){
    // vertical
    for (let i = min_y; i <= max_y;i++){
      grid[x1][i] = '#';
    }
  }else{
    //horizontal
    for (let i = min_x; i <= max_x;i++){
      grid[i][y1] = '#';
    }
  }
}

// clean input
const rock_pieces = file.split('\n').slice(0,-1).map((s)=>s.split(' -> ').map((c)=>c.split(',').map(Number)));
//console.log(rock_pieces)

// find max and min window
const flattened_rocks = rock_pieces.flat();
const g_max_x = flattened_rocks.reduce((a,c)=>{
  return Math.max(a,c[0]);
},-1);
const g_max_y = flattened_rocks.reduce((a,c)=>{
  return Math.max(a,c[1]);
},-1);
const g_min_x= flattened_rocks.reduce((a,c)=>{
  return Math.min(a,c[0]);
},9001);
const g_min_y = flattened_rocks.reduce((a,c)=>{
  return Math.min(a,c[1]);
},9001);

const g_floor = g_max_y + 2;
console.log(g_floor)
let grid = Array.from(Array(max_y),()=>new Array(max_x).fill('.'))

// drawing time
rock_pieces.map((r) =>{
  for (let i = 1; i < r.length; i++){
    draw(r[i][0],r[i][1],r[i-1][0],r[i-1][1])
  }
});
draw(0,g_floor,799,g_floor);


print()

const at_rest = (c) => {
  const S = grid[  c[0]   ][ c[1]+1 ];
  const SW = grid[ c[0]-1 ][ c[1]+1 ];
  const SE = grid[ c[0]+1 ][ c[1]+1 ];
  if ([S,SW,SE].filter((v) => v== '#' || v == 'o').length == 3){
    return true; 
  }
  else return false
}


let simulating = true;
let count = 0;
const start = [500,0]
while (simulating){
  let moving = true;
  let curr = [...start];
  const move = () => {
    const S = grid[  curr[0]   ][ curr[1]+1 ];
    const SW = grid[ curr[0]-1 ][ curr[1]+1 ];
    const SE = grid[ curr[0]+1 ][ curr[1]+1 ];
    if (S == '.'){
      curr[1]++;
    }
    else if (S == '#' || S == 'o'){
      if(SW == '.'){
        curr[1]++;
        curr[0]--;
      }else if (SE == '.'){
        curr[1]++;
        curr[0]++;
      }
    }
  }
  while(moving){
    if (at_rest(curr)){
      grid[curr[0]][curr[1]] = 'o';
      moving = false;
    }else{
      move();
    }
  }
  count++;
  console.log(count);
  if (count % 10 == 0){
    print()
  }
  if (grid[start[0]][start[1]] == 'o'){
    simulating = false;
  }
}
