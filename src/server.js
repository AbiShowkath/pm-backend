require('dotenv').config()
// require('dotenv').config({ path: 'pm-backend/.env' })

const app = require('./app');
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));