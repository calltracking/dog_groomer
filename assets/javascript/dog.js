// Dog class to represent dogs
class Dog {
    constructor(name, breed, age) {
        console.log("I'm a dirty dog");
        this.id = Math.floor(Math.random() * 1000000);
        this.name = name;
        this.breed = breed;
        this.age = age;

        this.card = `
            <div class="dog-card" id="${this.id}" style="display: none">
                <h3 class="dog-name">${this.name}</h3>
                <h2 class="breed">${this.breed}</h2>
                <p class="age">${this.age + " years old"}</p>
                <button class="button">Groom</button>
            </div>
        `;

        this.el = null;
    }

    groom() {
        // Logic to groom the dog
        console.log(`${this.name} is being groomed.`);

        // update card
        this.card = `
            <div class="dog-card" id="${this.id}" style="display: none">
                <h3 class="dog-name">${this.name}</h3>
                <p class="age">Am I pretty yet?</p>
                <button class="button">Finish Grooming</button>
            </div>
        `;
    }

    waitForParent() {
        // Logic to send the dog home
        console.log(`${this.name} is going home.`);

        // update card
        this.card = `
            <div class="dog-card" id="${this.id}" style="display: none">
                <h3 class="dog-name">${this.name}</h3>
                <p class="age">Woah, I'm colder now!</p>
                <button class="button">Send Home</button>
            </div>
        `;
    }
}
