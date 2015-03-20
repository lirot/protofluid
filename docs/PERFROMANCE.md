Performance can be broken down in to many sections.


Performance related to the number of invoice processed in the tabs
for SAS users.

1. Stress tested the number of invoice in the All Invoices tab
Increased the number of invoices int the all invoice tabs by
modifying the view PS_XX_289_WL_SAS9 view to do a cartesian
joing with a dummy table PS_XX_FCM289_RUN, and then
increasing the number of rows in this table to increase the
number of rows in the All invoice tab

    * tests performed on a high end workstation similar to a t410 or above
multi core with 4 gb ram

# Invoice Results
    === === === = === === === === === === === === === === === === === === === === === ===
    100 No impact tabs load in under 20 seconds

290 Tabs load between 30 - 40 seconds
system still performs well when sorting and searching
from the column headers of the tabs.
450 Breaking out by individual components
Only
for the 'All Invoices tab'
AJAX calls including database time
No issues here - sub second response
back to the client
Build of the html table
this may be the biggest area of work
but isnt an issue building html is done quickly
Creation of the tablesorter without the pager component
no issue when run from the console
no issue
Creation of the pager compoenent
no issue
ADDING the click handlers!!!!!!
    binding was done in a very inefficient manner.
call stack:
    by row of the table < --required to maintain scoping of 'this' * * find all routes on the page!!!!
    so this was the problem.easy fix was to pass the row as a
context to the bind so that only routes on the row were bound
greatly improving performance

    * * No impact tabs are loading in under 20 - 30 seconds

912 Same performance at this level.better after the fix related to the click
binds!!

    1824 Wow...this is working fine!


    * * Running the same tests on older machine with slow cpu

1824 comes up faster than with 100 records after the fix
for binding the click
system runs better on old opteron with the bind fix.

2. PO Lines - When coding an invoice with even a few lines the system slows down as it trys to edit each line.
this has been an on going issue and needs to be address.
Breaking down the call stack
User working with an invoice with three or more lines
Clicks save.
Server side validation runs
The server side validation is contained in the following method
See SERVER_SIDE_VALIDATION.md
The view xx_fcm174_vw was refactored and the issue was solved.  The new view xx_289_174_vs was created.  a 21 line po 
was used for testing.  The invoice was now responsive in most situations.  Issues remain on inserts and deletes.  The
initial adding of the invoice on the quick page with the po seeems to still be an issue.  po used in dev 2000077957.
for a listing of the code.
