const fs = require("fs");

// fs.readFile("./msg.txt",(err,data)=>{
//     console.log(data);
// });

// fs.readFile("./msg.txt","utf-8",(err,data)=>{
//     console.log(data);
// });










// task 1
const quote = "The road to success is always under construction";
// Same quote content in all test files
// test-1.html
// test-2.html
// test-3.html
// test-4.html
// ...
// test-5.html

// task 2
// msg.txt idhil irukkum data'vai cool.html ku copy pannanum
// copy msg.txt to cool.html


// task-3
// removeFile.css intha file'lai delete pannanum
// Delete the file removeFile.css


// ans task-1

const [ , ,arr] = process.argv;

// for(var i =1;i<=arr;i++){
// fs.writeFile(`./Backups/test-${i}.html`,quote,(err)=>{
//     console.log("Completed test")
// })
// }

// ans task-2

// fs.readFile("./msg.txt","utf-8",(err,data)=>{
//     console.log(data);
    
//     fs.writeFile("./cool.html",data,(err)=>{
//         console.log("Complete copying")
//     });
// });


// ans task-3

// fs.unlink("removeFile.css",(err)=>{
//     console.log("Deleted succesfully")
// });

// for(var i =2;i<=25;i++){
// fs.unlink(`./Backups/test-${i}.html`,(err)=>{
// console.log("Deleted succesfully")
// })
// }


// dec-19

for(var i =1;i<=arr;i++){
    fs.writeFile(`./Backups/test-${i}.html`,quote,(err)=>{
        console.log(`Completed test ${i}`)
    });
    }

