const text = await Deno.readTextFile("./input.txt");
console.log(text.split("\n"))

const old_check = (me,elf) =>{
    if (me == 'X'){
        if (elf == 'A'){
            return 3;   
        }else if (elf == 'B'){
            return 0;
        }else if (elf == 'C'){
            return 6;
        }
    }else if (me == 'Y'){
        if (elf == 'A'){
           return 6; 
        }else if (elf == 'B'){
            return 3;
        }else if (elf == 'C'){
            return 0;
        }

    }else if (me == 'Z'){
        if (elf == 'A'){
            return 0;
        }else if (elf == 'B'){
            return 6;
        }else if (elf == 'C'){
            return 3;
        }

    }
}

const check = (res, elf ) => {
    if (res == 'X'){
        // lose
        if (elf == 'A'){
            return 3;
        }else if (elf == 'B'){
            return 1;
        }else if (elf == 'C'){
            return 2;
        }
    }else if (res == 'Y'){
        // draw
        if (elf == 'A'){
            return 3 + 1;
        }else if (elf == 'B'){
            return 3 + 2;
        }else if (elf == 'C'){
            return 3 + 3;
        }

    }else if (res == 'Z'){
        // win
        if (elf == 'A'){
            return 6 + 2;
        }else if (elf == 'B'){
            return 6 + 3;
        }else if (elf == 'C'){
            return 6 + 1;

        }

    }

}


const ans = text.split("\n").reduce((acc, curr) => {
    console.log(acc)
    return acc + check(curr[2],curr[0]) 
},0);

console.log(ans)
