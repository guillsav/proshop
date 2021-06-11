interface Config {
  mongoURI: string;
  port: number;
  jwtKey: string;
}

export const config: Config = {
  mongoURI: process.env.MONGO_URI!,
  port: <number>(<unknown>process.env.PORT!),
  jwtKey: process.env.JWT_KEY!
};
