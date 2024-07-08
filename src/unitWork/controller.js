const UnitWork = require('./model');

async function addUnitWork(req, res, next) {
  if (!req.user) {
    return res.json({
      error: 1,
      message: `Kamu belum masuk atau token kadaluwarsa`,
    });
  }
  try {
    const payload = req.body;
    const userRole = req.user.role;
    if (userRole === 'user') {
      res.json({
        error: 1,
        message: 'Kamu tidak memiliki akses',
      });
    } else {
      const newUnitWork = new UnitWork({ ...payload });
      await newUnitWork.save();
      if (newUnitWork) {
        return res.json({
          status: 'ok',
          message: 'add category sucessuflly',
          categoryId: newUnitWork._id,
        });
      }
    }
  } catch (err) {
    if (err && err.name === 'Error') {
      return res.json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    next(err);
  }
}

async function deleteUnitWork(req, res, next) {
  if (!req.user) {
    return res.json({
      error: 1,
      message: `Kamu belum masuk atau token kadaluwarsa`,
    });
  }
  try {
    const userRole = req.user.role;

    if (userRole === 'user') {
      res.json({
        error: 1,
        message: 'Kamu tidak memiliki akses',
      });
    } else {
      let unitWork = await UnitWork.findOneAndDelete({ _id: req.params.id });

      if (unitWork) {
        return res.json({
          status: 'ok',
          message: 'delete unit work successfully',
        });
      }
    }
  } catch (err) {
    return res.json({
      error: 1,
      message: 'unit work not found',
    });
  }
}

async function getUnitWork(req, res, nex) {
  if (!req.user) {
    return res.json({
      error: 1,
      message: `Kamu belum masuk atau token kadaluwarsa`,
    });
  }

  try {
    const userRole = req.user.role;

    if (userRole === 'user') {
      res.json({
        error: 1,
        message: 'Kamu tidak memiliki akses',
      });
    }
    const unitWork = await UnitWork.find();
    if (unitWork) {
      return res.json({
        status: 'ok',
        data: unitWork,
      });
    }
  } catch (error) {}
}
module.exports = { addUnitWork, deleteUnitWork, getUnitWork };
