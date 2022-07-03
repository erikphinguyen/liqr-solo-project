const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const { User, Image, Comment } = require('../../db/models');
const db = require('../../db/models');
const { requireAuth } = require('../../utils/validation')

// const { check, validationResult } = require('express-validator');
// const { setTokenCookie, restoreUser } = require('../../utils/auth');
// const { handleValidationErrors } = require('../../utils/validation');

// GET ALL IMAGES
router.get('/', asyncHandler(async function (req, res) {
    const images = await Image.findAll();
    return res.json(images);
}));

// GET SINGLE IMAGE
router.get('/:id(\\d+)', asyncHandler(async function (req, res) {
    const { id } = req.params;
    const image = await Image.findByPk(id,
        {
            include: [{
                model: Comment,
                where: {
                    imageId: id
                }
            }]
        });
    console.log(image)
    return res.json(image);
}))

// POST IMAGE
router.post('/', asyncHandler(async function (req, res) {
    const id = await Image.create(req.body);
    return res.json(id)
}))

// PUT (UPDATE) IMAGES, EXTRA HELP
router.put('/:id', asyncHandler(async (req, res) => {
    const { title, imageUrl, ingredients } = req.body
    const id = parseInt(req.params.id);
    const image = await Image.findByPk(id);
    image.title = title
    image.ingredients = ingredients
    await image.save()

    res.json(image)
    // res.render("edit-image", {
    //     title: `Edit your image ${image.title}`, // is this right?
    //     imageUrl,
    //     contributor,
    //     ingredients
    // })
}));


router.put('/:imageId/edit', asyncHandler(async (req, res) => {
    const imageId = parseInt(req.params.imageId, 10);
    const image = await Image.findByPk(imageId);

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
router.delete('/:id(\\d+)', async (req, res) => {

    const { id } = req.params;

    const images = await Image.findByPk(id);
    // console.log(images)
    await images.destroy();
    return res.json({
        message: "image deleted"
    })
})

module.exports = router;
