const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Image } = require('../../db/models');

const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { db } = require('../../config');

// GET ALL COMMENTS OF CERTAIN IMAGE
router.get('/:id/comments', async (req, res) => {
    const id = req.params.id;
    const image = await db.Image.findByPk(id);
    let comments = await db.Comment.findAll({
        where: { imageId: id }
    });

    if (req.session.auth) {
        const { userId } = req.session.auth;
        res.render("comments", { comments, userId, id });
    } else {
        const userId = null;
        res.render("comments", { comments, userId, id });
    }
});
