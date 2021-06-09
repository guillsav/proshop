interface Config {
  mongoURI: string;
  port: string;
  jwtKey: string;
  rabbitmqUrl: string;
}

export const config: Config = {
  mongoURI: process.env.MONGO_URI!,
  port: process.env.PORT!,
  jwtKey: process.env.JWT_KEY!,
  rabbitmqUrl: process.env.RABBITMQ_URL!
};
