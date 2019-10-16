const targetPathDev = './src/environments/environment.ts';
const targetPathProd = './src/environments/environment.prod.ts';
const fs  = require('fs');
const colors = require('colors');
const dotenv = require('dotenv');

dotenv.config();

const envConfigFile = `export const environment = {
    production: '${false}',
    API_KEY: '${process.env.API_KEY}',
    LANGUAGE: '${process.env.LANGUAGE}',
    IMAGES_URI: '${process.env.IMAGES_URI}',
    API_URI: '${process.env.API_URI}'
 };
 `;

const envConfigFileProd = `export const environment = {
  production: '${true}',
  API_KEY: '${process.env.API_KEY}',
  LANGUAGE: '${process.env.LANGUAGE}',
  IMAGES_URI: '${process.env.IMAGES_URI}',
  API_URI: '${process.env.API_URI}'
};
`;

console.log(colors.magenta('The file `environment.ts` will be written with the following content: \n'));
console.log(colors.grey(envConfigFile));

fs.writeFile(targetPathDev, envConfigFile,  (err) => {
  if (err) {
      throw console.error(err);
  } else {
      console.log(colors.magenta(`Angular environment.ts file generated correctly at ${targetPathDev} \n`));
  }
});

fs.writeFile(targetPathProd, envConfigFileProd,  (err) => {
  if (err) {
      throw console.error(err);
  } else {
      console.log(colors.magenta(`Angular environment.ts file generated correctly at ${targetPathProd} \n`));
  }
});
