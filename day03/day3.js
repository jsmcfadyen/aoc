import {
  chunk,
  intersection,
} from "https://deno.land/x/lodash@4.17.15-es/lodash.js";
const text = await Deno.readTextFile("./input.txt");

const valueOf = (ch) => {
  if (ch === "," || ch == undefined) return 0;
  if (ch === ch.toUpperCase()) {
    return ch.charCodeAt(0) - "A".charCodeAt(0) + 27;
  } else {
    return ch.charCodeAt(0) - "a".charCodeAt(0) + 1;
  }
};

const p1 = text.split('\n')
  .map((arr) => 
    intersection(arr.slice(0,arr.length/2).split(""),arr.slice(arr.length/2).split(""))
  ).flat()
  .reduce((acc,curr) => 
    acc + valueOf(curr)
  ,0);
console.log(p1);


const p2 = chunk(text.split("\n"), 3)
  .map((g) => g.map((i) => i.split("")))
  .reduce((a, group) => 
    a + valueOf(group.reduce((a, bag) => 
      intersection(a, bag)
    )[0])
  , 0);
console.log(p2);


