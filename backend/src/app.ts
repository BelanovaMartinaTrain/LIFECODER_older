import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import lifecosRoutes from "./routes/lifecos";
import morgan from "morgan";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use("/api/lifecos", lifecosRoutes);

app.use((req, res, next) => {
    next(Error("Endpoint doesn't exist"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.log(error);
    let errorMessage = "an unknown error crushed the whole thing";
    if (error instanceof Error) errorMessage = error.message;
    res.status(500).json({error: errorMessage});
})

export default app;