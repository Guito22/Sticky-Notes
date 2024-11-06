const mongoose = require('mongoose');

const uri = "mongodb+srv://diego:c9ItNN0WtfN1qt9w@note-project.yue63.mongodb.net/?retryWrites=true&w=majority&appName=Note-project";


main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(uri)
    console.log("MONGOOSE CONNECTION OPEN");
}



module.exports=main