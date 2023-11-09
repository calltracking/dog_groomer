// Groomer class to represent grooming store
class Groomer {
    constructor() {
        this.dirtyDogs = []
        this.dogsBeingGroomed = []
        this.dogsWaitingForParent = []

        this.waitingPanel = $('#waiting-panel');
        this.groomingPanel = $('#grooming-panel');
        this.homePanel = $('#home-panel');
    }

    addDog() {
        const name = $('#dog-name').val();
        const breed = $('#dog-breed').val();
        const age = $('#dog-age').val();
        if (name && breed && age) {
            const newDog = new Dog(name, breed, age);
            console.log(newDog)

            // add dog to waiting panel and DOM
            $('#waiting-panel').append(newDog.card);

            // init dogs button
            const dogCard = $(`.dog-card#${newDog.id}`)
            dogCard.fadeIn();
            dogCard.find('.button').on('click', () => this.groomDog(newDog.id, newDog.name));

            // add dog to dirty dogs
            this.dirtyDogs.push(newDog);
            clearInputs();
        }
    }

    groomDog(dogId, dogName) {
        console.log(`Starting to groom ${dogName}`);

        // find selectedDog and create new array with selectedDog filtered out
        let selectedDog;
        const newDirtyDogs = [];
        this.dirtyDogs.forEach((dog) => {
            if (dog.id === dogId) {
                selectedDog = dog;
            } else {
                newDirtyDogs.push(dog);
            }
        });

        // reset dirtyDogs to new list of dogs with selected dog filtered out
        this.dirtyDogs = newDirtyDogs;

        // add selected dog to list of dogs being groomed
        this.dogsBeingGroomed.push(selectedDog);

        // remove dog from waiting panel
        $('#waiting-panel').find(`#${dogId}`).remove();

        // Groom dog (update card contents)
        selectedDog.groom();

        // add dog card to grooming panel
        $('#grooming-panel').append(selectedDog.card)
        const dogCard = $(`.dog-card#${selectedDog.id}`)
        dogCard.fadeIn();

        // update dog card button to run finish grooming on click
        dogCard.find('.button').on('click', () => this.finishGrooming(selectedDog.id, selectedDog.name));
    }

    finishGrooming(dogId, dogName) {
        // Logic to send the dog home
        console.log(`Finished grooming a ${dogName}. Now to wait for the ${dogName}'s parent`);

        // find selectedDog and create new array with selectedDog filtered out
        let selectedDog;
        const newDogsBeingGroomed = [];
        this.dogsBeingGroomed.forEach((dog) => {
            if (dog.id === dogId) {
                selectedDog = dog;
            } else {
                newDogsBeingGroomed.push(dog);
            }
        });

        // reset dogsBeingGroomed to new list of dogs with selected dog filtered out
        this.dogsBeingGroomed = newDogsBeingGroomed;
        this.dogsWaitingForParent.push(selectedDog);

        // remove dog from grooming panel
        $('#grooming-panel').find(`#${dogId}`).remove();

        // Have dog wait for parent (update card contents)
        selectedDog.waitForParent();

        // add dog card to home panel
        $('#home-panel').append(selectedDog.card)
        const dogCard = $(`.dog-card#${selectedDog.id}`);
        dogCard.fadeIn();

        // update dog card button to run finish grooming on click
        dogCard.find('.button').on('click', () => this.sendHome(selectedDog.id, selectedDog.name));

    }

    sendHome(dogId, dogName) {
        // Logic to send the dog home
        console.log(`Parent arrived. Sending ${dogName} home`);

        // find selectedDog and create new array with selectedDog filtered out
        let selectedDog;
        const newWaitingForHome = [];
        this.dogsWaitingForParent.forEach((dog) => {
            if (dog.id === dogId) {
                selectedDog = dog;
            } else {
                newWaitingForHome.push(dog);
            }
        });

        // reset dogsWaitingForParent to new list of dogs with selected dog filtered out
        this.dogsWaitingForParent = newWaitingForHome

        // remove dog from waiting panel and add to grooming panel
        const dogCard = $('#home-panel').find(`#${dogId}`);
        dogCard.fadeOut(() => dogCard.remove());
    }
}

const clearInputs = () => {
    $('#dog-name').val('');
    $('#dog-breed').val('');
    $('#dog-age').val('');
}

const groomer = new Groomer();

$(() => {
    $('#add-dog').on('click', () => {
        console.log("Adding a new dog")
        const name = $('#dog-name').val();
        const breed = $('#dog-breed').val();
        const age = $('#dog-age').val();
        if (name && breed && age) {
            groomer.addDog()
        } else {
            console.log("Opps... please fill in all text inputs to add dog");
        }
    });
})
