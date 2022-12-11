const file = await Deno.readTextFile('input.txt')

function Monkey (starting_items,operation,test,t,f) {
  this.items = [...starting_items];
  this.operation = operation;
  this.test = test;
  this.t = t;
  this.f = f;
  this.num_inspects = 0;
}

const monkey_text = file.split('\n\n').map((m)=>m.split('\n'))
const monkeys = monkey_text.map((m)=>{
  const s_i = m[1].replaceAll(',','').split(' ').slice(4).map(Number)
  const op = m[2].split('= ')[1];
  const test= m[3].split(' ').slice(-1).map(Number)[0];
  const t = m[4].split(' ').slice(-1).map(Number)[0];
  const f = m[5].split(' ').slice(-1).map(Number)[0];
  return new Monkey(s_i,op,test,t,f);
});

const inspect_items = (monkey) =>{
  for (let i = 0; i < monkey.items.length; i++){
    monkey.num_inspects++;
    const op = monkey.operation.split(' ');
    //run operation
    const addOp = op[1] == '+'
    const val = op[2] == 'old' ? monkey.items[i] : parseInt(op[2])
    monkey.items[i] = addOp ? monkey.items[i] + val : monkey.items[i] * val;
    // Part 1 solution
    //  monkey.items[i] = Math.floor(monkey.items[i] / 3);
   
    // ty wolfram alpha :)
    // LCM of input.txt
    // const magic = 9699690;
    // LCM of in2.txt
    const magic = 96577;
    monkey.items[i] = monkey.items[i]%magic 

    //test
    if (monkey.items[i] % monkey.test == 0){
      monkeys[monkey.t].items.push(monkey.items[i]);
    }else{
      monkeys[monkey.f].items.push(monkey.items[i]);
    }
    
  }
  monkey.items = []
}

const numRounds = 10000;
for (let i = 0; i < numRounds; i++){
  for (let j = 0; j < monkeys.length; j++){
    inspect_items(monkeys[j]);
  }
  if(i == 0 || i == 19 || i == 999 || i == 9999)
  console.log(monkeys.map((m)=>m.num_inspects))
}

const ans = monkeys.map((m)=>m.num_inspects).sort((a,b)=>b-a).slice(0,2).reduce((a,c)=>a*c)
console.log(ans)
