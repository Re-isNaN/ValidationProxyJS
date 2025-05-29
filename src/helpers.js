
/** 
 * Creates a Proxy object that validates properties against a schema when setting values.
 *
 * @param {Object} schema - An object that defines validation functions per property.
 *                          Each key should correspond to a property and its value must be
 *                          an object with a `validate` method that returns `true` if valid, 
 *                          or an error message string if invalid.
 * @param {Object} [initialData={}] - Optional initial values to assign to the proxy object.
 *                                    These values will be validated and assigned only if valid.
 *
 * @returns {Proxy} A proxy object with the following shape:
 *   - `data`: contains only valid and successfully validated properties.
 *   - `errors`: contains any validation errors per field.
 *
*/
export function validatedProxy(schema, initialData = {}) {
    const objTarget = {
        data: {},
        errors: {}
    }
    
    const handler = {
        // SET -> Assignment interceptor, called when a value is assigned using obj[prop] = value
        // On success, returns true
        // On failure (invalid value), returns false
        set(target, prop, value) {

            // Retrieves the validation rule from the schema based on the property
            const validator = schema[prop];

            // If the field is not defined in the validator, ignore it (skip assignment, just return true)
            if (!validator) return false;

            const result = validator.validate(value);

            // If the field is invalid, remove it from `data` and store the error message
            if (result !== true) {
                Reflect.deleteProperty(target.data, prop);
                target.errors[prop] = result
                return true
            } else {
                Reflect.deleteProperty(target.errors, prop);
            };

            // If the property is valid and defined in the schema, assign the value
            target.data[prop] = value;
            return true;
        },

        // GET -> Intercepts property access (e.g., obj[prop]), simply returns the value
        get(target, prop) {
            return target[prop];
        }
    }

    const proxy = new Proxy(objTarget, handler);

    // Iterates over the properties (or keys) of the schema object
    for(const key in schema){
        // Assigns initial values to the Proxy using the data provided, which triggers the SET handler
        proxy[key] = initialData[key]
    }

    console.log(proxy)

    // Return created object Proxy
    return proxy
}