const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Image } = require('../../db/models');

const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { db } = require('../../config');

// GET ALL COMMENTS OF CERTAIN IMAGE
router.get('/:id(\\d+)', requireUser, restoreUser, asyncHandler(async (req, res) => {
    const { id } = req.params;
    const image = await Image.findByPk(id);
    let comments = await Comment.findAll({
        where: { id: id }
    });

    return res.json(comments);
}));

// POST COMMENT
router.post('/:id(\\d+)', requireUser, restoreUser, asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { userId, content } = req.body;
    const newComment = await Comment.create({
        userId, content, id
    });
    const payload = await Comment.findByPk(newComment.id)
    return res.json(payload);
}))

//  // DELETE COMMENT
router.delete('/:id(\\d+)', requireUser, restoreUser, asyncHandler(async (req, res) => {
    const { id } = req.params;
    const comment = await Comment.findByPk(id)
    await comment.destroy();
    res.json({
        message: "comment deleted"
    })
}))

module.exports = router;
