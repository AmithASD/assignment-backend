import jwt from 'jsonwebtoken';

export const authenticateToken = (requiredRoles) => {
    return async (req, res, next) => {
        // Retrieve the token from the Authorization header
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        if (token == null) {
            return res.status(401).json({ error: "Token is missing" });
        }

        // try {
        // Verify the token using the JWT_KEY
        // const user = jwt.verify(token, process.env.JWT_KEY);

        // Check if the user exists in the database
        // const foundUser = await UserModel.findById(user.id).select(
        //     userProjections.authenticateToken
        // );

        // if (!foundUser) {
        //     return res.status(401).json({ error: "User not found" });
        // }

        // Check if the user's role is in the required roles
        // if (!requiredRoles.includes(foundUser.role)) {
        //     return res.status(403).json({ error: "Access forbidden" });
        // }

        // Set the user object on the request for further processing
        // req.user = foundUser;
        //     next();
        // } catch (error) {
        //     console.error(error);
        //     res.status(500).json({ error: "Internal server error" });
        // }
    };
};

export const verifyToken = (req, res) => {
    // Retrieve the token from the Authorization header
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) {
        console.log("Token is null");
        return null;
    }

    try {
        // Verify the token using the JWT_KEY
        jwt.verify(token, process.env.JWT_KEY);
        console.log("Token is verified");
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};
