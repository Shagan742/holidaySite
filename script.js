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
            itemsToPut: [],
            start: false,
            putName: "",
            userName: "",
            budget: 0,
            colors: ["#F9F9F8", "#FFFFFF", "#FBFBFB", "#A9D9C6", "#CCD8E9", "#A0B3C6", "#D2D6D9", "#C2CBCA",
                "#707E7F", "#5F5388", "#7A7EA1", "#7A9AAC", "#C4CBD4", "#497abbff", "#2b4c77ff", "#C4CBD4"],
            selectedGift: {}
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
            const slices = this.filterItems.length;
        if (slices < 2) return;//this is to make sure spinner wont spin if user only puts 1 dollar as budget

        const sliceAngle = 360 / slices;//this is the angle of each slice
            const selectedIndex = Math.floor(Math.random() * slices);
            const selectedItem = this.filterItems[selectedIndex];
        const rotation =
            360 * 5 + (360 - (selectedIndex * sliceAngle + sliceAngle / 2)); //this is the rotation of the wheel, it rotates 5 times then stops at a random slice

        const wheel = document.getElementById('wheel');
        wheel.style.transition = 'transform 5s ease-out';
            wheel.style.transform = `rotate(${rotation}deg)`;
            this.itemsToPut.push(selectedItem);//this adds the selected item to the array of items to put
            setTimeout(() => {
    this.selectedGift = selectedItem;
    this.openModal();
}, 5000);

            
        },
        openModal: function () {
    const myModal = new bootstrap.Modal(document.getElementById('myModal'));
    myModal.show();
}


        
    },
    computed: { //does math with the data, returning numbers i can use later 
        rotateSlice: function () {
            if (this.filterItems.length > 0) {
                return 360 / (this.filterItems.length) //it rotates new slices to avoid overlapping
            } else {
                return 0; //no names = no rotate
            }
        },
        sliceSize: function () {
            if (this.filterItems.length < 2) return 0;//this is the width of the slices
            const angle = 2 * Math.PI / (this.filterItems.length)//converts angle from degrees (default) to radians
            return 2 * 250 * Math.tan(angle / 2)   // uses some math to determine all slices' widths after a new slice is added

        },
        filterItems: function () {
            return this.items.filter(item => item.price <= this.budget)
        }
    }
})

vue_app.mount('#app')

