const express = require("express");
const router = express.Router();

// Controllers
const exhibitionController = new (require("../Controllers/exhibition"))();
const { authenticate, optionalAuth } =
  new (require("../MiddleWares/Authenticator/Authenticator"))();
const fileManager = new (require("./../Configs/fileManager"))();
const { validators } = require("../MiddleWares/Validator");
const { body } = require("express-validator");

/**
 * @api {get} /:id ̰ ̰
 * @apiName Get faq details
 */
router
  .route("/:id")
  .get(optionalAuth, exhibitionController.getexhibitionDetailsById);

/**
 * @api {post} /
 * @apiName Get faq List
 */
router.route("/").post(optionalAuth, exhibitionController.listByPaginate);

/**
 * @api {post} /add
 * @apiName Add new faq
 */
router
  .route("/add")
  .post(
    fileManager.upload().any(),
    validators.validate([
      body("title")
        .notEmpty()
        .withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.EXHIBITION.TITLE),
      body("start_date")
        .notEmpty()
        .isDate()
        .withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.EXHIBITION.START_DATE),
      body("image")
        .notEmpty()
        .withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.EXHIBITION.IMAGE),
      body("end_date")
        .notEmpty()
        .withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.EXHIBITION.END_DATE),
    ]),
    authenticate,
    exhibitionController.add
  );

/**
 * @api {put} /
 * @apiName Update faq
 */
router.route("/:id").put(fileManager.upload().any(),authenticate, exhibitionController.update);

/**
 * @api {delete} /
 * @apiName Delete faq by id
 */
router.route("/:id").delete(authenticate, exhibitionController.delete);

module.exports = router;
