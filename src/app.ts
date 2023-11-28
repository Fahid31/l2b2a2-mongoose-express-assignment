import express, { Request, Response } from "express";
import cors from "cors";
import { userRoute } from "./app/modules/userHandling/user.route";
const app = express();

// parsers
app.use(express.json());
app.use(cors());

// application route
app.use('/api/users', userRoute)


app.get("/", (req: Request, res: Response) => {
  res.send('Welcome to the developers world !!');
});

export default app;
