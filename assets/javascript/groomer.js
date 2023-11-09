// Groomer class to represent grooming store
class Groomer {
    constructor() {
        this.dirty_dogs = []
        this.dogs_being_groomed = []
        this.dogs_waiting_for_home = []

    }

    addDog() {
        const name = $('#dog-name').val();
        const breed = $('#dog-breed').val();
        const age = $('#dog-age').val();
        if (name && breed && age) {
            const newDog = new Dog(name, breed, age, this.groomDog, this.finishGrooming, this.sendHome);
            console.log(newDog)

            // add dog to waiting panel and DOM
            const panel = $('#waiting-panel').append(newDog.card);
            newDog.el = $(`.dog-card#${newDog.id}`);
            newDog.initButton();

            // add dog to dirty dogs
            this.dirty_dogs.append(newDog);
            clearInputs();
        }
    }

    groomDog(dogId) {
        console.log("Starting to groom a dog");

        // remove dog from dirty dogs and add to dogs being groomed
        let selectedDog;
        const newDirtyDogs = [];
        this.dirty_dogs.forEach((dog) => {
            if (dog.id === dogId) {
                selectedDog = dog;
            } else {
                newDirtyDogs.append(dog);
            }
        });
        this.dirty_dogs = newDirtyDogs;
        this.dogs_being_groomed.push(selectedDog);

        // remove dog from waiting panel and add to grooming panel
        const waitingPanel = $('#waiting-panel');
        const groomingPanel = $('#grooming-panel');
        waitingPanel.remove(`#${dogId}`);
        groomingPanel.append(selectedDog.card)

        // update dog
        selectedDog.groom();
    }

    finishGrooming(dogId) {
        // Logic to send the dog home
        console.log(`Finished grooming a dog. Now to wait for the dog's parent`);

        // remove dog from dogs being groomed and into waiting to go home
        let selectedDog;
        const newDogsBeingGroomed = [];
        this.dogs_being_groomed.forEach((dog) => {
            if (dog.id === dogId) {
                selectedDog = dog;
            } else {
                newDogsBeingGroomed.append(dog);
            }
        });
        this.dogs_being_groomed = newDogsBeingGroomed;
        this.dogs_waiting_for_home.push(selectedDog);

        // remove dog from waiting panel and add to grooming panel
        const groomingPanel = $('#grooming-panel');
        const homePanel = $('#home-panel');
        groomingPanel.remove(`#${dogId}`);
        homePanel.append(selectedDog.card)

        // update dog
        selectedDog.finishGrooming();
    }

    sendHome(dogId) {
        // Logic to send the dog home
        console.log(`Parent arrived. Sending dog home`);

        // remove dog from dogs being groomed and into waiting to go home
        let selectedDog;
        const newWaitingForHome = [];
        this.dogs_waiting_for_home.forEach((dog) => {
            if (dog.id === dogId) {
                selectedDog = dog;
            } else {
                newWaitingForHome.append(dog);
            }
        });
        this.dogs_waiting_for_home = newWaitingForHome

        // remove dog from waiting panel and add to grooming panel
        $('#home-panel').remove(`#${dogId}`);

        // update dog
        selectedDog.sendHome();
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
            <h3 class="dog-name">${dog.name}</h3>
            <h2 class="breed">${dog.breed}</h2>
            <p class="age">${dog.age + " years old"}</p>
            <button class="button">Groom</button>
            <button class="button">Send Home</button>
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

const groomer = new Groomer();

$(() => {
    $('#add-dog').on('click', () => {
        console.log("Trying to add new dog")
        const name = $('#dog-name').val();
        const breed = $('#dog-breed').val();
        const age = $('#dog-age').val();
        if (name && breed && age) {
            groomer.addDog()
        }
    });
})
