const file = await Deno.readTextFile("input.txt")

const grid = file.split('\n').map((s)=>s.split('')).slice(0,-1);
const start = Array.from(Array(0),()=>Array(2));
const end = new Array(2)

const g = grid.map((a)=>a.map((l)=>l.toLowerCase().charCodeAt(0)-'a'.charCodeAt(0)));
for (let i = 0; i < grid.length;i++){
  for(let j = 0; j < grid[0].length;j++){
    if (grid[i][j] == 'S'){
      start.push([i,j]);
      g[start[0][0]][start[0][1]] = 0;
    }
    else if (grid[i][j] == 'a'){
      start.push([i,j])
    }
    else if (grid[i][j] == 'E'){
      end[0] = i;
      end[1] = j;
    } }
}

g[end[0]][end[1]] = 25;

const answers = []

for (let a_count = 0; a_count < start.length;a_count++){
  let q = [];
  const seen = new Set();
  const prev = new Map();
  q.push(start[a_count]);
  seen.add(start[a_count].toString())

  const enqueue = (next,curr) =>{
    if(next[0] >= g.length || next[0] < 0 || next[1] >= g[0].length || next[1] < 0){
      return;
    }
    if(g[next[0]][next[1]] - g[curr[0]][curr[1]] > 1 ){
      return 
    }
    if(seen.has(next.toString())){
      return;
    }else{
      seen.add(next.toString())
      prev.set(next.toString(),curr)
      q.push(next)
    }
  }

  let count = 0;
  while(q.length > 0){
    let curr = q.shift();
    count++;
    if(curr[0] == end[0] && curr[1] == end[1]){
      // found
      break;
    }
    //add edges to queue
    enqueue([curr[0]+1,curr[1]],curr);
    enqueue([curr[0],curr[1]+1],curr);
    enqueue([curr[0]-1,curr[1]],curr);
    enqueue([curr[0],curr[1]-1],curr);
  }

  let curr = end;
  let ans = [end]
  while(curr != start){
    if(curr == undefined){
      break;
    }
    curr = prev.get(curr.toString())
    ans = ans.concat([curr])
  }
  ans = ans.reverse()
  answers.push(ans.length-1)
}
console.log(answers.filter((e)=>e!=1).reduce((a,c)=>Math.min(a,c),999-1))
