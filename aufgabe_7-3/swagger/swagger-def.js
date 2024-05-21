import swaggerAutogen from "swagger-autogen";

const outputFile = "./swagger.json";
const endpointsFiles = ["../server/library.cjs"];

swaggerAutogen(outputFile, endpointsFiles);
