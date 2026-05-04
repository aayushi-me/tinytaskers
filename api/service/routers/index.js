import applicationRouter from "./applicationRouter.js";
import listingRouter from "./listingRouter.js";
import userProfileRouter from "./userProfileRouter.js";
import ratingRouter from "./ratingRouter.js";
import rewardRouter from "./rewardRouter.js";
import authRouter from "./authRouter.js";
import contactRouter from "./contactRouter.js";

const initializeRoutes = (app) => {
    app.use("/auth", authRouter);
    app.use("/applications", applicationRouter);
    app.use("/listings", listingRouter);
    app.use("/profiles", userProfileRouter);
    app.use("/ratings", ratingRouter);
    app.use("/rewards", rewardRouter);
    app.use("/contact", contactRouter);
    app.use("/applications", applicationRouter);
};

export default initializeRoutes;
