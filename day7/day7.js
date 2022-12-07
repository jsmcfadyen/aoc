const input = await Deno.readTextFile("input.txt")
import {
  min
} from "https://deno.land/x/lodash@4.17.15-es/lodash.js";
const data = input.split('$ ').map((e)=>e.split('\n').slice(0,-1)).slice(1)


//object constructors 
function makeDir(name, files, directories, prev){
  this.name = name 
  this.files = [...files]
  this.directories = [...directories]
  this.prev = prev
}
function file(size,name){
  this.size = size;
  this.name = name;
}

// helper functions
const cd = (dir) => {
  if (dir == '/'){
    root = new makeDir('/',[],[],0);
    curr_dir = root 
  }
  else if (dir == '..'){
    curr_dir = curr_dir.prev
  }else{
    curr_dir = curr_dir.directories.find((e)=>e.name == dir);
  }
}

const read_all = (curr,lvl)=>{
  let print ="- " + curr.name +" (dir)"; 
  let padding = '';
  for(let i = 0; i<lvl;i++){
    padding = "  " + padding
  }
  console.log(padding + print + "\t\ttot: " + curr.tot);
  curr.files.map((f)=>{
    console.log(padding + "  " + f.size + " " + f.name);
  })
  curr.directories.map((d)=>{
    read_all(d,lvl+1);
  })
}


// create tree
let root;
let curr_dir = new makeDir("...",[],[],0);
for (let i = 0; i < data.length; i++){
  if (data[i][0].split(' ')[0] == 'cd'){
    cd(data[i][0].split(' ')[1]) 
  }
  else if (data[i][0].split(' ')[0] == 'ls'){
    const curr_files = data[i].filter((e)=> e!='ls').map((e) =>{
      if(e.split(" ")[0] == 'dir'){
        curr_dir.directories.push(new makeDir(e.split(" ")[1],[],[],curr_dir));
      }else{
        curr_dir.files.push(new file(e.split(" ")[0],e.split(" ")[1]));
      }
    })
  }
}

// post-order traversal
let q = [root]
let q2 = []
while(q.length>0){
  let curr = q.pop();
  q2.push(curr);  
  curr.directories.map((d)=>{
    q.push(d);
  })
  curr.tot = curr.files.reduce((a,c)=>a+parseInt(c.size),0)
}
q2 = q2.reverse()

// build up totals
for(let i = 0; i < q2.length;i++){
  if (q2[i].prev != 0) 
  q2[i].prev.tot += q2[i].tot
}

// pt 1
console.log(q2.reduce((a,c)=>{
  if(c.tot <= 100000){
    return a + c.tot;
  }
  return a;
},0));

// pt 2
const free_space = 70000000 - root.tot;
const to_delete = 30000000 - free_space;
console.log(min(q2.filter((i)=>i.tot>to_delete).map((a)=>a.tot)))
