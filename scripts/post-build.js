const fs=require("fs");
const path= require("path");

const readmePath = path.resolve(__dirname, '..', 'README.md')
const regExp = /\[comment]: <> \(startof installation instruction\)|\[comment]: <> \(endof installation instruction\)/

fs.readFile(readmePath, 'utf-8', (error, data) => {

  const splitReadme = data.split(regExp)

  const formattedReadme = [splitReadme[0], splitReadme[2]].join('')


  fs.writeFile(readmePath, formattedReadme, (error) => {
    if(error) throw new Error(`Couldn't change readme\n${error}`)
  })

})