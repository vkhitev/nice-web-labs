module.exports = function range (start, end, step) {
  const retval = []
  if (step === 0) {
    throw Error('Can not iterate with step = 0')
  }
  if (end > start && step < 0) {
    for (let i = start; i <= end; i -= step) {
      retval.push(i)
    }
  } else if (end < start && step < 0) {
    for (let i = start; i >= end; i += step) {
      retval.push(i)
    }
  } else if (end < start && step > 0) {
    for (let i = start; i >= end; i -= step) {
      retval.push(i)
    }
  } else {
    for (let i = start; i <= end; i += step) {
      retval.push(i)
    }
  }
  return retval
}
