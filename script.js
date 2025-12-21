//just commenting for my own note
const vue_app = Vue.createApp({
    created() {
        fetch('items.json').then(response => response.json())
            .then(json => {
                this.items = json.map(item => ({
                    ...item,//this copies all the data from the json file
                    color: this.colors[Math.floor(Math.random() * this.colors.length)]//this adds a random color from the colors array to each item
                }));
            })
    },
    data() {//this is the data
        return {
            items: [],//items array
            start: false,
            putName: "",
            userName: "",
            budget: 2,
            colors: ["#F9F9F8", "#FFFFFF", "#FBFBFB", "#A9D9C6", "#CCD8E9", "#A0B3C6", "#D2D6D9", "#C2CBCA",
                "#707E7F", "#5F5388", "#7A7EA1", "#7A9AAC", "#C4CBD4", "#497abbff", "#2b4c77ff", "#C4CBD4"],
            selectedGift: {},
            addedToFavs: [],
            currentRotation:0 //this is the rotation of the wheel (default is at 0)
        }
    },
    methods: { //does things with data and the math of the computed things
        //adding all methods here
        startGame: function (starT) {
            //show the wheel+input field for names
            this.start = starT; //start changes from false to true, activating the d-nones and d-blocks to change layout from loading screen to wheel of items
            console.log(this.userName) //works
            console.log(this.budget) //works
        },
        spinWheel: function () {
            //spin the wheel

            const selectedIndex = Math.floor(Math.random() * this.filterItems.length);
            const selectedItem = this.filterItems[selectedIndex];  //randomly choose item in the filterItems array
            const spins = 5;//wheel will spin 5 times before stopping
            const angle = 360 / this.filterItems.length; //this will make the angle of each item based on the filteritems array length
            
            const randomOffset = angle * selectedIndex;//this will make the wheel stop on an item in a random position



            const wheel = document.getElementById('wheel');
            this.currentRotation += spins * 360 + randomOffset; //this will add the angle of rotation to the current rotation

            wheel.style.transform = `rotate(${this.currentRotation}deg)`;//this rotates the wheel
            wheel.style.transition = 'transform 5s ease-out'; //when spin session ends, wheel smoothly stops
            setTimeout(() => {
                this.selectedGift = selectedItem; //the item goes into the selected gift object
                this.openModal();
            }, 5000); //dont open modal right away


        },
        openModal: function () {
            const myModal = new bootstrap.Modal(document.getElementById('myModal'));
            const audioYay= new Audio('sounds/videoplayback.mp3')
            myModal.show();
            audioYay.play();
        },
        addToFavorites: function () {
            const fav=this.selectedGift;
            this.addedToFavs.push(fav)
            console.log(this.addedToFavs[this.addedToFavs.indexOf(fav)])

            //local storage things
            const storedFavs=JSON.stringify(this.addedToFavs) //stringify addedToFavs array for the localStorage to work
            localStorage.setItem('newFav', storedFavs); //set the addedToFavs array as an item in local storage
        },
        refresh: function() {
            location.reload()
        }
    },
    computed: { //does math with the data, returning numbers i can use later 
        rotateSlice: function () {
            if (this.filterItems.length > 0) {
                return 360 / (this.filterItems.length) //it rotates each new slice added to avoid overlapping
            } else {
                return 0; //no names = no rotate
            }
        },
        sliceSize: function () {
            if (this.filterItems.length < 2) return 0;//this is the width of the slices
            const angle = 2 * Math.PI / (this.filterItems.length)//converts angle from degrees (default) to radians
            return 2 * 250 * Math.tan(angle / 2)   // uses some math formula thing to determine all slices' widths after a new slice is added

        },
        filterItems: function () {
            return this.items.filter(item => item.price <= this.budget) //filter the entire items json file into select items based on if their price is the given budget or below
        }
    }
})

vue_app.mount('#app')

