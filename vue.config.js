
let production = {
    outputDir:"docs",
    baseUrl:"/schedule-to-google-calendar/"
};
let development ={

};
module.exports = process.env.NODE_ENV === 'production' ? production:development;
