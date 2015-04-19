jwt.error = (function() {

  var createError = function(obj) {
    //Create error takes a list
    //create error will process an error object and handle it
    //based on its configuration
    //errors are stored in error objects see the js file ERRORS
    //the template for the list elements placed in the div on the top of the
    //full page
    var source = jwt.templates.ms_error;
    var templateC = jwt.handlebars.compile(source);
    var outHTML = templateC(obj);
    var found;

    //clean up from last run
    jQuery("div .ps-error-text-" + obj.id).remove();
    jQuery("div.ps-error-" + obj.id).removeClass("ps-error-" + obj.id)
      .removeAttr("data-error");
    jQuery(".messages li#" + obj.id).remove();

    //run over fields on definition
    _.each(obj.field, function(item) {
      //inputs and text areas in the containers
      if (jQuery("." + item + " input  , ." + item + " textarea ")
        .filter(function() {
          if (!obj.hasOwnProperty("test")) {
            //true here allows for informational messages
              return true;
          }
          return obj.test(this) /*run the script on the definition */
        }).parent("." + item).addClass("ps-error-" + obj.id)
	  .attr("data-error", "wrapper-" + obj.id) /* style the container */
          .prepend("<div data-error='text-" + obj.id +
		   "'  class='ps-error-text-" + obj.id + "'>" + obj.desc +
		   "</div>").length > 0);
        {
        found = true;
      }
    });

    if (obj.hasOwnProperty("field")) {
      //if nothing check for the test not dependent on a dom element
      if (!found && obj.field.length === 0) {
          found = obj.test();
      }
    }

    if (obj.hasOwnProperty("context")) {
      //server message we dont test  server already did the test
      if (_.contains(obj.context, "S")) {
          found = true;
              if (obj.hasOwnProperty("routeRequired")) {
          //surface reroute errors to the invoice
          if ( obj.routeRequired === true){
              jwt.invoice.routeError = true;
          }
      }
      }
    }

    if (obj.popUp && found) {
      //this, passed in to the pop up function,
      //is the original click element
      //allowing for easy redirection off popup
      //especially on worklists
      obj.popUpFunction.call(this, obj);
    }

    if (found) {
      //message is list on the page
      jQuery(".messages ul").append(outHTML);
      jQuery('.content').animate({
          scrollTop: 0
        },
        'slow');
      return false;
    } else {
        return true;
    }
  };
    
  return {
    createError: createError
  };
    
})();
