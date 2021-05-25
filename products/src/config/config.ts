interface Config {
  mongoURI: string;
  port: string;
}

export const config: Config = {
  mongoURI: process.env.MONGO_URI!,
  port: process.env.PORT!
};
