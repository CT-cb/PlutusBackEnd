Plutus

The Plutus backend is located on an Ubuntu server at IP address 3.17.169.64. It accepts HTTP requests over port 3000.

Thus, any request to the backend server must be made to a URL that begins with:

3.37.164.69:3000/

After the slash, the client should add additional endpoints, depending on the type of data the client wants.

The file below contains the following sections:

1. Error Handling
2. General Notes
3. API Endpoints

If you're trying to make a call to a specific endpoint, skip to section 3.

!===!===!===!===!===!===!
Error Handling
!===!===!===!===!===!===!

If a request to an endpoint has missing required parameters, the response will contain a JSON of the following format:

{
    "status": "error",
    "errorType":
    "message":<error message>
}

!===!===!===!===!===!===!
General Notes
!===!===!===!===!===!===!
* All date parameters (startDate, endDate, etc) should have values that are ISO strings, but you have some flexibility. Ultimately,
  the string should be something that the JavaScript Date() constructor will accept as a valid date.

  All of the following are acceptable:
  2023-11-03T12:22:33.543T+00:00
  2023-11-03
  2023-11-03T12:22:33
  2023-11-03T12:22:33.000

  Strings of other formats are accepted but discouraged, such as:
  11/03/2023

  Stick to ISO format and all will be well.

*
!===!===!===!===!===!===!
API Endpoints
!===!===!===!===!===!===!


/auth/
=======================

  POST endpoints

---
/auth/create
---

Endpoint for creating a new account.

Expects a POST request with a JSON body that includes the following fields:

{
  "email": <user email> (required),
  "password": <user pw> (required),
  "firstName": <name> (optional),
  "lastName": <name> (optional)
}

Returns a response with the following JSON body:
{
  "status":"create_account_success",
  "id":<user uuid in database>
}

---
/auth/login
---

Endpoint for authenticating a login attempt. As of now, this is a bare-bones username/pw comparison to the database.

Expects a POST request with a JSON body that includes the following fields:

{
  "email": <user email> (required),
  "password": <user pw> (required)
}

If successful, returns a response with the following JSON body:

{
  "status": "auth_success"
}

If the user's email  was not valid, returns a response with the following JSON body:

{
  "status": "error",
  "error_type": "user_not_found",
  "message": "No user with this email exists in the database."
}

If the user's eail was valid but the password was not, returns a response with the following JSON body:

{
  "status": "error",
  "error_type": "user_not_found",
  "message": "The provided password does not match the password in the db."
}

  DELETE endpoints

---
/auth/delete
---

Endpoint for deleting an account. This action is currently irreversible. 

Expects a DELETE request with a JSON body with the following keys:

{
  "email": <user email>,
  "password": <user pw>
}

If successful, returns a response with a JSON body with the following contents:

{
  "status": "delete_account_success"
}

  PUT endpoints

---
/auth/update
---

Endpoint for updating an account's details.

Expects a PUT request with a JSON body with the following contents:

{
  "email": <user email> (required),
  "password": <user password> (required),
  (the JSON should then contain any fields that we want to update, but these are all optional)
}


/expenses/
=======================

  POST endpoints

---
/expenses/add
---

Endpoint for adding a single expense to the database.

Expects a POST request with a JSON body with the following contents:

{
  "email": <user email>,
  "amount": <expense amount>,
  "currency": <currency code, default is usd>,
  "expenseDate": <date the expense was paid>,
  "type" (optional): <category of expense -- business, shopping, etc>
  "payee" (optional): {
    "name":<name of payee>,
    "description": <short description of the payee, this is optional>,
    "category": <payee's general category, this is optional>
  }
}

If successful, returns a JSON body with the following contents:

{
  "message": "expense_add_success",
  "id": <id of created expense>
}

  GET endpoints

* The following endpoints all return an array of JSON objects. 
* If the request to the endpoint had proper parameters but return an empty JSON array, then there were no results for the relevant database query.
* All GET requests to these endpoints require the user of paramters passed into the URL. The parameters should be placed at the end of the URL. The parameters section begins with a ? symbol, and then each key=value pair of paramters should be separated by an & symbol. See the examples below for more detail.

---
/expenses/all
---

The /all endpoint expects a GET request with the following parameter(s):

  email (string) - the user id for which to get all expenses. In API v1, this will be the user's email address.

Template:
/all?email=<email>

Example:
/all?email=example@example.com

---
/expenses/bydaterange
---

Expects a GET request with the following parameter(s):

email (string)
startDate (date in ISO string format) - optional! If this is missing, startDate will default to the year 1753
endDate (date in ISO string format) - optional! If this is missing, endDate will default to the year 3000

Template:
/bydaterange?email=<email>&startDate=<datestring>&endDate=<datestring>

Example:
/bydaterange?email=example@example.com&startDate=2023-11-03 (all expenses since Nov 3rd)
/bydaterange?email=example@example.com&startDate=2023-11-03&endDate=2023-11-20T00:00:00.0000

---
/expenses/bytype
---

The /bytype endpoint expects a GET request with the following parameters

email (string)
types (comma-separated list of strings)
example: /bytype?email=example@example.com&types=business,shopping,vacation

Template:
/bytype?email=<email>&types=<comma-separated string list>

Example:
/bytype?email=example@example.com&types=business,vacation
/bytype?types=business,vacation&email=example@example.com

---
/expenses/bytype_daterange
---

The /bytype_daterange endpoint expects a GET request with the following parameters:

email (string)
types (comma-separated list of strings)
startDate (date in ISO string format) - optional! If this is missing, startDate will default to the year 1753
endDate (date in ISO string format) - optional! If this is missing, endDate will default to the year 3000

Template:
/bytype_daterange?email=<email>&types=<comma-separated string list>&startDate=<datestring>&endDate=<datestring>

Example: 
/bytype?email=example@example.com&types=business,shopping,vacation&startDate=2023-11-28T00:00:00.000+00:00&endDate=2023-11-30

---
/expenses/byamount
---

The /byamount endpoint expects a GET request with the following parameters:

email (string)
amountLowerBound (number) - optional! If this is missing or if it is negative, amountLowerBound will be set to 0
amountUpperBound (number) - optional! If this is missing, amountUpperBound will be set to Number.MAX_VALUE

Template:
/byamount?email=<email>&amountLowerBound=<number>&amountUpperBound=<number>

Example:
/byamount?email=example@example.com&amountLowerBound=5&amountUpperBound=100

---
/expenses/byamount_daterange
---

The /byamount_daterange endpoint expects a GET request with the following parameters:

email (string)
amountLowerBound (number) - optional! If this is missing or if it is negative, amountLowerBound will be set to 0
amountUpperBound (number) - optional! If this is missing, amountUpperBound will be set to Number.MAX_VALUE

startDate (date in ISO string format) - optional! If this is missing, startDate will default to the year 1753

endDate (date in ISO string format) - optional! If this is missing, endDate will default to the year 3000

Template:
/byamount_daterange?email=<email>&amountLowerBound=<number>&amountUpperBound=<number>?startDate=<datestring>&endDate=<datestring>

Example:
/byamount_daterange?email=example@example.com&amountLowerBound=50&amountUpperBound=100?startDate=2023-11-28&endDate=2023-11-30


/incomes/
=======================

---
/incomes/add
---

The /add endpoints allows a client to add a single income object to the db

The endpoint expects a POST request with a JSON body with the following attributes:

{
  email:<user email>,
  amount:<number>,
  currency:<string, default is usd>,
  incomeDate:<ISO date string, default is Date.now()>,
  type:<type of income...direct_deposit? reimbursement? transfer?>
  source:{ (optional!)
    name:<string>,
    description: <string>
  }
}

---
/incomes/delete
---

The /delete endpoint allows a client to delete 1 or more income objects from the db.

The endpoint expects a DELETE request with the following parameters:

email (string)
incomeId (comma-separated list) -- the uuid(s) of the income object(s) to delete

If successful, returns a response with the following JSON body:
{
  "status":
}
Template:
/incomes/delete?email=<email>&incomeId=<income object uuid>

Example:
/incomes/delete?email=planwithplutus@gmail.com&incomeId=0ff84a8d-45e3-4215-844f-f8e6ec5a9764
/incomes/delete?email=planwithplutus@gmail.com&incomeId=0ff84a8d-45e3-4215-844f-f8e6ec5a9764,0ff84a8d-45e3-4215-844f-f8e6ec5a9764

---
/incomes/all
---

The /all endpoint returns all income objects for the given user.

The endpoint expects a GET request with the following parameter:

email (string)

Template:
/incomes/all&email=<email>

Example:
/incomes/all&email=planwithplutus@gmail.com

---
/incomes/bydaterange
---

The /bydaterange endpoint returns all income objects for the given user between a given date range.

The endpoint expects a GET request with the following parameters:

email (string)
startDate(ISO date string) -- optional, will default to the year 1753 if left out
endDate(ISO date string) -- optional, will default to the year 3000 if left out

Note: If both startDate and endDate are left out, this endpoint will return all of the user's income objects.

Template:
/incomes/bydaterange?email=<email>&startDate=<ISO date string>&endDate=<ISO date string>

Example:
/incomes/bydaterange?email=planwithplutus@gmail.com&startDate=2023-11-28&endDate=2023-11-30T00:00:00.000+00:00

---
/incomes/bytype
---

The /bytype endpoint expects a GET request with the following parameters:

email (string)
types (comma-separated list of types)

Template:
/incomes/bytype?email=<email>&types=<comma-separated list>

Example:
/incomes/bytype?email=planwithplutus@gmail.com&types=business,vacation

---
/incomes/bytype_daterange
---

The /bytype_daterage endpoint expects a GET request with the following parameters:

email (string)
types (comma-separated list of types)
startDate(ISO date string) -- optional, will default to the year 1753 if left out
endDate(ISO date string) -- optional, will default to the year 3000 if left out

Template:
/incomes/bytype_daterange?email=<email>&types=<comma-separated list>&startDate=<ISO date string>&endDate=<ISO date string>

Example:
/incomes/bytype_daterange?email=planwithplutus@gmail.com&types=business&startDate=2023-11-28

---
/incomes/byamount
---

The /bytype_daterange endpoint expects a GET request with the following parameters:

email (string)
amountLowerBound (number) -- optional, will be set to 0 if not valid
amountUpperBound (number) -- optional, will be set to the max value of a Long integer if not valid

Template:
/incomes/byamount?email=<email>&amountLowerBound=<number>&amountUpperBound=<number>

Example:
/incomes/byamount?email=planwithplutus@gmail.com&amountLowerBound=5&amountUpperBound=100

---
/incomes/byamount_daterange
---

The /byamount_daterange endpoint expects a GET request with the following parameters:

email (string)
amountLowerBound (number) -- optional, will be set to 0 if not valid
amountUpperBound (number) -- optional, will be set to the max value of a Long integer if not valid
startDate(ISO date string) -- optional, will default to the year 1753 if left out
endDate(ISO date string) -- optional, will default to the year 3000 if left out

Template:
/incomes/byamount?email=<email>&amountLowerBound=<number>&amountUpperBound=<number>&startDate=<ISO date string>&endDate=<ISO date string>

Example:
/incomes/byamount?email=planwithplutus@gmail.com&amountLowerBound=5&amountUpperBound=30.50&startDate=2023-11-28&endDate=11-30-2023


/limits/
=======================

/limits/add

The /add endpoint is used to add a single income object to the database.

The endpoint expects a POST request with a JSON body with the following attributes:

email (string, required)
timeDivision (string, required)
maxLimit (number, required)
startDate (ISO date string, optional)
endDate (ISO date string, optional)
currency (string, defaults to usd if not included)

Note:
The startDate attribute will default to today's date if it is not specified in the JSON body
The endDate attribute will default to the year 3000 if it is not specified in the JSON body.

If successful, returns a JSON body with the following contents:

{
  "message": "limit_add_success",
  "id": <id of created limit>
}
