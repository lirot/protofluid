  jwt.o.S2Functions = (function() {
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      //The functions in this object will get moved to the jwt.functions object
      //They re used to handle select two events except for the build function
      //defined here and called from the each pages callback.  it is a creational
      //method it sets up each select2 defined in the markup and used the default
      //s2optionsDO object
  return {
  init: function() {

      //add all the methods to the functions object
      jQuery.extend(jwt.functions,

                     {
formatVal: function(item) {

            var tblName = jQuery(this.element).data('ps-tbl-name');
            var isLine = jQuery(this.element).data('line');
            var dataDefn = jwt.jwtData.Configs[tblName]
            var lookup = item.id;

            if (typeof dataDefn.select2Display === 'function') {
		var display = dataDefn.select2Display(
		    jwt.jwtData[tblName]["_" + lookup], this.element);
            }

            if (isLine == "SO") {
              /* the ship to is on the header and line */
		dataDefn.select2setKeysSOLine(
		    jwt.jwtData[tblName]["_" + lookup], this.element);
            } else {
              if (typeof dataDefn.select2setKeys === 'function') {
                  dataDefn.select2setKeys(
		      jwt.jwtData[tblName]["_" + lookup], this.element);
              }
            }
            return display || "."
          },

formatRes: function(result, container, query, escapeMarkup) {
            var markup = [];
              jwt.functions.mymarkMatch(
		  result.text, query.term, markup, escapeMarkup);
            return markup.join("");
          },

mymarkMatch: function(text, term, markup, escapeMarkup) {
            //wrapper to handle highlighing text
            var wordArray = term.split(" ");
            wordArray.push(term);
            markup.push(jQuery(text).children().highlight(wordArray).html());
          },

format: function(item) {
            return item.tag
          },

select2PreQuery: function(that) {
            var tblName = jQuery(that).data('ps-tbl-name');
            var config = jwt.jwtData.Configs[tblName];

            if (config.hasOwnProperty("is_lunr_show_all")) {
              jQuery(".select2-input").val("all:all");
              jQuery(that).select2("updateResults", true);
              jQuery(".select2-input").val("");
            }

            if (config.hasOwnProperty("select2lunrPreQuery")) {
              var select2lunrPreQuery = config.select2lunrPreQuery;
              select2lunrPreQuery(config, that)
            }

          //Can approve logic for approvers
            if (config.Definition == "XX_APPROVERS") {
              jQuery(".select2-input").val("CA:Y");
              jQuery(that).select2("updateResults", true);
              jQuery(".select2-input").val("");
            }
          },

          // select2 will run select2query to search through
          // the drop down data pulled via the data object drop down
          // it some cases a query term is added to the user inputs
          // allow for the same logic to handle drop downs that have
          // dependencies.  for example if a user has entered a po
          // the vendor drop down can only show vendor location for
          // the vendor associated with the PO.

select2query: function(query) {
            var elem = jQuery(this.element);
            var tblName = elem.data('ps-tbl-name');
            var data = {
                results: []
              },
              i, j, s, newArray = [],
              results = [];

            var config = jwt.jwtData.Configs[tblName];
            var dataObject = jwt.jwtData[config.Definition];

            //if the data object is has  all property  show all values
            if (config.hasOwnProperty("qry_term_overide")) {
                query.term = config.qry_term_overide(query.term);
            }
    
            //if the data object is has  all property  show all values
            if (config.hasOwnProperty("is_lunr_show_all") && query.term == "") {
              query.term = "all:all"
            }

    
            //  the user inputs are feed to the lunr search routine
    results = config.lunr_index.search(query.term);

    if ( config.hasOwnProperty("postSearchFunction")){
        results = config.postSearchFunction( results , elem );

    }

    if ( config.hasOwnProperty("dropDownMax")){
   
    }else{
            results  = results.slice(0, 25);

    }

         
            var hashkey = "";
         //call sort routine on data object if defined
            if (config.hasOwnProperty("lunrSortFunction" )){
               results  = config.lunrSortFunction( results );
            }

            _.each(results, function(obj) {
              hashkey = obj.ref.hashCode().toString();
              s = config.select2Callback(dataObject["_" + hashkey]);
              data.results.push({
                id: hashkey,
                text: s
              });

            })

            //the S2 select continues with the data
            query.callback(data);
   },
	    
	    //builds for all the select2 for both header and line
	    //both pages
createS2_header: function() {
        var elemArray = [];

	//select2 for payment and handling  create the object
	//then set the values
	    jQuery("#loc_XX_HDR_PY").select2()
            if (jwt.invoice.header.XX_HDR_PY) {
		jQuery("#loc_XX_HDR_PY")
		    .select2("val", jwt.invoice.header.XX_HDR_PY);
            }
            jQuery("#loc_XX_HDR_HC").select2();
            if (jwt.invoice.header.XX_HDR_HC) {
		jQuery("#loc_XX_HDR_HC")
		    .select2("val", jwt.invoice.header.XX_HDR_HC);
            }

            //the user quick with the mouse the system data objects wont be ready
            //this is a wait check protection only relevant for the first  on a
            // session
        function f() {
		if (jwt.jwtData.hasOwnProperty('XX_289_D_APPROV')
		    && jwt.jwtData.hasOwnProperty('XX_APPROVERS')
    		    && jwt.jwtData.hasOwnProperty('XX_289_D_PRJ_01')
		  ) {
                dothis();
              } else {
                setTimeout(f, 1000)
              }
         }

        setTimeout(f, 1000)

	// builds all the custom select2 objects marked with data attribute
        function dothis() {
          elemArray = jQuery("input.select2-offscreen[data-ps-tbl-name]");
          //when this build loop is entered it is safe to show the page however
	  //for certain actions the page is hidden and in these cases
	  (!jwt.invoice.keepHidden)
		    ? jQuery("#full-section , #quick-section")
		    .css('display', 'block'): null;

		//loop builds select2 for elements with data objects driven off

              _.each(elemArray, function(obj) {
                var $obj = jQuery(obj);
                var tblName = $obj.data('ps-tbl-name');
                var config = jwt.jwtData.Configs[tblName];
                  //the id is used as the method name which is used to build the
		  //object
                if (config.hasOwnProperty($obj.attr('id'))) {
                  var funName = $obj.attr('id');
                  config[funName]($obj);
                }
              })
            }
          }

   }); /* this ends the extend */

      //defaults for select2 objects 
   var s2optionsDO = {};
      //this object maps custom functions to the S2 event model
      //the S2 event model framework is leveraged to handle the
      //user interaction with the select2 drop downs.  There are
      //events that the system needs to capture mainly
      //  The user clicks on a select2
      //  The user starts typing
      //  The user chooses a result from the drop down
      //  The user clears the drop down 
      s2optionsDO.s2optionsDO = {
        dropdownCssClass: function() {
          return jQuery(this).data("s2-drop-class");
        },
        allowClear: true,
        placeholder: "Select",
        minimumInputLength: 3,
        formatSelection: jwt.functions.formatVal,
        formatResult: jwt.functions.formatRes,
        escapeMarkup: function(m) {
          return m;
        },
        query: jwt.functions.select2query
      };

      //copy the  defualts object to our own data objects
      jQuery.extend(jwt.jwtData, s2optionsDO);

      
    }
  }
})()
