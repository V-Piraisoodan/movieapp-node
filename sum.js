const x = process.argv[2];
const y = process.argv[3];

console.log(process.argv);
const sum = (a,b)=> +a+ +b ; 
console.log(sum(x,y));



console.log(global);