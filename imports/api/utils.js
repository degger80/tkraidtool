const fmtDate = (dt, msk) => {
  return !msk
    ? moment(dt).format("H:mm DD MMMM YYYY")
    : moment(dt)
      .utcOffset(180)
      .format("H:mm DD MMMM YYYY");
}

module.exports = fmtDate