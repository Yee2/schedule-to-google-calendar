
let production = {
    outputDir:"docs",
    baseUrl:"/"
};
let development ={

};
module.exports = process.env.NODE_ENV === 'production' ? production:development;
