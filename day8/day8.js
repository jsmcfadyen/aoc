const data = await Deno.readTextFile('input.txt');
import {
 zip
} from "https://deno.land/x/lodash@4.17.15-es/lodash.js";

const d = data.split('\n').slice(0,-1).map((e)=>e.split("").map(Number))

// left view
const l_v = d.map((r)=>{
  let maxSoFar = -1;
  return r.map((e)=>
    {
      if (e > maxSoFar){ 
        maxSoFar = e;
        return 1;
    }else{
      return 0;
    }
    })
})

// right view
const r_v = d.map((r)=>{
  let maxSoFar = -1;
  return r.slice(0).reverse().map((e)=>
    {
      if (e > maxSoFar){ 
        maxSoFar = e;
      return 1;
    }else{
      return 0;
    }
    }).slice(0).reverse()
})

//transpose
const d2 = zip(...d);
const u_v2 = d2.map((r)=>{
  let maxSoFar = -1;
  return r.map((e)=>
    {
      if (e > maxSoFar){ 
        maxSoFar = e;
        return 1;
    }else{
      return 0;
    }
    })
})
const d_v2 = d2.map((r)=>{
  let maxSoFar = -1;
  return r.slice(0).reverse().map((e)=>
    {
      if (e > maxSoFar){ 
        maxSoFar = e;
      return 1;
    }else{
      return 0;
    }
    }).slice(0).reverse()
})

// untranspose
const d_v = zip(...d_v2).map((e)=>e.slice(0));
const u_v = zip(...u_v2).map((e)=>e.slice(0));


// calc pt 1
let count = 0;
for (let i = 0;i<d.length;i++){
  for (let j= 0; j<d[0].length;j++){
    if (l_v[i][j] || r_v[i][j] || d_v[i][j] || u_v[i][j]){
      count++;
    }
  }
}
console.log(count)

// pt 2
const ss = (i,j) =>{
  let l = 0;
  let r = 0;
  let u = 0;
  let down = 0;
  const h = d[i][j]
  for(let c = i+1; c < d.length; c++){
    down++;
    if (d[c][j] >= h){
      break;
    }
  }
  for(let c = j+1; c < d[0].length; c++){
    r++;
    if (d[i][c] >= h){
      break;
    }
  }

  for(let c = i-1; c >= 0; c--){
    u++;
    if (d[c][j] >= h){
      break;
    }
  }
  for(let c = j-1; c >= 0; c--){
    l++;
    if (d[i][c] >= h){
      break;
    }
  }
  return u * l * r * down;
}

let m = -1;
for (let i = 0; i < d.length;i++){
  for(let j = 0; j < d[0].length;j++){
    m = Math.max(m, ss(i,j));
  }
}
console.log(m)

