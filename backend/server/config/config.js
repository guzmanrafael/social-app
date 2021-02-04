//====================================
// Puerto
//=====================================
process.env.PORT = process.env.PORT || 3000;

//======================
//Environment
//======================
process.env.NODE_ENV = process.env.NODE_ENV || "dev";

//===========
//vencimiento
//===============
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

//======================================
// SEED authentication
//=======================================
process.env.SEED = process.env.SEED || "secret";

process.env.CLOUDINARY_CLOUD_NAME=  '';
process.env.CLOUDINARY_API_KEY = '';
process.env.CLOUDINARY_API_SECRET = '';
