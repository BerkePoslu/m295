import swaggerAutogen from "swagger-autogen";

const outputFile = "./swagger.json";
const endpointsFiles = ["./library.cjs"];

swaggerAutogen(outputFile, endpointsFiles);
