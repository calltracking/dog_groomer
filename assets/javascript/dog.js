// Dog class to represent dogs
class Dog {
    constructor(name, breed, age) {
        this.id = Math.floor(Math.random() * 1000000);
        this.name = name;
        this.breed = breed;
        this.age = age;
    }

    groom() {
        // Logic to groom the dog
        console.log(`${this.name} is being groomed.`);
    }

    goHome() {
        // Logic to send the dog home
        console.log(`${this.name} is going home.`);
    }

    initButtons() {
        $(this.el).find('.groom-button').on('click', () => this.groom());
        $(this.el).find('.go-home-button').on('click', () => {
            this.goHome();
            $(this.el).remove();
        });
    }
}

const addDogCardToPanel = (panelId, dog) => {
    const panel = $(`#${panelId}`);
    const dogCardEl = `
        <div class="dog-card" id="${dog.id}">
            <h3>${dog.name}</h3>
            <h3>${dog.breed}</h3>
            <h3>${dog.age}</h3>
            <button class="groom-button">Groom</button>
            <button class="go-home-button">Go Home</button>
        </div>
    `;

    // Add the card to the DOM
    panel.append(dogCardEl);

    // Make the class aware of its DOM element
    dog.el = $(`.dog-card#${dog.id}`);
}

const clearInputs = () => {
    $('#dog-name').val('');
    $('#dog-breed').val('');
    $('#dog-age').val('');
}

$(() => {
    $('#add-dog').on('click', () => {
        const name = $('#dog-name').val();
        const breed = $('#dog-breed').val();
        const age = $('#dog-age').val();
        if (name && breed && age) {
            const newDog = new Dog(name, breed, age);
            console.log(newDog)

            addDogCardToPanel('waiting-panel', newDog);
            newDog.initButtons();
            clearInputs();
        }
    });
})
