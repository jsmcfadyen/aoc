const input = await Deno.readTextFile("input.txt")
const starting_height = 8

const clean_data = (input) => {
  const yard = Array.from(Array(9), () => new Array(0))
  input.map((e) => 
    e.split("").reduce((a,c,i) => 
      (i-1) % 4 == 0 ?
        a.concat(c) : a 
    ,[])
  ).reverse().map((e) => { 
    e.map((cr,idx) => 
     cr != ' ' ?  
        yard[idx].push(cr) : cr 
    )
  })
  return yard
}

const move = (y, amount, from, to,idx) => {
  // remove from 'from'
  const temp = y[from].splice(-amount)
  // add to 'to'
  y[to] = y[to].concat(temp.reverse())
  return y;
}

const move2 = (y, amount, from, to,idx) => {
  // remove from 'from'
  const temp = y[from].splice(-amount)
  // add to 'to'
  y[to] = y[to].concat(temp)
  return y;
}



const crates = input.split('\n').slice(0,starting_height)
const instructions = input.split('\n').slice(starting_height+2,-1)
let yard;

yard = clean_data(crates)
instructions.map((e,idx) => {
  const w = e.split(" ");
  yard = move(yard,w[1],w[3]-1,w[5]-1,idx)
})
console.log(yard.reduce((a,c)=>a.concat(c[c.length-1]),[]).join(""))

yard = clean_data(crates)
instructions.map((e,idx) => {
  const w = e.split(" ");
  yard = move2(yard,w[1],w[3]-1,w[5]-1,idx)
})
console.log(yard.reduce((a,c)=>a.concat(c[c.length-1]),[]).join(""))

