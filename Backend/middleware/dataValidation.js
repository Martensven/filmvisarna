export const validateData = (requiredFields = [], typeChecks = {}, source = 'body', customChecks = {}) => {
  return (req, res, next) => {
    const data = req[source];
    if (!data) {
      return res.status(400).json({ error: `No ${source} data sent` });
    }

    const errors = [];

    // Checks mandatory fields
    for (const field of requiredFields) {
      if (data[field] === undefined || data[field] === null || data[field] === '') {
        errors.push(`${field} krävs`);
      }
    }

    // Checks data types (JSON)
    for (const [field, type] of Object.entries(typeChecks)) {
      if (data[field] !== undefined) {
        let value = data[field];

        // Allow numbers to be sent as strings (e.g "27")
        if (type === 'number' && typeof value === 'string' && !isNaN(value)) {
          value = Number(value);
          data[field] = value;
        }

        if (typeof value !== type) {
          errors.push(`${field} must be a ${type}`);
        }
      }
    }

    for (const [field, rule] of Object.entries(customChecks)) {
      const value = data[field];
      if (value !== undefined && value !== null && value !== '') {
        if (rule instanceof RegExp) {
          if (!rule.test(value)) {
            errors.push(`${field} innehåller ogiltiga tecken`);
          }
        } else if (typeof rule === 'function') {
          const errorMessage = rule(value);
          if (errorMessage) errors.push(errorMessage);
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