import MessageService from "../services/message.service.js";
import { logger } from "../utils/index.js";

class MessageController {
  constructor() {}

  async getAllMessages(req, res) {
    try {
      const messages = await MessageService.getAllMessages(
        req.cookies.userIdCookie
      );
      if (!messages) {
        res.status(404);
        logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.render("./pages/error.ejs", {
          code: 404,
          message: "Message Not Found",
        });
      }
      res.status(200);
      logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.render("./pages/chat.ejs", {
        messages,
        cartId: req.cookies.cartIdCookie,
        categories: req.cookies.categoriesCookie,
        userId: req.cookies.userIdCookie,
      });
    } catch (err) {
      res.status(500);
      logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.render("./pages/error.ejs", {
        code: 500,
        message: "Internal Server Error",
      });
    }
  }

  async getMessagesByUserId(req, res) {
    try {
      const {
        params: { id },
      } = req;
      const messages = await MessageService.getMessagesByUserId(id);
      if (!messages) {
        res.status(404);
        logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.render("./pages/error.ejs", {
          code: 404,
          message: "Message Not Found",
        });
      }
      res.status(200);
      logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.render("./pages/mis-consultas.ejs", {
        messages,
        cartId: req.cookies.cartIdCookie,
        categories: req.cookies.categoriesCookie,
        userId: req.cookies.userIdCookie
      });
    } catch (err) {
      res.status(500);
      logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.render("./pages/error.ejs", {
        code: 500,
        message: "Internal Server Error",
      });
    }
  }

  async createMessage(req, res) {
    try {
      
      const messages = await MessageService.createMessage(
        req.body,
        req.cookies.userIdCookie
      );
      res.status(200);
      logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.render("./pages/chat.ejs", {
        messages,
        cartId: req.cookies.cartIdCookie,
        categories: req.cookies.categoriesCookie,
        userId: req.cookies.userIdCookie,
      });
    } catch (err) {
      res.status(500);
      logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.render("./pages/error.ejs", {
        code: 500,
        message: "Internal Server Error aca si",
      });
    }
  }

  async addReplyToMessageById(req, res) {
    try {
      const {
        params: { id },
      } = req;
      const { body } = req;
      const messages = await MessageService.addReplyToMessageById(
        id,
        req.body,
        req.cookies.userIdCookie
      );
      res.redirect("/consultas");
    } catch (err) {
      res.status(500);
      logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.render("./pages/error.ejs", {
        code: 500,
        message: "Internal Server Error",
      });
    }
  }
}

export default new MessageController();