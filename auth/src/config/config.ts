interface Config {
  mongoURI: string;
  port: string;
  jwtKey: string;
}

export const config: Config = {
  mongoURI: process.env.MONGO_URI!,
  port: process.env.PORT!,
  jwtKey: process.env.JWT_KEY!
};
