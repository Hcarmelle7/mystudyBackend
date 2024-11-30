export function idParam(req, res, next){
    const id = req.params.id;

    if (!id || isNaN(id)) return res.status(500).send("invalid id param");

    next();
  }