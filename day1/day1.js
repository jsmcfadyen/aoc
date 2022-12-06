const text = await Deno.readTextFile("./input.txt");
console.log(text.split("\n\n").map((s) => s.split("\n")).map((a)=>(a.reduce((a,c)=>(a+parseInt(c)),0))).slice(0,-1).sort((a,b)=>(a-b)).reverse().slice(0,3).reduce((a,c)=>(a+c)));

