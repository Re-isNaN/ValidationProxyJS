// DESIGN PATTERN BUILDER
export class ValidatorBuilder {
    rules = [];

    string() {
        // simple string validation function
        const validString = (value) => (typeof value === 'string') || 'Deve ser uma string'

        // add function to rules
        this.rules.push(validString);
        
        return this;
    }

    number() {
        // simple number validation function
        const validNumber = (value) => !Number(isNaN(Number(value))) || 'Deve ser um número'

        // add function to rules
        this.rules.push(validNumber);

        return this;
    }

    required() {
        // simple required validation function
        const validRequired = (value) => (value !== undefined && value !== null && value !== '') || 'Campo obrigatório'
        
        // add function as priority to rules
        this.rules.unshift(validRequired);

        return this;
    }

    validate(value) {
        for (const rule of this.rules) {
            const result = rule(value);
            if (result !== true) return result;
        }
        return true;
    }
}


// Instantiate each method individually and export
export const v = {
    string: () => new ValidatorBuilder().string(),
    number: () => new ValidatorBuilder().number(),
    required: () => new ValidatorBuilder().required(),
}