export class View {
    #controller
    
    #user = {}
    #errors = {}

    nameInput = document.getElementById('name');
    ageInput = document.getElementById('age');
    
    nameHelper = document.getElementById('name-helper');
    ageHelper = document.getElementById('age-helper');


    handleErrors(){
        for(const key in this.#errors){
            this[`${key}Helper`].textContent = this.#errors[key]
        }

        for(const key in this.#user.data){
            this[`${key}Helper`].textContent = null
        }
    }

    setController(controller){
        this.#controller = controller;

        this.nameInput.addEventListener('input', (ev) => {
            if (this.#user) {
                this.#user.name = ev.target.value
            }
            this.handleErrors()
        })

        this.ageInput.addEventListener('input', (ev) => {
            if (this.#user) {
                this.#user.age = ev.target.value
            }
            this.handleErrors()
        })
        
        document.getElementById('submit')
            .addEventListener('click', () => this.#sendForm());
    }

    setUser(user){
        this.#user = user
        this.#errors = user.errors
    }

    #sendForm(){
        const name = this.nameInput.value.trim();
        const age = this.ageInput.value;

        this.#controller.handleForm({ name, age })

        this.handleErrors()
    }
}
