const file = await Deno.readTextFile('input.txt');
const data = file.split('\n').map((s)=>s.split(' ')).slice(0,-1)
const sensors = data.map((e)=>[parseInt(e[2].slice(2)),parseInt(e[3].slice(2))])
const beacons = data.map((e)=>[parseInt(e[8].slice(2)),parseInt(e[9].slice(2))]);
const manhat = (a,b) =>{
  return Math.abs(a[0]-b[0])+Math.abs(a[1]-b[1])
}
const distances = sensors.map((s,i) => 
  manhat(s,beacons[i])
);

// console.log(sensors)
// console.log(beacons)
// console.log(distances)


const covered = (x,y) => {
  // for each sensor, is it in range of the current point?
  return sensors.some((s,i) => manhat(s,[x,y]) <= distances[i])
}

const print = () => {
  for (let i = y_min; i < y_max; i++){
    let curr = ""
    for (let j = x_min; j < x_max; j++){
      if (i == 0 || j == 0) curr += '@'
      else if(covered(i,j)){
        curr += '#'
      }else{
        curr += '.'
      }
    }
    console.log(curr)
  }
}

const pt1 = () => {
  const y_test = 2000000
  const y_min = -20000000;
  const y_max =  20000000;
  const x_min = -20000000;
  const x_max =  20000000;
  let count = -1;
  const wid = (x_max - x_min)/10;
  for (let i = x_min; i < x_max; i++){
    if (i % wid==0){
      console.log("...");
    }
    if (covered(i,y_test)){
      count++
    }
  }
  console.log(count)
}

