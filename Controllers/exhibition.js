// MODELS
const exhibitionModel = new (require("./../Models/exhibition"))();
const { deleteFile } = new (require("./../Configs/fileManager"))();

class FaqController {
  async getexhibitionDetailsById(req, res) {
    try {
      let { allowedStatus } = req;
      let data = await exhibitionModel.getexhibitionDetailsById(
        req.params.id,
        allowedStatus
      );

      if (!data) {
        res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.EXHIBITION);
        return;
      }

      res.handler.success(data);
    } catch (error) {
      res.handler.serverError(error);
    }
  }

  async listByPaginate(req, res) {
    try {
      let { allowedStatus } = req;
      let data = await exhibitionModel.listByPaginate(req.body, allowedStatus);

      res.handler.success(data);
    } catch (error) {
      res.handler.serverError(error);
    }
  }

  async add(req, res) {
    try {
      let { body, userInfo } = req;
      let data = await exhibitionModel.add(body);

      res.handler.success(data, STATUS_MESSAGES.EXHIBITION.EXHIBITION_ADD);
    } catch (error) {
      res.handler.serverError(error);
    }
  }

  async update(req, res) {
    try {
      let { allowedStatus, userInfo } = req;

      const data = await exhibitionModel.getexhibitionDetailsById(
        req.params.id,
        allowedStatus
      );
      if (!data) {
        res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.EXHIBITION);
        return;
      }

      if (req.body.image) {
        deleteFile(data.image);
      }
      await exhibitionModel.updateById(req.body, req.params.id, allowedStatus);

      res.handler.success(
        undefined,
        STATUS_MESSAGES.EXHIBITION.EXHIBITION_UPDATE
      );
    } catch (error) {
      res.handler.serverError(error);
    }
  }

  async delete(req, res) {
    try {
      let { allowedStatus, userInfo } = req;
      const data = await exhibitionModel.getexhibitionDetailsById(
        req.params.id,
        allowedStatus
      );

      if (!data) {
        res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.EXHIBITION);
        return;
      }
      if (req.body.image) {
        deleteFile(data.image);
      }
      await exhibitionModel.deleteById(req.params.id, allowedStatus);

      res.handler.success(
        undefined,
        STATUS_MESSAGES.EXHIBITION.EXHIBITION_DELETE
      );
    } catch (error) {
      res.handler.serverError(error);
    }
  }
}

module.exports = FaqController;
