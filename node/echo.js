const exec = require('child_process').exec;
let dev = "chrome-devtools://devtools/remote/serve_file/@60cd6e859b9f557d2312f5bf532f6aec5f284980/inspector.html?experiments=true&v8only=true&ws=127.0.0.1:9229/0422a0dd-61dd-45ec-a8a0-71ecb5827c57";
dev =  dev.replace(/\&/gi,'^&');

exec(`echo: ${dev} | %~1`, (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(stdout);
});