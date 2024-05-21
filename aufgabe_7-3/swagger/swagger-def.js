import swaggerAutogen from "swagger-autogen";

const outputFile = "./swagger.json";
const endpointsFiles = [
  "../routes/auth.cjs",
  "../routes/lends.cjs",
  "../routes/books.cjs",
];

swaggerAutogen(outputFile, endpointsFiles);
