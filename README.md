# cs321_team4

Developer key:


Each task or issue begins with an alphanumerical prefix indicating the relevant component(s) and the issue number within that component. For example, "a" indicates an issue related to the front end component, which is represented by the letter "a." Below is the key of characters and their meanings.

**Components**

a - front end (JS/React user interface)
b - back end (Node.js app hosted on AWS)
c - database (MongoDB hosted on Atlas)
d - fintech service (Plaid API)
e - version control software / repos (GitHub)

**Connections**

Connections refer to tasks or issues that involve communication between two components. Connections are represented by the letter "x" surrounded by the relevant component characters.
For example, an issue or task concerning front end to back end communication would be preceded by "axb."

Examples:

axb - front end -> back end communication
bxa - back end -> front end communication
bxc - back end -> database communication
bxd - back end -> Plaid communication
abxba - front end -> back end AND back end -> front end communication


Examples of tasks that would take a Connections prefix may include test creation tasks. For example, a task to write tests for a front end function that retrieves data from the back end would have the prefix "bxa." Similarly, a task to fix an issue with data that is coming from the back end to the front end would also be prefixed "bxa."
