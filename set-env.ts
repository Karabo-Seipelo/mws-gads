//relook https://medium.com/@ferie/how-to-pass-environment-variables-at-building-time-in-an-angular-application-using-env-files-4ae1a80383c

const targetPath = './src/environments/environment.ts';
const fs  = require('fs');
const colors = require('colors');
const dotenv = require('dotenv');

dotenv.config();

const envConfigFile = `export const environment = {
    API_KEY: '${process.env.API_KEY}',
    LANGUAGE: '${process.env.LANGUAGE}',
    IMAGES_URI: '${process.env.IMAGES_URI}',
    API_URI: '${process.env.API_URI}'
 };
 `;

console.log(colors.magenta('The file `environment.ts` will be written with the following content: \n'));
console.log(colors.grey(envConfigFile));

fs.writeFile(targetPath, envConfigFile,  (err) => {
  if (err) {
      throw console.error(err);
  } else {
      console.log(colors.magenta(`Angular environment.ts file generated correctly at ${targetPath} \n`));
  }
});
