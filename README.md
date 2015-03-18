Project : rPay
Description : Front end for peoplesoft invoicing system

Instructions :  Unpack the tar tar -zxf
                Install 'npm install'
                you may need to install grunt
                you may need to install ruby
                you may need to install sass / compass
                you may need to install susy

                Start the app 'node server.js'
                navigate to the page 'localhost:3001/rp_index.html'

Performance   :

      Goal is to identify slowness on low end machine
      Test machine is an operton 3247 with a 1ghz bus
      Initial page loads can take up to a minute.

      1.  Investigate tab refreshes area for possible single 
          threaded sequential AJAX request.

      2.  Understand bottlenecks for page loads for approver

Styling        :

      1.  Select box / Drop down / prompts / Select2 terms used
      	  interchangeable.  Styling issues described here are related
	  to the list of values displayed that can be choosen
          Drop downs are used
          through out the system to give quicker access to relevant data            used as input to the form. 
	  All prompts
	  Prompts are split in to two categories.  
	        Large and small.
