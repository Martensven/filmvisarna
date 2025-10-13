export const validateData = (requiredFields, typeChecks = {}, source = 'body') => {
    return (req, res, next) => {

        const data = req[source];

        // Kolla om body finns
        if (!data) {
            return res.status(400).json({ error: `No ${source} data sent` });
        }

        // Kontrollera obligatoriska fält
        for (let field of requiredFields) {
            if (!data[field]) {
                return res.status(400).json({ error: `${field} is required` });
            }
        }

        // Kontrollera datatyper (JSON)
        for (let [field, type] of Object.entries(typeChecks)) {
            if (data[field] && typeof data[field] !== type) {
                return res.status(400).json({
                    error: `${field} must be a ${type}`
                });
            }
        }

        next();
    };
};