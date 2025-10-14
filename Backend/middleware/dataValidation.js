export const validateData = (requiredFields = [], typeChecks = {}, source = 'body') => {
  return (req, res, next) => {
    const data = req[source];
    if (!data) {
      return res.status(400).json({ error: `No ${source} data sent` });
    }

    const errors = [];

    // Checks mandatory fields
    for (const field of requiredFields) {
      if (data[field] === undefined || data[field] === null || data[field] === '') {
        errors.push(`${field} is required`);
      }
    }

    // Checks data types (JSON)
    for (const [field, type] of Object.entries(typeChecks)) {
      if (data[field] !== undefined) {
        let value = data[field];

        // Allow numbers to be sent as strings (e.g "27")
        if (type === 'number' && typeof value === 'string' && !isNaN(value)) {
          value = Number(value);
          data[field] = value; // uppdatera till rätt typ
        }

        if (typeof value !== type) {
          errors.push(`${field} must be a ${type}`);
        }
      }
    }

    // If there are errors, return all of them
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    next();
  };
};