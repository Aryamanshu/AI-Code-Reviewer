const aiService = require("../services/ai.service");
const AppError = require("../utils/AppError");

module.exports.getReview = async (req, res, next) => {
    try {
        const code = req.body.code;

        if (!code) {
            return next(new AppError("Code is required for review", 400));
        }

        // Validate code length to prevent abuse
        if (code.length > 10000) {
            return next(new AppError("Code exceeds maximum length of 10,000 characters", 400));
        }

        const response = await aiService(code);
        res.status(200).json({
            status: "success",
            data: response
        });
    } catch (error) {
        next(error);
    }
}