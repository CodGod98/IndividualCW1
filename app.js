let app = new Vue ({
    el: '#app',
    data:{
        sitename:'e-learning Store',
        showlesson: true,
        //canAddToCart:true,
        lesson: lesson,
        search:"",
        cart:[],
        order: {
            name: "",
            phone:"",
        },
        
    },


methods: {                             
    submitForm(){                         //Form Submission At Checkout, Alert Prompt
        alert('Order Has Been Submitted')

    },   

    addToCart (lesson) {            
       let cartItem = this.GetCartItem(lesson);

       if(cartItem != null){                            //if the cart item is null then add 1 to quantity else add the lesson to the cart
        cartItem.quantity++;
        } else {
            this.cart.push({
                lesson: lesson,
                quantity:1
            })
        }
        lesson.space--;
    },

    cartCount(id) {               //counts how many items are added to the cart, and adds to the cart 
        let count = 0;
        for(let i = 0; i < this.cart.length; i++) {
            if(this.cart[i] === lesson.id) {
                count++;
            }
        }
        return count;
    },
    canAddToCart(lesson) {        //allows the product to be added to cart if there are lessons availble
        return lesson.space > this.cartCount(lesson.id);

    },
    
    showCheckout() {                   //shows the check out when toogled
        this.showlesson = this.showlesson? false: true;
    },

    GetCartItem(lesson){          //Gets the item in cart By id
        for (i= 0; i < this.cart.length; i++) {
            if(this.cart[i].lesson.id === lesson.id) {
                return this.cart[i]
            }
        }
    },


    removeItem(item) {
        item.quantity = item.quantity -1;
        item.lesson.space = item.lesson.space +1;
        if (item.quantity ==0) {
            let itemIndex = this.cart.indexOf(item); //this line gets the posistion of the item in the cart array
            this.cart.splice(itemIndex, 1); // removes the item at the index position in the cart array splice removes the item at the given position, item index is by one
        }
    },

    
    

    

          
        
    }, 
computed:{

    lessonSearch () {
        tempLessons = this.lesson;

        if (this.search != '' && this.search) {
            tempLessons = tempLessons.filter((result) => {
                return result.subject.toUpperCase().includes(this.search.toUpperCase()) ||
                result.location.toUpperCase().includes(this.search.toUpperCase())
            })
        
        }
        return tempLessons
        },

        enableSubmit: function(){                        //checks phone and name for regular expressions
            let isnum = /^\d+$/.test(this.order.phone);
            let isletter = /^[A-Za-z]+$/.test(this.order.name);
            return isnum == true && isletter == true
        },

         totalItems: function() {                           //returns the number of items in cart
            return this.cart.length;
        }, 

        sortedProductsAscending() {                                //Sorting,
            function compare(a, b) {
                if (a.price > b.price) return 1;
                if (a.price < b.price) return -1;
                return 0;
            }
            return this.lesson.sort(compare);
        },

        sortedProductsDescending() {                            //Sorting 
            function compare(a, b) {
                if (a.price > b.price) return -1;
                if (a.price < b.price) return  1;
                return 0;
            }
            return this.lesson.sort(compare);
        },

        enableCheckout: function(){                        //Enables the checkout when cart has more than 0 items
            return this.cart.length > 0;
        },

}

})

        