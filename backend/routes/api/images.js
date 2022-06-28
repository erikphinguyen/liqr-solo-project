const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Image } = require('../../db/models');

const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { db } = require('../../config');

// GET ALL IMAGES
router.get('/', asyncHandler(async function (req, res) {
    const images = await Image.findAll();
    return res.json(images);
}));

// GET SINGLE IMAGE
router.get('/:id', asyncHandler(async function (req, res) {
    const image = await Image.findByPk(req.params.id);
    return res.json(image);
}))

// POST IMAGE
router.get('/', asyncHandler(async function (req, res) {
    const id = await Image.build(req.body); // maybe use .create(req.body)?
    return res.redirect(`${req.url}/${id}`)
}))

// PUT (UPDATE) IMAGES, THIS HARD AF
router.get('/:imageId/edit', asyncHandler(async (req, res) => {
    const imageId = parseInt(req.params.imageId, 10);
    const image = await db.Image.findByPk(imageId);

    res.render("edit-image", {
        title: `Edit your image ${image.title}`, // is this right?
        imageUrl,
        contributor,
        ingredients
    })
}));

const validateLogin = [
    check('credential')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Please provide a valid email or username.'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a password.'),
    handleValidationErrors
];


router.get('/:imageId/edit', asyncHandler(async (req, res) => {
    const imageId = parseInt(req.params.imageId, 10);
    const image = await db.Image.findByPk(imageId);

    const { imageUrl, title, contributor, ingredients } = req.body;
    const newEdit = { imageUrl, title, contributor, ingredients }

    // should I use handleValidationErrors here instead of 66-81
    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
        await image.update(newEdit);
        res.redirect(`/${imageId}`);
    }
    else {
        const errors = validatorErrors.array().map((error) => error.msg);
        res.render("edit-image", {
            imageUrl,
            title,
            contributor,
            ingredients,
            errors
        })
    }
}));


// DELETE IMAGE
router.get('/:userId/:imageId/delete', async (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    const imageId = parseInt(req.params.imageId, 10);
    const images = await db.Image.findOne({
        where: {
            id: imageId,
            userId // forgot what this references to; maybe use id?
        }
    });

    await images.destroy();
    res.json({
        message: "image deleted"
    })
})

module.exports = router;
