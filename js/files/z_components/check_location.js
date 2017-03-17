 /* ANCHOR > */
 function checkLocation() {

     var url = $(location).attr('href');

     if (url.indexOf('#') != -1) {
         var from = url.indexOf('#');
         if (url.indexOf('?') != -1) {
             var to = url.indexOf('?');
         }
         var anchor = url.slice(from, to || url.length);

         switch (anchor) {

             case '#results':
                 setMainSelection({
        main_tab_index: 3,
        list_of_models: [1, 2, 3, 4, 5, 6, 7],
        list_of_motors: [0, 9, 8, 7, 6, 5],
        current_auto: 4,
        current_model: 2,
        current_motor: 2,
    })



                 break;

             case '':



                 break;
         }
     }

 }

 checkLocation();
