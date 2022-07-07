const { Router } = require("express");
const express = require("express");
const { route } = require("./auth");

/**
 *
 * @param {any} error
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns
 */
module.exports.expressErrorHandler = (error, req, res, next) => {
  return res.status(500).json({ error: error.message });
};

module.exports.NotFound = () => {
    const router = Router();
/**
 *@param {}
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns
 */
  router.all("*", (req, res, next) => {
    return res.status(404).json({
      path: req.url,
      method: req.method,
    });
  });
  return router
};
