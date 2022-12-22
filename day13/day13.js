const file = await Deno.readTextFile('input.txt');
const string_pairs = file.split('\n\n').map((a)=>a.split('\n')).slice(0,-1);
const pairs = string_pairs.map((p)=>p.map((i)=>eval(i)));
console.log(pairs)
const flat_pairs = pairs.flat()
const wrapped = (a,b) => {
  let ans = [];
  let done = false

  const compare = (a,b,lvl) => {
    if (done){
      return
    }
    const padding = "  ".repeat(lvl);
    // console.log(padding + "Compare " + JSON.stringify(a) + " vs " + JSON.stringify(b));
    if (!Array.isArray(a) && !Array.isArray(b)){
      if (a < b){
        // console.log(padding+"  Left side is smaller: T");
        done = true;
        ans.push(true);
        return;
      }else if(a > b){
        // console.log(padding+"  Right side is smaller: F");
        done = true;
        ans.push(false);
        return;
      }  
    }
    else if (Array.isArray(a) && Array.isArray(b)){
      for (let i = 0; i < a.length && i < b.length;i++){
        compare(a[i],b[i],lvl+1,done)
      }
      if(done){ return}
      if (a.length < b.length){
        // console.log(padding +"  left side ran out: T");
        done = true;
        ans.push(true);
        return;
      }else if (a.length > b.length){
        // console.log(padding + "  right side ran out: F");
        done = true;
        ans.push(false);
        return;
      }
    }
    else{
      // console.log(padding + "  Mixed types, convert...");
      if(Array.isArray(a)){
        compare(a,[b],lvl+1,done);
      }else{
        compare([a],b,lvl+1,done);
      }
    }
  }
  compare(a,b);
  return ans[0];
}

console.log(flat_pairs.sort((a,b)=>
  wrapped(a,b) ? -1 : 1
))

console.log(flat_pairs.reduce((a,c,i)=>{
  if (JSON.stringify(c) == JSON.stringify([[2]]) || 
    JSON.stringify(c) == JSON.stringify([[6]])){
    return a * (i+1);
  }else{
    return a
  }},1));

