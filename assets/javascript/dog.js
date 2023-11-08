// Dog class to represent dogs
class Dog {
    constructor(name, info) {
        this.name = name;
        this.info = info;
    }

    groom() {
        // Logic to groom the dog
        console.log(`${this.name} is being groomed.`);
    }

    goHome() {
        // Logic to send the dog home
        console.log(`${this.name} is going home.`);
    }
}

// Function to add a dog card to the waiting panel
function addDogCardToPanel(panelId, dog) {
    const panel = $(`#${panelId}`);
    const dogCard = $('<div>').addClass('dog-card');
    dogCard.append(`<h3>${dog.name}</h3>`);
    dogCard.append(`<p>${dog.info}</p>`);
    const groomButton = $('<button>').text('Groom');
    groomButton.click(() => dog.groom());
    dogCard.append(groomButton);
    const goHomeButton = $('<button>').text('Go Home');
    goHomeButton.click(() => {
        dog.goHome();
        dogCard.remove();
    });
    dogCard.append(goHomeButton);
    panel.append(dogCard);
}

// Function to open the add dog modal
$(() => {
    $('#add-dog-button').on('click', () => {
        console.log('clicked@');
        $('#add-dog-modal').show();

        // $('#add-dog').click(function () {
        //     const name = $('#dog-name').val();
        //     const info = $('#dog-info').val();
        //     if (name && info) {
        //         const newDog = new Dog(name, info);
        //         addDogCardToPanel('waiting-panel', newDog);
        //         $('#add-dog-modal').hide();
        //         $('#dog-name').val('');
        //         $('#dog-info').val('');
        //     }
        // });
    })
})