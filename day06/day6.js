const input = await Deno.readTextFile("input.txt")

const hasDup = (arr) => {
 const  a = new Array(26).fill(0);
  arr.map((e)=>{
    a[e.charCodeAt(0)-'a'.charCodeAt(0)]+=1
  })
  return a.some((e)=> e > 1)
}

let found = false;
input.split("").reduce((a,c,idx,arr) => { 
  if(!hasDup(arr.slice(idx-1,idx+3)) && !found){
    console.log(arr.slice(idx-1,idx+3))
    console.log(idx+3)
    found = true;
  }
})

found = false;
input.split("").reduce((a,c,idx,arr) => { 
  if(!hasDup(arr.slice(idx-1,idx+13)) && !found){
    console.log(arr.slice(idx-1,idx+13))
    console.log(idx+13)
    found = true;
  }
})
