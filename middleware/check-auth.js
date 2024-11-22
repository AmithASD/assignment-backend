import jwt from "jsonwebtoken";

export const CheckAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.JWT_KEY, (err) => {
            if(err) {
                return res.sendStatus(403);
            }
            next();
        });
    } catch (error) {
        res.status(401).json({ message: "No token provided" });
    }
}
