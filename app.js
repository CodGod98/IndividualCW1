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

    
    //methods: {
       
      //  addToCart: function(){
          //  this.cart.push({
            //    lesson:lesson
            //}),
        //}, 
  //  },//



methods: {
    submitForm(){
        alert('Order Has Been Submitted')

    },

    addToCart (lesson) {
       let cartItem = this.GetCartItem(lesson);

       if(cartItem != null){
        cartItem.quantity++;
        } else {
            this.cart.push({
                lesson: lesson,
                quantity:1
            })
        }
        lesson.space--;
    },
  
    cartCount(id) {
        let count = 0;
        for(let i = 0; i < this.cart.length; i++) {
            if(this.cart[i] === lesson.id) {
                count++;
            }
        }
        return count;
    },


    canAddToCart(lesson) {
        return lesson.space > this.cartCount(lesson.id);

    },
    
    showCheckout() {
        this.showlesson = this.showlesson? false: true;
    },

    GetCartItem(lesson){
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

    
    

   
    /*     showCheckout: function() {
        this.showlesson = this.showlesson? false: true;
    },
 */
    

          
        
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

        enableSubmit: function(){
            let isnum = /^\d+$/.test(this.order.phone);
            let isletter = /^[A-Za-z]+$/.test(this.order.name);
            return isnum == true && isletter == true
        },

         totalItems: function() {
            return this.cart.length;
        }, 

        sortedProductsAscending() {
            function compare(a, b) {
                if (a.price > b.price) return 1;
                if (a.price < b.price) return -1;
                return 0;
            }
            return this.lesson.sort(compare);
        },

        sortedProductsDescending() {
            function compare(a, b) {
                if (a.price > b.price) return -1;
                if (a.price < b.price) return  1;
                return 0;
            }
            return this.lesson.sort(compare);
        },

        enableCheckout: function(){
            return this.cart.length > 0;
        },

   

       /*  canAddToCart: function() {
            return this.lesson.space >
            this.totalItems;
            
        } */

  }

})

        