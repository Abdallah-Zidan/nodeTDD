const express = require("express");

const app = express();
app.get('/',(_,res)=>res.send("ok\n"))
app.listen(4000, () => console.log(`app is running at http://localhost:4000`));
