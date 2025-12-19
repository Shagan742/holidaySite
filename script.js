//just commenting for my own note
const vue_app = Vue.createApp({
    created() {
        fetch('names.json').then(response => response.json()).then(json => {
                  this.names = json
            })

            fetch('items.json').then(response => response.json()).then(json => {
                  this.items = json
            })
    },
    data() {//this is the data
        return { 
            names: [],//names array
            items: [],//items array
            start: false,
            putName: "",
            userName:"",
            budget:0 
        }
    },
    methods: { //does things with data and the math of the computed things
        //adding all methods here
        startGame: function(starT) {
            //show the wheel+input field for names
            this.start=starT; //start changes from false to true, activating the d-nones and d-blocks to change layout from loading screen to wheel of names
            console.log(this.userName) //works
            console.log(this.budget) //works
        },
        putNames: function(){
            const theName=this.putName.split("\n").map(name => name.trim()).filter(Boolean) //the big string in putName i accumulate gets split up then trimmed + empty lines are ignored
            this.names.push(...theName) //the ...means to change theName from an array to a bunch of strings, basically removing its [] symbols
            console.log(this.names); //making sure my array works and it does
            this.putName=" " //clear the input box to stop the slices from somehow multiplying
        }
    },
    computed: { //does math with the data, returning numbers i can use later 
        rotateSlice: function() {
            if(this.names.length>0) {
                return 360/(this.names.length) //it rotates new slices to avoid overlapping
            } else {
                return 0; //no names = no rotate
            }
        },
        sliceSize: function() {
            const angle= 2*Math.PI/(this.names.length)//converts angle from degrees (default) to radians
            return 2 * 250 * Math.tan(angle / 2)   // uses some math to determine all slices' widths after a new slice is added
            
        }
    }    
})

vue_app.mount('#app')